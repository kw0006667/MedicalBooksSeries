import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { StoreController } from '../store.js';
import { appStore } from '../store.js';
import { getVolume, getChapter } from '../books.js';
import { setupScrollSync, scrollToSection } from '../router.js';
import type { ChapterContent, Section } from '../types.js';
import './nav-footer.js';
import './medical-canvas.js';
import './medical-3d-viewer.js';

// ── Vite glob imports (statically analyzable → proper code splitting) ──────

type ChapterLoader = () => Promise<{ default: ChapterContent }>;

const _vol1 = import.meta.glob<{ default: ChapterContent }>('../content/volume-1/ch*.ts');
const _vol2 = import.meta.glob<{ default: ChapterContent }>('../content/volume-2/ch*.ts');
const _vol3 = import.meta.glob<{ default: ChapterContent }>('../content/volume-3/ch*.ts');
const _vol4 = import.meta.glob<{ default: ChapterContent }>('../content/volume-4/ch*.ts');
const _vol5 = import.meta.glob<{ default: ChapterContent }>('../content/volume-5/ch*.ts');
const _vol6 = import.meta.glob<{ default: ChapterContent }>('../content/volume-6/ch*.ts');
const _companion = import.meta.glob<{ default: ChapterContent }>('../content/companion/ch*.ts');

function buildLoaderMap(glob: Record<string, ChapterLoader>, volumeId: string): Record<string, ChapterLoader> {
  const result: Record<string, ChapterLoader> = {};
  for (const [path, loader] of Object.entries(glob)) {
    const match = path.match(/\/(ch\d+)\.ts$/);
    if (match) result[`${volumeId}/${match[1]}`] = loader;
  }
  return result;
}

const CHAPTER_LOADERS: Record<string, ChapterLoader> = {
  ...buildLoaderMap(_vol1, 'volume-1'),
  ...buildLoaderMap(_vol2, 'volume-2'),
  ...buildLoaderMap(_vol3, 'volume-3'),
  ...buildLoaderMap(_vol4, 'volume-4'),
  ...buildLoaderMap(_vol5, 'volume-5'),
  ...buildLoaderMap(_vol6, 'volume-6'),
  ...buildLoaderMap(_companion, 'companion'),
};

// ── Component ──────────────────────────────────────────────────────────────

@customElement('chapter-content')
export class ChapterContentEl extends LitElement {
  private _store = new StoreController(this);

  @state() private _loading = false;
  @state() private _html = '';
  @state() private _chapterTitle = '';
  @state() private _partTitle = '';

  private _loadedKey = '';
  private _cleanupScrollSync: (() => void) | null = null;

  override createRenderRoot() { return this; }

  override updated() {
    const { volumeId, chapterId, sectionSlug } = this._store.state;
    if (!volumeId || !chapterId) return;

    const key = `${volumeId}/${chapterId}`;
    if (key !== this._loadedKey) {
      this._loadedKey = key;
      this._loadChapter(volumeId, chapterId).then(() => {
        if (sectionSlug) {
          setTimeout(() => scrollToSection(sectionSlug, 'instant'), 80);
        }
      });
    }
  }

  private async _loadChapter(volumeId: string, chapterId: string) {
    this._loading = true;
    this._cleanupScrollSync?.();
    this._cleanupScrollSync = null;

    try {
      const vol = getVolume(volumeId);
      const chMeta = getChapter(volumeId, chapterId);

      if (!vol || !chMeta) {
        this._html = '<p>章節未找到。</p>';
        this._loading = false;
        return;
      }

      this._chapterTitle = chMeta.title;
      const part = vol.parts.find(p => p.id === chMeta.part);
      this._partTitle = part ? `Part ${part.id}．${part.title}` : '';

      const key = `${volumeId}/${chapterId}`;
      const loader = CHAPTER_LOADERS[key];
      const mod = loader ? await loader() : null;
      this._html = mod?.default?.content ?? this._buildPlaceholder(chMeta.sections.map(s => ({ slug: s.slug, title: s.title })));

      // Update sections in store
      appStore.setState({ currentSections: chMeta.sections as Section[] });

      this._loading = false;
      await this.updateComplete;
      this._enhanceContent();

      // Setup scroll sync
      const slugs = chMeta.sections.map(s => s.slug);
      this._cleanupScrollSync = setupScrollSync(volumeId, chapterId, slugs);

      document.title = `${chMeta.title} — 臨床醫藥整合學`;
    } catch (err) {
      console.error('Failed to load chapter:', err);
      this._html = '<p>載入章節時發生錯誤，請重試。</p>';
      this._loading = false;
    }
  }

  private _buildPlaceholder(sections: { slug: string; title: string }[]): string {
    return sections.map(sec => `
      <section id="${sec.slug}">
        <h2>${sec.title}</h2>
        <div class="content-pending">
          <div class="content-pending__icon">📝</div>
          <div class="content-pending__title">內容撰寫中</div>
          <div class="content-pending__desc">本節內容正在編寫，即將推出。</div>
        </div>
      </section>
    `).join('\n');
  }

  private _enhanceContent() {
    const tables = this.querySelectorAll('.chapter-body table');
    tables.forEach(table => {
      if (table.parentElement?.classList.contains('table-wrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupScrollSync?.();
    this._cleanupScrollSync = null;
  }

  override render() {
    const { volumeId } = this._store.state;
    const vol = volumeId ? getVolume(volumeId) : null;
    const volColor = vol?.color ?? '#3b82f6';

    if (this._loading) {
      return html`
        <div class="chapter-wrapper">
          <div class="chapter-header">
            <div class="skeleton" style="width:120px;height:14px;margin-bottom:14px"></div>
            <div class="skeleton" style="width:70%;height:32px;margin-bottom:12px"></div>
          </div>
          <div class="skeleton" style="width:100%;height:16px;margin-bottom:10px"></div>
          <div class="skeleton" style="width:80%;height:16px;margin-bottom:10px"></div>
          <div class="skeleton" style="width:90%;height:16px"></div>
        </div>
      `;
    }

    return html`
      <div class="chapter-wrapper" style="--volume-color:${volColor}">
        <div class="chapter-header">
          <div class="chapter-breadcrumb">${this._partTitle}</div>
          <h1 class="chapter-title">${this._chapterTitle}</h1>
        </div>
        <div class="chapter-body" .innerHTML=${this._html}></div>
        <nav-footer></nav-footer>
      </div>
    `;
  }
}
