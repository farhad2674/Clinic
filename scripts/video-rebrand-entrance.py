"""Rebrand only the tracked wall sign and floor reflection in the entrance film.
The replacement pixels come from the built-in ImageGen edit; original frames,
camera movement, timing and audio disposition are preserved.
"""
from pathlib import Path
import json, subprocess
import numpy as np
from PIL import Image, ImageFilter

ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/'assets/elvitha-video'
SOURCE=ROOT/'public/media/entrance.mp4'
GENERATED=WORK/'entrance-sign-generated.png'
OUTPUT=ROOT/'public/media/entrance-elvitha.mp4'
W,H,FPS=1280,720,24

def gray(a):
    return (a[...,0]*.299+a[...,1]*.587+a[...,2]*.114).astype(np.float32)

class Track:
    def __init__(self,frame,rect):
        self.x,self.y,self.w,self.h=rect
        self.template=Image.fromarray(frame[self.y:self.y+self.h,self.x:self.x+self.w])
        self.scale=1.
        self.scores=[]
    def update(self,frame,index):
        if index==0:return self.x,self.y,self.scale,1.
        best=(-2,None)
        for scale in np.arange(max(.9,self.scale-.018),min(1.45,self.scale+.021),.006):
            tw,th=round(self.w*scale),round(self.h*scale)
            tpl=gray(np.asarray(self.template.resize((tw,th),Image.Resampling.BILINEAR)))
            tpl=tpl-tpl.mean()
            norm=np.sqrt(np.sum(tpl*tpl))
            x0=max(0,round(self.x)-5); y0=max(0,round(self.y)-4)
            x1=min(W,round(self.x)+6+tw); y1=min(H,round(self.y)+5+th)
            area=gray(frame[y0:y1,x0:x1])
            if area.shape[0]<th or area.shape[1]<tw:continue
            windows=np.lib.stride_tricks.sliding_window_view(area,(th,tw))
            means=windows.mean(axis=(-1,-2),keepdims=True)
            centered=windows-means
            correlations=(centered*tpl).sum(axis=(-1,-2))/(np.sqrt((centered*centered).sum(axis=(-1,-2)))*norm+1e-6)
            # Penalize sudden scale/position jumps through a soft prior.
            ys,xs=np.indices(correlations.shape)
            correlations-=.5*abs(scale-self.scale)
            best_i=np.unravel_index(np.argmax(correlations),correlations.shape)
            score=float(correlations[best_i])
            if score>best[0]:best=(score,(x0+int(best_i[1]),y0+int(best_i[0]),float(scale)))
        if best[1] is not None:self.x,self.y,self.scale=best[1]
        self.scores.append(best[0])
        return self.x,self.y,self.scale,best[0]

def feather(size,edge):
    w,h=size
    yy,xx=np.indices((h,w))
    d=np.minimum.reduce([xx,yy,w-1-xx,h-1-yy]).astype(np.float32)
    t=np.clip(d/edge,0,1)
    return (t*t*(3-2*t))[...,None]

def composite(frame,source_patch,rect,tracker_origin,track):
    ox,oy,ow,oh=rect
    tx,ty,scale,score=track
    x=round(tx+(ox-tracker_origin[0])*scale)
    y=round(ty+(oy-tracker_origin[1])*scale)
    w,h=round(ow*scale),round(oh*scale)
    patch=np.asarray(source_patch.resize((w,h),Image.Resampling.BICUBIC)).astype(np.float32)
    alpha=feather((w,h),max(8,round(11*scale)))
    x0,y0=max(x,0),max(y,0);x1,y1=min(x+w,W),min(y+h,H)
    if x0>=x1 or y0>=y1:return (x,y,w,h)
    patch=patch[y0-y:y1-y,x0-x:x1-x]
    alpha=alpha[y0-y:y1-y,x0-x:x1-x]
    base=frame[y0:y1,x0:x1].astype(np.float32)
    # Match low-frequency wall/floor tone using feather border only.
    border=(alpha[...,0]>.05)&(alpha[...,0]<.45)
    if border.any():
        shift=np.median(base[border]-patch[border],axis=0)
        patch=np.clip(patch+shift,0,255)
    frame[y0:y1,x0:x1]=np.clip(base*(1-alpha)+patch*alpha,0,255).astype(np.uint8)
    return (x,y,w,h)

