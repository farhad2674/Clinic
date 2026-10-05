// Load scroll films only when their scenes approach the viewport. The hero remains visible
// while the complete files download; local blob URLs preserve reliable reverse seeking.
export function prepareOpening(root: HTMLElement, signal: AbortSignal) {
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>('[data-scrub-video]'));
  const urls: string[] = [];
  const staticMedia = matchMedia('(prefers-reduced-motion: reduce)').matches
    || (navigator as Navigator & {connection?: {saveData?: boolean}}).connection?.saveData;
  if (staticMedia) {
    videos.forEach(video => { video.dataset.mediaState = 'static'; });
    return () => {};
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const video = entry.target as HTMLVideoElement;
      observer.unobserve(video);
      void loadFilm(video);
    });
  }, {rootMargin: '75% 0px'});

  async function loadFilm(video: HTMLVideoElement) {
    video.dataset.mediaState = 'loading';
    try {
      const response = await fetch(video.dataset.src!, {signal});
      if (!response.ok) throw new Error('Film unavailable');
      const blob = await response.blob();
      if (signal.aborted) return;
      const url = URL.createObjectURL(blob);
      urls.push(url);
      await new Promise<void>((resolve, reject) => {
        const cleanup = () => {
          video.removeEventListener('loadeddata', ready);
          video.removeEventListener('error', failed);
          signal.removeEventListener('abort', failed);
        };
        const ready = () => { cleanup(); resolve(); };
        const failed = () => { cleanup(); reject(new Error('Film decoding unavailable')); };
        video.addEventListener('loadeddata', ready, {once: true});
        video.addEventListener('error', failed, {once: true});
        signal.addEventListener('abort', failed, {once: true});
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
  }

  let idle: number | undefined;
  const begin = () => {
    if (signal.aborted) return;
    const observe = () => videos.forEach(video => observer.observe(video));
    idle = window.setTimeout(observe, 500);
  };
  if (document.readyState === 'complete') begin();
  else window.addEventListener('load', begin, {once: true});

  return () => {
    window.removeEventListener('load', begin);
    if (idle !== undefined) clearTimeout(idle);
    observer.disconnect();
    videos.forEach(video => {
      video.pause();
      if (!urls.includes(video.getAttribute('src') || '')) return;
      video.removeAttribute('src');
      video.load();
    });
    urls.forEach(url => URL.revokeObjectURL(url));
  };
}
