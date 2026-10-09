---
name: project-cleanup
description: Remove everything from this Next.js (JS/JSX) landing page project that the single index page does not use: extra pages, unused components and sub-components, unused data files, unused images in public/, and unused CSS in globals.css (via PurgeCSS). Use when asked to clean up, trim or purge the project.
---

# Project cleanup (single landing page)

## Goal
This project came from a purchased theme with many demo pages and components.
Only ONE page is used: `src/app/(webRoutes)/page.jsx` (the index page). Keep
only what that page actually needs and remove the rest: pages, components,
data files, images and CSS. Design and behavior must stay exactly the same.

## Hard rules
- **NEVER delete these, under any circumstance:** `src/app/not-found.jsx`
  and everything inside `src/app/thank-you/`. They already exist and are
  part of the final site. They must also never be moved, renamed or
  emptied. The same applies to `src/app/api/**`, `src/app/favicon.ico`
  and `src/app/globals.css`. If your plan lists any of these for
  deletion, the plan is wrong. Fix it before showing it to me.
- Nothing is deleted until I approve the plan. Plan first, then wait.
- Work in phases (see below). After each phase: run `npm run build`, fix
  errors, and tell me. Do one git commit per phase (ask me before the first
  commit if the working tree is dirty).
- Use `git rm` for deletions so everything can be restored from git.
- Never touch: `node_modules`, `.next`, `.git`, `package.json` /
  lockfile (only report unused dependencies, do not remove them), config
  files (`next.config.*`, `jsconfig.json`, `eslint.config.*`, `postcss.*`).
- Do not change JSX markup, logic, class names or text of kept files. Only
  imports may change if a path is wrong, and only if something breaks.
- JavaScript/JSX only. Do not add TypeScript. Do not add Tailwind.
- Do not install anything into the project. Tools like PurgeCSS must be run
  through `npx` or from a temporary folder outside the project.
- If you are unsure whether something is used, KEEP it and list it under
  "Uncertain" in the plan for me to decide.

## What is the "kept set"
Start from these entry points and follow imports recursively:
1. `src/app/(webRoutes)/page.jsx` (the index page)
2. The layout chain this page renders inside: `src/app/layout.jsx` (or
   `layout.js`) and `src/app/(webRoutes)/layout.jsx` (header, footer,
   scripts, providers, fonts and CSS imports live here and are needed even
   though they are not in page.jsx)
3. Files I created that ALREADY EXIST and must be kept (they are not
   imported by page.jsx but are used by Next.js or by the form):
   `src/app/not-found.jsx`, `src/app/thank-you/**`, `src/app/api/**`,
   `src/app/favicon.ico`, `src/app/globals.css`, plus `robots` / `sitemap`
   files if present, and EVERYTHING these files import (components,
   images, CSS, data). Treat all of them as entry points, like page.jsx.

Follow every kind of reference: static `import`, `require`, `import()` and
`next/dynamic(() => import(...))`, re-exports from `index.js` files, path
aliases from `jsconfig.json` (e.g. `@/`), CSS imports, and data files
imported by components. A component is kept only if it is reachable from the
kept set. Sub-components inside a kept component's folder follow the same
rule (kept only if actually imported).

Write the reachability check as a small throwaway Node script placed OUTSIDE
`src` (for example in the OS temp folder). Do not leave it in the project.
It must walk directories with `fs` (no glob patterns, see "Path handling")
and resolve the `@/` alias from `jsconfig.json`.

## Path handling (read this before touching any file)
This project has Next.js private folders (names starting with `_`, e.g.
`_components`, `_libs`, `_utils`) and route groups (names in parentheses, e.g.
`(webRoutes)`, `(innerpage)`). These are normal folders on disk and you MUST be
able to read them. The usual failure is path handling, not permissions:
- In shell commands, always wrap paths in single quotes:
  `ls 'src/app/(webRoutes)'`, `cat 'src/app/(webRoutes)/page.jsx'`. Unquoted
  parentheses break the shell.
- Parentheses are special characters in glob patterns. Never pass a glob
  string that contains `(webRoutes)` to any tool (glob, fast-glob, PurgeCSS,
  eslint). Instead, build the file list first and pass explicit file paths.
- Build the inventory with `git ls-files 'src' 'public'` (plus
  `git ls-files --others --exclude-standard` for untracked files), or with a
  recursive `fs.readdirSync` walk. Do not rely on glob patterns for this.
- Do not skip folders whose names start with `_`. Do not skip folders in
  parentheses. Treat them like any other folder.
- Before making the plan, print the file counts for `src/app/_components`,
  `src/app/(webRoutes)` and `public`. If any count is 0 or you got an error,
  STOP and show me the exact error. Do not continue with a partial inventory
  and do not decide that files are unused just because you could not read them.
