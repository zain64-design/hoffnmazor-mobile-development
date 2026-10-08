import { PHONE_NUMBER } from "@/app/_utils/siteConfig";
import OpenModalButton from "./OpenModalButton";

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
    <OpenModalButton className="theme-btn">
      {buttonLabel} <i className="bi bi-arrow-right"></i>
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
                <a className="theme-btn style3" href={`tel:${PHONE_NUMBER}`}>
                  Call Now <i className="bi bi-telephone"></i>
                </a>
              )}
              <a className="theme-btn style2" href="#book-a-call">
                Book a Call <i className="bi bi-calendar3"></i>
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
