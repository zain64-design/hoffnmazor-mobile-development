---
name: lp-conversion-features
description: Add conversion features to this Next.js (JS/JSX) landing page: hero lead form, scroll-triggered popup form, lazy-loaded Calendly section, CTA bands after every 2 sections, and a floating WhatsApp button. Use when asked to add the hero form, popup form, Calendly, CTAs or WhatsApp button.
---

# LP conversion features

Index page: `src/app/(webRoutes)/page.jsx`. Theme: Bootstrap 5 + custom CSS in
`src/app/globals.css`. JavaScript/JSX only. Page speed is a hard requirement.

## Config (user fills these before running)
```js
WHATSAPP_NUMBER = "<<FILL: 14087463290>>"
CALENDLY_URL    = "<<FILL: https://calendly.com/isaac-thompson-hoffnmazor/30min>>"
PHONE_NUMBER    = "<<OPTIONAL: +13122483053>>"
WHATSAPP_MESSAGE = "Hey there! I would like to discuss my project."
```
Put these in `src/app/_utils/siteConfig.js`. If WHATSAPP_NUMBER or CALENDLY_URL
still contains `<<FILL`, ask me for the value in the plan step. Never invent
a number or URL.

## Global rules
- No TypeScript. No new npm packages (formik, yup, @intl-tel-input/react,
  intl-tel-input are already installed). No Tailwind. No new icon library:
  use inline SVG.
- Do not edit `ContactForm.jsx`, the API routes, or any existing CSS rule.
  Add new CSS only as namespaced blocks at the END of `globals.css`
  (`.hero-form`, `.lead-modal`, `.cta-band`, `.calendly-section`, `.wa-float`).
- Reuse the theme's colors, fonts, buttons and `.form-clt` input style. Read
  `globals.css` first for the CSS variables.
- `page.jsx` stays a server component. Only the small interactive parts are
  client components.
- Do not delete files. Do not touch `public/`, `not-found.jsx`, `thank-you/`,
  `api/`, or the root `reference/` folder.
- Reference images are visual guides only. Never copy them into `public/` or
  use them as `<img>`. Rebuild the look with HTML/CSS and existing theme assets.

## Step 0: Plan first (then stop and wait for my approval)
1. List the files in `reference/`. View every image. Files named `modal-ui*`
   = popup design, `calendly*` = Calendly section design, all other images =
   CTA designs. Show me which CTA image you map to which position.
2. List the sections in `page.jsx` top to bottom (hero = section 1) with
   numbers. State: which one is section 4 (popup trigger), where each CTA band
   goes, where the Calendly section goes.
3. Show files to create/change. Show current `/` "First Load JS" from
   `npm run build` (needed for the final comparison).
Build order after approval: shared form code, hero form, popup, Calendly,
CTA bands, WhatsApp. Run `npm run build` and commit after each feature.

## Shared form code (create first)
- `src/app/_utils/useLeadForm.js`: a hook. Copy from `ContactForm.jsx` (do not
  retype): Yup schema with the same messages, Formik setup, FormData fields
  (`name`, `phone`, `email`, `message`, `ip`, `city`, `country`, `zip_code`),
  POST `/api/contact`, resetForm, success/error status,
  `setTimeout(() => router.push("/thank-you"), 500)`. Geo: fetch `/api/geo`
  after window load, store the promise in a module-level variable so the
  request runs once per page for all forms. Returns `{ formik, submitStatus }`.
- `src/app/_components/LeadForm/LeadPhoneField.jsx`: same phone field as
  `ContactForm.jsx` (hidden input, dynamic `IntlTelInput` with `ssr:false`,
  `loadUtils`, `onChangeValidity`, `onChangeNumber`, `inputProps`). Render an
  input-sized placeholder until it loads so the layout does not shift.
- `src/app/_components/LeadForm/LeadFormFields.jsx`: the `<form>` with the same
  four fields, labels, placeholders and error messages as `ContactForm.jsx`,
  using `.form-clt` markup and the `theme-btn` button (spinner text
  "Sending..."). Props: `idPrefix` (every id/htmlFor must start with it, so
  ids stay unique on the page), `buttonLabel`, `twoColumn` (name + phone in
  one row when true). Uses `useLeadForm` inside.

## 1. Hero form
- In the hero section, remove the right-side image element and any
  `priority`/preload tied to it. Leave the image file in `public/`.
