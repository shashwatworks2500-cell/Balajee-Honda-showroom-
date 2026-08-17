"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { ADDRESS, BUSINESS_NAME, MAP_EMBED } from "@/lib/site";

type Status = "idle" | "ready" | "unavailable";

/**
 * The showroom on a real map.
 *
 * A bare <iframe> gets three things wrong here, all handled below.
 *
 * 1. It cannot be trusted to fail quietly. When the embed is blocked — privacy
 *    extensions block Google embeds routinely — the browser renders its own
 *    light error page inside the frame, and that page fires `load` just like a
 *    real one. So `onLoad` cannot tell success from failure, and a near-black
 *    page ends up with a grey slab in it. The embed is therefore probed first
 *    and the frame is only mounted once it is known to be reachable; until
 *    then the panel shows its own dark plate carrying the address.
 * 2. Dropped into a scrolling page it swallows wheel and touch scrolling, so
 *    someone scrolling past on a phone gets caught panning the map. It stays
 *    inert until deliberately activated.
 * 3. It pops in. The frame fades up once loaded instead.
 *
 * The probe only runs once the panel is near the viewport, so a visitor who
 * never scrolls this far never pays for it.
 */
export function MapPanel() {
  const [status, setStatus] = useState<Status>("idle");
  const [loaded, setLoaded] = useState(false);
  const [live, setLive] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        // An opaque response is all we need: it proves the request was not
        // blocked. We never read the body, so no-cors costs us nothing.
        fetch(MAP_EMBED, { mode: "no-cors", cache: "force-cache" })
          .then(() => !cancelled && setStatus("ready"))
          .catch(() => !cancelled && setStatus("unavailable"));
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="group/map relative h-[22rem] overflow-hidden border border-hair bg-ink-2 lg:h-[30rem]"
    >
      {/* The plate. Covered once the map paints, and the whole story if it
          never does — so it is written to stand on its own. */}
      <div className="absolute inset-0 grid place-items-center px-8 text-center">
        <div>
          <MapPin aria-hidden="true" className="mx-auto size-6 text-signal" />
          <p className="t-h3 mt-4 text-bright">{BUSINESS_NAME}</p>
          <p className="t-data mt-2 text-[0.8125rem] leading-relaxed text-mute">
            {ADDRESS.street}, {ADDRESS.locality}
            <br />
            {ADDRESS.city}, {ADDRESS.state} {ADDRESS.postalCode}
          </p>
        </div>
      </div>

      {status === "ready" ? (
        <iframe
          src={MAP_EMBED}
          title={`Map showing ${BUSINESS_NAME}, ${ADDRESS.street}, ${ADDRESS.city}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          style={{ colorScheme: "dark" }}
          className={[
            "absolute inset-0 block size-full border-0 transition-opacity duration-700 ease-[var(--ease-out-expo)]",
            loaded ? "opacity-100" : "opacity-0",
            // Inert until activated, so the page scrolls past it cleanly.
            live ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
        />
      ) : null}

      {/* No "open in Maps" chip here on purpose: Google puts its own controls
          in these corners, and the Get directions button in this same section
          already points at exactly that link. */}

      {/* Activation layer. A button, so a keyboard reaches the map too. Once
          the map is live it does not come back — nobody wants to re-arm a map
          they are already using. */}
      {loaded && !live ? (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute inset-0 flex cursor-pointer items-end justify-center bg-transparent pb-6 transition-colors duration-300 hover:bg-void/20 focus-visible:bg-void/20"
        >
          <span className="flex items-center gap-2 border border-hair bg-void/90 px-4 py-2.5 text-[0.8125rem] font-semibold text-bright backdrop-blur-sm transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/map:-translate-y-0.5 motion-reduce:transform-none">
            <MapPin aria-hidden="true" className="size-4 text-signal" />
            <span className="[@media(pointer:coarse)]:hidden">Click to explore the map</span>
            <span className="hidden [@media(pointer:coarse)]:inline">Tap to explore the map</span>
          </span>
        </button>
      ) : null}
    </div>
  );
}
