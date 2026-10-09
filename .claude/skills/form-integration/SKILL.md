---
name: form-integration
description: Integrate the contact form (Formik + Yup validation, @intl-tel-input/react phone field, geo data, lead API, thank-you redirect) into this Next.js JS/JSX project for the hoffnmazor brand. Use when asked to add or wire up form validation, the contact form, or lead submission.
---

# Form integration (hoffnmazor)

This skill is fully self-contained. All code needed is written below. Do not
look for any other project or reference file.

## What this does
Adds a working contact form flow, ported from my goodspeedpublishing project:
1. Form with Formik + Yup validation.
2. Phone field using `@intl-tel-input/react`.
3. Geo data (ip, city, country, zip) fetched from `/api/geo`.
4. Form posts to `/api/contact`, which forwards the lead to the leads server.
5. On success the user is redirected to `/thank-you`.

## Brand values (these are the only things that differ from the old project)
- brand_name: `hoffnmazor.com`
- lead_area: `https://hoffnmazor-mobile-development.vercel.app/`
- Lead URL: `https://leads.infinityprojectmanager.com/brand/hoffnmazor/lead`

## Project rules
- JavaScript/JSX only. No TypeScript: no `.ts/.tsx`, no type annotations, no
  tsconfig, no `@types` packages.
- The theme uses Bootstrap 5 and custom CSS3, NOT Tailwind. Do not add Tailwind.
- Follow the existing folder structure (`src/app/_components`, `api`,
  `(webRoutes)`, `globals.css`).
- Do not change the page design. Reuse the theme's existing form markup,
  input classes and button classes.
- Do not delete any file. Do not touch `public/`.
- **Scope: only the contact form in `src/app/_components/ContactInfo/ContactInfo.jsx`.**
  Do not add or change any other form on the page (hero, popups, etc.).
  Do not create a separate form component or a new folder for it.
- Never submit test data to the real lead URL without asking me first.

## Process
1. **Plan first.** Open `src/app/_components/ContactInfo/ContactInfo.jsx`.
   This is the only form to work on (the "Ready To Get Started?" contact
   form). Show me the plan: files to create or change, packages to install.
   Wait for my approval before changing anything.
2. **Install packages** (only the missing ones): `formik`, `yup`,
   `@intl-tel-input/react`, `intl-tel-input`. Nothing else. If there is a
   peer dependency conflict, tell me. Do not use `--force`.
3. **Create the two API routes** exactly as given in section A and B.
4. **Update the existing `ContactInfo.jsx`** in
   `src/app/_components/ContactInfo/`. Put the form logic from section C
   into this file, replacing its old static form markup/handler. Keep the
   rest of the ContactInfo component (cards, headings, image, layout)
   exactly as it is. If the file is a server component, keep the page
   sections server-rendered where possible and move only the form into a
   small client part (`"use client"`) inside the same ContactInfo folder
   (e.g. `ContactInfo/ContactForm.jsx`) imported by `ContactInfo.jsx`.
   Adapt only the markup (see "Markup adaptation" below). Logic stays exact.
5. **Check `/thank-you` exists.** If not, tell me. Do not create it unless I ask.
6. **Verify** with the checklist in section D.

## A. `src/app/api/contact/route.js`

```js
export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();
    const ip = formData.get("ip")?.trim() || "";
    const city = formData.get("city")?.trim() || "";
    const country = formData.get("country")?.trim() || "";
    const zip_code = formData.get("zip_code")?.trim() || "";

    if (!name || !phone || !email || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      name,
      phone,
      email,
      message,
      ip,
      city,
      country,
      zip_code,
      brand_name: "hoffnmazor.com",
      lead_area: "https://hoffnmazor-mobile-development.vercel.app/",
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(
      `https://leads.infinityprojectmanager.com/brand/hoffnmazor/lead?${params.toString()}`,
      { method: "GET", redirect: "manual", signal: controller.signal },
    );

    clearTimeout(timeoutId);

    if (res.status >= 200 && res.status < 400) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false }, { status: res.status });
  } catch (err) {
    console.error("Lead submission error:", err);
    return Response.json({ success: false }, { status: 500 });
  }
}
```

## B. `src/app/api/geo/route.js`

```js
export async function GET(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "";
  const res = await fetch(`https://api.ipapi.is/?key=${key}`);
  const data = await res.json();
  return Response.json({
    ip: data.ip || "",
    city: data.location?.city || "",
    country: data.location?.country || "",
    zip_code: data.location?.zip || "",
  });
}
```

## C. Form logic and markup (the form part of `src/app/_components/ContactInfo/ContactInfo.jsx`)

This code is only the form. Do NOT replace the whole ContactInfo component
with it. Either put it inside `ContactInfo.jsx` where the old form is, or
keep it as `ContactInfo/ContactForm.jsx` and import it into `ContactInfo.jsx`.

Keep every line of logic exactly as below. Only the JSX markup (class names,
wrappers, layout) may be adapted to match the theme's existing form.

```jsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
const IntlTelInput = dynamic(() => import("@intl-tel-input/react"), {
  ssr: false,
});
import "intl-tel-input/styles";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: Yup.string().trim().required("Phone number is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  about: Yup.string()
    .trim()
    .min(10, "Please provide more details (minimum 10 char)")
    .required("Please tell us about your app idea"),
});

