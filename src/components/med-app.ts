import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import './portal-home.js';
import './book-shell.js';

// Global styles (injected into document head since no shadow DOM)
import '../styles/tokens.css';
import '../styles/reset.css';
import '../styles/layout.css';
import '../styles/nav.css';
import '../styles/content.css';

@customElement('med-app')
export class MedApp extends LitElement {
  private _store = new StoreController(this);

  override createRenderRoot() { return this; }

  override render() {
    const { volumeId } = this._store.state;

    if (volumeId) {
      return html`<book-shell></book-shell>`;
    }

    return html`<portal-home></portal-home>`;
  }
}
