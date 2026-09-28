// Fetch complete films: canplaythrough alone does not guarantee random seeks.
export async function prepareOpening(root: HTMLElement, signal: AbortSignal, progress: (value: number) => void) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal.addEventListener('abort', abort, {once: true});
  const deadline = window.setTimeout(abort, 25000);
  const urls: string[] = [];
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>('[data-opening] video'));
  const dispose = () => {
    videos.forEach(video => {
      if (!urls.includes(video.getAttribute('src') || '')) return;
      video.pause(); video.removeAttribute('src'); video.load();
    });
    urls.forEach(url => URL.revokeObjectURL(url));
  };
  const bounded = <T,>(promise: Promise<T>) => new Promise<T>((resolve, reject) => {
    const stop = () => { cleanup(); reject(new DOMException('Loading stopped', 'AbortError')); };
    const cleanup = () => controller.signal.removeEventListener('abort', stop);
    promise.then(value => { cleanup(); resolve(value); }, error => { cleanup(); reject(error); });
    if (controller.signal.aborted) stop();
    else controller.signal.addEventListener('abort', stop, {once: true});
  });
  const decode = async (image: HTMLImageElement) => {
    image.loading = 'eager';
    await bounded(image.decode());
  };
  const tasks: Array<() => Promise<unknown>> = [
    () => bounded(Promise.all([
      document.fonts.load('400 16px Vazirmatn'),
      document.fonts.load('400 48px Estedad'),
    ]).then(() => document.fonts.ready)),
    ...Array.from(root.querySelectorAll<HTMLImageElement>('[data-opening] img')).map(image => async () => {
      try { await decode(image); }
      catch { if (!signal.aborted) image.style.visibility = 'hidden'; throw new Error('Opening image unavailable'); }
    }),
    ...videos.map(video => async () => {
      const poster = new Image();
      poster.src = video.poster;
      await decode(poster);
    }),
  ];
  const staticMedia = matchMedia('(prefers-reduced-motion: reduce)').matches
    || (navigator as Navigator & {connection?: {saveData?: boolean}}).connection?.saveData;
  videos.forEach(video => {
    video.dataset.mediaState = 'loading';
    tasks.push(async () => {
      try {
        if (staticMedia) { video.dataset.mediaState = 'static'; return; }
        const response = await fetch(video.dataset.src!, {signal: controller.signal});
        if (!response.ok) throw new Error('Film unavailable');
        const blob = await response.blob();
        if (controller.signal.aborted) throw new DOMException('Loading stopped', 'AbortError');
        const url = URL.createObjectURL(blob);
        urls.push(url);
        await new Promise<void>((resolve, reject) => {
          const cleanup = () => {
            video.removeEventListener('loadeddata', ready);
            video.removeEventListener('error', failed);
            controller.signal.removeEventListener('abort', failed);
          };
          const ready = () => { cleanup(); resolve(); };
          const failed = () => { cleanup(); reject(new Error('Film decoding unavailable')); };
          video.addEventListener('loadeddata', ready, {once: true});
          video.addEventListener('error', failed, {once: true});
          controller.signal.addEventListener('abort', failed, {once: true});
          video.src = url;
          video.preload = 'auto';
          video.load();
        });
        video.dataset.mediaState = 'ready';
      } catch {
        if (signal.aborted) return;
        video.dataset.mediaState = 'fallback';
        video.removeAttribute('src');
        video.load();
      }
    });
  });
  let settled = 0;
  await Promise.allSettled(tasks.map(async task => {
    try { await task(); }
    finally { if (!signal.aborted) progress(++settled / tasks.length); }
  }));
  clearTimeout(deadline);
  signal.removeEventListener('abort', abort);
  if (signal.aborted) dispose();
  return dispose;
}
