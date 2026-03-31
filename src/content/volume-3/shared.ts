import type { ChapterContent } from '../../types.js';

const join = (...parts: string[]) => parts.join('\n');

export const chapter = (title: string, ...sections: string[]): ChapterContent => ({
  title,
  content: sections.join('\n'),
});

export const section = (id: string, title: string, ...blocks: string[]) => `
  <section id="${id}">
    <h2>${title}</h2>
    ${join(...blocks)}
  </section>
`;

export const p = (text: string, className = '') => `<p${className ? ` class="${className}"` : ''}>${text}</p>`;
export const lead = (text: string) => p(text, 'lead');
export const h3 = (text: string) => `<h3>${text}</h3>`;
export const h4 = (text: string) => `<h4>${text}</h4>`;

export const list = (items: string[], ordered = false) => {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
};

export const callout = (
  variant: 'info' | 'warning' | 'danger' | 'success' | 'clinical',
  title: string,
  ...blocks: string[]
) => `
  <div class="callout callout--${variant}">
    <div class="callout__title">${title}</div>
    ${join(...blocks)}
  </div>
`;

export const cards = (items: { title: string; body: string }[], className = 'info-grid') => `
  <div class="${className}">
    ${items.map(item => `
      <div class="${
        className === 'comparison-grid'
          ? 'comparison-card'
          : className === 'checklist-grid'
            ? 'checklist-card'
            : 'info-card'
      }">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    `).join('')}
  </div>
`;

export const table = (headers: string[], rows: string[][]) => `
  <table>
    <thead>
      <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>
`;

export const formula = (title: string, expression: string, note: string) => `
  <div class="formula-block">
    <h3>${title}</h3>
    <code>${expression}</code>
    <p>${note}</p>
  </div>
`;

export const misconceptionList = (items: { myth: string; correction: string }[]) => `
  <div class="misconception-list">
    ${items.map(item => `
      <div class="misconception-item">
        <strong>${item.myth}</strong>
        <p>${item.correction}</p>
      </div>
    `).join('')}
  </div>
`;

export const takeawayList = (items: { title: string; body: string }[]) => `
  <div class="takeaway-list">
    ${items.map(item => `
      <div class="takeaway-item">
        <strong>${item.title}</strong>
        <p>${item.body}</p>
      </div>
    `).join('')}
  </div>
`;

export const tags = (items: string[]) => `
  <div class="tag-row">
    ${items.map(item => `<span class="tag">${item}</span>`).join('')}
  </div>
`;

export const diagram = (name: string) => `<medical-canvas diagram="${name}"></medical-canvas>`;
export const viewer = (initialScene: string) => `<medical-3d-viewer initial-scene="${initialScene}"></medical-3d-viewer>`;
export const pulmonaryViewer = (initialScene: string) => `<pulmonary-3d-viewer initial-scene="${initialScene}"></pulmonary-3d-viewer>`;
export const renalViewer = (initialScene: string) => `<renal-3d-viewer initial-scene="${initialScene}"></renal-3d-viewer>`;
export const digestiveViewer = (initialScene: string) => `<digestive-3d-viewer initial-scene="${initialScene}"></digestive-3d-viewer>`;
export const endocrineViewer = (initialScene: string) => `<endocrine-3d-viewer initial-scene="${initialScene}"></endocrine-3d-viewer>`;
export const hematologyViewer = (initialScene: string) => `<hematology-3d-viewer initial-scene="${initialScene}"></hematology-3d-viewer>`;

export const spotlight = (title: string, text: string) => `
  <div class="spotlight">
    <h3>${title}</h3>
    <p>${text}</p>
  </div>
`;

export const summary = (title: string, text: string, bullets: string[]) => `
  <div class="chapter-summary">
    <h3>${title}</h3>
    <p>${text}</p>
    ${list(bullets)}
  </div>
`;

export const references = (
  title: string,
  items: { label: string; url: string; note: string }[],
) => `
  <div class="source-list">
    <h3>${title}</h3>
    ${items.map(item => `
      <div class="source-item">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>
        <p>${item.note}</p>
      </div>
    `).join('')}
  </div>
`;
