import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { volumes } from '../books.js';
import { navigateTo } from '../router.js';
import type { Volume } from '../types.js';
import './theme-toggle.js';

@customElement('portal-home')
export class PortalHome extends LitElement {
  override createRenderRoot() { return this; }

  private _openBook(vol: Volume) {
    navigateTo(vol.id);
  }

  private _getChapterCount(vol: Volume): number {
    return vol.chapters.length;
  }

  private _getPartCount(vol: Volume): number {
    return vol.parts.length;
  }

  override render() {
    return html`
      <div class="portal-home">
        <!-- Header -->
        <header class="portal-home__header">
          <div style="display:flex;justify-content:flex-end;padding:0 0 20px;max-width:1200px;margin:0 auto;">
            <theme-toggle></theme-toggle>
          </div>
          <div class="portal-home__series-label">系列叢書</div>
          <h1 class="portal-home__title">臨床醫藥整合學</h1>
          <p class="portal-home__subtitle">從人體、疾病到治療決策</p>
        </header>

        <!-- Book Grid -->
        <main class="portal-home__grid">
          ${volumes.map((vol: Volume) => html`
            <div
              class="book-card"
              style="--book-color:${vol.color}"
              @click=${() => this._openBook(vol)}
              tabindex="0"
              role="button"
              @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._openBook(vol)}
            >
              <div class="book-card__stripe"></div>
              <div class="book-card__body">
                <span class="book-card__vol-badge">${vol.shortTitle}</span>
                <div class="book-card__title">${vol.title}</div>
                ${vol.subtitle ? html`<div class="book-card__subtitle">${vol.subtitle}</div>` : html``}
                <div class="book-card__description">${vol.description}</div>
              </div>
              <div class="book-card__footer">
                <span>${this._getPartCount(vol)} Parts · ${this._getChapterCount(vol)} 章</span>
                <span class="book-card__cta">開始閱讀 →</span>
              </div>
            </div>
          `)}
        </main>
      </div>
    `;
  }
}
