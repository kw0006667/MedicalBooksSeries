import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { appStore } from '../store.js';
import { getVolume } from '../books.js';
import { navigateTo, navigateHome } from '../router.js';
import type { Chapter } from '../types.js';

@customElement('drawer-nav')
export class DrawerNav extends LitElement {
  private _store = new StoreController(this);

  override createRenderRoot() { return this; }

  private _clickChapter(ch: Chapter) {
    const { volumeId } = this._store.state;
    if (!volumeId) return;
    navigateTo(volumeId, ch.id, null);
    appStore.setState({ mobilePanelState: 'closed' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  private _close() {
    appStore.setState({ mobilePanelState: 'closed' });
  }

  override render() {
    const { volumeId, chapterId, mobilePanelState } = this._store.state;
    const isOpen = mobilePanelState === 'drawer';

    if (!volumeId) return html``;
    const vol = getVolume(volumeId);
    if (!vol) return html``;

    return html`
      <div class="mobile-drawer ${isOpen ? 'open' : ''}">
        <div class="sidebar-header">
          <button class="sidebar-header__home-btn" @click=${() => { navigateHome(); this._close(); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            書系目錄
          </button>
          <button style="padding:6px;border-radius:6px;color:var(--color-text-subtle)" @click=${this._close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <nav class="sidebar-nav">
          ${vol.parts.map(part => html`
            <div class="sidebar-nav__part">
              <div class="sidebar-nav__part-header" style="cursor:default">
                <span>Part ${part.id}．${part.title}</span>
              </div>
              <div class="sidebar-nav__chapters">
                ${part.chapterIds.map(id => {
                  const ch = vol.chapters.find(c => c.id === id);
                  if (!ch) return html``;
                  const chNum = vol.chapters.indexOf(ch) + 1;
                  return html`
                    <button
                      class="sidebar-nav__chapter-btn ${ch.id === chapterId ? 'active' : ''}"
                      @click=${() => this._clickChapter(ch)}
                    >
                      <span class="sidebar-nav__chapter-num">${String(chNum).padStart(2,'0')}.</span>
                      ${ch.title}
                    </button>
                  `;
                })}
              </div>
            </div>
          `)}
        </nav>
      </div>
    `;
  }
}
