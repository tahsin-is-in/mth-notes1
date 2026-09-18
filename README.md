# MTH Notes

A beautiful, fast, static website for organizing and reading Mathematics study materials — built with plain HTML, CSS, and JavaScript, and designed to be edited entirely through GitHub with no build step, no backend, and no login.

This README assumes no prior experience with GitHub. Follow it top to bottom the first time.

---

## Table of contents

1. [Download the project](#1-download-the-project)
2. [Create a GitHub repository](#2-create-a-github-repository)
3. [Upload the project](#3-upload-the-project)
4. [Enable GitHub Pages](#4-enable-github-pages)
5. [How the site is organized](#5-how-the-site-is-organized)
6. [Add a new course](#6-add-a-new-course)
7. [Add a new lecture](#7-add-a-new-lecture)
8. [Add a new question](#8-add-a-new-question)
9. [Add a new PDF](#9-add-a-new-pdf)
10. [Add new images](#10-add-new-images)
11. [Add a new resource link](#11-add-a-new-resource-link)
12. [Update the website](#12-update-the-website)
13. [Change the theme](#13-change-the-theme)
14. [Customize the website](#14-customize-the-website)
15. [Writing lecture notes: Markdown & math cheat sheet](#15-writing-lecture-notes-markdown--math-cheat-sheet)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Download the project

If you received this project as a folder or a `.zip` file:

1. If it's a `.zip`, extract it anywhere on your computer (e.g. your Desktop).
2. You should see a folder containing `index.html`, a `css` folder, a `js` folder, a `data` folder, a `courses` folder, and this `README.md`.

That folder is the entire website. Nothing else needs to be installed — there is no `npm install`, no build step, and no server required to work on it.

---

## 2. Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon in the top-right corner → **New repository**.
3. Name it something like `mth-notes`.
4. Set it to **Public** (required for free GitHub Pages hosting — or Private if you have GitHub Pro/Team).
5. Do **not** initialize it with a README, `.gitignore`, or license — leave those unchecked, since you already have your own project files.
6. Click **Create repository**.

You'll land on an empty repository page with setup instructions — keep that page open for the next step.

---

## 3. Upload the project

The easiest way, with no command line required:

1. On your new repository's page, click **uploading an existing file** (or the **Add file → Upload files** button).
2. Open your extracted project folder on your computer, select **all files and folders inside it** (not the outer folder itself — `index.html`, `css`, `js`, `data`, `courses`, `assets`, `README.md`, etc.), and drag them into the browser upload area.
3. Scroll down, add a commit message like `Initial upload`, and click **Commit changes**.
4. Wait for the upload to finish — larger uploads (with PDFs) can take a minute.

If you're comfortable with Git and the command line instead:

```bash
cd path/to/mth-notes
git init
git add .
git commit -m "Initial upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mth-notes.git
git push -u origin main
```

---

## 4. Enable GitHub Pages

1. In your repository, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and folder **/ (root)**, then click **Save**.
5. Wait 1–2 minutes. Refresh the page — a green box will show your live URL, something like:

   ```
   https://YOUR-USERNAME.github.io/mth-notes/
   ```

6. Open that link. Your study library is live.

Every time you push new commits to `main`, GitHub Pages automatically rebuilds the site within a minute or two — there is nothing else to run.

---

## 5. How the site is organized

```text
index.html          → Homepage
courses.html         → Grid of all courses
course.html           → One course's page (reads ?c=mth301 from the URL)
lecture.html          → One lecture's reading page (reads ?c= and &l=)
questions.html        → Important-questions bank (all courses, or one via ?c=)
resources.html        → Resources list (all courses, or one via ?c=)
favorites.html        → Your bookmarked items
search.html           → Full search page
about.html            → About page

css/                  → All styling (style.css, responsive.css, themes.css)
js/                   → All behavior (app.js, router.js, storage.js, ui.js, search.js, markdown.js)

data/courses.json     → The single source of truth for every course, its
                         lectures, and its topic list. This is the file you
                         edit most often.

courses/<slug>/lectures/*.md      → One Markdown file per lecture
courses/<slug>/questions/questions.json  → That course's question bank
courses/<slug>/resources/resources.json  → That course's PDFs & links

assets/pdf, assets/images, assets/icons  → Files referenced from notes/resources
```

**You should never need to edit anything inside `js/` to add content.** Adding a course, lecture, question, or resource is always done by editing a `.json` file or adding a `.md` file.

---

## 6. Add a new course

Open `data/courses.json`. Find the `"courses"` array and add a new object, matching this shape:

```json
{
  "code": "MTH 311",
  "slug": "mth311",
  "title": "Measure Theory",
  "year": "Third Year",
  "icon": "\u03bc",
  "description": "A short one- or two-sentence description of the course.",
  "topics": ["Sigma Algebras", "Lebesgue Measure", "Measurable Functions"],
  "questionCount": 0,
  "resourceCount": 0,
  "lectures": []
}
```

Then, in the `courses/` folder, create matching folders on GitHub (**Add file → Create new file**, then type a path like `courses/mth311/lectures/.gitkeep` — GitHub will create the folders automatically):

```text
courses/mth311/lectures/
courses/mth311/questions/
courses/mth311/resources/
```

That's it — the course now appears on `courses.html` and in the sidebar automatically, with a "Coming soon" state until you add lectures.

**Important:** `slug` must be lowercase, no spaces, and must match the folder name under `courses/` exactly (e.g. `mth311` ↔ `courses/mth311/`).

---

## 7. Add a new lecture

1. Write your lecture note as a Markdown file, e.g. `courses/mth301/lectures/05-something.md`. (See the [Markdown & math cheat sheet](#15-writing-lecture-notes-markdown--math-cheat-sheet) below.)
2. Open `data/courses.json`, find that course's `"lectures"` array, and add an entry:

```json
{
  "title": "Something New",
  "file": "05-something.md",
  "summary": "One short sentence describing the lecture.",
  "keywords": ["a few", "search", "keywords"]
}
```

3. Commit the changes. The lecture now appears in the course's lecture list, in "Recently Added" on the homepage, and in search — with no other file to touch.

The **order of lectures in the JSON array** is the order they appear in, and it also drives the Previous/Next navigation at the bottom of each lecture page.

---

## 8. Add a new question

Open `courses/<slug>/questions/questions.json` for the relevant course (create the file if it doesn't exist yet — copy the shape from an existing course like `courses/mth301/questions/questions.json`) and add an entry to the `"questions"` array:

```json
{
  "id": "301-pr2",
  "category": "problem",
  "text": "Show that the sequence f_n(x) = nx(1-x)^n converges to 0 uniformly on [0,1].",
  "tags": ["uniform convergence", "problem"]
}
```

Valid `category` values (each gets its own colored tag and filter chip): `short`, `definition`, `theorem`, `proof`, `problem`, `previous`, `viva`, `important`.

Keep each question's `id` unique across the whole site (prefixing with the course number, as above, is an easy way to guarantee that). Finally, update that course's `questionCount` in `data/courses.json` to match the new total.

---

## 9. Add a new PDF

1. Upload the `.pdf` file into `assets/pdf/` on GitHub (**Add file → Upload files**, choose the folder as the target path).
2. Open `courses/<slug>/resources/resources.json` (create it if needed) and add an entry:

```json
{
  "title": "Problem Sheet 3",
  "type": "pdf",
  "file": "../../../assets/pdf/mth301-problem-sheet-3.pdf",
  "description": "One short line describing the file."
}
```

3. Update that course's `resourceCount` in `data/courses.json` to match.

The `file` path above is written relative to `resources.json`'s own location (`courses/<slug>/resources/`), which is why it climbs up three folders (`../../../`) to reach `assets/pdf/`.

---

## 10. Add new images

Upload the image (`.png`, `.jpg`, `.svg`, etc.) into `assets/images/`. Then reference it from inside a lecture's Markdown file using a normal Markdown image link, relative to that lecture file's location (`courses/<slug>/lectures/`):

```markdown
![Description of the image](../../../assets/images/mth301-diagram.png)
```

---

## 11. Add a new resource link

Same as a PDF (step 9), but use `"type": "link"` and a full `"url"` instead of a local `"file"`:

```json
{
  "title": "3Blue1Brown — Essence of Linear Algebra",
  "type": "link",
  "url": "https://www.3blue1brown.com/topics/linear-algebra",
  "description": "A visual introduction that pairs well with this course."
}
```

---

## 12. Update the website

For every kind of change above, the workflow is the same:

1. Edit or add files directly on GitHub (click a file → pencil/edit icon → make changes → **Commit changes**), or edit locally and push with Git.
2. Wait about a minute for GitHub Pages to redeploy.
3. Refresh your live site.

No build step, no `npm run build`, nothing to install.

---

## 13. Change the theme

As a visitor, click the sun/moon/monitor icon in the top bar (or open **Settings** via the gear icon) to cycle between **Light**, **Dark**, and **System**. The choice is remembered per-device using `localStorage` — there's nothing to configure in the code.

To change the theme's *colors* (not just switch between them), see [Customize the website](#14-customize-the-website) below.

---

## 14. Customize the website

* **Colors** — edit the CSS variables at the top of `css/themes.css` (`--bg`, `--ink`, `--accent`, `--gold`, etc.). There are two blocks: one for light mode, one for dark mode.
* **Fonts** — the `@import` line at the top of `css/style.css` pulls in Google Fonts (Fraunces for headings, Inter for UI text, IBM Plex Mono for code). Swap the font names there and in the `--font-display` / `--font-ui` / `--font-mono` variables in `css/style.css`.
* **Site name** — search for `MTH Notes` across `js/app.js` (sidebar brand, footer) and each page's `<title>` tag, and replace it.
* **Hero text on the homepage** — edit the `<section class="hero">` block directly in `index.html`.
* **Sidebar links** — edit the `NAV_ITEMS` array near the top of `js/app.js`.
* **Course icons** — each course's `"icon"` field in `data/courses.json` accepts any single character or emoji.

---

## 15. Writing lecture notes: Markdown & math cheat sheet

Lecture files are plain Markdown, rendered automatically with math support. A few things specific to this site:

**Math (via MathJax)**

```text
Inline: $f(x) = x^2$
Display: \[ \int_0^1 x^2\,dx = \frac{1}{3} \]
```

**Callout boxes** (definitions, theorems, examples, important notes) use a triple-colon syntax:

```text
:::definition Complete Metric Space
A metric space is complete if every Cauchy sequence in it converges.
:::

:::theorem Bolzano–Weierstrass
Every bounded sequence of real numbers has a convergent subsequence.
:::

:::example
A short worked example goes here.
:::

:::important
A tip worth remembering for exams.
:::
```

The text right after `:::definition` (or `theorem`/`example`/`important`) becomes the box's subtitle and can be left blank.

**Everything else** is standard Markdown: `## Heading`, `**bold**`, `*italic*`, `- lists`, `> blockquotes`, `` `code` ``, tables, and images.

---

## 16. Troubleshooting

**A lecture shows "note file could not be loaded."**
Double-check the `file` name in `data/courses.json` matches the actual filename in `courses/<slug>/lectures/` exactly, including capitalization and the `.md` extension.

**A course doesn't show up.**
Confirm its `slug` in `data/courses.json` has no spaces or uppercase letters, and matches an existing `courses/<slug>/` folder.

**GitHub Pages shows a 404 or an old version.**
Give it another minute — check **Settings → Pages** for the deployment status. Also confirm the branch/folder in step 4 is set to `main` / `/ (root)`.

**Search or a course page shows nothing.**
Open the page, then your browser's developer console (F12), and check for a red error — it will usually point at a JSON file with a typo (JSON does not allow trailing commas).

**Progress, favorites, or theme "reset."**
These are stored in your browser's `localStorage`, scoped to the exact URL. They won't carry over between `http://localhost` testing and your live GitHub Pages URL, or between different browsers/devices — that's expected, since there is no login system by design.

---

Built for Mathematics students. Powered by HTML, CSS, JavaScript, GitHub Pages, and MathJax.
