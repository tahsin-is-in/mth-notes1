/**
 * search.js
 * Builds a flat, in-memory search index from data/courses.json plus each
 * course's questions.json / resources.json, then scores plain-text queries
 * against it. Everything runs in the browser — no backend, no build step.
 */

const SearchIndex = {
  _cache: null,

  async build(coursesData) {
    if (SearchIndex._cache) return SearchIndex._cache;

    const items = [];
    const courses = coursesData.courses || [];

    courses.forEach(course => {
      items.push({
        type: 'course',
        title: `${course.code} \u2014 ${course.title}`,
        sub: course.description || '',
        url: Router.courseUrl(course.slug),
        courseCode: course.code,
        keywords: [course.code, course.title, ...(course.topics || [])].join(' ').toLowerCase()
      });

      (course.lectures || []).forEach(lec => {
        items.push({
          type: 'lecture',
          title: lec.title,
          sub: `${course.code} \u00b7 Lecture`,
          url: Router.lectureUrl(course.slug, lec.file),
          courseCode: course.code,
          keywords: [lec.title, course.code, course.title, ...(lec.keywords || [])].join(' ').toLowerCase()
        });
      });
    });

    // Pull in questions + resources for courses that report having them.
    const fetches = [];
    courses.forEach(course => {
      if (course.questionCount > 0) {
        fetches.push(
          fetch(Router.courseDataPath(course.slug, 'questions'))
            .then(r => (r.ok ? r.json() : null))
            .then(data => {
              if (!data) return;
              (data.questions || []).forEach(q => {
                items.push({
                  type: 'question',
                  title: q.text,
                  sub: `${course.code} \u00b7 ${q.category.charAt(0).toUpperCase() + q.category.slice(1)}`,
                  url: Router.questionsUrl(course.slug),
                  courseCode: course.code,
                  keywords: [q.text, q.category, ...(q.tags || [])].join(' ').toLowerCase()
                });
              });
            })
            .catch(() => {})
        );
      }
      if (course.resourceCount > 0) {
        fetches.push(
          fetch(Router.courseDataPath(course.slug, 'resources'))
            .then(r => (r.ok ? r.json() : null))
            .then(data => {
              if (!data) return;
              (data.resources || []).forEach(res => {
                items.push({
                  type: 'resource',
                  title: res.title,
                  sub: `${course.code} \u00b7 Resource`,
                  url: Router.resourcesUrl(course.slug),
                  courseCode: course.code,
                  keywords: [res.title, res.description || ''].join(' ').toLowerCase()
                });
              });
            })
            .catch(() => {})
        );
      }
    });

    await Promise.all(fetches);
    SearchIndex._cache = items;
    return items;
  },

  query(items, rawQuery, limit) {
    const q = rawQuery.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);

    const scored = items
      .map(item => {
        let score = 0;
        const title = item.title.toLowerCase();
        const haystack = item.keywords;

        if (title === q) score += 100;
        if (title.includes(q)) score += 40;

        terms.forEach(term => {
          if (title.includes(term)) score += 8;
          if (haystack.includes(term)) score += 3;
        });

        return { item, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.item);

    return typeof limit === 'number' ? scored.slice(0, limit) : scored;
  }
};

window.SearchIndex = SearchIndex;
