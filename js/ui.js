/**
 * ui.js
 * Small, pure functions that return HTML strings for repeated components.
 * Kept separate from app.js (page shell) and the page-specific scripts
 * inline in each .html file, so nothing here talks to fetch() directly.
 */

const UI = {
  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  breadcrumbs(items) {
    // items: [{ label, url? }] — last item has no url (current page)
    const parts = items.map((item, i) => {
      const isLast = i === items.length - 1;
      const label = UI.escapeHtml(item.label);
      const node = (item.url && !isLast)
        ? `<a href="${item.url}">${label}</a>`
        : `<span class="${isLast ? 'crumb-current' : ''}">${label}</span>`;
      return i === 0 ? node : `<span class="crumb-sep">/</span>${node}`;
    });
    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${parts.join('')}</nav>`;
  },

  courseCard(course) {
    const lectureCount = (course.lectures || []).length;
    const stats = Store.getCourseCompletionStats(course.slug, lectureCount);
    const isFav = Store.isFavorite(`course:${course.slug}`);
    const isEmpty = lectureCount === 0;
    return `
      <article class="course-card ${isEmpty ? 'empty' : ''}" data-slug="${course.slug}">
        <div class="course-card-top">
          <div class="course-icon" aria-hidden="true">${course.icon || '\u2211'}</div>
          <button class="course-fav-btn ${isFav ? 'is-fav' : ''}" data-fav-course="${course.slug}"
            aria-label="Toggle favorite for ${UI.escapeHtml(course.code)}" aria-pressed="${isFav}">
            ${isFav ? '\u2605' : '\u2606'}
          </button>
        </div>
        <div>
          <div class="course-code">${UI.escapeHtml(course.code)}</div>
          <h3 class="course-title">${UI.escapeHtml(course.title)}</h3>
        </div>
        <p class="course-desc">${UI.escapeHtml(course.description || '')}</p>
        ${isEmpty ? `<span class="badge-soon">Coming soon</span>` : `
          <div class="course-meta">
            <span><strong>${lectureCount}</strong> Lectures</span>
            <span><strong>${course.questionCount || 0}</strong> Questions</span>
          </div>
          <div class="course-progress-track"><div class="course-progress-fill" style="width:${stats.percent}%"></div></div>
        `}
        <div class="course-card-footer">
          <span></span>
          <a class="course-open-link" href="${Router.courseUrl(course.slug)}">Open course \u2192</a>
        </div>
      </article>`;
  },

  quickCard({ icon, label, desc, url }) {
    return `
      <a class="quick-card" href="${url}">
        <span class="qc-icon" aria-hidden="true">${icon}</span>
        <span class="qc-label">${UI.escapeHtml(label)}</span>
        <span class="qc-desc">${UI.escapeHtml(desc)}</span>
      </a>`;
  },

  lectureRow(course, lecture, index) {
    const status = Store.getLectureStatus(course.slug, lecture.file);
    return `
      <a class="lecture-row" href="${Router.lectureUrl(course.slug, lecture.file)}">
        <span class="lecture-status-dot ${status}" title="${status.replace('-', ' ')}"></span>
        <span class="lecture-row-num">${String(index + 1).padStart(2, '0')}</span>
        <span class="lecture-row-main">
          <span class="lecture-row-title">${UI.escapeHtml(lecture.title)}</span>
          <span class="lecture-row-summary">${UI.escapeHtml(lecture.summary || '')}</span>
        </span>
        <span class="lecture-row-arrow" aria-hidden="true">\u2192</span>
      </a>`;
  },

  questionCard(q, course) {
    const isFav = Store.isFavorite(`question:${q.id}`);
    const label = q.category.charAt(0).toUpperCase() + q.category.slice(1);
    return `
      <article class="question-card" data-id="${q.id}">
        <span class="q-tag q-tag-${q.category}">${UI.escapeHtml(label)}</span>
        <div class="question-text">
          ${UI.escapeHtml(q.text)}
          ${course ? `<div class="question-course-label">${UI.escapeHtml(course.code)} \u00b7 ${UI.escapeHtml(course.title)}</div>` : ''}
        </div>
        <button class="question-fav ${isFav ? 'is-fav' : ''}" data-fav-question="${q.id}"
          data-course-slug="${course ? course.slug : ''}" data-course-code="${course ? course.code : ''}"
          aria-label="Toggle favorite question" aria-pressed="${isFav}">
          ${isFav ? '\u2605' : '\u2606'}
        </button>
      </article>`;
  },

  resourceRow(r, course) {
    const iconMap = { pdf: '\ud83d\udcc4', link: '\ud83d\udd17', image: '\ud83d\uddbc\ufe0f' };
    const href = r.url || r.file || '#';
    const external = !!r.url;
    return `
      <a class="resource-row" href="${href}" ${external ? 'target="_blank" rel="noopener"' : ''}>
        <span class="resource-icon" aria-hidden="true">${iconMap[r.type] || '\ud83d\udcc4'}</span>
        <span class="resource-main">
          <span class="resource-title">${UI.escapeHtml(r.title)}</span>
          <span class="resource-desc">${UI.escapeHtml(r.description || '')}</span>
          ${course ? `<div class="resource-course-label">${UI.escapeHtml(course.code)}</div>` : ''}
        </span>
      </a>`;
  },

  emptyState(icon, title, desc) {
    return `
      <div class="empty-state">
        <div class="es-icon" aria-hidden="true">${icon}</div>
        <h3>${UI.escapeHtml(title)}</h3>
        <p>${UI.escapeHtml(desc)}</p>
      </div>`;
  },

  toast(message) {
    let el = document.getElementById('global-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'global-toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => el.classList.remove('show'), 2200);
  },

  formulaOfTheDay() {
    const formulas = [
      { tex: '\\[ e^{i\\pi} + 1 = 0 \\]', caption: "Euler's Identity" },
      { tex: '\\[ \\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi} \\]', caption: 'Gaussian Integral' },
      { tex: '\\[ \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \\]', caption: 'Basel Problem' },
      { tex: '\\[ \\nabla \\times (\\nabla \\times \\mathbf{F}) = \\nabla(\\nabla \\cdot \\mathbf{F}) - \\nabla^2 \\mathbf{F} \\]', caption: 'Vector Identity' },
      { tex: '\\[ \\lim_{n\\to\\infty}\\left(1+\\frac{1}{n}\\right)^n = e \\]', caption: 'Definition of e' },
      { tex: '\\[ \\det(A - \\lambda I) = 0 \\]', caption: 'Characteristic Equation' },
      { tex: '\\[ f(z_0) = \\frac{1}{2\\pi i}\\oint_C \\frac{f(z)}{z-z_0}\\,dz \\]', caption: "Cauchy's Integral Formula" }
    ];
    const dayIndex = Math.floor(Date.now() / 86400000) % formulas.length;
    return formulas[dayIndex];
  },

  mathQuote() {
    const quotes = [
      { text: 'Mathematics is the language in which God has written the universe.', by: 'Galileo Galilei' },
      { text: 'Pure mathematics is, in its way, the poetry of logical ideas.', by: 'Albert Einstein' },
      { text: 'A mathematician who is not somewhat of a poet will never be a perfect mathematician.', by: 'Karl Weierstrass' },
      { text: 'Obvious is the most dangerous word in mathematics.', by: 'Eric Temple Bell' },
      { text: 'The essence of mathematics lies in its freedom.', by: 'Georg Cantor' }
    ];
    const idx = Math.floor(Date.now() / 86400000) % quotes.length;
    return quotes[idx];
  }
};

window.UI = UI;
