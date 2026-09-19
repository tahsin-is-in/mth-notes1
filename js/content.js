/**
 * content.js
 * Everything that loads the new exam-prep data model sits here, separate
 * from storage.js (which only ever touches localStorage) and app.js
 * (which only ever touches the page shell). All loaders cache their
 * fetch so repeated calls across a page are free.
 */

const Content = (() => {
  const cache = {};

  function cachedFetch(path, fallback) {
    if (cache[path]) return cache[path];
    cache[path] = fetch(path)
      .then(r => (r.ok ? r.json() : fallback))
      .catch(() => fallback);
    return cache[path];
  }

  function getChapters() {
    return cachedFetch('data/chapters.json', {});
  }

  function getCourseChapters(slug) {
    return getChapters().then(all => all[slug] || { credits: 3, chapters: [] });
  }

  function getChapter(slug, chapterId) {
    return getCourseChapters(slug).then(c => (c.chapters || []).find(ch => ch.id === chapterId));
  }

  function getTopicMeta(slug, topicId) {
    return getCourseChapters(slug).then(c => {
      for (const ch of c.chapters || []) {
        const t = (ch.topics || []).find(t => t.id === topicId);
        if (t) return Object.assign({ chapterId: ch.id, chapterTitle: ch.title }, t);
      }
      return null;
    });
  }

  function getTopicContent(slug, topicMeta) {
    if (!topicMeta || !topicMeta.file) return Promise.resolve(null);
    const path = `courses/${slug}/topics/${topicMeta.file}`;
    if (cache[path]) return cache[path];
    cache[path] = fetch(path).then(r => (r.ok ? r.text() : null)).catch(() => null);
    return cache[path];
  }

  function getMcqs(slug) {
    return cachedFetch(`courses/${slug}/mcqs/mcqs.json`, { mcqs: [] });
  }

  function getExams(slug) {
    return cachedFetch(`courses/${slug}/exams/exams.json`, { exams: [] });
  }

  function getFormulas(slug) {
    return cachedFetch(`courses/${slug}/formulas.json`, { formulas: [] });
  }

  function getTheorems(slug) {
    return cachedFetch(`courses/${slug}/theorems.json`, { theorems: [] });
  }

  function getViva(slug) {
    return cachedFetch(`courses/${slug}/viva.json`, { viva: [] });
  }

  function getQuestions(slug) {
    return cachedFetch(`courses/${slug}/questions/questions.json`, { questions: [] });
  }

  function getDefinitions() {
    return cachedFetch('data/definitions.json', { definitions: [] });
  }

  /** Flatten every topic across every chapter of a course into one array. */
  function flattenTopics(courseChapters) {
    const out = [];
    (courseChapters.chapters || []).forEach(ch => {
      (ch.topics || []).forEach(t => {
        out.push(Object.assign({ chapterId: ch.id, chapterTitle: ch.title }, t));
      });
    });
    return out;
  }

  /** Real, computed stats for a single course — used by course.html and coverage.html. */
  async function computeCourseStats(slug) {
    const [chData, mcqData, examData, questionData, vivaData] = await Promise.all([
      getCourseChapters(slug), getMcqs(slug), getExams(slug), getQuestions(slug), getViva(slug)
    ]);
    const topics = flattenTopics(chData);
    const complete = topics.filter(t => t.status === 'complete').length;
    const partial = topics.filter(t => t.status === 'partial').length;
    const questions = questionData.questions || [];
    const solvedQuestions = questions.filter(q => q.solution && q.solution.status === 'complete').length;
    const pastQuestions = questions.filter(q => q.examMeta).length;

    return {
      slug,
      chapters: (chData.chapters || []).length,
      topicsTotal: topics.length,
      topicsComplete: complete,
      topicsPartial: partial,
      topicsNotAvailable: topics.length - complete - partial,
      mcqs: (mcqData.mcqs || []).length,
      chapterExams: (examData.exams || []).filter(e => e.type === 'chapter').length,
      mockExams: (examData.exams || []).filter(e => e.type === 'mock').length,
      questionsTotal: questions.length,
      questionsSolved: solvedQuestions,
      pastQuestions,
      vivaCount: (vivaData.viva || []).length
    };
  }

  return {
    getChapters, getCourseChapters, getChapter, getTopicMeta, getTopicContent,
    getMcqs, getExams, getFormulas, getTheorems, getViva, getQuestions, getDefinitions,
    flattenTopics, computeCourseStats
  };
})();

window.Content = Content;
