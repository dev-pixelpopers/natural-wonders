"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { brands } from "@/data/content";
import { img } from "@/lib/design";
import { BrandCard } from "./BrandCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Scroll distance spent bringing in each card while the stage is held. */
const SCROLL_PER_CARD_VH = 80;

export function Brands() {
  const last = brands.length - 1;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const scrollToCard = useCallback((index: number) => {
    const st = ScrollTrigger.getById("brands-scroll");
    if (!st) return;
    // Map each card to the dead-center of its hold plateau on the scrubbed timeline
    const progressMap = [0.05, 0.33, 0.67, 0.95];
    const targetProgress = progressMap[index] ?? 0.5;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      const stage = stageRef.current!;
      const stack = stackRef.current!;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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

        const cards = gsap.utils.toArray<HTMLElement>("[data-brand-card]", stack);
        const dotInners = section.querySelectorAll<HTMLElement>("[data-brand-dot-inner]");

        const updateActiveDot = (index: number) => {
          dotInners.forEach((dot, idx) => {
            if (idx === index) {
              dot.className =
                "block rounded-full transition-all duration-300 h-3 w-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-110";
            } else {
              dot.className =
                "block rounded-full transition-all duration-300 h-2 w-2 bg-white/40 hover:bg-white/70";
            }
          });
        };

        const getPeekY = () => (window.innerWidth < 640 ? 24 : window.innerWidth < 1024 ? 36 : 46);
        const peekY = getPeekY();
        const getOffscreenY = () => window.innerHeight + 800;

        gsap.set(cards, { transformOrigin: "center top" });

        // Initial setup: Card 0 is in place, Cards 1, 2, 3 are strictly offscreen and hidden
        gsap.set(cards[0], { y: 0, scale: 1, autoAlpha: 1 });
        for (let i = 1; i < cards.length; i++) {
          if (cards[i]) gsap.set(cards[i], { y: getOffscreenY, scale: 1, autoAlpha: 0 });
        }

        // While the stage holds, each card rises into view and steps back into the visible deck
        // Total duration: 6.0s with clean plateaus between transitions
        const tl = gsap.timeline({
          id: "brands-scroll",
          scrollTrigger: {
            id: "brands-scroll",
            trigger: section,
            start: () => `top ${stickyTop()}px`,
            end: () => `bottom ${stickyTop() + stage.offsetHeight}px`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              // Cleanly balanced active dot ranges corresponding to the 4 plateaus
              const active = p < 0.20 ? 0 : p < 0.50 ? 1 : p < 0.80 ? 2 : 3;
              updateActiveDot(active);
            },
          },
        });

        // --- Plateau 0: Card 0 is active (time 0.0 -> 0.5) ---

        // --- Transition 1: Card 1 rises into view while Card 0 steps back (time 0.5 -> 1.5) ---
        tl.to(cards[0], { y: -peekY, scale: 0.96, duration: 1, ease: "power2.inOut" }, 0.5);
        if (cards[1]) {
          tl.fromTo(
            cards[1],
            { y: getOffscreenY, scale: 1, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            0.5,
          );
        }

        // --- Plateau 1: Card 1 is active, Cards 2 & 3 remain offscreen & hidden (time 1.5 -> 2.5) ---

        // --- Transition 2: Card 2 rises into view while Cards 0 & 1 step back into deck (time 2.5 -> 3.5) ---
        tl.to(cards[0], { y: -peekY * 2, scale: 0.92, duration: 1, ease: "power2.inOut" }, 2.5);
        if (cards[1]) {
          tl.to(cards[1], { y: -peekY, scale: 0.96, duration: 1, ease: "power2.inOut" }, 2.5);
        }
        if (cards[2]) {
          tl.fromTo(
            cards[2],
            { y: getOffscreenY, scale: 1, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            2.5,
          );
        }

        // --- Plateau 2: Card 2 is active, Card 3 remains offscreen & hidden (time 3.5 -> 4.5) ---

        // --- Transition 3: Card 3 (Suzu) rises into view while Cards 0, 1, 2 step back (time 4.5 -> 5.5) ---
        tl.to(cards[0], { y: -peekY * 3, scale: 0.88, duration: 1, ease: "power2.inOut" }, 4.5);
        if (cards[1]) {
          tl.to(cards[1], { y: -peekY * 2, scale: 0.92, duration: 1, ease: "power2.inOut" }, 4.5);
        }
        if (cards[2]) {
          tl.to(cards[2], { y: -peekY, scale: 0.96, duration: 1, ease: "power2.inOut" }, 4.5);
        }
        if (cards[3]) {
          tl.fromTo(
            cards[3],
            { y: getOffscreenY, scale: 1, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "power2.inOut" },
            4.5,
          );
        }

        // --- Plateau 3: All 4 cards visible in deck with Card 3 (Suzu) active (time 5.5 -> 6.0) ---
        tl.to({}, { duration: 0.5 });

        updateActiveDot(0);

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
        className="relative isolate px-4 pb-[clamp(80px,7vw,140px)] motion-safe:sticky sm:px-[40px] md:px-[60px] lg:px-[80px]"
      >
        {/* Cream stadium behind the heading; the card stack overlaps its lower edge */}
        <div
          aria-hidden
          className="absolute inset-x-4 top-0 -z-20 rounded-[450px] bg-cream sm:inset-x-[40px] md:inset-x-[60px] lg:inset-x-[80px]"
          style={{ bottom: "clamp(240px, 30vw, 576px)" }}
        />
        <Image
          src={img("brands-leaves.svg")}
          alt=""
          aria-hidden
          width={823}
          height={425}
          className="pointer-events-none absolute top-[clamp(260px,22vw,460px)] left-[6.51%] -z-10 h-auto w-[42.86%] max-w-none"
        />

        <div className="mx-auto max-w-[1300px] pt-[clamp(48px,5vw,96px)] text-forest">
          <h2 ref={headingRef} className="font-valturin text-display uppercase">
            DISTINCTIVE BRANDS,
            <br />
            THOUGHTFULLY MADE.
          </h2>
          <p ref={descriptionRef} className="mt-6 ml-auto max-w-[680px] text-right text-lead sm:mt-[28px]">
            Explore our family of beauty and personal-care brands. Each has its own personality,
            ingredient story and product focus, creating distinct collections for different consumers
            and everyday routines.
          </p>
        </div>

        {/* Cards stack: larger card footprint with stepped top peek showing cards behind */}
        <div
          ref={stackRef}
          className="@container relative mx-auto mt-[clamp(36px,4vw,64px)] grid w-full max-w-[1360px]"
        >
          {brands.map((brand, i) => {
            const zIndex = 10 + i * 10;

            return (
              <div
                key={brand.name}
                data-brand-card
                onClick={() => scrollToCard(i)}
                className="[grid-area:1/1] transition-shadow duration-300"
                style={{
                  transformOrigin: "center top",
                  zIndex,
                }}
              >
                <BrandCard brand={brand} className="bg-white shadow-2xl" />
              </div>
            );
          })}

          {/* Figma prototype pagination indicator */}
          <div
            aria-label="Brand slides"
            className="pointer-events-auto absolute -right-4 sm:-right-8 lg:-right-12 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3.5"
          >
            {brands.map((brand, i) => (
              <button
                key={brand.name}
                type="button"
                data-brand-dot={i}
                onClick={() => scrollToCard(i)}
                className="group relative flex h-7 w-7 cursor-pointer items-center justify-center focus:outline-none"
                aria-label={`View ${brand.name}`}
              >
                <span
                  data-brand-dot-inner
                  className={`block rounded-full transition-all duration-300 ${
                    i === 0
                      ? "h-3 w-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-110"
                      : "h-2 w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="hidden motion-safe:block" style={{ height: `${brands.length * SCROLL_PER_CARD_VH}vh` }} />
    </section>
  );
}
