"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LeadModal = dynamic(() => import("./LeadModal"), { ssr: false });

const STORAGE_KEY = "leadModalShown";

const wasShown = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const markShown = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
};

export default function LeadModalHost() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const openedRef = useRef(false);

  useEffect(() => {
    const openModal = () => {
      openedRef.current = true;
      markShown();
      setLoaded(true);
      setOpen(true);
    };

    // CTA buttons dispatch this event.
    window.addEventListener("open-lead-modal", openModal);

    // Auto-open once per session when the user reaches the sentinel.
    let observer;
    const sentinel = document.getElementById("modal-trigger");
    if (sentinel && !wasShown() && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          observer.disconnect();
          if (!openedRef.current && !wasShown()) openModal();
        }
      });
      observer.observe(sentinel);
    }

    return () => {
      window.removeEventListener("open-lead-modal", openModal);
      if (observer) observer.disconnect();
    };
  }, []);

  if (!loaded) return null;
  return <LeadModal open={open} onClose={() => setOpen(false)} />;
}
