/**
 * router.js
 * MTH Notes has no client-side history routing and no server rewrites —
 * every page is a real .html file, and "dynamic" pages (course.html,
 * lecture.html, questions.html, resources.html) read a plain query string
 * to decide what to render. This means:
 *   - Refreshing a page always works (it's a real URL).
 *   - Every link is relative, so the site works from any GitHub Pages
 *     subpath (username.github.io/repo/...) without configuration.
 */

const Router = {
  getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },
  getAllParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search).entries());
  },

  /* All URL builders are relative to the site root, where every .html file lives. */
  courseUrl(slug) {
    return `course.html?c=${encodeURIComponent(slug)}`;
  },
  lectureUrl(slug, file) {
    return `lecture.html?c=${encodeURIComponent(slug)}&l=${encodeURIComponent(file)}`;
  },
  questionsUrl(slug) {
    return slug ? `questions.html?c=${encodeURIComponent(slug)}` : 'questions.html';
  },
  resourcesUrl(slug) {
    return slug ? `resources.html?c=${encodeURIComponent(slug)}` : 'resources.html';
  },
  coursesUrl(filterYear) {
    return filterYear ? `courses.html?year=${encodeURIComponent(filterYear)}` : 'courses.html';
  },

  /* Relative data paths, always resolved from the site root. */
  courseDataPath(slug, kind, file) {
    // kind: 'lectures' | 'questions' | 'resources'
    if (kind === 'lectures') return `courses/${slug}/lectures/${file}`;
    if (kind === 'questions') return `courses/${slug}/questions/questions.json`;
    if (kind === 'resources') return `courses/${slug}/resources/resources.json`;
    return '';
  },

  copyCurrentLink() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(url);
    }
    // Fallback for older browsers
    const tmp = document.createElement('textarea');
    tmp.value = url;
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(tmp);
    return Promise.resolve();
  }
};

window.Router = Router;
