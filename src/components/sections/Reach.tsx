
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { PillLink } from "@/components/ui/PillLink";
import { retailers } from "@/data/content";
import { img } from "@/lib/design";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STORES_FROM = 5000;
const STORES_TO = 16000;

const formatStores = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Two identical halves allow the marquee to move by exactly 50%
 * for a seamless infinite loop.
 */
const HALF = [...retailers, ...retailers];
const TRACK = [...HALF, ...HALF];

const MARQUEE_DURATION = 40;

const LOGO_HEIGHT = 52;
const LOGO_SLOT_WIDTH = 220;
const LOGO_SLOT_HEIGHT = 80;

/** Company statement, store count, US map and retailer logos under one arched backdrop. */
export function Reach() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const statement = q("[data-reach-statement]")[0];
      const stores = q<HTMLElement>("[data-reach-count]")[0];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Leaves, then statement
        gsap
          .timeline({
            scrollTrigger: {
              trigger: statement,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1,
            },
          })
          .fromTo(
            q("[data-reach-leaves]"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1, ease: "none" },
          )
          .fromTo(
            q("[data-reach-copy]"),
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
          );

        // 2. Store counter and caption
        const counter = { value: STORES_FROM };

        stores.textContent = formatStores(STORES_FROM);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: q("[data-reach-figure]")[0],
              start: "top 80%",
              once: true,
            },
          })
          .to(counter, {
            value: STORES_TO,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              stores.textContent = formatStores(counter.value);
            },
          })
          .fromTo(
            q("[data-reach-caption]"),
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.8, ease: "power1.out" },
          );

        // 3. Endless right-to-left logo marquee
        gsap.to(q("[data-reach-marquee]"), {
          xPercent: -50,
          duration: MARQUEE_DURATION,
          ease: "none",
          repeat: -1,
        });

        return () => {
          stores.textContent = formatStores(STORES_TO);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative isolate">
      {/* Arched Background */}
      <Image
        src={img("about-arc.svg")}
        alt=""
        aria-hidden
        width={3568}
        height={3568}
        className="pointer-events-none absolute top-0 left-1/2 -z-10 size-[3568px] max-w-none -translate-x-1/2"
      />

      {/* Company Statement */}
      <div data-reach-statement>
        <Image
          data-reach-leaves
          src={img("about-leaves.svg")}
          alt=""
          aria-hidden
          width={515}
          height={266}
          className="mx-auto mt-[126px] h-auto w-[min(515px,60vw)] rotate-[7.64deg]"
        />

        <p
          data-reach-copy
          className="mx-auto mt-[54px] max-w-[1647px] px-4 text-center font-valturin text-statement text-white capitalize"
        >
          Natural Wunderz is a Southern California beauty company offering
          hair, body, and skin products. With integrated development,
          branding, sourcing, manufacturing, and fulfillment, we scale
          proven products and launch new concepts quickly with quality,
          value, and shelf appeal.
        </p>
      </div>

      {/* Store Counter */}
      <div
        data-reach-figure
        className="relative mt-[clamp(48px,9.2vw,177px)] flex h-[0.8644em] items-center justify-center font-valturin text-mega text-white"
      >
        <p className="leading-[1.48]">
          <span className="sr-only">
            {formatStores(STORES_TO)} US stores
          </span>

          <span data-reach-count aria-hidden>
            {formatStores(STORES_TO)}
          </span>
        </p>

        <p
          data-reach-caption
          aria-hidden
          className="absolute top-[0.3085em] left-[87%] -translate-x-1/2 leading-none"
        >
          <span className="block text-[0.0644em] leading-[1.48] tracking-[-0.02em] whitespace-nowrap">
            US Stores
          </span>
        </p>
      </div>

      {/* US Map */}
      {/* 
      <Image
        src={img("us-map.svg")}
        alt="Map of the United States with pins marking retail locations"
        width={1434}
        height={969}
        className="relative mx-auto -mt-[clamp(0px,3.6vw,69px)] h-auto w-[min(1434px,calc(100%-32px))]"
      />
      */}

      {/* Retailer Logo Marquee */}
      <div className="relative mt-[80px] overflow-x-clip">
        <ul
          data-reach-marquee
          className="flex w-max items-center will-change-transform"
        >
          {TRACK.map((r, i) => {
            const isCopy = i >= HALF.length;

            return (
              <li
                key={`${r.name}-${i}`}
                aria-hidden={isCopy || undefined}
                className="flex shrink-0 items-center justify-center px-8"
                style={{
                  width: LOGO_SLOT_WIDTH,
                  height: LOGO_SLOT_HEIGHT,
                }}
              >
                <div
                  className="flex w-full items-center justify-center"
                  style={{ height: LOGO_HEIGHT }}
                >
                  <Image
                    src={r.src}
                    alt={isCopy ? "" : r.name}
                    width={Math.round(r.width)}
                    height={Math.round(r.height)}
                    className="h-full w-full object-contain brightness-0 invert"
                    sizes="220px"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {/* Left Fade */}
        <Image
          src={img("logos-fade-left.svg")}
          alt=""
          aria-hidden
          width={418}
          height={418}
          className="pointer-events-none absolute top-[-117px] left-[-178px] size-[418px] max-w-none"
        />

        {/* Right Fade */}
        <Image
          src={img("logos-fade-right.svg")}
          alt=""
          aria-hidden
          width={418}
          height={418}
          className="pointer-events-none absolute top-[-117px] right-[-177px] size-[418px] max-w-none"
        />
      </div>

      {/* CTA */}
      <div className="mt-[75px] flex justify-center">
        <PillLink href="#contact" tone="light">
          Discuss Your Requirement
        </PillLink>
      </div>
    </section>
  );
}
