/**
 * storage.js
 * Every read/write to localStorage for MTH Notes goes through here.
 * Nothing in this file talks to the DOM — it's pure data.
 * If localStorage is unavailable (privacy mode, etc.) every function
 * degrades gracefully instead of throwing.
 */

const NS = 'mthnotes:';

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

const Store = {
  /* ---------------- Theme ---------------- */
  getTheme() {
    return safeGet('theme', 'system'); // 'light' | 'dark' | 'system'
  },
  setTheme(theme) {
    safeSet('theme', theme);
  },

  /* ---------------- Reading preferences ---------------- */
  getPrefs() {
    return safeGet('prefs', {
      fontScale: 1,       // 0.85 - 1.4
      contentWidth: 720,  // px
      lineHeight: 1.7,
      reducedMotion: false
    });
  },
  setPrefs(partial) {
    const current = Store.getPrefs();
    const next = Object.assign({}, current, partial);
    safeSet('prefs', next);
    return next;
  },

  /* ---------------- Sidebar state ---------------- */
  getSidebarCollapsed() {
    return safeGet('sidebarCollapsed', false);
  },
  setSidebarCollapsed(val) {
    safeSet('sidebarCollapsed', !!val);
  },

  /* ---------------- Progress ----------------
     progress = { "mth301": { "01-metric-spaces.md": "completed", ... } }
  */
  getAllProgress() {
    return safeGet('progress', {});
  },
  getCourseProgressMap(courseSlug) {
    const all = Store.getAllProgress();
    return all[courseSlug] || {};
  },
  getLectureStatus(courseSlug, file) {
    const map = Store.getCourseProgressMap(courseSlug);
    return map[file] || 'not-started'; // 'not-started' | 'in-progress' | 'completed'
  },
  setLectureStatus(courseSlug, file, status) {
    const all = Store.getAllProgress();
    if (!all[courseSlug]) all[courseSlug] = {};
    if (status === 'not-started') {
      delete all[courseSlug][file];
    } else {
      all[courseSlug][file] = status;
    }
    safeSet('progress', all);
  },
  getCourseCompletionStats(courseSlug, totalLectures) {
    const map = Store.getCourseProgressMap(courseSlug);
    const completed = Object.values(map).filter(s => s === 'completed').length;
    const percent = totalLectures > 0 ? Math.round((completed / totalLectures) * 100) : 0;
    return { completed, total: totalLectures, percent };
  },
  getOverallStats(courses) {
    let totalLectures = 0;
    let totalCompleted = 0;
    courses.forEach(c => {
      const n = (c.lectures || []).length;
      totalLectures += n;
      const stats = Store.getCourseCompletionStats(c.slug, n);
      totalCompleted += stats.completed;
    });
    const percent = totalLectures > 0 ? Math.round((totalCompleted / totalLectures) * 100) : 0;
    return { totalLectures, totalCompleted, percent };
  },

  /* ---------------- Favorites ----------------
     favorites = [{ id, type: 'lecture'|'question'|'resource'|'course', title, courseCode, courseSlug, url, meta, addedAt }]
  */
  getFavorites() {
    return safeGet('favorites', []);
  },
  isFavorite(id) {
    return Store.getFavorites().some(f => f.id === id);
  },
  addFavorite(item) {
    const favs = Store.getFavorites();
    if (favs.some(f => f.id === item.id)) return favs;
    item.addedAt = Date.now();
    favs.unshift(item);
    safeSet('favorites', favs);
    return favs;
  },
  removeFavorite(id) {
    const favs = Store.getFavorites().filter(f => f.id !== id);
    safeSet('favorites', favs);
    return favs;
  },
  toggleFavorite(item) {
    if (Store.isFavorite(item.id)) {
      Store.removeFavorite(item.id);
      return false;
    }
    Store.addFavorite(item);
    return true;
  },

  /* ---------------- Recently viewed lectures ----------------
     recents = [{ courseSlug, courseCode, courseTitle, file, title, viewedAt }]
  */
  getRecents() {
    return safeGet('recents', []);
  },
  addRecent(item) {
    let recents = Store.getRecents().filter(
      r => !(r.courseSlug === item.courseSlug && r.file === item.file)
    );
    item.viewedAt = Date.now();
    recents.unshift(item);
    recents = recents.slice(0, 8);
    safeSet('recents', recents);
    return recents;
  },
  /* ---------------- Mastery (per topic) ---------------- */
  getAllMastery() {
    return safeGet('mastery', {});
  },
  getMastery(topicId) {
    return Store.getAllMastery()[topicId] || 'not-started';
  },
  setMastery(topicId, level) {
    const all = Store.getAllMastery();
    all[topicId] = level;
    safeSet('mastery', all);
  },

  /* ---------------- Topic mastery checklist ----------------
     checklist = { "MTH301-CH01-T02": { "understand-intuition": true, ... } }
  */
  getAllChecklists() {
    return safeGet('checklists', {});
  },
  getChecklist(topicId) {
    return Store.getAllChecklists()[topicId] || {};
  },
  setChecklistItem(topicId, key, value) {
    const all = Store.getAllChecklists();
    if (!all[topicId]) all[topicId] = {};
    all[topicId][key] = value;
    safeSet('checklists', all);
    return all[topicId];
  },

  /* ---------------- Spaced revision tags ----------------
     tags = { "MTH301-CH01-T02": { tag: "needs-revision", taggedAt: 169... } }
  */
  getAllRevisionTags() {
    return safeGet('revisionTags', {});
  },
  setRevisionTag(topicId, tag) {
    const all = Store.getAllRevisionTags();
    all[topicId] = { tag, taggedAt: Date.now() };
    safeSet('revisionTags', all);
  },
  getRevisionTag(topicId) {
    const all = Store.getAllRevisionTags();
    return all[topicId] ? all[topicId].tag : null;
  },

  /* ---------------- Mode preferences (ELI5 / Exam mode) ---------------- */
  getModePrefs() {
    return safeGet('modePrefs', { eli5: false, examMode: false });
  },
  setModePrefs(partial) {
    const next = Object.assign({}, Store.getModePrefs(), partial);
    safeSet('modePrefs', next);
    return next;
  },

  /* ---------------- Practice / mock exam history ---------------- */
  getExamAttempts() {
    return safeGet('examAttempts', []);
  },
  addExamAttempt(attempt) {
    const all = Store.getExamAttempts();
    attempt.takenAt = Date.now();
    all.unshift(attempt);
    safeSet('examAttempts', all.slice(0, 30));
  }
};

window.Store = Store;
