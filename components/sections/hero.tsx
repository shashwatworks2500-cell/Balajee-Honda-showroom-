"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, CalendarCheck } from "lucide-react";

import { Magnetic, SplitHeading } from "@/components/motion/motion-kit";
import { Button, Container } from "@/components/ui/kit";
import { ADDRESS, HOURS, RATING, TEST_RIDE_HASH } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Hero.
 *
 * One photograph, one line, two actions. The image is Honda's own CB1000
 * Hornet SP front view, graded dark and lit so the lamp cluster carries the
 * frame — the machine is the spectacle, not an effect layered over it.
 *
 * GSAP owns the load sequence here (the ignition), and nothing else on the
 * page. Scroll parallax is Motion. Both stand down for reduced motion.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const lamp = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frameEl = frame.current;
    const lampEl = lamp.current;
    if (!frameEl || !lampEl) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    void (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(
          frameEl,
          { opacity: 0, scale: 1.09 },
          { opacity: 1, scale: 1, duration: 1.7, ease: "power2.inOut" },
        );
        /* The lamps come up the way a headlight actually strikes: a stutter,
           then full. */
        tl.fromTo(
          lampEl,
          { opacity: 0 },
          { keyframes: { opacity: [0, 0.55, 0.12, 1] }, duration: 1.1 },
          "-=0.85",
        );
      }, frameEl);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden bg-void">
      {/* Photograph */}
      <motion.div
        ref={frame}
        style={{ y: imageY }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/hero/hornet-lamp.jpg"
          alt="Honda CB1000 Hornet SP — LED projector headlight lit"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        <Image
          src="/hero/hornet-lamp-portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />

        {/* Lamp bloom, brought up by the ignition timeline. One ref so GSAP
            still drives a single element; the glow has to sit where the lamp
            actually is, and that differs between the two crops. */}
        <div ref={lamp} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                "radial-gradient(46% 16% at 52% 30%, rgba(190,225,255,0.22), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                "radial-gradient(30% 24% at 70% 46%, rgba(190,225,255,0.20), transparent 70%)",
            }}
          />
        </div>

        {/* Legibility scrims. Directional — they clear the machine.
            The direction has to change with the layout: on a phone the text
            sits at the bottom, so a left-to-right scrim tuned for the desktop
            column blacked out the whole frame and the machine disappeared.
            Portrait gets a vertical scrim; the horizontal one starts at sm. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-void via-void/85 to-void/10 sm:block lg:via-void/72"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-void via-void/80 to-transparent sm:h-2/3 sm:via-void/72"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-void/85 to-transparent sm:h-32 sm:from-void/90"
        />
      </motion.div>

      {/* Padding is far tighter on a phone: at 320x568 the desktop rhythm made
          this hero 935px tall, so the actions and every fact sat below the
          fold and the first screen was a headline and nothing else. */}
      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-8 pt-24 sm:pb-12 sm:pt-32 lg:pb-16">
        <div className="lg:max-w-[58%]">
        <motion.div style={{ y: contentY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="t-slug flex flex-wrap items-center gap-x-3 gap-y-1 text-mute"
          >
            <span className="inline-flex size-1.5 rounded-full bg-signal" aria-hidden="true" />
            Authorised Honda Dealer
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            {/* The state pushed this to two lines on a 320px phone. */}
            <span className="hidden sm:inline">
              {ADDRESS.city}, {ADDRESS.state}
            </span>
            <span className="sm:hidden">{ADDRESS.city}</span>
          </motion.p>

          {/* Floor lowered to 2rem and the vw term raised, so the line breaks
              in two on a phone instead of three. */}
          <SplitHeading
            text="Ride out of Station Road."
            delay={0.45}
            className="t-display mt-4 max-w-[13ch] text-[clamp(2rem,8.5vw,5.6rem)] text-bright sm:mt-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="measure mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-mute sm:mt-7 sm:max-w-none sm:text-[1.125rem]"
          >
            Honda motorcycles and scooters, sold and serviced under one roof — with
            finance, insurance, exchange and genuine parts handled at the counter.
          </motion.p>

          {/* Booking a ride leads. Calling is one thumb away at all times —
              the sticky bar on mobile, the header on desktop — so spending the
              primary slot on it again would waste the loudest button here. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button href={`#${TEST_RIDE_HASH}`} size="block" className="sm:w-auto">
                <CalendarCheck aria-hidden="true" className="size-4" />
                Book a test ride
              </Button>
            </Magnetic>
            <Button href="#lineup" variant="ghost" size="block" className="sm:w-auto">
              See the range
            </Button>
          </motion.div>

          {/* The facts worth knowing before you scroll. The landmark is the
              first thing in the Visit section and in the header strip, so on a
              phone it steps aside rather than costing a second row here. */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            /* Short viewports (an SE at 568px) cannot carry these and the
               actions in one screen. Height is the real constraint here, not
               width, so the query is on height — and the same facts are in the
               header strip and the Visit section either way. */
            className="mt-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border-y border-hair bg-hair [@media(max-height:620px)]:hidden sm:mt-14 sm:grid-cols-3"
          >
            {[
              { k: HOURS.summary, v: HOURS.time, small: true },
              {
                k: `Rated on ${RATING.source}`,
                v: `${RATING.value} / ${RATING.scale}`,
                small: true,
              },
              { k: "Landmark", v: "Opposite Police Lines", small: false },
            ].map((item) => (
              <div
                key={item.k}
                className={cn(
                  "bg-void/80 px-4 py-3 backdrop-blur-[2px] sm:py-4",
                  item.small ? "" : "hidden sm:block",
                )}
              >
                <dt className="t-slug">{item.k}</dt>
                <dd className="t-data mt-1 text-[0.8125rem] text-bright sm:mt-1.5 sm:text-[0.9375rem]">
                  {item.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
        </div>
      </Container>

      <motion.a
        href="#lineup"
        aria-label="Scroll to the range"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 right-5 hidden size-11 items-center justify-center rounded-full border border-hair text-mute transition-colors hover:border-bright hover:text-bright lg:flex"
      >
        <ArrowDown aria-hidden="true" className="size-4 motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
}
