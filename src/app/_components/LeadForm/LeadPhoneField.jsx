"use client";
import dynamic from "next/dynamic";
import "intl-tel-input/styles";

// Input-sized stand-in so the layout does not shift while the library loads.
const PhonePlaceholder = () => (
  <input
    type="tel"
    className="lead-phone-placeholder"
    placeholder="Your Phone"
    aria-hidden="true"
    tabIndex={-1}
    readOnly
  />
);

const IntlTelInput = dynamic(() => import("@intl-tel-input/react"), {
  ssr: false,
  loading: PhonePlaceholder,
});

export default function LeadPhoneField({ formik, id }) {
  return (
    <>
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
          id,
          placeholder: "Your Phone",
          onBlur: () => formik.setFieldTouched("phone", true),
        }}
      />
    </>
  );
}
