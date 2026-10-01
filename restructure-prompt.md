This is a purchased Next.js theme (JavaScript/JSX). I want to restructure
its folders to match the structure of my own project (goodspeedpublishing).

IMPORTANT: Do NOT convert anything to TypeScript. Everything must stay
JS/JSX. Do not rename .jsx to .tsx, do not add tsconfig or types, and do
not install any TypeScript dependency. The behavior and design of the code
must remain exactly the same. Only file locations and import paths change.

Target structure (inside src/app, all with JS/JSX extensions):
- _components/   (all reusable components)
- _libs/         (library files, e.g. gsap.js)
- _utils/        (helper functions)
- (webRoutes)/   (route group: layout.jsx + page.jsx, all pages go here)
- api/           (API routes, only if the theme has any)
- globals.css    (styles go here)
- layout.jsx, not-found.jsx, favicon.ico

Current theme structure:
- (home1), home2, home3, (innerpage)
- assets/main.css
- Components/
- Data/

Mapping:
- Components -> _components. Only rename the top-level folder. Keep all
  subfolders, files and their structure exactly the same. Do not flatten
  or reorganize anything. Only update the import paths of the files
  that use them.
- assets/main.css -> globals.css (fix all imports that reference it).
- Data -> _utils or _data (tell me which one you think is better and why).
- (home1) -> rename to (webRoutes). Move the pages from (innerpage) into
  (webRoutes) as well.
- home2 and home3: leave them where they are, but update their imports
  so they still work.

Rules:
- If (home1) and (innerpage) have different layout.jsx files (different
  header/footer etc.) and merging them would change the design, do NOT
  merge them blindly. Stop and ask me how to proceed.
- Only create _libs or _utils if there is actual content for them. Do not
  create empty folders.
- Do not touch the public folder, and do not move or change any asset
  paths.
- Do not delete any file. If something seems unnecessary, list it in the
  plan and ask me.
- If jsconfig.json has path aliases, keep them working and update them
  only if needed.
- Use `git mv` to move files so history is preserved.

Process: First give me the full plan (which file goes where, and which
imports will change) and wait for my approval before making any changes.
After the changes, fix all import paths and run `npm run build` to verify
there are no errors.