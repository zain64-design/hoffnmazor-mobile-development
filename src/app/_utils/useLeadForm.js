"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

// Shared by every lead form: hero, popup and contact section.
const baseSchema = {
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
};

// Extra fields used by the popup form.
const projectSchema = {
  budget: Yup.string().required("Please select your estimated budget"),
  timeline: Yup.string().required("Please select a project timeline"),
};

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $30,000",
  "$30,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1 - 3 months",
  "3 - 6 months",
  "Just exploring",
];

const emptyGeo = { ip: "", city: "", country: "", zip_code: "" };

// Shared across every form on the page so /api/geo runs once.
let geoPromise = null;

function getGeo() {
  if (typeof window === "undefined") return Promise.resolve(emptyGeo);
  if (!geoPromise) {
    geoPromise = new Promise((resolve) => {
      const fetchGeo = () =>
        fetch("/api/geo")
          .then((r) => r.json())
          .then((d) => resolve({ ...emptyGeo, ...d }))
          .catch((err) => {
            console.error("Geo fetch failed:", err);
            resolve(emptyGeo);
          });
      if (document.readyState === "complete") {
        fetchGeo();
      } else {
        window.addEventListener("load", fetchGeo, { once: true });
      }
    });
  }
  return geoPromise;
}

export default function useLeadForm({ projectDetails = false } = {}) {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState("idle");

  // Start the geo request after window load, not at submit time.
  useEffect(() => {
    getGeo();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      about: "",
      ...(projectDetails ? { budget: "", timeline: "" } : {}),
    },
    validationSchema: Yup.object(
      projectDetails ? { ...baseSchema, ...projectSchema } : baseSchema
    ),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitStatus("idle");
      try {
        // Don't let a slow geo lookup block the lead.
        const geoData = await Promise.race([
          getGeo(),
          new Promise((r) => setTimeout(() => r(emptyGeo), 1500)),
        ]);
        const formData = new FormData();
        formData.append("name", values.name.trim());
        formData.append("phone", values.phone.trim());
        formData.append("email", values.email.trim());
        // The lead API only accepts fixed fields, so budget and timeline
        // travel inside the message.
        let message = values.about.trim();
        if (projectDetails) {
          message += `\n\nEstimated budget: ${values.budget}\nProject timeline: ${values.timeline}`;
        }
        formData.append("message", message);
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

  return { formik, submitStatus };
}
