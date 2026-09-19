/**
 * latex.js
 * Powers the "Show LaTeX" / "Copy LaTeX" buttons required across topic
 * pages, theorem/formula banks, and solved questions. Rather than trying
 * to reverse-engineer LaTeX out of MathJax's rendered output, this module
 * extracts the *original* TeX source directly from the raw Markdown/text
 * before MathJax ever touches it — so what you copy is guaranteed to be
 * real, usable LaTeX, not an approximation.
 */

const LatexTool = {
  /**
   * Pull every math snippet out of raw text. Returns
   * [{ tex, display }] in document order. `display` is true for \[...\]
   * or $$...$$ blocks, false for inline \(...\) or $...$.
   */
  extract(raw) {
    const snippets = [];
    const patterns = [
      { re: /\\\[([\s\S]*?)\\\]/g, display: true },
      { re: /\$\$([\s\S]*?)\$\$/g, display: true },
      { re: /\\\(([\s\S]*?)\\\)/g, display: false },
      { re: /(?<!\$)\$(?!\$)([^\n$]+?)\$(?!\$)/g, display: false }
    ];
    patterns.forEach(({ re, display }) => {
      let m;
      while ((m = re.exec(raw)) !== null) {
        const tex = m[1].trim();
        if (tex) snippets.push({ tex, display });
      }
    });
    return snippets;
  },

  /** Render a collapsible "Show LaTeX" block covering a whole page/section's worth of source. */
  panelHtml(rawSource, idPrefix) {
    const snippets = LatexTool.extract(rawSource);
    if (!snippets.length) return '';
    window.__latexStore = window.__latexStore || {};
    window.__latexStore[idPrefix] = snippets;

    const rows = snippets.map((s, i) => `
      <div class="latex-row">
        <code class="latex-code">${UI.escapeHtml(s.tex)}</code>
        <button class="btn btn-ghost btn-sm" data-copy-latex="${idPrefix}:${i}">\ud83d\udccb Copy</button>
      </div>`).join('');

    return `
      <details class="latex-panel">
        <summary class="latex-summary">\u2317 Show LaTeX (${snippets.length} formula${snippets.length === 1 ? '' : 's'})</summary>
        <div class="latex-panel-body">
          ${rows}
          <button class="btn btn-secondary btn-sm" data-copy-all-latex="${idPrefix}" style="margin-top:0.6rem;">\ud83d\udccb Copy all as .tex</button>
        </div>
      </details>`;
  },

  copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const tmp = document.createElement('textarea');
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(tmp);
    return Promise.resolve();
  },

  /** Call once per page. Uses event delegation, so it's safe to call multiple times. */
  wire() {
    if (LatexTool._wired) return;
    LatexTool._wired = true;
    document.addEventListener('click', e => {
      const single = e.target.closest('[data-copy-latex]');
      if (single) {
        const [prefix, idx] = single.getAttribute('data-copy-latex').split(':');
        const snippet = (window.__latexStore[prefix] || [])[+idx];
        if (snippet) {
          LatexTool.copyText(snippet.tex);
          UI.toast('LaTeX copied');
        }
        return;
      }
      const all = e.target.closest('[data-copy-all-latex]');
      if (all) {
        const prefix = all.getAttribute('data-copy-all-latex');
        const snippets = window.__latexStore[prefix] || [];
        const tex = snippets.map(s => (s.display ? `\\[\n${s.tex}\n\\]` : `\\(${s.tex}\\)`)).join('\n\n');
        LatexTool.copyText(tex);
        UI.toast('All LaTeX copied');
      }
    });
  }
};

window.LatexTool = LatexTool;
