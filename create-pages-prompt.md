Create two new pages for this Next.js project (JavaScript/JSX only, no
TypeScript). Neither page should have the header or footer.

1. src/app/not-found.jsx: a 404 page.
2. src/app/thank-you/page.jsx: a thank-you page shown after the contact
   form is submitted.

Design rules:
- This theme uses Bootstrap 5 and custom CSS3 (no Tailwind). First read
  globals.css (the old main.css), the root layout and a few existing
  components (buttons, headings, badges) to find the theme's colors,
  fonts, button classes and spacing.
- Reuse the existing Bootstrap grid/utility classes and the theme's own
  custom classes and CSS variables. Do not introduce new colors, new
  libraries or Tailwind.
- If you need extra styles, add a small, clearly named block at the end
  of globals.css (for example .error-page and .thank-you-page). Do not
  edit existing rules.
- Keep it minimal and centered: logo (reuse the existing logo asset),
  a heading, a short message, and a primary button using the theme's
  existing button class.
- 404: heading "Page Not Found", short friendly text, button "Back To Home"
  linking to "/".
- Thank you: heading "Thank You!", text "We have received your message
  and our team will contact you shortly.", button "Back To Home".
- Must be responsive and match the look of the landing page.
- The thank-you page must have metadata with robots noindex, nofollow,
  and a proper title.
- Check where the header/footer are rendered. If these pages would
  inherit them from a shared layout, tell me the cleanest fix (for
  example moving them into the (webRoutes) layout) and apply it only
  after my approval.
- Make sure Bootstrap CSS and JS are loaded correctly for these pages
  too (they must look the same as the rest of the site).
- Do not change any existing page's design or behavior.
- Do not delete any file.

Show me the plan first, then make the changes, then run `npm run build`
to verify there are no errors.