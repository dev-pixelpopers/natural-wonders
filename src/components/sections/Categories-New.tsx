"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { categories, type Category } from "@/data/content";
import { img } from "@/lib/design";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
      
    <article
      data-category-card
      className="group relative h-[460px] w-[86vw] max-w-[360px] shrink-0 snap-start select-none transition-transform duration-300 hover:-translate-y-1.5 sm:h-[500px] sm:w-[calc((100%-32px)/2)] sm:max-w-none lg:h-auto lg:w-full"
    >
      {/* Overlapping photo frame matching the iconic original design, generously scaled for 3 cards in a row */}
      <div className="absolute top-[35px] left-0 z-10 h-[370px] w-[205px] overflow-hidden rounded-[32px] border-[8px] border-forest shadow-2xl sm:top-[40px] sm:h-[410px] sm:w-[230px] sm:rounded-[36px] sm:border-[10px] lg:top-[45px] lg:h-[40vh] lg:w-[260px] lg:rounded-[42px] lg:border-[12px]">
        <div className="absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[26px] lg:rounded-[30px]">
          <Image
            src={category.image}
            alt={category.title}
            width={2752}
            height={1536}
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 400px"
            className="absolute max-w-none transition-transform duration-500 ease-out group-hover:scale-105 object-cover"
            style={category.crop}
          />
        </div>
      </div>

      {/* Sand content card with refined offset, padding, and bold typography */}
      <div className="ml-[125px] flex h-[460px] w-[calc(100%-125px)] flex-col justify-between rounded-[26px] bg-sand pt-6 pr-5 pb-6 pl-[90px] text-forest shadow-[0_4px_30px_rgba(0,0,0,0.18)] sm:ml-[145px] sm:h-[500px] sm:w-[calc(100%-145px)] sm:rounded-[30px] sm:pt-8 sm:pr-6 sm:pb-8 sm:pl-[98px] lg:ml-[165px] lg:h-[40vh] lg:w-[calc(100%-165px)] lg:rounded-[34px] lg:pt-9 lg:pr-7 lg:pb-9 lg:pl-[108px]">
        <div  className="flex flex-col justify-center h-full">
          <div className="flex items-center justify-between">
            <span className="font-gotham text-[11px] font-semibold tracking-[0.14em] text-sage uppercase sm:text-[12px]">
              Category {String(index + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className="hidden size-7 items-center justify-center rounded-full bg-forest/5 text-[13px] text-forest/40 transition-colors group-hover:bg-forest group-hover:text-cream sm:flex"
            >
              ↗
            </span>
          </div>

          <h3 className="mt-2.5 font-valturin text-[28px] leading-[0.92] tracking-[-0.02em] uppercase text-forest sm:mt-3 sm:text-[34px] lg:text-[38px]">
            {category.title}
          </h3>

          <p className="mt-2.5 text-[13px] leading-[1.4] text-forest/85 line-clamp-4 sm:mt-3 sm:text-[14.5px] lg:text-[15.5px]">
            {category.description}
          </p>
        </div>
        
      </div>
    </article>
  );
}

// function CircleControl({
//   label,
//   direction,
//   onClick,
// }: {
//   label: string;
//   direction: "prev" | "next";
//   onClick: () => void;
// }) {
//   const arrow = (
//     <Image
//       src={img(direction === "prev" ? "arrow-prev.svg" : "arrow-next.svg")}
//       alt=""
//       width={12.5}
//       height={7.36}
//       className={`h-[7.36px] w-[12.5px] ${direction === "prev" ? "rotate-180" : ""}`}
//     />
//   );

//   return (
//     <button
//       type="button"
//       aria-label={`${label} categories`}
//       aria-controls="category-slider"
//       onClick={onClick}
//       className="relative flex size-[96px] cursor-pointer items-center justify-center gap-[4px] text-[18px] leading-[1.21] text-cream transition-transform duration-300 hover:scale-105 active:scale-95"
//     >
//       <Image src={img("circle-dashed-sm.png")} alt="" fill sizes="96px" />
//       {direction === "prev" && arrow}
//       <span className="relative">{label}</span>
//       {direction === "next" && arrow}
//     </button>
//   );
// }

export function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading from left, description from right when section comes into view
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          })
          .fromTo(
            headingRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          )
          .fromTo(
            descriptionRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            "<0.15",
          );

        // Category cards rise & fade in with a graceful stagger
        const cards = gsap.utils.toArray<HTMLElement>("[data-category-card]", sliderRef.current);
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sliderRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      });

      return () => slideTween.current?.kill();
    },
    { scope: sectionRef },
  );

  /** Slides the row by cards; wraps around at either end. */
  function slide(direction: 1 | -1) {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-category-card]", slider);
    if (cards.length < 2) return;

    const start = cards[0].offsetLeft;
    const step = cards[1].offsetLeft - start;
    const perSlide = window.matchMedia("(min-width: 1024px)").matches ? 3 : window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const lastIndex = Math.ceil(maxScroll / step);

    const current = Math.round(slider.scrollLeft / step);
    let next = current + direction * perSlide;
    if (direction === 1 && current >= lastIndex) next = 0;
    else if (direction === -1 && current <= 0) next = lastIndex;
    next = gsap.utils.clamp(0, lastIndex, next);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slideTween.current?.kill();
    slider.style.scrollSnapType = "none";
    slideTween.current = gsap.to(slider, {
      scrollTo: { x: Math.min(next * step, maxScroll), autoKill: true },
      duration: reduce ? 0 : 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        slider.style.scrollSnapType = "";
      },
    });
  }

  return (
    <section id="categories" ref={sectionRef} className="relative z-10 py-[clamp(60px,7vw,120px)]">
      {/* Section Header */}
      <div className="flex flex-col gap-6 px-4 sm:px-[94px] lg:flex-row lg:items-start lg:justify-between lg:pr-[100px]">
        <h2 ref={headingRef} className="max-w-[1117px] font-valturin text-display text-white uppercase">
          Everyday Categories. Fresh Perspectives.
        </h2>
        <div ref={descriptionRef} className="flex max-w-[492px] flex-col gap-4 lg:text-right">
          <p className="text-body text-white">
            We develop across core beauty and personal-care categories, creating products that connect
            a clear consumer need with a distinctive brand experience.
          </p>
          <div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-mint hover:underline"
            >
              View All Categories Catalog →
            </Link>
          </div>
        </div>
      </div>

      {/* Slider showcasing 3 generous cards per row */}
      <div className="relative mt-12 sm:mt-16">
        <div
          ref={sliderRef}
          id="category-slider"
          className="grid grid-cols-3 px-4 py-8 sm:scroll-pl-[94px] gap-x-16 gap-y-32 sm:px-[94px]"
        >
          {categories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Prev / Next Circular Navigation Controls */}
      {/* <div className="relative mt-10 flex justify-center gap-6 sm:mt-14">
        <CircleControl label="Prev" direction="prev" onClick={() => slide(-1)} />
        <CircleControl label="Next" direction="next" onClick={() => slide(1)} />
      </div> */}
    </section>
  );
}
