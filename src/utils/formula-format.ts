const ELEMENT_NAMES: Record<string, string> = {
  H: '氫',
  He: '氦',
  Li: '鋰',
  Be: '鈹',
  B: '硼',
  C: '碳',
  N: '氮',
  O: '氧',
  F: '氟',
  Ne: '氖',
  Na: '鈉',
  Mg: '鎂',
  Al: '鋁',
  Si: '矽',
  P: '磷',
  S: '硫',
  Cl: '氯',
  Ar: '氬',
  K: '鉀',
  Ca: '鈣',
  Sc: '鈧',
  Ti: '鈦',
  V: '釩',
  Cr: '鉻',
  Mn: '錳',
  Fe: '鐵',
  Co: '鈷',
  Ni: '鎳',
  Cu: '銅',
  Zn: '鋅',
  Ga: '鎵',
  Ge: '鍺',
  As: '砷',
  Se: '硒',
  Br: '溴',
  Kr: '氪',
  Rb: '銣',
  Sr: '鍶',
  Y: '釔',
  Zr: '鋯',
  Nb: '鈮',
  Mo: '鉬',
  Tc: '鎝',
  Ru: '釕',
  Rh: '銠',
  Pd: '鈀',
  Ag: '銀',
  Cd: '鎘',
  In: '銦',
  Sn: '錫',
  Sb: '銻',
  Te: '碲',
  I: '碘',
  Xe: '氙',
  Cs: '銫',
  Ba: '鋇',
  La: '鑭',
  Ce: '鈰',
  Pr: '鐠',
  Nd: '釹',
  Sm: '釤',
  Eu: '銪',
  Gd: '釓',
  Tb: '鋱',
  Dy: '鏑',
  Ho: '鈥',
  Er: '鉺',
  Tm: '銩',
  Yb: '鐿',
  Lu: '鑥',
  Hf: '鉿',
  Ta: '鉭',
  W: '鎢',
  Re: '錸',
  Os: '鋨',
  Ir: '銥',
  Pt: '鉑',
  Au: '金',
  Hg: '汞',
  Tl: '鉈',
  Pb: '鉛',
  Bi: '鉍',
};

const VALID_ELEMENTS = new Set(Object.keys(ELEMENT_NAMES));
const GREEK_REPLACEMENTS: Record<string, string> = {
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  pi: 'π',
};

