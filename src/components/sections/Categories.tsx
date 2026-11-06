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

/** Cards moved per Next/Prev press on wide screens; narrower screens move one at a time. */
const CARDS_PER_SLIDE = 2;

function CategoryCard({ category }: { category: Category }) {
  return (
    <article data-category-card className="relative w-[739px] shrink-0 snap-start">
      {/* Photo frame overlapping the left edge of the cream card */}
      <div className="absolute top-[65px] left-0 z-10 h-[586px] w-[377px] overflow-hidden rounded-[49px] border-[15px] border-forest">
        <div className="absolute overflow-hidden rounded-[34px] inset-0">
          <Image
            src={category.image}
            alt=""
            width={2752}
            height={1536}
            sizes="1050px"
            className="absolute max-w-none"
            style={category.crop}
          />
        </div>
      </div>

      <div className="ml-[278px] flex h-[717px] w-[461px] flex-col justify-end rounded-[33px] bg-sand pb-[26px] pl-[157px] text-forest shadow-[0_4px_250px_0_black]">
        <div className="mb-[224px]">
          <h3 className="font-valturin text-[44px] leading-[0.9] tracking-[-0.02em] uppercase">
            {category.title}
          </h3>
          <p className="mt-1 text-[20px] leading-[1.35]" style={{ maxWidth: category.descriptionWidth }}>
            {category.description}
          </p>
        </div>
        <Link href={`/products#${category.slug}`} className="mr-[46px] self-end text-[16px] leading-[1.21] underline hover:text-sage">
          Learn More
        </Link>
      </div>
    </article>
  );
}

function CircleControl({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const arrow = (
    <Image
      src={img(direction === "prev" ? "arrow-prev.svg" : "arrow-next.svg")}
      alt=""
      width={12.5}
      height={7.36}
      className={`h-[7.36px] w-[12.5px] ${direction === "prev" ? "rotate-180" : ""}`}
    />
  );

  return (
    <button
      type="button"
      aria-label={`${label} categories`}
      aria-controls="category-slider"
      onClick={onClick}
      className="relative flex size-[112px] items-center justify-center gap-[4px] text-[21px] leading-[1.21] text-cream"
    >
      <Image src={img("circle-dashed-sm.png")} alt="" fill sizes="112px" />
      {direction === "prev" && arrow}
      <span className="relative">{label}</span>
      {direction === "next" && arrow}
    </button>
  );
}

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
        // Heading from the left, description from the right, once the header reaches mid-screen
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

        // Cards slide up one after another as the slider comes into view
        gsap.from("[data-category-card]", {
          y: 120,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Stop a slide that is still running if the section unmounts
      return () => slideTween.current?.kill();
    },
    { scope: sectionRef },
  );

  /** Slides the row by a page of cards; wraps around at either end. Runs only on click. */
  function slide(direction: 1 | -1) {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-category-card]", slider);
    if (cards.length < 2) return;

    const start = cards[0].offsetLeft;
    const step = cards[1].offsetLeft - start;
    const perSlide = window.matchMedia("(min-width: 1280px)").matches ? CARDS_PER_SLIDE : 1;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const lastIndex = Math.ceil(maxScroll / step);

    // Work from where the slider actually is, so manual swipes are respected
    const current = Math.round(slider.scrollLeft / step);
    let next = current + direction * perSlide;
    if (direction === 1 && current >= lastIndex) next = 0;
    else if (direction === -1 && current <= 0) next = lastIndex;
    next = gsap.utils.clamp(0, lastIndex, next);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slideTween.current?.kill();
    // Snap points would fight the tween, so switch them off until it lands
    slider.style.scrollSnapType = "none";
    slideTween.current = gsap.to(slider, {
      scrollTo: { x: Math.min(next * step, maxScroll), autoKill: true },
      duration: reduce ? 0 : 1.1,
      ease: "power3.inOut",
      onComplete: () => {
        slider.style.scrollSnapType = "";
      },
    });
  }

  return (
    <section ref={sectionRef} className="relative">
      <div className="flex flex-col gap-6 px-4 sm:px-[94px] lg:flex-row lg:items-start lg:justify-between lg:pr-[100px]">
        <h2 ref={headingRef} className="max-w-[1117px] font-valturin text-display text-white uppercase">
          Everyday Categories. Fresh Perspectives.
        </h2>
        <p ref={descriptionRef} className="max-w-[492px] text-body text-white lg:text-right">
          We develop across core beauty and personal-care categories, creating products that connect
          a clear consumer need with a distinctive brand experience.
        </p>
      </div>

      <div className="relative mt-[74px]">
        {/* Vertical pagination dots */}
        <div aria-hidden className="absolute top-[356px] left-[24px] z-20 hidden flex-col gap-[10px] sm:flex">
          {["dot-solid.svg", "dot-faded.svg", "dot-solid.svg"].map((dot, i) => (
            <Image key={i} src={img(dot)} alt="" width={10} height={10} className="size-[10px]" />
          ))}
        </div>

        {/* Vertical padding keeps the cards' 250px shadows from being clipped by the scroller */}
        <div
          ref={sliderRef}
          id="category-slider"
          className="no-scrollbar relative -my-[250px] flex snap-x snap-mandatory scroll-pl-4 gap-[151px] overflow-x-auto px-4 py-[250px] sm:scroll-pl-[137px] sm:pl-[137px]"
        >
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>

      <div className="relative mt-[109px] flex justify-center gap-[22px]">
        <CircleControl label="Prev" direction="prev" onClick={() => slide(-1)} />
        <CircleControl label="Next" direction="next" onClick={() => slide(1)} />
      </div>
    </section>
  );
}
