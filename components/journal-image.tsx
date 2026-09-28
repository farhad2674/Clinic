import type {JournalImage as JournalImageAsset} from '@/lib/journal-images';

export function JournalImage({image,decorative=false,sizes='(max-width: 767px) 90vw, 36vw'}:{image:JournalImageAsset;decorative?:boolean;sizes?:string}){
  return <img src={image.src} srcSet={`${image.thumbnail} ${image.thumbnailWidth}w, ${image.src} ${image.width}w`} sizes={sizes} alt={decorative?'':image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" style={{objectPosition:image.position}}/>;
}
export function JournalCover({image}:{image:JournalImageAsset}){
  return <figure className="journal-cover"><div className="journal-cover-frame" data-parallax><JournalImage image={image}/></div><figcaption>{image.caption}</figcaption></figure>;
}