- If a tool is blocked by permissions, tell me which command or path needs
  approval instead of working around it.

## Phases

### Phase 1: Pages, components, data
Remove everything not in the kept set:
- Other route folders (e.g. `home2`, `home3`, `(innerpage)`, any demo pages)
  and their `layout`/`page` files
- Unused components and sub-components (e.g. in `_components/`)
- Unused data/helper/hook/util files
- Empty folders left behind
Report any nav/menu links in the kept header/footer that point to removed
pages. Do NOT edit them. Just list them so I can decide.

### Phase 2: Images and other public assets
Find every asset reference in the KEPT files only:
- `src="/..."`, `<Image src=...>`, `srcSet`, `<source>`, `<video poster>`
- static imports of images, `url(...)` in kept CSS, inline `style`
  backgrounds, `backgroundImage` in JSX
- metadata/openGraph/icons/manifest images, favicon
- image paths stored in kept data files
- template strings like `/img/${name}.png`: treat the whole matching folder
  as used and mark it "Uncertain"
Then list every file in `public/` that is an image (png, jpg, jpeg, webp,
avif, svg, gif, ico) with no reference. Delete only those after approval.
Non-image files in `public/` (fonts, scripts, videos, json, pdf) are never
deleted automatically: list them and tell me which ones look unused. Fonts
referenced by CSS and scripts referenced in layouts must stay.

### Phase 3: CSS purge (globals.css)
Goal: `globals.css` should contain only CSS that the kept components use.
1. Find where the theme CSS comes from: `globals.css` (renamed from
   `main.css`), plus any other CSS the layout imports (bootstrap, icon
   fonts, animate, swiper, etc.). Tell me the files and their sizes first.
2. Keep a backup of the current CSS OUTSIDE `src` (e.g. temp folder) and
   rely on the phase 1/2 commits for git history.
3. Run PurgeCSS via `npx` with `content` set to an explicit array of ALL
   kept `.jsx/.js` file paths (components, layouts, pages, data files), not
   glob strings. Do not purge against the deleted files.
4. Safelist everything added at runtime by JS or libraries, at minimum
   patterns for: `wow`, `animated`, `fadeIn*`, `active`, `show`, `showing`,
   `collapse`, `collapsing`, `fade`, `swiper*`, `slick*`, `iti*`
   (intl-tel-input), `odometer*`, `offcanvas*`, `modal*`, `accordion*`,
   `sticky*`, `header-*`, `scroll*`, `gsap*`, `is-*`, `has-*`, `bi`, `bi-*`
   used by kept files, and any class toggled in kept JS (search for
   `classList`, `className=` with conditions, template strings, GSAP code,
   and `useState`-driven classes). Also keep: `html`, `body`, `:root`
   variables, `@font-face`, `@keyframes` that are used, `@media` rules for
   kept selectors, and vendor prefixes.
5. Do not remove CSS variables (`--...`) that are used anywhere in kept
   CSS or JSX.
6. Show me before/after file sizes and a summary of what was removed. Then
   write the purged result into `globals.css` (keeping its position in the
   import order and the original order of rules).
7. If any CSS import in the layout becomes empty or unused, report it.

### Phase 4: Report only (no changes)
- npm dependencies in `package.json` that no kept file imports (report the
  list only; I will decide)
- Remaining unused files you were unsure about
- ESLint warnings for unused imports/variables in kept files (report only)

## Verification (after every phase and at the end)
- `src/app/not-found.jsx` and `src/app/thank-you/page.jsx` still exist,
  render without errors, and every image, component and CSS rule they use
  is still present. Check this explicitly in your report.
- `npm run build` passes.
- `npm run dev`: the index page loads with no 404s for images, fonts or
  scripts (check the dev server/terminal output and search the code for
  broken paths).
- Search the kept files for any import that points to a deleted path.
- Anything that looks visually different must be reported. If you can,
  take before/after screenshots of the index page (desktop and mobile
  width) with a temporary Playwright script outside the project and
  compare them. If you cannot, tell me what I should check manually:
  header menu, hero, sliders, accordions/FAQ, tabs, counters, animations,
  the contact form (including the phone flag dropdown), and the footer.

## Plan format (show this before any deletion)
1. Kept set summary: number of pages, components, data files
2. Files/folders to delete (grouped, with counts)
3. Images to delete (count, total size) and non-image assets that look unused
4. CSS files involved, current sizes, and the planned safelist
5. "Uncertain" list with your recommendation for each
6. Broken-link warnings (menu links to removed pages)
Then stop and wait for my approval.

## Report back at the end
Counts and sizes before/after (files, `public/` size, CSS size), anything
uncertain that was kept, anything that needs my manual action.