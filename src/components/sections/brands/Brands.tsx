"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { brands } from "@/data/content";
import { cq, img } from "@/lib/design";
import { BrandCard } from "./BrandCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Each card behind the front one sits 20px further right and up (Figma `Brands` layer). */
const STACK_STEP = 20;
const STACK_W = 1023;
/** Scroll distance spent bringing in each card while the stage is held. */
const SCROLL_PER_CARD_VH = 80;

export function Brands() {
  const last = brands.length - 1;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      const stage = stageRef.current!;
      const stack = stackRef.current!;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * The stage is the original section, laid out exactly as before. It is taller than the
         * viewport, so it sticks with its bottom on the viewport bottom: the whole card stack is
         * in view, overlapping the cream heading panel, while the cards come in.
         */
        const stickyTop = () => Math.min(0, window.innerHeight - stage.offsetHeight);
        const syncTop = () => {
          stage.style.top = `min(0px, calc(100vh - ${stage.offsetHeight}px))`;
        };
        syncTop();
        const observer = new ResizeObserver(() => {
          syncTop();
          ScrollTrigger.refresh();
        });
        observer.observe(stage);

        // Heading from the left, description from the right, once the block reaches mid-screen
        gsap
          .timeline({
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          })
          .from(headingRef.current, { x: -50, autoAlpha: 0, duration: 1, ease: "power3.out" })
          .from(descriptionRef.current, { x: 50, autoAlpha: 0, duration: 1, ease: "power3.out" }, "<0.15");

        // While the stage holds, each card rises from below the viewport into its place in the stack
        const cards = gsap.utils.toArray<HTMLElement>("[data-brand-card]", stack);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            // From the moment the stage sticks until it is released at the end of the section
            start: () => `top ${stickyTop()}px`,
            end: () => `bottom ${stickyTop() + stage.offsetHeight}px`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            // Far enough to start fully below the viewport, rotation included
            { y: () => Math.max(window.innerHeight, stack.offsetHeight * 1.5) },
            { y: 0, duration: 1, ease: "power2.out" },
            i,
          );
        });
        // A short beat with the full stack in place before the page moves on
        tl.to({}, { duration: 0.25 });

        return () => {
          observer.disconnect();
          stage.style.top = "";
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    // Tall parent: the stage plus the scroll distance used to bring the cards in
    <section ref={sectionRef} id="brands" className="relative">
      <div
        ref={stageRef}
        className="relative isolate px-4 pb-[clamp(96px,8.3vw,160px)] motion-safe:sticky sm:px-[108px]"
      >
        {/* Cream stadium behind the heading; the card stack overlaps its lower edge */}
        <div
          aria-hidden
          className="absolute inset-x-4 top-0 -z-20 rounded-[450px] bg-cream sm:inset-x-[108px]"
          style={{ bottom: "clamp(240px, 30vw, 576px)" }}
        />
        <Image
          src={img("brands-leaves.svg")}
          alt=""
          aria-hidden
          width={823}
          height={425}
          className="pointer-events-none absolute top-[clamp(300px,26.6vw,511px)] left-[6.51%] -z-10 h-auto w-[42.86%] max-w-none"
        />

        <div className="mx-auto max-w-[1102px] pt-[clamp(72px,8.96vw,172px)] text-forest">
          <h2 ref={headingRef} className="font-valturin text-display uppercase">
            Distinct Brands.
            <br />
            One Thoughtful Approach.
          </h2>
          <p ref={descriptionRef} className="mt-6 ml-auto max-w-[470px] text-right text-body sm:mt-[35px]">
            Explore our family of beauty and personal-care brands. Each has its own personality,
            ingredient story and product focus, creating distinct collections for different consumers
            and everyday routines.
          </p>
        </div>

        {/* Cards stack one on top of another: first in the list is furthest back */}
        <div
          ref={stackRef}
          className="@container relative mx-auto mt-[clamp(64px,6.7vw,128px)] grid w-full max-w-[1023px] lg:translate-x-[31px]"
        >
          {brands.map((brand, i) => {
            const offset = (last - i) * STACK_STEP;
            return (
              <div key={brand.name} data-brand-card className="[grid-area:1/1]">
                <BrandCard
                  brand={brand}
                  style={{
                    translate: `${cq(offset, STACK_W)} ${cq(-offset, STACK_W)}`,
                    rotate: "4deg",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div aria-hidden className="hidden motion-safe:block" style={{ height: `${brands.length * SCROLL_PER_CARD_VH}vh` }} />
    </section>
  );
}
