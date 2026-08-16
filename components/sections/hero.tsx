"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";

import { Magnetic, SplitHeading } from "@/components/motion/motion-kit";
import { Button, Container } from "@/components/ui/kit";
import { ADDRESS, CONTACT, HOURS, RATING } from "@/lib/site";

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
          src="/hero/hornet-projectors.jpg"
          alt="Honda CB1000 Hornet SP — twin LED projector headlights lit"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        <Image
          src="/hero/hornet-projectors-portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />

        {/* Lamp bloom, brought up by the ignition timeline. */}
        <div
          ref={lamp}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(38% 22% at 50% 62%, rgba(190,225,255,0.20), transparent 70%)",
          }}
        />

        {/* Legibility scrims. Directional — they clear the machine. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/10 lg:via-void/72"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/72 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void/90 to-transparent"
        />
      </motion.div>

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-12 pt-32 lg:pb-16">
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
            {ADDRESS.city}, {ADDRESS.state}
          </motion.p>

          <SplitHeading
            text="Ride out of Station Road."
            delay={0.45}
            className="t-display mt-6 max-w-[13ch] text-[clamp(2.6rem,7vw,5.6rem)] text-bright"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="measure mt-7 text-[1.0625rem] text-mute sm:text-[1.125rem]"
          >
            Honda motorcycles and scooters, sold and serviced under one roof — with
            finance, insurance, exchange and genuine parts handled at the counter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Button href={CONTACT.phoneHref} external size="block" className="sm:w-auto">
                <Phone aria-hidden="true" className="size-4" />
                Call {CONTACT.phoneDisplay}
              </Button>
            </Magnetic>
            <Button href="#lineup" variant="ghost" size="block" className="sm:w-auto">
              See the range
            </Button>
          </motion.div>

          {/* The three facts worth knowing before you scroll. */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border-y border-hair bg-hair sm:grid-cols-3"
          >
            {[
              { k: HOURS.summary, v: HOURS.time },
              { k: `Rated on ${RATING.source}`, v: `${RATING.value} / ${RATING.scale}` },
              { k: "Landmark", v: "Opposite Police Lines" },
            ].map((item) => (
              <div
                key={item.k}
                className="bg-void/80 px-4 py-4 backdrop-blur-[2px] last:col-span-2 sm:last:col-span-1"
              >
                <dt className="t-slug">{item.k}</dt>
                <dd className="t-data mt-1.5 text-[0.9375rem] text-bright">{item.v}</dd>
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
