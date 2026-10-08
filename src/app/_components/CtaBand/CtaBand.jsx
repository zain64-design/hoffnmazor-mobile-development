import { PHONE_NUMBER } from "@/app/_utils/siteConfig";
import OpenModalButton from "./OpenModalButton";

const QuoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-4.6A8.4 8.4 0 1 1 21 11.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4zM3 19a2 2 0 0 0 2 2h1v-6H3v4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// variant "band": full-width strip with title, text and three buttons.
// variant "bar": slim rounded bar with one line of text and one button.
const CtaBand = ({ variant = "bar", title, text, buttonLabel = "Get A Free Quote" }) => {
  const mainButton = (
    <OpenModalButton className="cta-band-btn cta-band-btn-primary">
      <QuoteIcon /> {buttonLabel}
    </OpenModalButton>
  );

  if (variant === "band") {
    return (
      <section className="cta-band cta-band-full">
        <div className="container">
          <div className="cta-band-inner">
            <div className="cta-band-copy">
              <h2 className="cta-band-title">{title}</h2>
              {text && <p className="cta-band-text">{text}</p>}
            </div>
            <div className="cta-band-actions">
              {mainButton}
              {PHONE_NUMBER && (
                <a className="cta-band-btn cta-band-btn-outline" href={`tel:${PHONE_NUMBER}`}>
                  <PhoneIcon /> Call Now
                </a>
              )}
              <a className="cta-band-btn cta-band-btn-light" href="#book-a-call">
                <CalendarIcon /> Book a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-band cta-band-slim">
      <div className="container">
        <div className="cta-band-bar">
          <p className="cta-band-bar-text">
            <span className="cta-band-icon"><HeadsetIcon /></span>
            {title}
          </p>
          {mainButton}
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
