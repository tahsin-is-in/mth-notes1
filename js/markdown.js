/**
 * markdown.js
 * Renders lecture note Markdown into HTML, on top of the `marked` library
 * (loaded from a CDN in lecture.html). Adds one feature marked doesn't have:
 * callout boxes, written like this in a .md file —
 *
 *   :::definition Complete Metric Space
 *   A metric space is complete if every Cauchy sequence converges.
 *   :::
 *
 * Supported types: definition, theorem, example, important.
 * Anything else works exactly like normal GitHub-flavoured Markdown,
 * including LaTeX, which is left untouched here and rendered afterwards
 * by MathJax.
 */

const CALLOUT_ICONS = {
  definition: '\u25a4',
  theorem: '\u2605',
  example: '\u270e',
  important: '\u2726',
  eli5: '\ud83d\udca1',
  formal: '\ud83d\udcd0',
  proof: '\u220e',
  counterexample: '\u26a0',
  mistake: '\u2717',
  connection: '\ud83d\udd17',
  application: '\u2699',
  examready: '\ud83d\udcdd',
  viva: '\ud83c\udf99'
};

const CALLOUT_TITLES = {
  definition: 'Definition',
  theorem: 'Theorem',
  example: 'Example',
  important: 'Important',
  eli5: 'ELI5',
  formal: 'Formal Definition',
  proof: 'Proof',
  counterexample: 'Counterexample',
  mistake: 'Common Mistake',
  connection: 'Connection',
  application: 'Application',
  examready: 'Exam-Ready Answer',
  viva: 'Viva Question'
};

const CALLOUT_TYPE_LIST = Object.keys(CALLOUT_ICONS).join('|');

function extractCallouts(raw) {
  const blocks = [];
  const pattern = new RegExp(`:::(${CALLOUT_TYPE_LIST})([^\\n]*)\\n([\\s\\S]*?)\\n:::`, 'g');
  const withTokens = raw.replace(pattern, (match, type, titleLine, body) => {
    const token = `@@CALLOUT_${blocks.length}@@`;
    blocks.push({ type, title: titleLine.trim(), body });
    return `\n\n${token}\n\n`;
  });
  return { withTokens, blocks };
}

function renderCallout(block) {
  const label = CALLOUT_TITLES[block.type] + (block.title ? ` \u2014 ${block.title}` : '');
  const innerHtml = window.marked.parse(block.body);
  return (
    `<div class="callout callout-${block.type}">` +
      `<div class="callout-label">${CALLOUT_ICONS[block.type]} ${label}</div>` +
      `<div class="callout-body">${innerHtml}</div>` +
    `</div>`
  );
}

const MarkdownRenderer = {
  /**
   * Render raw markdown (already fetched as text) into safe-ish HTML.
   * Returns { html, headings } where headings is [{ level, text, id }]
   * for building a table of contents.
   */
  render(raw) {
    if (!window.marked) {
      return { html: `<p>${raw}</p>`, headings: [] };
    }

    window.marked.setOptions({ gfm: true, breaks: false });

    const { withTokens, blocks } = extractCallouts(raw);
    let html = window.marked.parse(withTokens);

    blocks.forEach((block, i) => {
      const token = `@@CALLOUT_${i}@@`;
      const rendered = renderCallout(block);
      // marked wraps a lone-line paragraph in <p>...</p>
      html = html.replace(`<p>${token}</p>`, rendered).replace(token, rendered);
    });

    // Post-process headings to add stable ids for the table of contents.
    const headings = [];
    const container = document.createElement('div');
    container.innerHTML = html;
    container.querySelectorAll('h2, h3').forEach((el, idx) => {
      const text = el.textContent.trim();
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60) || `section-${idx}`;
      let id = slug;
      let n = 1;
      while (headings.some(h => h.id === id)) {
        id = `${slug}-${n++}`;
      }
      el.id = id;
      headings.push({ level: el.tagName.toLowerCase(), text, id });
    });

    return { html: container.innerHTML, headings };
  }
};

window.MarkdownRenderer = MarkdownRenderer;
