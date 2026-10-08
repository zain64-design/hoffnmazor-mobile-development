"use client";

export default function OpenModalButton({ className, children }) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event("open-lead-modal"))}
    >
      {children}
    </button>
  );
}
