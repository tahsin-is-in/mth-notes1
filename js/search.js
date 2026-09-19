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

    // Topics, MCQs, theorems, formulas, viva, and past questions from the exam-prep data layer.
    if (window.Content) {
      const chapterFetches = courses.map(course =>
        Content.getCourseChapters(course.slug).then(chData => {
          Content.flattenTopics(chData).forEach(t => {
            items.push({
              type: 'topic',
              title: t.title,
              sub: `${course.code} \u00b7 ${t.chapterTitle}`,
              url: `topic.html?c=${course.slug}&t=${t.id}`,
              courseCode: course.code,
              keywords: [t.title, t.chapterTitle, course.code, course.title].join(' ').toLowerCase()
            });
          });
        }).catch(() => {})
      );

      const theoremFetches = courses.map(course =>
        Content.getTheorems(course.slug).then(d => {
          (d.theorems || []).forEach(th => {
            items.push({
              type: 'theorem',
              title: th.name,
              sub: `${course.code} \u00b7 Theorem`,
              url: th.topicId ? `topic.html?c=${course.slug}&t=${th.topicId}` : `theorems.html?c=${course.slug}`,
              courseCode: course.code,
              keywords: [th.name, th.statement, course.code].join(' ').toLowerCase()
            });
          });
        }).catch(() => {})
      );

      const formulaFetches = courses.map(course =>
        Content.getFormulas(course.slug).then(d => {
          (d.formulas || []).forEach(f => {
            items.push({
              type: 'formula',
              title: f.name,
              sub: `${course.code} \u00b7 Formula`,
              url: `formulas.html?c=${course.slug}`,
              courseCode: course.code,
              keywords: [f.name, f.whenToUse || '', course.code].join(' ').toLowerCase()
            });
          });
        }).catch(() => {})
      );

      const mcqFetches = courses.map(course =>
        Content.getMcqs(course.slug).then(d => {
          (d.mcqs || []).forEach(m => {
            items.push({
              type: 'mcq',
              title: m.question,
              sub: `${course.code} \u00b7 MCQ`,
              url: `mcqs.html?c=${course.slug}`,
              courseCode: course.code,
              keywords: [m.question, course.code].join(' ').toLowerCase()
            });
          });
        }).catch(() => {})
      );

      const vivaFetches = courses.map(course =>
        Content.getViva(course.slug).then(d => {
          (d.viva || []).forEach(v => {
            items.push({
              type: 'viva',
              title: v.question,
              sub: `${course.code} \u00b7 Viva`,
              url: v.topicId ? `topic.html?c=${course.slug}&t=${v.topicId}` : `viva.html?c=${course.slug}`,
              courseCode: course.code,
              keywords: [v.question, v.answer || '', course.code].join(' ').toLowerCase()
            });
          });
        }).catch(() => {})
      );

      const definitionFetch = Content.getDefinitions().then(d => {
        (d.definitions || []).forEach(def => {
          items.push({
            type: 'definition',
            title: def.term,
            sub: 'Definition Bank',
            url: def.topicId ? `topic.html?c=${def.courseSlug}&t=${def.topicId}` : 'definitions.html',
            courseCode: '',
            keywords: [def.term, def.shortDef].join(' ').toLowerCase()
          });
        });
      }).catch(() => {});

      fetches.push(...chapterFetches, ...theoremFetches, ...formulaFetches, ...mcqFetches, ...vivaFetches, definitionFetch);
    }

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