- Put `src/app/_components/HeroForm/HeroForm.jsx` in its place: a card (white,
  theme radius and shadow) with a short heading ("Get A Free Quote") and
  `LeadFormFields` (`idPrefix="hero"`, single column). Keep hero text and
  buttons unchanged. Make it look good next to the hero text on desktop and
  stack under it on mobile with no horizontal scroll.

## 2. Popup form (scroll triggered)
- Design: follow `reference/modal-ui*` closely, using theme colors.
- `LeadModalHost.jsx` (client, tiny, always mounted in `page.jsx`): holds
  `open` state; loads `LeadModal.jsx` with `next/dynamic` only when first
  opened (so it costs nothing on first load).
- Trigger: add an empty sentinel `<div id="modal-trigger"></div>` in `page.jsx`
  right before section 4 (do not change existing section markup). Use
  `IntersectionObserver`; open when it intersects OR when
  `boundingClientRect.top < 0` (user already scrolled past). Then disconnect.
  No scroll event listeners.
- Show at most once per session: `sessionStorage` key `leadModalShown`
  (wrap in try/catch). Do not auto-open if the user already opened it via a CTA.
- Also open on the window event `open-lead-modal` (used by CTA buttons).
- Behavior: Esc, close button and overlay click close it; `role="dialog"`,
  `aria-modal="true"`, label; lock body scroll while open (restore on close);
  return focus to the previously focused element; do not autofocus an input
  (avoids the mobile keyboard popping up). Do not depend on Bootstrap JS.
  Form: `LeadFormFields` (`idPrefix="modal"`, `twoColumn` as the image shows).
  Short fade/scale animation, disabled under `prefers-reduced-motion`.

## 3. Calendly (lazy)
- `src/app/_components/Calendly/CalendlySection.jsx` (client). Design: follow
  `reference/calendly*` with theme colors; section wrapper `id="book-a-call"`.
- Reserve the widget height with CSS (`min-height: 700px`, smaller on mobile)
  and show a light skeleton so there is no layout shift.
- `IntersectionObserver` with `rootMargin: "300px"`. On first intersect only:
  inject `https://assets.calendly.com/assets/external/widget.js` once
  (`async`), then call `window.Calendly.initInlineWidget({ url, parentElement })`
  with `CALENDLY_URL` plus params `hide_gdpr_banner=1`, `primary_color` and
  `text_color` (hex without `#`, taken from the theme). If the script already
  exists, just init. Do NOT use `next/script` with `beforeInteractive` and do
  not load anything before the section is near the viewport.
- Place it where Step 0 was approved.

## 4. CTA bands (every 2 sections)
- `src/app/_components/CtaBand/CtaBand.jsx` (server) and
  `OpenModalButton.jsx` (client, dispatches
  `window.dispatchEvent(new Event("open-lead-modal"))`).
- Insert one band after section 2, 4, 6 and so on. Skip a slot if that spot
  is already a CTA banner or the contact section, and never put one after the
  last section. Follow the CTA reference images for layout and text style;
  use their wording adapted to the brand (no lorem ipsum).
- Button rules: main button opens the popup (`OpenModalButton`); a "book a
  call" button links to `#book-a-call`; a "Call" button uses
  `tel:PHONE_NUMBER` (if PHONE_NUMBER is empty, ask me).

## 5. WhatsApp floating button
- `src/app/_components/WhatsAppFloat/WhatsAppFloat.jsx`, a server component
  (no JS). Fixed at bottom-right (about 20px offset; keep it clear of the iOS
  safe area), round, WhatsApp green `#25D366`, inline SVG icon, subtle hover.
- Link: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Chat on WhatsApp"`.
- Render it once in `page.jsx`. z-index below the popup overlay.

## Performance rules
- Everything below the hero loads lazily (`next/dynamic`, IntersectionObserver).
- No third-party script loads before its section/trigger. No `useEffect` scroll
  listeners. No layout shift (reserve space for the phone field, Calendly and
  the hero form). No new images.
- Hero form must not delay the hero text: keep its JS small and the phone
  library dynamic.

## Verify and report
- `npm run build` passes. Report `/` First Load JS before and after; explain
  any increase over about 15 kB.
- Check: no duplicate DOM ids, no hydration warnings, no console errors.
- All three forms validate the same way and use the same messages. Do not
  submit to the real lead URL without asking me.
- Report files created/changed, anything you assumed, and what I should check
  manually: mobile and desktop view of the hero, popup opening once at section
  4, Esc/overlay close, Calendly loading only near its section, CTAs, WhatsApp
  chat text.