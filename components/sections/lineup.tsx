"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";

import { RevealItem, RevealGroup } from "@/components/motion/motion-kit";
import { Spotlight } from "@/components/motion/spotlight";
import { Button, Container, Section, SectionHead } from "@/components/ui/kit";
import { modelKeySpecs } from "@/lib/format";
import { MODELS } from "@/lib/models";
import { AVAILABILITY_NOTE, CATEGORIES, CONTACT } from "@/lib/site";
import type { Category, Model } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Cutout companion to each press shot, so bikes sit on the dark ground. */
function cutoutSrc(model: Model) {
  return model.image.src.replace("/models/", "/models/cut/").replace(".jpg", ".png");
}

type Filter = "all" | Category;

export function Lineup() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? MODELS : MODELS.filter((m) => m.category === filter);

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <Section id="lineup" labelledBy="lineup-head" className="border-t border-hair-2">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="01"
            eyebrow="The range"
            id="lineup-head"
            title={
              <>
                Every Honda we sell,
                <br />
                on one floor.
              </>
            }
          />

          {/* Filter. Real state, not decoration — it narrows the grid. */}
          <div
            role="tablist"
            aria-label="Filter models by type"
            className="flex shrink-0 gap-1 rounded-full border border-hair p-1"
          >
            {chips.map((chip) => {
              const active = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    "relative min-h-11 rounded-full px-5 text-[0.875rem] font-semibold transition-colors duration-300",
                    active ? "text-white" : "text-mute hover:text-bright",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="chip"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-signal"
                    />
                  ) : null}
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((model) => (
              <motion.div
                key={model.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-ink transition-colors duration-300 hover:bg-ink-2"
              >
                <Spotlight className="h-full" tint="rgba(207,230,255,0.07)">
                  <RevealItem className="h-full">
                    <ModelCard model={model} />
                  </RevealItem>
                </Spotlight>
              </motion.div>
            ))}
          </AnimatePresence>
        </RevealGroup>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-data max-w-xl text-[0.8125rem] leading-relaxed text-faint">
            {AVAILABILITY_NOTE}
          </p>
          <Button href={CONTACT.phoneHref} external variant="ghost" size="compact">
            <Phone aria-hidden="true" className="size-4" />
            Check availability
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function ModelCard({ model }: { model: Model }) {
  const specs = modelKeySpecs(model, 2);
  const category = CATEGORIES.find((c) => c.id === model.category);

  return (
    <article className="flex h-full flex-col p-6">
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Pool of light under the machine, so it is standing on something. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 bottom-2 h-10 rounded-[50%] bg-white/[0.055] blur-xl transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:inset-x-4 group-hover:bg-white/[0.10]"
        />
        <Image
          src={cutoutSrc(model)}
          alt={`${model.name}, side profile`}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
          className="object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.05] motion-reduce:transform-none"
        />
      </div>

      <p className="t-slug mt-5">{category?.labelSingular}</p>
      <h3 className="t-h3 mt-2 text-bright transition-colors duration-300 group-hover:text-white">{model.name}</h3>

      {specs.length > 0 ? (
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-hair-2 pt-4">
          {specs.map((row) => (
            <div key={row.label}>
              <dt className="t-slug">{row.label}</dt>
              <dd className="t-data mt-1 text-[0.875rem] text-bright">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-auto flex items-center gap-2 pt-6 text-[0.875rem] font-semibold text-mute transition-colors group-hover:text-bright">
        Ask about this model
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
        />
      </div>

      {/* One link covers the card; the label above is its visible affordance. */}
      <a
        href={CONTACT.phoneHref}
        className="absolute inset-0"
        aria-label={`Call ${CONTACT.phoneDisplay} about the ${model.name}`}
      >
        <span className="sr-only">Call about the {model.name}</span>
      </a>
    </article>
  );
}
