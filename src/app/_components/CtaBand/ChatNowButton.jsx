"use client";
import { WHATSAPP_URL } from "@/app/_utils/siteConfig";

// Opens the Zendesk chat once its snippet is on the page (window.zE).
// Until then it falls back to WhatsApp so the button is never dead.
export default function ChatNowButton({ className, children }) {
  const openChat = () => {
    if (typeof window.zE === "function") {
      window.zE("messenger", "open");
    } else {
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button type="button" className={className} onClick={openChat}>
      {children}
    </button>
  );
}
