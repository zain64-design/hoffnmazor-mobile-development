"use client";
import useLeadForm, { BUDGET_OPTIONS, TIMELINE_OPTIONS } from "@/app/_utils/useLeadForm";
import LeadPhoneField from "./LeadPhoneField";

export default function LeadFormFields({
  idPrefix,
  buttonLabel = "Send Message",
  twoColumn = false,
  projectDetails = false,
  className = "",
}) {
  const { formik, submitStatus } = useLeadForm({ projectDetails });
  const half = twoColumn ? "col-md-6" : "col-12";
  const id = (name) => `${idPrefix}-${name}`;

  const selectField = (name, label, placeholder, options) => (
    <div className={half}>
      <div className="form-clt">
        <label htmlFor={id(name)}>{label}</label>
        <select
          id={id(name)}
          name={name}
          className="lead-select"
          required
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {formik.touched[name] && formik.errors[name] && (
          <p className="text-danger small mt-1">{formik.errors[name]}</p>
        )}
      </div>
    </div>
  );

  return (
    <form
      id={id("form")}
      className={`lead-form ${className}`.trim()}
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <div className="row g-3">
        <div className={half}>
          <div className="form-clt">
            <label htmlFor={id("name")}>Your name*</label>
            <input
              id={id("name")}
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

        <div className={half}>
          <div className="form-clt">
            <label htmlFor={id("phone")}>Your Phone*</label>
            <LeadPhoneField formik={formik} id={id("phone")} />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger small mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="form-clt">
            <label htmlFor={id("email")}>Your Email*</label>
            <input
              id={id("email")}
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

        {projectDetails && (
          <>
            {selectField("budget", "Estimated Budget*", "Select a range...", BUDGET_OPTIONS)}
            {selectField("timeline", "Project Timeline*", "When to start?", TIMELINE_OPTIONS)}
          </>
        )}

        <div className="col-12">
          <div className="form-clt">
            <label htmlFor={id("about")}>Write Message*</label>
            <textarea
              id={id("about")}
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

        <div className="col-12">
          <button
            type="submit"
            className="theme-btn lead-form-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending..." : buttonLabel}{" "}
            <i className="bi bi-arrow-right"></i>
          </button>

          {submitStatus === "success" && (
            <p className="text-success small mt-3" role="status">
              Your message has been sent successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-danger small mt-3" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
