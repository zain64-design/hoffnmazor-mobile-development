"use client";
import { useEffect, useRef } from "react";
import LeadFormFields from "@/app/_components/LeadForm/LeadFormFields";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const points = [
  "Free consultation and project estimate",
  "Native and cross-platform (iOS and Android)",
  "Clear timelines and transparent pricing",
  "One team from idea to App Store launch",
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), textarea, select, [tabindex]:not([tabindex="-1"])';

export default function LeadModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;

    // Lock body scroll, keeping the scrollbar gap so the page does not jump.
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    // Focus the dialog itself, not an input (no mobile keyboard pop-up).
    dialogRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="lead-modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="lead-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        tabIndex={-1}
      >
        <button type="button" className="lead-modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="lead-modal-aside">
          <div className="lead-modal-brand">Hoffnmazor</div>
          <div className="lead-modal-badge">Rated 4.8/5 by our clients</div>
          <h2 className="lead-modal-heading">
            Let&apos;s build your <span>app</span> together.
          </h2>
          <p className="lead-modal-text">
            Tell us your idea and get a free project estimate, a clear roadmap and a timeline to
            launch. No commitment.
          </p>
          <ul className="lead-modal-points">
            {points.map((p) => (
              <li key={p}>
                <span className="lead-modal-check"><CheckIcon /></span>
                {p}
              </li>
            ))}
          </ul>
          <div className="lead-modal-stats">
            <div>
              <strong>2,291</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>

        <div className="lead-modal-main">
          <h2 id="lead-modal-title" className="lead-modal-title">Start your project today</h2>
          <p className="lead-modal-sub">Free estimate · No commitment · 100% confidential</p>
          <LeadFormFields idPrefix="modal" buttonLabel="Get My Free Estimate" twoColumn projectDetails />
        </div>
      </div>
    </div>
  );
}
