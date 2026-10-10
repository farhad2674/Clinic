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

// The brand intro waits for the opening's still imagery and typography only.
// Scroll films keep their independent, deferred loading behavior above.
export async function waitForOpeningContent(document: Document, signal: AbortSignal): Promise<'ready'|'fallback'|'timeout'> {
  if (signal.aborted) return 'fallback';
  const main = document.querySelector<HTMLElement>('#main');
  if (!main) return 'fallback';
  const sections = Array.from(main.querySelectorAll<HTMLElement>(':scope > section')).slice(0, 2);
  const innerOpening = Array.from(main.querySelectorAll<HTMLElement>('.inner-body > :not(nav)')).slice(0, 2);
  const opening = main.classList.contains('home') && sections.length
    ? sections
    : innerOpening.length ? innerOpening : [main];
  const images = opening.flatMap(section => Array.from(section.querySelectorAll<HTMLImageElement>('img')));
  const knownSources = new Set(images.map(image => image.currentSrc || image.src));
  for (const section of opening) {
    for (const video of section.querySelectorAll<HTMLVideoElement>('video[poster]')) {
      if (!video.poster || knownSources.has(video.poster)) continue;
      const poster = new Image();
      poster.src = video.poster;
      images.push(poster);
      knownSources.add(video.poster);
    }
  }

  const pending = new AbortController();
  const cancel = () => pending.abort();
  signal.addEventListener('abort', cancel, {once: true});
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const waitImage = (image: HTMLImageElement) => new Promise<boolean>(resolve => {
    let settled = false;
    const finish = (ready: boolean) => {
      if (settled) return;
      settled = true;
      image.removeEventListener('load', loaded);
      image.removeEventListener('error', failed);
      pending.signal.removeEventListener('abort', failed);
      resolve(ready);
    };
    const failed = () => finish(false);
    const loaded = () => {
      if (!image.naturalWidth) return failed();
      if (typeof image.decode !== 'function') return finish(true);
      void image.decode().then(() => finish(true), failed);
    };
    image.addEventListener('load', loaded, {once: true});
    image.addEventListener('error', failed, {once: true});
    pending.signal.addEventListener('abort', failed, {once: true});
    // The second scene is below the fold: it must not wait for a scroll event.
    image.loading = 'eager';
    if (image.complete) loaded();
  });

  try {
    const fonts = document.fonts
      ? Promise.all([document.fonts.load('400 16px Vazirmatn'), document.fonts.load('400 36px Estedad')]).then(() => true, () => false)
      : Promise.resolve(true);
    const ready = Promise.all([...images.map(waitImage), fonts])
      .then(results => results.every(Boolean) ? 'ready' as const : 'fallback' as const);
    return await Promise.race([
      ready,
      new Promise<'timeout'>(resolve => { timeout = setTimeout(() => resolve('timeout'), 5000); }),
    ]);
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
    pending.abort();
    signal.removeEventListener('abort', cancel);
  }
}