export default function ContactForm() {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | success | error
  const [geoData, setGeoData] = useState({
    ip: "",
    city: "",
    country: "",
    zip_code: "",
  });

  useEffect(() => {
    const fetchGeo = async () => {
      try {
        const d = await fetch("/api/geo").then((r) => r.json());
        setGeoData(d);
      } catch (err) {
        console.error("Geo fetch failed:", err);
      }
    };
    if (document.readyState === "complete") {
      fetchGeo();
    } else {
      window.addEventListener("load", fetchGeo, { once: true });
      return () => window.removeEventListener("load", fetchGeo);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      about: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitStatus("idle");
      try {
        const formData = new FormData();
        formData.append("name", values.name.trim());
        formData.append("phone", values.phone.trim());
        formData.append("email", values.email.trim());
        formData.append("message", values.about.trim());
        formData.append("ip", geoData.ip);
        formData.append("city", geoData.city);
        formData.append("country", geoData.country);
        formData.append("zip_code", geoData.zip_code);

        const res = await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          resetForm();
          setSubmitStatus("success");
          setTimeout(() => router.push("/thank-you"), 500);
        } else {
          setSubmitStatus("error");
        }
      } catch {
        setSubmitStatus("error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="name">Your Name*</label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your Name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger small mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="phone">Your Phone*</label>
          <input type="hidden" name="phone" value={formik.values.phone} />
          <IntlTelInput
            initialCountry="us"
            loadUtils={() => import("intl-tel-input/utils")}
            onChangeValidity={(isValid) => {
              if (!isValid && formik.values.phone) {
                formik.setFieldError("phone", "Enter a valid phone number");
              }
            }}
            onChangeNumber={(num) => {
              formik.setFieldValue("phone", num);
              formik.setFieldTouched("phone", true, false);
            }}
            inputProps={{
              name: "phone",
              id: "phone",
              className: "form-control",
              onBlur: () => formik.setFieldTouched("phone", true),
            }}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-danger small mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="email">Your Email*</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your Email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger small mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="about">Tell us about your app idea*</label>
          <textarea
            id="about"
            name="about"
            rows={4}
            placeholder="Tell us about your app idea"
            className="form-control"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.about && formik.errors.about && (
            <p className="text-danger small mt-1">{formik.errors.about}</p>
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <p className="text-success small mt-3">
              Your message has been sent successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-danger small mt-3">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
```

### Markup adaptation (the only part you may change)
- The Bootstrap classes above are defaults. Replace `form-control`,
  `btn btn-primary`, the labels, the wrappers and the grid with the exact
  classes/structure the theme's existing contact form already uses, so the
  design does not change.
- Field labels/placeholders should match the theme's current form text.
- Phone field is required by the API, so it must stay even if the old
  theme form had no phone field. Add it in the same style as other inputs.
- Add a small CSS block at the end of `globals.css` so the phone field is
  full width and matches the other inputs, for example:
  `.iti { width: 100%; }` plus any input height/border rules needed to
  match the theme. Do not edit existing rules.
- Do not touch any other form on the page. Only the form inside
  `ContactInfo.jsx` is in scope.

## D. Verification checklist
- `npm run build` passes with no errors caused by this work.
- No TypeScript files or type syntax were added.
- Submitting an empty form shows all validation messages.
- Invalid email, short name and a message under 10 characters show the
  correct errors. An invalid phone number shows "Enter a valid phone number".
- The phone field (flag dropdown) renders correctly and its styles load.
- No file other than `ContactInfo` (and its folder), the two API routes,
  `globals.css` and `package.json` was changed.
- Success path redirects to `/thank-you` after about 500ms (ask me before
  testing against the real lead URL).

## Report back
List created/changed files, installed packages, anything different from
this skill and why, and anything I need to do manually.