def main():
    WORK.mkdir(parents=True,exist_ok=True)
    generated=Image.open(GENERATED).convert('RGB').resize((W,H),Image.Resampling.LANCZOS)
    # Coordinates encompass the old glyphs and their glow, avoiding nearby objects.
    sign_rect=(1102,194,110,58)
    floor_rect=(1104,493,108,59)
    sign_patch=generated.crop((sign_rect[0],sign_rect[1],sign_rect[0]+sign_rect[2],sign_rect[1]+sign_rect[3]))
    floor_patch=generated.crop((floor_rect[0],floor_rect[1],floor_rect[0]+floor_rect[2],floor_rect[1]+floor_rect[3]))
    decode=subprocess.Popen(['ffmpeg','-v','error','-i',str(SOURCE),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
    encode=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','slow','-crf','18','-g','12','-keyint_min','12','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(OUTPUT)],stdin=subprocess.PIPE)
    records=[]; index=0; sign=None; floor=None
    while True:
        data=decode.stdout.read(W*H*3)
        if not data:break
        if len(data)!=W*H*3:raise RuntimeError('Incomplete source frame')
        original=np.frombuffer(data,dtype=np.uint8).reshape((H,W,3)).copy()
        if sign is None:
            sign=Track(original,(1113,203,26,39))
            floor=Track(original,(1113,500,29,40))
        st=sign.update(original,index)
        ft=floor.update(original,index)
        frame=original.copy()
        sr=composite(frame,sign_patch,sign_rect,(1113,203),st)
        fr=composite(frame,floor_patch,floor_rect,(1113,500),ft)
        # Verify no pixel outside the two patch bounds changed before encoding.
        outside=np.ones((H,W),dtype=bool)
        for x,y,w,h in [sr,fr]:outside[max(y,0):min(y+h,H),max(x,0):min(x+w,W)]=False
        if np.any(frame[outside]!=original[outside]):raise RuntimeError('Change outside patch')
        encode.stdin.write(frame.tobytes())
        if index in [0,24,48,72,96,120,144]:
            Image.fromarray(frame).save(WORK/f'preview-{index:03d}.png')
        if index==0:Image.fromarray(frame).save(ROOT/'public/media/entrance-elvitha-poster.webp',quality=91,method=6)
        records.append({'frame':index,'sign':st,'reflection':ft,'signRect':sr,'reflectionRect':fr})
        index+=1
    decode.stdout.close();encode.stdin.close()
    if decode.wait()!=0 or encode.wait()!=0:raise RuntimeError('FFmpeg failed')
    report={'frames':index,'fps':FPS,'duration':index/FPS,'width':W,'height':H,'minSignCorrelation':min(sign.scores),'minReflectionCorrelation':min(floor.scores),'outsidePatchUnchangedBeforeEncoding':True,'tracks':records}
    (WORK/'tracking-report.json').write_text(json.dumps(report,indent=2))
    thumbs=[]
    for n in [0,24,48,72,96,120,144]:
        im=Image.open(WORK/f'preview-{n:03d}.png')
        # Full right-hand area so sign and reflection are inspected together.
        thumbs.append(im.crop((1035,150,1280,615)).resize((245,465)))
    sheet=Image.new('RGB',(245*len(thumbs),465))
    for i,im in enumerate(thumbs):sheet.paste(im,(245*i,0))
    sheet.save(WORK/'rebrand-contact.png')
    print(json.dumps({k:v for k,v in report.items() if k!='tracks'},indent=2))

if __name__=='__main__':main()
