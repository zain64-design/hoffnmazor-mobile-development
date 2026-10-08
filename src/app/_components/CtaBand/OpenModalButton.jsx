"use client";

// `href` is accepted and ignored so this can stand in for a <Link>.
// eslint-disable-next-line no-unused-vars
export default function OpenModalButton({ className, children, href, ...rest }) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event("open-lead-modal"))}
      {...rest}
    >
      {children}
    </button>
  );
}
