// First-party, cookie-free analytics. Each event records only: a random per-tab session id,
// the page path, the external referrer's host (or utm_source), a device class and the
// browser's time zone. No IP address, no cookies, nothing that identifies a person.

type EventName =
  | "pageview"
  | "call_click"
  | "email_click"
  | "whatsapp_click"
  | "share"
  | "contact_submit";

const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function storage(key: string, create?: () => string) {
  try {
    let value = sessionStorage.getItem(key);
    if (!value && create) {
      value = create();
      sessionStorage.setItem(key, value);
    }
    return value ?? undefined;
  } catch {
    return create?.();
  }
}

function shouldTrack() {
  if (!URL_ || !KEY || typeof window === "undefined") return false;
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return false;
  if (navigator.webdriver) return false;
  if (/bot|crawler|spider|headless|lighthouse|preview/i.test(navigator.userAgent)) return false;
  // Respect browser privacy signals
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return false;
  return true;
}

function device(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  if (w < 768) return "mobile";
  if (w < 1100 && coarse) return "tablet";
  return "desktop";
}

// Remember where this visit came from, captured once on the landing page
function source() {
  const referrer = storage("dasayonce:ref", () => {
    try {
      const ref = document.referrer ? new URL(document.referrer).hostname : "";
      return ref && ref !== window.location.hostname ? ref.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  });
  const utm = storage("dasayonce:utm", () => new URLSearchParams(window.location.search).get("utm_source") ?? "");
  return { referrer_host: referrer || null, utm_source: utm || null };
}

export function track(name: EventName, path = window.location.pathname) {
  if (!shouldTrack()) return;
  const body = {
    session_id: storage("dasayonce:sid", () => crypto.randomUUID()),
    name,
    path: path.slice(0, 300),
    ...source(),
    device: device(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone?.slice(0, 64) ?? null,
  };
  // keepalive lets the request finish even if the visitor is navigating away
  fetch(`${URL_}/rest/v1/analytics_events`, {
    method: "POST",
    keepalive: true,
    headers: {
      apikey: KEY!,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  }).catch(() => {
    /* analytics must never break the site */
  });
}

/** Records taps on phone, email and WhatsApp links anywhere on the site. */
export function trackContactClicks() {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) track("call_click");
    else if (href.startsWith("mailto:")) track("email_click");
    else if (/wa\.me|whatsapp\.com/i.test(href)) track("whatsapp_click");
  };
  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
