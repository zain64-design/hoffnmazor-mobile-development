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
    <form
      id="contact-form"
      className="contact-form-items"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <div className="row g-4">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
          <div className="form-clt">
            <span>Your name*</span>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger small mt-1">{formik.errors.name}</p>
            )}
          </div>
        </div>

        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
          <div className="form-clt">
            <span>Your Phone*</span>
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
                placeholder: "Your Phone",
                onBlur: () => formik.setFieldTouched("phone", true),
              }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger small mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
          <div className="form-clt">
            <span>Your Email*</span>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger small mt-1">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".7s">
          <div className="form-clt">
            <span>Write Message*</span>
            <textarea
              id="about"
              name="about"
              rows="2"
              placeholder="Write Message"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.about && formik.errors.about && (
              <p className="text-danger small mt-1">{formik.errors.about}</p>
            )}
          </div>
        </div>

        <div className="col-lg-7 wow fadeInUp" data-wow-delay=".9s">
          <button
            type="submit"
            className="theme-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending..." : "Send Message"}{" "}
            <i className="bi bi-arrow-right"></i>
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
