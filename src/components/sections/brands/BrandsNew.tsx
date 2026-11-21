"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { brands, type Brand } from "@/data/content";
import { img } from "@/lib/design";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Resting tilt per card (deg), alternating so the row feels hand-placed. */
const TILTS = [-3, 2, -2, 3];

/** Where each landscape brand photo is anchored inside the portrait card. */
const PHOTO_POSITION: Record<string, string> = {
  "natural-wunderz": "64% 50%",
  "gentlemen-supply": "50% 50%",
  "juice-day": "57% 50%",
  suzu: "45% 50%",
};

/** Seconds between each card's entrance. */
const STAGGER = 0.2;

function BrandTile({
  brand,
  index,
  active,
  onToggle,
}: {
  brand: Brand;
  index: number;
  active: boolean;
  onToggle: () => void;
}) {
  // The brand's main photo (last layer is the front-most one in the old card)
  const photo = brand.layers[brand.layers.length - 1].src;
  const href = `/brands/${brand.slug}`;

  return (
    <Link
      href={href}
      aria-label={`Explore ${brand.titleLines.join(" ")}`}
      data-brand-tile
      data-active={active}
      onClick={(e) => {
        // Tap toggles the overlay on touch screens; links inside still navigate
        if ((e.target as HTMLElement).closest("a")) return;
        onToggle();
      }}
      className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[24px] border-[3px] border-white bg-cream shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] transition-[rotate,translate,box-shadow] duration-500 ease-out hover:z-10 hover:[rotate:0deg] hover:[translate:0_-10px] data-[active=true]:z-10 data-[active=true]:[rotate:0deg]"
      style={{ rotate: `${TILTS[index % TILTS.length]}deg` }}
    >
      <Image
        src={photo}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ objectPosition: PHOTO_POSITION[brand.slug] ?? "50% 50%" }}
      />

      {/* Default state: title + button, bottom right over a soft fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-forest via-forest/60 to-transparent transition-opacity duration-500 group-hover:opacity-0 group-data-[active=true]:opacity-0"
      />
      <div className="absolute inset-x-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(64,75,67,1)_100%)] bottom-0 flex flex-col items-start gap-4 p-[clamp(18px,1.6vw,28px)] transition-[opacity,translate] duration-500 group-hover:pointer-events-none group-hover:translate-y-3 group-hover:opacity-0 group-data-[active=true]:pointer-events-none group-data-[active=true]:opacity-0">
        <h3 className="font-valturin text-[clamp(30px,2.6vw,46px)] leading-[0.88] tracking-[-0.02em] text-cream uppercase">
          {brand.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
      </div>

      {/* Hover / tap state: frosted glass overlay with the full brand story */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-end gap-5 rounded-[18px] border border-white/50 bg-white/45 p-[clamp(18px,1.6vw,28px)] text-left text-forest opacity-0 backdrop-blur-lg transition-[opacity,translate] duration-500 ease-out [translate:0_16px] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:[translate:0_0] group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:[translate:0_0] group-data-[active=true]:pointer-events-auto group-data-[active=true]:opacity-100 group-data-[active=true]:[translate:0_0]">
        <h3 className="font-valturin text-[clamp(28px,2.3vw,40px)] leading-[0.88] tracking-[-0.02em] uppercase">
          {brand.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="text-[clamp(14px,0.95vw,16px)] leading-[1.45]">{brand.description}</p>
        <span className={`inline-flex items-center justify-center gap-[10px] rounded-[30px] border hover:border-forest px-[25px] py-[15px] text-[15px] leading-[1.21] whitespace-nowrap transition-[gap,background-color] duration-300 hover:bg-forest hover:text-white`}>Explore Now</span>
      </div>
    </Link>
  );
}

/** Brands section, v2: four tilted cards in a row that slide up once, with a glass hover overlay. */
export function BrandsNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading from the left, description from the right
        gsap
          .timeline({
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          })
          .from(headingRef.current, { x: -50, autoAlpha: 0, duration: 1, ease: "power3.out" })
          .from(descriptionRef.current, { x: 50, autoAlpha: 0, duration: 1, ease: "power3.out" }, "<0.15");

        // Cards: time-based (not scrubbed) slide-up, 0.2s apart, once the paragraph is reached
        gsap.from("[data-brand-tile]", {
          y: 160,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: STAGGER,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="brands" className="relative isolate px-4 pb-[clamp(80px,7vw,140px)] sm:px-[40px] md:px-[60px] lg:px-[80px]">
      {/* Cream stadium behind the heading; the card row overlaps its lower edge */}
      <div
        aria-hidden
        className="absolute inset-x-[80px] top-0 -z-20 hidden rounded-[450px] bg-cream lg:block"
        style={{ bottom: "clamp(240px, 22vw, 420px)" }}
      />
      <Image
        src={img("brands-leaves.svg")}
        alt=""
        aria-hidden
        width={823}
        height={425}
        className="pointer-events-none absolute top-[clamp(260px,22vw,460px)] left-0 -z-10 hidden h-auto w-[25%] max-w-none lg:block"
      />

      <div className="relative mx-auto max-w-[1300px] px-6 pt-[clamp(48px,5vw,96px)] pb-12 text-forest lg:px-0 lg:pb-0">
        {/* Below lg the cards stack, so the cream shape only wraps the heading block */}
        <div aria-hidden className="absolute inset-0 -z-20 rounded-[40px] bg-cream lg:hidden" />
        <h2 ref={headingRef} className="font-valturin text-display uppercase text-center">
          DISTINCTIVE BRANDS, THOUGHTFULLY MADE.
        </h2>
        <p ref={descriptionRef} className="mt-6 mx-auto max-w-[820px] text-center text-lead sm:mt-[28px]">
          Explore our family of beauty and personal-care brands. Each has its own personality,
          ingredient story and product focus, creating distinct collections for different consumers
          and everyday routines.
        </p>
      </div>

      <div className="mx-auto mt-[clamp(48px,5vw,96px)] grid max-w-[1500px] grid-cols-1 gap-x-[clamp(16px,2vw,36px)] gap-y-10 px-2 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand, i) => (
          <BrandTile
            key={brand.slug}
            brand={brand}
            index={i}
            active={active === i}
            onToggle={() => setActive((a) => (a === i ? null : i))}
          />
        ))}
      </div>
    </section>
  );
}
