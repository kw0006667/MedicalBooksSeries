import type { Route } from './types.js';
import { appStore } from './store.js';

// ── Hash parsing ────────────────────────────────────────────────────────────

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#/, '');
  if (!h || h === '/') return { type: 'home' };

  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 'book' && parts[1]) {
    return {
      type: 'book',
      volumeId: parts[1],
      chapterId: parts[2] || undefined,
      sectionSlug: parts[3] || undefined,
    };
  }
  return { type: 'home' };
}

export function buildHomeHash(): string {
  return '#/';
}

export function buildBookHash(volumeId: string, chapterId?: string, sectionSlug?: string): string {
  let hash = `#/book/${volumeId}`;
  if (chapterId) hash += `/${chapterId}`;
  if (sectionSlug) hash += `/${sectionSlug}`;
  return hash;
}

// ── Navigation ──────────────────────────────────────────────────────────────

export function navigateTo(
  volumeId: string,
  chapterId?: string | null,
  sectionSlug?: string | null,
  updateHash = true,
): void {
  if (updateHash) {
    location.hash = buildBookHash(volumeId, chapterId ?? undefined, sectionSlug ?? undefined);
  }
  appStore.setState({
    volumeId,
    chapterId: chapterId ?? null,
    sectionSlug: sectionSlug ?? null,
  });
}

export function navigateHome(): void {
  location.hash = buildHomeHash();
  appStore.setState({ volumeId: null, chapterId: null, sectionSlug: null });
}

// ── Scroll sync ─────────────────────────────────────────────────────────────

let _scrollSyncSuppressed = false;
let _suppressTimeout: ReturnType<typeof setTimeout> | null = null;

export function suppressScrollSync(ms = 300): void {
  _scrollSyncSuppressed = true;
  if (_suppressTimeout) clearTimeout(_suppressTimeout);
  _suppressTimeout = setTimeout(() => {
    _scrollSyncSuppressed = false;
  }, ms);
}

export function scrollToSection(slug: string, behavior: ScrollBehavior = 'smooth'): void {
  const el = document.getElementById(slug);
  if (!el) return;
  const contentArea = document.getElementById('content-area');
  if (contentArea) {
    const y = el.offsetTop - 24;
    contentArea.scrollTo({ top: y, behavior });
  } else {
    const topBarH = 52 + 16;
    const y = el.getBoundingClientRect().top + window.scrollY - topBarH;
    window.scrollTo({ top: y, behavior });
  }
}

export function setupScrollSync(
  volumeId: string,
  chapterId: string,
  sectionSlugs: string[],
): () => void {
  if (!sectionSlugs.length) return () => {};

  const contentArea = document.getElementById('content-area');
  const scroller: Window | HTMLElement | null = contentArea ?? window;
  if (!scroller) return () => {};

  let rafId = 0;

  const onScroll = () => {
    if (_scrollSyncSuppressed) return;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      let active: string | null = null;
      const topAnchor = contentArea
        ? contentArea.getBoundingClientRect().top + 96
        : 120;

      for (const slug of sectionSlugs) {
        const el = document.getElementById(slug);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= topAnchor) active = slug;
      }
      if (active && active !== appStore.state.sectionSlug) {
        appStore.setState({ sectionSlug: active });
        history.replaceState(null, '', buildBookHash(volumeId, chapterId, active));
      }
    });
  };

  scroller.addEventListener('scroll', onScroll as EventListener, { passive: true });
  return () => {
    cancelAnimationFrame(rafId);
    scroller.removeEventListener('scroll', onScroll as EventListener);
  };
}

// ── Init ────────────────────────────────────────────────────────────────────

export function initRouter(): void {
  const handleHashChange = () => {
    const route = parseHash(location.hash);
    if (route.type === 'home') {
      appStore.setState({ volumeId: null, chapterId: null, sectionSlug: null });
    } else if (route.volumeId) {
      appStore.setState({
        volumeId: route.volumeId,
        chapterId: route.chapterId ?? null,
        sectionSlug: route.sectionSlug ?? null,
      });
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}
