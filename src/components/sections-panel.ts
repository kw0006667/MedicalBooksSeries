import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { appStore } from '../store.js';
import { scrollToSection, suppressScrollSync } from '../router.js';
import type { Section } from '../types.js';

@customElement('sections-panel')
export class SectionsPanel extends LitElement {
  private _store = new StoreController(this);

  override createRenderRoot() { return this; }

  private _clickSection(slug: string) {
    suppressScrollSync();
    appStore.setState({ sectionSlug: slug });
    setTimeout(() => scrollToSection(slug), 50);
  }

  private _close() {
    appStore.setState({ sectionsCollapsed: true, mobilePanelState: 'closed' });
  }

  override render() {
    const { currentSections, sectionSlug } = this._store.state;
    if (!currentSections.length) return html``;

    return html`
      <div class="sections-panel">
        <div class="sections-panel__header">
          <span class="sections-panel__title">本章目錄</span>
          <button class="sections-panel__close-btn" @click=${this._close} title="關閉">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <nav class="sections-panel__list">
          ${currentSections.map((sec: Section) => html`
            <button
              class="sections-panel__item ${sec.slug === sectionSlug ? 'active' : ''}"
              @click=${() => this._clickSection(sec.slug)}
            >${sec.title}</button>
          `)}
        </nav>
      </div>
    `;
  }
}
