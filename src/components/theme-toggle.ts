import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { appStore } from '../store.js';

@customElement('theme-toggle')
export class ThemeToggle extends LitElement {
  private _store = new StoreController(this);

  override createRenderRoot() { return this; }

  private _toggle() {
    const next = this._store.state.theme === 'light' ? 'dark' : 'light';
    appStore.setState({ theme: next });
  }

  override render() {
    const isDark = this._store.state.theme === 'dark';
    return html`
      <button class="theme-toggle" @click=${this._toggle} title=${isDark ? '切換亮色模式' : '切換暗色模式'} aria-label="切換主題">
        ${isDark
          ? html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
          : html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
        }
      </button>
    `;
  }
}
