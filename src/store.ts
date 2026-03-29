import type { AppState, Section } from './types.js';
import type { ReactiveControllerHost } from 'lit';

const STORAGE_KEY_THEME = 'med-theme';
const STORAGE_KEY_SIDEBAR = 'med-sidebar-collapsed';
const STORAGE_KEY_SECTIONS = 'med-sections-collapsed';

function loadInitialState(): AppState {
  const stored = localStorage.getItem(STORAGE_KEY_THEME);
  const theme: 'light' | 'dark' = stored === 'dark' ? 'dark' : 'light';
  const sidebarCollapsed = localStorage.getItem(STORAGE_KEY_SIDEBAR) === 'true';
  const sectionsCollapsed = localStorage.getItem(STORAGE_KEY_SECTIONS) === 'true';
  return {
    theme,
    volumeId: null,
    chapterId: null,
    sectionSlug: null,
    currentSections: [],
    sidebarCollapsed,
    sectionsCollapsed,
    mobilePanelState: 'closed',
  };
}

class AppStore extends EventTarget {
  private _state: AppState = loadInitialState();

  get state(): AppState {
    return this._state;
  }

  setState(patch: Partial<AppState>): void {
    this._state = { ...this._state, ...patch };

    if (patch.theme !== undefined) {
      localStorage.setItem(STORAGE_KEY_THEME, patch.theme);
      document.documentElement.setAttribute('data-theme', patch.theme);
    }
    if (patch.sidebarCollapsed !== undefined) {
      localStorage.setItem(STORAGE_KEY_SIDEBAR, String(patch.sidebarCollapsed));
    }
    if (patch.sectionsCollapsed !== undefined) {
      localStorage.setItem(STORAGE_KEY_SECTIONS, String(patch.sectionsCollapsed));
    }

    this.dispatchEvent(new CustomEvent('change', { detail: this._state }));
  }
}

export const appStore = new AppStore();

// Apply initial theme on load
document.documentElement.setAttribute('data-theme', appStore.state.theme);

// ── Lit ReactiveController ──────────────────────────────────────────────────

export class StoreController {
  private _host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  get state(): AppState {
    return appStore.state;
  }

  hostConnected(): void {
    appStore.addEventListener('change', this._onChange);
  }

  hostDisconnected(): void {
    appStore.removeEventListener('change', this._onChange);
  }

  private _onChange = (): void => {
    this._host.requestUpdate();
  };
}

// Re-export Section type for convenience
export type { Section };