type ChemicalElement = { symbol: string; count: number };
type ChemicalParse = {
  tokenHtml: string;
  breakdownHtml: string;
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const humanizeCharge = (magnitude: string | null, sign: string) => {
  const amount = magnitude && magnitude !== '1' ? magnitude : '1';
  return `${sign === '+' ? '正' : '負'}電荷 ${amount}`;
};

function parseChemicalFormula(raw: string): ChemicalParse | null {
  const compact = raw.replace(/\s+/g, '');
  if (!compact || /[=/:;]/.test(compact) || !/[A-Z]/.test(compact)) return null;
  if (/[^A-Za-z0-9()+\-·.]/.test(compact)) return null;

  let index = 0;
  let html = '';
  let sawElement = false;
  let hasStructuralHint = false;
  const elements: ChemicalElement[] = [];

  const pushElement = (symbol: string, count: number) => {
    const existing = elements.find(item => item.symbol === symbol);
    if (existing) existing.count += count;
    else elements.push({ symbol, count });
  };

  while (index < compact.length) {
    const char = compact[index];

    if (char === '(' || char === '[') {
      html += `<span class="formula-paren">${escapeHtml(char)}</span>`;
      index += 1;
      continue;
    }

    if (char === ')' || char === ']') {
      index += 1;
      let multiplier = '';
      while (index < compact.length && /\d/.test(compact[index])) {
        multiplier += compact[index];
        index += 1;
      }
      html += `<span class="formula-paren">${escapeHtml(char)}${multiplier ? `<sub>${multiplier}</sub>` : ''}</span>`;
      hasStructuralHint = hasStructuralHint || Boolean(multiplier);
      continue;
    }

    if (char === '·' || char === '.') {
      html += '<span class="formula-dot">·</span>';
      hasStructuralHint = true;
      index += 1;
      continue;
    }

    if (/\d/.test(char)) {
      let coefficient = '';
      while (index < compact.length && /\d/.test(compact[index])) {
        coefficient += compact[index];
        index += 1;
      }

      if (index < compact.length && /[+-]/.test(compact[index])) {
        const sign = compact[index];
        html += `<sup>${coefficient}${sign}</sup>`;
        hasStructuralHint = true;
        index += 1;
        continue;
      }

      html += `<span class="formula-coefficient">${coefficient}</span>`;
      hasStructuralHint = true;
      continue;
    }

    if (/[+-]/.test(char)) {
      html += `<sup>${char}</sup>`;
      hasStructuralHint = true;
      index += 1;
      continue;
    }

    if (/[A-Z]/.test(char)) {
      let symbol = char;
      if (index + 1 < compact.length && /[a-z]/.test(compact[index + 1])) {
        symbol += compact[index + 1];
        index += 1;
      }

      if (!VALID_ELEMENTS.has(symbol)) return null;

      index += 1;
      let countText = '';
      while (index < compact.length && /\d/.test(compact[index])) {
        countText += compact[index];
        index += 1;
      }

      const count = countText ? Number(countText) : 1;
      pushElement(symbol, count);
      sawElement = true;
      hasStructuralHint = hasStructuralHint || Boolean(countText);
      html += `<span class="formula-token"><span class="formula-element">${symbol}</span>${countText ? `<sub>${countText}</sub>` : ''}</span>`;
      continue;
    }

    return null;
  }

  if (!sawElement || (!hasStructuralHint && elements.length < 2)) return null;

  const breakdownParts = elements.map(element => {
    const label = ELEMENT_NAMES[element.symbol] ?? element.symbol;
    return `
      <span class="formula-chip">
        <span class="formula-chip__name">${label}</span>
        <span class="formula-chip__symbol">${element.symbol}</span>
        <span class="formula-chip__count">× ${element.count}</span>
      </span>
    `;
  });

  const chargeMatch = compact.match(/(\d+)?([+-])$/);
  if (chargeMatch) {
    breakdownParts.push(`
      <span class="formula-chip formula-chip--charge">
        <span class="formula-chip__name">總電荷</span>
        <span class="formula-chip__symbol">${chargeMatch[2] === '+' ? '+' : '-'}</span>
        <span class="formula-chip__count">${humanizeCharge(chargeMatch[1] ?? null, chargeMatch[2])}</span>
      </span>
    `);
  }

  return {
    tokenHtml: html,
    breakdownHtml: `
      <div class="formula-breakdown" aria-label="元素拆解">
        ${breakdownParts.join('')}
      </div>
    `,
  };
}

function formatSpecialToken(token: string) {
  let value = token;

  for (const [key, glyph] of Object.entries(GREEK_REPLACEMENTS)) {
    value = value.replace(new RegExp(key, 'gi'), glyph);
  }

  if (/^[A-Za-z]+(\d+\/\d+)$/.test(value)) {
    return value.replace(/^([A-Za-z]+)(\d+\/\d+)$/, (_, prefix: string, suffix: string) => `${escapeHtml(prefix)}<sub>${escapeHtml(suffix)}</sub>`);
  }

  if (/^m\d+$/.test(value)) {
    return value.replace(/^m(\d+)$/, (_, exponent: string) => `m<sup>${escapeHtml(exponent)}</sup>`);
  }

  if (/^(EC|ED|TD|LD|IC|Kd|KD|pKa|pCO|pO)(\d+)$/i.test(value)) {
    return value.replace(/^([A-Za-z]+)(\d+)$/, (_, prefix: string, suffix: string) => `${escapeHtml(prefix)}<sub>${escapeHtml(suffix)}</sub>`);
  }

  if (/^[A-Za-z][A-Za-z+-]*\d+$/.test(value) && !/[a-z]{2,}/.test(value)) {
    return value.replace(/^([A-Za-z+-]+)(\d+)$/, (_, prefix: string, suffix: string) => `${escapeHtml(prefix)}<sub>${escapeHtml(suffix)}</sub>`);
  }

  return escapeHtml(value);
}

function formatExpressionWord(word: string) {
  const prefixMatch = word.match(/^[([{]*/)?.[0] ?? '';
  const suffixMatch = word.match(/[)\]}.,;:]*$/)?.[0] ?? '';
  const core = word.slice(prefixMatch.length, word.length - suffixMatch.length);

  if (!core) return escapeHtml(word);

  const chemical = parseChemicalFormula(core);
  const renderedCore = chemical?.tokenHtml ?? formatSpecialToken(core);

  return `${escapeHtml(prefixMatch)}${renderedCore}${escapeHtml(suffixMatch)}`;
}

function formatScientificExpression(raw: string) {
  const normalized = raw
    .replace(/<->/g, '↔')
    .replace(/-->/g, '→')
    .replace(/->/g, '→')
    .replace(/<=/g, '≤')
    .replace(/>=/g, '≥')
    .replace(/~=/g, '≈')
    .replace(/!=/g, '≠')
    .replace(/\s[xX]\s/g, ' × ');

  const pieces = normalized.split(/(\s+)/);
  const html = pieces.map((piece: string) => {
    if (!piece || /^\s+$/.test(piece)) return piece;
    return formatExpressionWord(piece);
  }).join('');

  return `<div class="formula-expression" aria-label="${escapeHtml(raw)}">${html}</div>`;
}

function buildEnhancedFormula(raw: string) {
  const chemical = parseChemicalFormula(raw);
  if (chemical) {
    return {
      displayHtml: `<div class="formula-expression formula-expression--chemical" aria-label="${escapeHtml(raw)}">${chemical.tokenHtml}</div>`,
      breakdownHtml: chemical.breakdownHtml,
    };
  }
  return {
    displayHtml: formatScientificExpression(raw),
    breakdownHtml: '',
  };
}

export function enhanceFormulaBlocks(root: ParentNode) {
  const blocks = root.querySelectorAll<HTMLElement>('.formula-block');
  blocks.forEach(block => {
    if (block.dataset.formulaEnhanced === 'true') return;

    const code = block.querySelector('code');
    if (!code) return;

    const raw = code.textContent?.trim();
    if (!raw) return;

    const enhanced = buildEnhancedFormula(raw);
    const display = document.createElement('div');
    display.innerHTML = enhanced.displayHtml;

    const expression = display.firstElementChild;
    if (!expression) return;

    code.replaceWith(expression);

    if (enhanced.breakdownHtml) {
      const breakdownHost = document.createElement('div');
      breakdownHost.innerHTML = enhanced.breakdownHtml;
      const breakdown = breakdownHost.firstElementChild;
      if (breakdown) {
        expression.insertAdjacentElement('afterend', breakdown);
      }
    }

    block.dataset.formulaEnhanced = 'true';
  });
}
