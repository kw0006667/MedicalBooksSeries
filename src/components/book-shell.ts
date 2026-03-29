import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { appStore } from '../store.js';
import { getVolume, getFirstChapterId } from '../books.js';
import { navigateTo } from '../router.js';
import './sidebar-nav.js';
import './drawer-nav.js';
import './chapter-content.js';
import './sections-panel.js';
import './theme-toggle.js';

@customElement('book-shell')
export class BookShell extends LitElement {
  private _store = new StoreController(this);

  override createRenderRoot() { return this; }

  override updated() {
    // Auto-navigate to first chapter if none selected
    const { volumeId, chapterId } = this._store.state;
    if (volumeId && !chapterId) {
      const firstId = getFirstChapterId(volumeId);
      if (firstId) navigateTo(volumeId, firstId, null, true);
    }
  }

  private _openDrawer() {
    appStore.setState({ mobilePanelState: 'drawer' });
  }

  private _openSections() {
    appStore.setState({ mobilePanelState: 'sections' });
  }

  private _closeOverlay() {
    appStore.setState({ mobilePanelState: 'closed' });
  }

  private _toggleSidebar() {
    const { sidebarCollapsed } = this._store.state;
    appStore.setState({ sidebarCollapsed: !sidebarCollapsed });
  }

  private _toggleSections() {
    const { sectionsCollapsed } = this._store.state;
    appStore.setState({ sectionsCollapsed: !sectionsCollapsed });
  }

  override render() {
    const { volumeId, chapterId, sidebarCollapsed, sectionsCollapsed, mobilePanelState, currentSections } = this._store.state;
    const vol = volumeId ? getVolume(volumeId) : null;
    const volColor = vol?.color ?? '#3b82f6';

    const isMobileOverlay = mobilePanelState !== 'closed';
    const isMobileSections = mobilePanelState === 'sections';

    const shellClasses = [
      'book-shell',
      sidebarCollapsed ? 'sidebar-collapsed' : '',
      sectionsCollapsed ? 'sections-collapsed' : 'sections-open',
    ].filter(Boolean).join(' ');

    return html`
      <div class="${shellClasses}" style="--volume-color:${volColor}">

        <!-- Left: Sidebar (desktop) -->
        <div class="book-shell__sidebar">
          <sidebar-nav></sidebar-nav>
        </div>

        <!-- Middle: Content -->
        <div class="book-shell__content">
          <!-- Mobile top bar -->
          <div class="topbar">
            <button class="topbar__menu-btn" @click=${this._openDrawer} title="開啟目錄">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <span class="topbar__title">${vol?.title ?? ''}</span>
            <div class="topbar__right">
              ${currentSections.length ? html`
                <button class="topbar__menu-btn" @click=${this._openSections} title="本章目錄" style="color:${volColor}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="12" y2="6"/><line x1="3" y1="12" x2="20" y2="12"/><line x1="3" y1="18" x2="16" y2="18"/></svg>
                </button>
              ` : html``}
              <theme-toggle></theme-toggle>
            </div>
          </div>

          <!-- Desktop sidebar toggle -->
          <div style="position:absolute;top:12px;left:${sidebarCollapsed ? '8px' : 'calc(var(--sidebar-width) + 8px)'};z-index:50;transition:left 200ms ease" class="desktop-toggle-btn" @media-hide-on-mobile>
          </div>

          <!-- Scrollable content area -->
          <div id="content-area">
            <chapter-content></chapter-content>
          </div>
        </div>

        <!-- Right: Sections panel (desktop) -->
        <div class="book-shell__sections">
          <sections-panel></sections-panel>
        </div>
      </div>

      <!-- Mobile overlay -->
      <div class="mobile-overlay ${isMobileOverlay ? 'visible' : ''}" @click=${this._closeOverlay}></div>

      <!-- Mobile drawer nav -->
      <drawer-nav></drawer-nav>

      <!-- Mobile sections sheet -->
      <div class="mobile-sections-sheet ${isMobileSections ? 'open' : ''}">
        <sections-panel></sections-panel>
      </div>
    `;
  }
}
