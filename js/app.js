/**
 * app.js
 * The page shell shared by every page: theme handling, reading
 * preferences, sidebar, topbar, mobile bottom nav, the Ctrl+K command
 * palette, and the settings panel. Each .html page calls
 * `App.mountShell('<nav-id>')` in its own inline script, then renders its
 * own content into #page-content and (optionally) calls
 * `App.setBreadcrumbs([...])`.
 */

const App = (() => {
  let coursesPromise = null;

  /* ---------------- Theme ---------------- */
  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function initTheme() {
    applyTheme(Store.getTheme());
  }

  function cycleTheme() {
    const order = ['light', 'dark', 'system'];
    const current = Store.getTheme();
    const next = order[(order.indexOf(current) + 1) % order.length];
    Store.setTheme(next);
    applyTheme(next);
    updateThemeIcon();
    UI.toast(`Theme: ${next.charAt(0).toUpperCase() + next.slice(1)}`);
  }

  function currentThemeIcon() {
    const t = Store.getTheme();
    if (t === 'light') return '\u2600\ufe0f';
    if (t === 'dark') return '\ud83c\udf19';
    return '\ud83d\udda5\ufe0f';
  }

  function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = currentThemeIcon();
  }

  /* ---------------- Reading preferences ---------------- */
  function applyPrefs(prefs) {
    const root = document.documentElement;
    root.style.setProperty('--font-scale', prefs.fontScale);
    root.style.setProperty('--content-width', prefs.contentWidth + 'px');
    root.style.setProperty('--line-height-base', prefs.lineHeight);
    document.body.classList.toggle('reduced-motion', !!prefs.reducedMotion);
  }

  function initPrefs() {
    applyPrefs(Store.getPrefs());
  }

  /* ---------------- Data ---------------- */
  function getCourses() {
    if (!coursesPromise) {
      coursesPromise = fetch('data/courses.json').then(r => r.json());
    }
    return coursesPromise;
  }

  /* ---------------- Sidebar ---------------- */
  const NAV_ITEMS = [
    { id: 'home', icon: '\u2302', label: 'Home', url: 'index.html' },
    { id: 'courses', icon: '\ud83d\udcda', label: 'Courses', url: 'courses.html' },
    { id: 'favorites', icon: '\u2b50', label: 'Favorites', url: 'favorites.html' },
    { id: 'questions', icon: '\u2753', label: 'Questions', url: 'questions.html' },
    { id: 'resources', icon: '\ud83d\udcc4', label: 'Resources', url: 'resources.html' },
    { id: 'search', icon: '\ud83d\udd0d', label: 'Search', url: 'search.html' },
    { id: 'about', icon: '\u2139\ufe0f', label: 'About', url: 'about.html' }
  ];

  function sidebarSkeleton(activeNav) {
    const collapsed = Store.getSidebarCollapsed();
    const navHtml = NAV_ITEMS.map(item => `
      <a class="nav-item ${activeNav === item.id ? 'active' : ''}" href="${item.url}">
        <span class="nav-icon" aria-hidden="true">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
      </a>`).join('');

    return `
      <aside class="sidebar ${collapsed ? 'collapsed' : ''}" id="app-sidebar" aria-label="Main navigation">
        <div class="sidebar-brand">
          <span class="sidebar-brand-mark" aria-hidden="true">\u2211</span>
          <span class="sidebar-brand-text">MTH Notes</span>
        </div>
        <nav class="sidebar-nav">
          ${navHtml}
          <div class="sidebar-section-title">Courses</div>
          <div id="sidebar-course-list">
            <div class="sub-nav-item">Loading\u2026</div>
          </div>
        </nav>
        <div class="sidebar-footer">
          <button class="sidebar-collapse-btn" id="sidebar-collapse-btn" aria-label="Collapse sidebar">
            <span aria-hidden="true">${collapsed ? '\u00bb' : '\u00ab'}</span>
            <span class="nav-label">Collapse</span>
          </button>
        </div>
      </aside>`;
  }

  function populateSidebarCourses(activeSlug) {
    getCourses().then(data => {
      const list = document.getElementById('sidebar-course-list');
      if (!list) return;
      list.innerHTML = data.courses.map(c => `
        <a class="sub-nav-item ${c.slug === activeSlug ? 'active' : ''}" href="${Router.courseUrl(c.slug)}">
          ${UI.escapeHtml(c.code)}
        </a>`).join('');
    }).catch(() => {
      const list = document.getElementById('sidebar-course-list');
      if (list) list.innerHTML = `<div class="sub-nav-item">Unable to load</div>`;
    });
  }

  /* ---------------- Topbar ---------------- */
  function topbarSkeleton() {
    return `
      <header class="topbar">
        <button class="topbar-menu-btn icon-btn" id="mobile-menu-btn" aria-label="Open menu">\u2630</button>
        <div id="breadcrumb-mount"><nav class="breadcrumbs"></nav></div>
        <div class="topbar-actions">
          <button class="search-trigger" id="search-trigger-btn" aria-label="Open search (Ctrl+K)">
            <span aria-hidden="true">\ud83d\udd0d</span>
            <span class="st-label">Search notes, courses, questions\u2026</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button class="icon-btn" id="theme-toggle-btn" aria-label="Cycle theme">${currentThemeIcon()}</button>
          <button class="icon-btn" id="settings-btn" aria-label="Open settings">\u2699\ufe0f</button>
        </div>
      </header>`;
  }

  /* ---------------- Bottom nav (mobile) ---------------- */
  const BOTTOM_ITEMS = [
    { id: 'home', icon: '\u2302', label: 'Home', url: 'index.html' },
    { id: 'courses', icon: '\ud83d\udcda', label: 'Courses', url: 'courses.html' },
    { id: 'search', icon: '\ud83d\udd0d', label: 'Search', url: 'search.html', action: 'open-search' },
    { id: 'favorites', icon: '\u2b50', label: 'Saved', url: 'favorites.html' },
    { id: 'about', icon: '\u2699\ufe0f', label: 'Settings', url: '#', action: 'open-settings' }
  ];

  function bottomNavSkeleton(activeNav) {
    const itemsHtml = BOTTOM_ITEMS.map(item => `
      <a class="bottom-nav-item ${activeNav === item.id ? 'active' : ''}" href="${item.url}" ${item.action ? `data-action="${item.action}"` : ''}>
        <span class="nav-icon" aria-hidden="true">${item.icon}</span>
        <span>${item.label}</span>
      </a>`).join('');
    return `<nav class="bottom-nav" aria-label="Mobile navigation"><div class="bottom-nav-inner">${itemsHtml}</div></nav>`;
  }

  /* ---------------- Footer ---------------- */
  function footerSkeleton() {
    return `
      <footer class="site-footer">
        <div class="ff-brand">MTH Notes</div>
        <div class="ff-tag">Mathematics \u2022 Learning \u2022 Curiosity</div>
        <div class="ff-meta">\u00a9 2026 \u00b7 <a href="about.html">About</a></div>
      </footer>`;
  }

  /* ---------------- Command palette ---------------- */
  let paletteItems = null;
  let paletteActiveIndex = -1;

  function paletteSkeleton() {
    return `
      <div class="cmdk-backdrop" id="cmdk-backdrop" style="display:none;">
        <div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Search">
          <div class="cmdk-input-row">
            <span class="cmdk-icon" aria-hidden="true">\ud83d\udd0d</span>
            <input class="cmdk-input" id="cmdk-input" type="text" placeholder="Search notes, courses, questions\u2026" autocomplete="off" />
            <span class="cmdk-esc">ESC</span>
          </div>
          <div class="cmdk-results" id="cmdk-results">
            <div class="cmdk-empty">Type to search across every course.</div>
          </div>
        </div>
      </div>`;
  }

  function typeIcon(type) {
    return { course: '\ud83d\udcda', lecture: '\ud83d\udcd6', question: '\u2753', resource: '\ud83d\udcc4' }[type] || '\u2022';
  }

  function renderPaletteResults(results) {
    const el = document.getElementById('cmdk-results');
    if (!el) return;
    if (!results.length) {
      el.innerHTML = `<div class="cmdk-empty">No matches yet \u2014 try a different word.</div>`;
      return;
    }
    el.innerHTML = results.map((r, i) => `
      <a class="cmdk-item ${i === paletteActiveIndex ? 'active' : ''}" href="${r.url}" data-idx="${i}">
        <span class="cmdk-item-icon" aria-hidden="true">${typeIcon(r.type)}</span>
        <span class="cmdk-item-main">
          <span class="cmdk-item-title">${UI.escapeHtml(r.title)}</span>
          <span class="cmdk-item-sub">${UI.escapeHtml(r.sub)}</span>
        </span>
      </a>`).join('');
  }

  function openPalette() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const input = document.getElementById('cmdk-input');
    if (!backdrop) return;
    backdrop.style.display = 'flex';
    input.value = '';
    input.focus();
    paletteActiveIndex = -1;
    document.getElementById('cmdk-results').innerHTML = `<div class="cmdk-empty">Building search index\u2026</div>`;
    getCourses().then(data => SearchIndex.build(data)).then(items => {
      paletteItems = items;
      document.getElementById('cmdk-results').innerHTML = `<div class="cmdk-empty">Type to search across every course.</div>`;
    });
  }

  function closePalette() {
    const backdrop = document.getElementById('cmdk-backdrop');
    if (backdrop) backdrop.style.display = 'none';
  }

  function wirePalette() {
    document.body.insertAdjacentHTML('beforeend', paletteSkeleton());
    const backdrop = document.getElementById('cmdk-backdrop');
    const input = document.getElementById('cmdk-input');
    let currentResults = [];

    backdrop.addEventListener('click', e => { if (e.target === backdrop) closePalette(); });

    input.addEventListener('input', () => {
      if (!paletteItems) return;
      currentResults = SearchIndex.query(paletteItems, input.value, 30);
      paletteActiveIndex = currentResults.length ? 0 : -1;
      renderPaletteResults(currentResults);
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentResults.length) {
          paletteActiveIndex = (paletteActiveIndex + 1) % currentResults.length;
          renderPaletteResults(currentResults);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentResults.length) {
          paletteActiveIndex = (paletteActiveIndex - 1 + currentResults.length) % currentResults.length;
          renderPaletteResults(currentResults);
        }
      } else if (e.key === 'Enter') {
        if (paletteActiveIndex >= 0 && currentResults[paletteActiveIndex]) {
          window.location.href = currentResults[paletteActiveIndex].url;
        }
      }
    });

    document.addEventListener('keydown', e => {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        openPalette();
      } else if (e.key === 'Escape') {
        closePalette();
        closeSettings();
      }
    });
  }

  /* ---------------- Settings panel ---------------- */
  function settingsSkeleton() {
    const prefs = Store.getPrefs();
    const theme = Store.getTheme();
    return `
      <div class="settings-backdrop" id="settings-backdrop" style="display:none;">
        <div class="settings-panel" role="dialog" aria-modal="true" aria-label="Reading settings">
          <div class="settings-header">
            <h2>Settings</h2>
            <button class="icon-btn" id="settings-close-btn" aria-label="Close settings">\u2715</button>
          </div>

          <div class="settings-group">
            <div class="settings-label">Theme</div>
            <div class="segmented" id="theme-segmented">
              <button data-theme-opt="light" class="${theme === 'light' ? 'active' : ''}">Light</button>
              <button data-theme-opt="dark" class="${theme === 'dark' ? 'active' : ''}">Dark</button>
              <button data-theme-opt="system" class="${theme === 'system' ? 'active' : ''}">System</button>
            </div>
          </div>

          <div class="settings-group">
            <div class="settings-label">Font size</div>
            <div class="font-size-row">
              <button id="font-decrease" aria-label="Decrease font size">A\u2212</button>
              <button id="font-reset" aria-label="Reset font size">A</button>
              <button id="font-increase" aria-label="Increase font size">A+</button>
            </div>
          </div>

          <div class="settings-group">
            <div class="settings-label">Content width</div>
            <div class="segmented" id="width-segmented">
              <button data-width-opt="580" class="${prefs.contentWidth === 580 ? 'active' : ''}">Narrow</button>
              <button data-width-opt="720" class="${prefs.contentWidth === 720 ? 'active' : ''}">Medium</button>
              <button data-width-opt="880" class="${prefs.contentWidth === 880 ? 'active' : ''}">Wide</button>
            </div>
          </div>

          <div class="settings-group">
            <div class="settings-label">Line spacing</div>
            <div class="range-row">
              <input type="range" id="line-height-range" min="1.4" max="2.0" step="0.1" value="${prefs.lineHeight}" />
            </div>
          </div>

          <div class="settings-group">
            <div class="toggle-row">
              <span class="settings-label" style="margin:0;">Reduced animations</span>
              <label class="switch">
                <input type="checkbox" id="reduced-motion-toggle" ${prefs.reducedMotion ? 'checked' : ''} />
                <span class="switch-track"></span>
              </label>
            </div>
          </div>
        </div>
      </div>`;
  }

  function openSettings() {
    const el = document.getElementById('settings-backdrop');
    if (el) el.style.display = 'flex';
  }
  function closeSettings() {
    const el = document.getElementById('settings-backdrop');
    if (el) el.style.display = 'none';
  }

  function wireSettings() {
    document.body.insertAdjacentHTML('beforeend', settingsSkeleton());
    const backdrop = document.getElementById('settings-backdrop');
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeSettings(); });
    document.getElementById('settings-close-btn').addEventListener('click', closeSettings);

    document.querySelectorAll('[data-theme-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-theme-opt');
        Store.setTheme(val);
        applyTheme(val);
        updateThemeIcon();
        document.querySelectorAll('[data-theme-opt]').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    document.querySelectorAll('[data-width-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-width-opt'), 10);
        const prefs = Store.setPrefs({ contentWidth: val });
        applyPrefs(prefs);
        document.querySelectorAll('[data-width-opt]').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    document.getElementById('font-decrease').addEventListener('click', () => {
      const prefs = Store.getPrefs();
      const next = Math.max(0.85, +(prefs.fontScale - 0.1).toFixed(2));
      applyPrefs(Store.setPrefs({ fontScale: next }));
    });
    document.getElementById('font-increase').addEventListener('click', () => {
      const prefs = Store.getPrefs();
      const next = Math.min(1.5, +(prefs.fontScale + 0.1).toFixed(2));
      applyPrefs(Store.setPrefs({ fontScale: next }));
    });
    document.getElementById('font-reset').addEventListener('click', () => {
      applyPrefs(Store.setPrefs({ fontScale: 1 }));
    });

    document.getElementById('line-height-range').addEventListener('input', e => {
      applyPrefs(Store.setPrefs({ lineHeight: parseFloat(e.target.value) }));
    });

    document.getElementById('reduced-motion-toggle').addEventListener('change', e => {
      applyPrefs(Store.setPrefs({ reducedMotion: e.target.checked }));
    });
  }

  /* ---------------- Favorites delegation ---------------- */
  function wireFavoriteDelegation() {
    document.addEventListener('click', e => {
      const courseBtn = e.target.closest('[data-fav-course]');
      if (courseBtn) {
        const slug = courseBtn.getAttribute('data-fav-course');
        getCourses().then(data => {
          const course = data.courses.find(c => c.slug === slug);
          if (!course) return;
          const id = `course:${slug}`;
          const nowFav = Store.toggleFavorite({
            id, type: 'course', title: `${course.code} \u2014 ${course.title}`,
            courseCode: course.code, courseSlug: slug, url: Router.courseUrl(slug)
          });
          courseBtn.classList.toggle('is-fav', nowFav);
          courseBtn.textContent = nowFav ? '\u2605' : '\u2606';
          courseBtn.setAttribute('aria-pressed', String(nowFav));
          UI.toast(nowFav ? 'Added to favorites' : 'Removed from favorites');
        });
        return;
      }

      const qBtn = e.target.closest('[data-fav-question]');
      if (qBtn) {
        const id = `question:${qBtn.getAttribute('data-fav-question')}`;
        const questionText = qBtn.closest('.question-card').querySelector('.question-text').firstChild.textContent.trim();
        const nowFav = Store.toggleFavorite({
          id, type: 'question', title: questionText,
          courseCode: qBtn.getAttribute('data-course-code'),
          courseSlug: qBtn.getAttribute('data-course-slug'),
          url: Router.questionsUrl(qBtn.getAttribute('data-course-slug'))
        });
        qBtn.classList.toggle('is-fav', nowFav);
        qBtn.textContent = nowFav ? '\u2605' : '\u2606';
        qBtn.setAttribute('aria-pressed', String(nowFav));
        UI.toast(nowFav ? 'Added to favorites' : 'Removed from favorites');
      }
    });
  }

  /* ---------------- Mobile sidebar toggle ---------------- */
  function wireSidebarToggle() {
    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    const sidebar = document.getElementById('app-sidebar');
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', () => {
        const collapsed = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed', collapsed);
        Store.setSidebarCollapsed(collapsed);
        collapseBtn.querySelector('span[aria-hidden]').textContent = collapsed ? '\u00bb' : '\u00ab';
      });
    }

    const menuBtn = document.getElementById('mobile-menu-btn');
    const backdrop = document.getElementById('sidebar-mobile-backdrop');
    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        if (backdrop) backdrop.classList.add('show');
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('show');
      });
    }

    document.querySelectorAll('.bottom-nav-item[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        const action = btn.getAttribute('data-action');
        if (action === 'open-search') { e.preventDefault(); openPalette(); }
        if (action === 'open-settings') { e.preventDefault(); openSettings(); }
      });
    });
  }

  /* ---------------- Offline support (optional, safe no-op if unsupported) ---------------- */
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (!window.location.protocol.startsWith('http')) return; // skip on file://
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => { /* offline support is optional */ });
    });
  }

  /* ---------------- Public: mount everything ---------------- */
  function mountShell(activeNav, activeCourseSlug) {
    initTheme();
    initPrefs();
    registerServiceWorker();

    const sidebarMount = document.getElementById('sidebar-mount');
    const topbarMount = document.getElementById('topbar-mount');
    const bottomNavMount = document.getElementById('bottom-nav-mount');
    const footerMount = document.getElementById('footer-mount');

    if (sidebarMount) sidebarMount.innerHTML = sidebarSkeleton(activeNav);
    if (topbarMount) topbarMount.innerHTML = topbarSkeleton();
    if (bottomNavMount) bottomNavMount.innerHTML = bottomNavSkeleton(activeNav);
    if (footerMount) footerMount.innerHTML = footerSkeleton();

    // Mobile sidebar backdrop element
    if (sidebarMount) {
      sidebarMount.insertAdjacentHTML('beforeend', '<div class="sidebar-backdrop" id="sidebar-mobile-backdrop"></div>');
    }

    populateSidebarCourses(activeCourseSlug);
    wireSidebarToggle();
    wirePalette();
    wireSettings();
    wireFavoriteDelegation();

    document.getElementById('search-trigger-btn').addEventListener('click', openPalette);
    document.getElementById('theme-toggle-btn').addEventListener('click', cycleTheme);
    document.getElementById('settings-btn').addEventListener('click', openSettings);
  }

  function setBreadcrumbs(items) {
    const mount = document.getElementById('breadcrumb-mount');
    if (mount) mount.innerHTML = UI.breadcrumbs(items);
  }

  return { mountShell, setBreadcrumbs, getCourses, openPalette, toast: UI.toast };
})();

window.App = App;
