import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { getPrevNextChapter } from '../books.js';
import { navigateTo } from '../router.js';

@customElement('nav-footer')
export class NavFooter extends LitElement {
  private _store = new StoreController(this);

  override createRenderRoot() { return this; }

  private _go(chapterId: string) {
    const { volumeId } = this._store.state;
    if (!volumeId) return;
    navigateTo(volumeId, chapterId, null);
    document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  override render() {
    const { volumeId, chapterId } = this._store.state;
    if (!volumeId || !chapterId) return html``;
    const { prev, next } = getPrevNextChapter(volumeId, chapterId);

    return html`
      <nav class="nav-footer">
        ${prev ? html`
          <button class="nav-footer__btn" @click=${() => this._go(prev.id)}>
            <span class="nav-footer__label">← 上一章</span>
            <span class="nav-footer__title">${prev.title}</span>
          </button>
        ` : html`<span></span>`}
        ${next ? html`
          <button class="nav-footer__btn nav-footer__btn--next" @click=${() => this._go(next.id)}>
            <span class="nav-footer__label">下一章 →</span>
            <span class="nav-footer__title">${next.title}</span>
          </button>
        ` : html``}
      </nav>
    `;
  }
}
