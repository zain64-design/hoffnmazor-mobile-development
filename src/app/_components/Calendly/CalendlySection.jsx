"use client";
import { useEffect, useRef } from "react";
import { CALENDLY_URL } from "@/app/_utils/siteConfig";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

// Theme colors (hex without #): darker theme teal for contrast on white, and --title.
const widgetUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=02b197&text_color=282c32`;

const expectations = [
  "A 30-minute one-to-one call to validate your idea and answer your questions",
  "A detailed review of your project brief and a roadmap through to launch",
  "A tailored recommendation and an estimated quote to bring your app to life",
];

function loadCalendly() {
  return new Promise((resolve, reject) => {
    if (window.Calendly) return resolve();
    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", reject, { once: true });
  });
}

export default function CalendlySection() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        loadCalendly()
          .then(() => {
            if (cancelled || el.dataset.ready) return;
            el.dataset.ready = "1";
            window.Calendly.initInlineWidget({ url: widgetUrl, parentElement: el });
          })
          .catch(() => {});
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <section id="book-a-call" className="calendly-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="calendly-content">
              <h2 className="calendly-title">
                Book A Free Consultation With Our Mobile App Experts
              </h2>
              <p className="calendly-desc">
                Our team of designers and developers has helped startups and growing businesses
                turn ideas into fast, secure iOS and Android apps. Pick a time that suits you and
                talk directly with an expert.
              </p>
              <h3 className="calendly-subtitle">What To Expect?</h3>
              <ul className="calendly-list">
                {expectations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="calendly-frame">
              <div className="calendly-skeleton" aria-hidden="true">
                <span className="sk-circle"></span>
                <span className="sk-line sk-w40"></span>
                <span className="sk-line sk-w60"></span>
                <span className="sk-grid"></span>
              </div>
              <div
                ref={widgetRef}
                className="calendly-widget"
                role="region"
                aria-label="Schedule a call with Calendly"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
