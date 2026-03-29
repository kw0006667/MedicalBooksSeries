import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { appStore } from '../store.js';
import { getVolume } from '../books.js';
import { navigateTo, navigateHome, scrollToSection, suppressScrollSync } from '../router.js';
import type { Part, Chapter } from '../types.js';
import './theme-toggle.js';

@customElement('sidebar-nav')
export class SidebarNav extends LitElement {
  private _store = new StoreController(this);

  @state() private _openParts = new Set<number>();

  override createRenderRoot() { return this; }

  override updated() {
    const { volumeId, chapterId } = this._store.state;
    if (!volumeId || !chapterId) return;
    const vol = getVolume(volumeId);
    if (!vol) return;
    const ch = vol.chapters.find(c => c.id === chapterId);
    if (ch && !this._openParts.has(ch.part)) {
      this._openParts = new Set([...this._openParts, ch.part]);
    }

    requestAnimationFrame(() => {
      const active = this.querySelector('.sidebar-nav__section-btn.active, .sidebar-nav__chapter-btn.active');
      active?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  private _togglePart(partId: number) {
    const next = new Set(this._openParts);
    if (next.has(partId)) next.delete(partId);
    else next.add(partId);
    this._openParts = next;
  }

  private _clickChapter(ch: Chapter) {
    const { volumeId } = this._store.state;
    if (!volumeId) return;
    navigateTo(volumeId, ch.id, null);
    appStore.setState({ mobilePanelState: 'closed' });
  }

  private _clickSection(ch: Chapter, slug: string) {
    const { volumeId } = this._store.state;
    if (!volumeId) return;
    suppressScrollSync();
    navigateTo(volumeId, ch.id, slug);
    appStore.setState({ mobilePanelState: 'closed' });
    setTimeout(() => scrollToSection(slug), 50);
  }

  private _getChapterIndex(chapters: Chapter[], chapterId: string): number {
    return chapters.findIndex(c => c.id === chapterId) + 1;
  }

  override render() {
    const { volumeId, chapterId, sectionSlug } = this._store.state;
    if (!volumeId) return html``;
    const vol = getVolume(volumeId);
    if (!vol) return html``;

    return html`
      <div class="sidebar-header">
        <button class="sidebar-header__home-btn" @click=${navigateHome}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          書系目錄
        </button>
        <span class="sidebar-header__vol-badge" style="--color-accent: ${vol.color}">${vol.shortTitle}</span>
      </div>

      <nav class="sidebar-nav">
        ${vol.parts.map((part: Part) => {
          const isOpen = this._openParts.has(part.id);
          const partChapters = part.chapterIds.map(id => vol.chapters.find(c => c.id === id)!).filter(Boolean);
          return html`
            <div class="sidebar-nav__part">
              <button class="sidebar-nav__part-header" @click=${() => this._togglePart(part.id)}>
                <span>Part ${part.id}．${part.title}</span>
                <svg class="sidebar-nav__part-chevron ${isOpen ? 'open' : ''}" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              ${isOpen ? html`
                <div class="sidebar-nav__chapters">
                  ${partChapters.map((ch: Chapter) => {
                    const isActive = ch.id === chapterId;
                    const chNum = this._getChapterIndex(vol.chapters, ch.id);
                    return html`
                      <div class="sidebar-nav__chapter">
                        <button
                          class="sidebar-nav__chapter-btn ${isActive ? 'active' : ''}"
                          @click=${() => this._clickChapter(ch)}
                        >
                          <span class="sidebar-nav__chapter-num">${String(chNum).padStart(2, '0')}.</span>
                          ${ch.title}
                        </button>
                        ${isActive && ch.sections.length ? html`
                          <div class="sidebar-nav__sections">
                            ${ch.sections.map(sec => html`
                              <button
                                class="sidebar-nav__section-btn ${sec.slug === sectionSlug ? 'active' : ''}"
                                @click=${(e: Event) => { e.stopPropagation(); this._clickSection(ch, sec.slug); }}
                              >${sec.title}</button>
                            `)}
                          </div>
                        ` : html``}
                      </div>
                    `;
                  })}
                </div>
              ` : html``}
            </div>
          `;
        })}
      </nav>

      <div class="sidebar-footer">
        <span style="font-size:0.75rem;color:var(--color-text-muted);">臨床醫藥整合學</span>
        <theme-toggle></theme-toggle>
      </div>
    `;
  }
}
