"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { portfolioFilters, portfolioTiles, type PortfolioTile } from "@/data/content";
import { cq, img } from "@/lib/design";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Figma gap between tiles. */
const TILE_GAP = 37;
/** Design width / height of the full tile row, in Figma px. */
const ROW_W =
  portfolioTiles.reduce((sum, t) => sum + t.window.width, 0) + TILE_GAP * (portfolioTiles.length - 1);
const ROW_H = Math.max(...portfolioTiles.map((t) => t.window.height));
const MIDDLE = Math.floor(portfolioTiles.length / 2);

/**
 * Rendered row width. Phones get a fixed-width row that scrolls sideways; from `md` the row
 * scales to fit both the viewport width and the height left over by the heading and filters,
 * so the whole section fits inside the 100vh sticky stage.
 */
const rowWidth = {
  "--row-w-base": "1100px",
  "--row-w-md": `min(calc(100vw - 2rem), ${ROW_W}px, calc((100svh - 25rem) * ${(ROW_W / ROW_H).toFixed(4)}))`,
} as CSSProperties;

/** Converts a Figma px value to a length relative to the rendered row width. */
const rowLen = (px: number) => `calc(var(--row-w) * ${+(px / ROW_W).toFixed(4)})`;

function Tile({ tile, side }: { tile: PortfolioTile; side: "left" | "middle" | "right" }) {
  const { box, window } = tile;
  return (
    <div
      data-tile={side}
      className="relative shrink-0 overflow-hidden"
      style={{ width: cq(window.width, ROW_W), height: cq(window.height, ROW_W) }}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        width={box.width}
        height={box.height}
        sizes={`${box.width}px`}
        className="absolute max-w-none object-cover"
        style={{
          left: cq(-window.x, ROW_W),
          top: cq(-window.y, ROW_W),
          width: cq(box.width, ROW_W),
          height: cq(box.height, ROW_W),
        }}
      />
    </div>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current!;
      const q = gsap.utils.selector(sectionRef);

      // Phones: start the sideways-scrolling row centred on the featured tile.
      const scroller = q<HTMLElement>("[data-portfolio-scroller]")[0];
      scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Distances that always clear the stage, whatever the element's own position.
        const below = () => stage.offsetHeight;
        const offLeft = () => -window.innerWidth;
        const offRight = () => window.innerWidth;

        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          // 1. Heading fades in from 50px to the left
          .from(q("[data-portfolio-heading]"), { x: -50, autoAlpha: 0, duration: 1 })
          // 2. Middle tile, filters and background band rise from below the screen
          .from(
            q('[data-tile="middle"], [data-portfolio-filters], .portfolio-background'),
            { y: below, duration: 1.4 },
          )
          // 3. Side tiles and the leaves slide in from either edge, together
          .addLabel("sides")
          .from(q('[data-tile="left"]'), { x: offLeft, duration: 1.4 }, "sides")
          .from(q('[data-tile="right"], [data-portfolio-leaves]'), { x: offRight, duration: 1.4 }, "sides")
          // Short hold on the finished layout before the stage scrolls away
          .to({}, { duration: 0.4 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    // Tall parent: its extra height is the scroll distance the animation is scrubbed over
    <section ref={sectionRef} className="relative isolate h-[250vh]">
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen flex-col justify-center gap-[min(5vh,82px)] overflow-hidden py-[min(6vh,99px)]"
      >
        <h2
          data-portfolio-heading
          className="w-full max-w-[1111px] px-4 font-valturin text-display text-white uppercase sm:px-[108px]"
        >
          A Portfolio of Beauty Brands
        </h2>

        {/* Tile row with its decorative layers, all sized from the row width */}
        <div
          className="relative [--row-w:var(--row-w-base)] md:[--row-w:var(--row-w-md)]"
          style={rowWidth}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src={img("portfolio-glow.svg")}
              alt=""
              width={3070}
              height={1822}
              className="absolute top-[54%] left-1/2 h-[1822px] w-[3070px] max-w-none -translate-1/2 -rotate-18"
            />
            <div
              className="portfolio-background absolute top-[22%] left-1/2 w-screen -translate-x-1/2 bg-linear-to-r from-[rgba(210,215,213,0)] via-[#d2d7d5] via-[45.386%] to-[rgba(210,215,213,0)] opacity-17"
              style={{ height: rowLen(538) }}
            />
          </div>

          <div data-portfolio-scroller className="no-scrollbar overflow-x-auto md:overflow-visible">
            <div
              className="mx-auto flex items-end @container"
              style={{ width: "var(--row-w)", gap: rowLen(TILE_GAP) }}
            >
              {portfolioTiles.map((tile, i) => (
                <Tile
                  key={tile.src}
                  tile={tile}
                  side={i < MIDDLE ? "left" : i > MIDDLE ? "right" : "middle"}
                />
              ))}
            </div>
          </div>

          <Image
            data-portfolio-leaves
            src={img("portfolio-leaves.svg")}
            alt=""
            aria-hidden
            width={793}
            height={410}
            className="pointer-events-none absolute -z-10 max-w-none -translate-1/2 rotate-[7.64deg]"
            style={{
              top: rowLen(-29),
              left: `calc(50% + ${rowLen(564)})`,
              width: rowLen(793),
              height: rowLen(410),
            }}
          />
        </div>

        <ul data-portfolio-filters className="flex flex-wrap justify-center gap-[14px] px-4">
          {portfolioFilters.map((filter) => (
            <li key={filter.label}>
              <button
                type="button"
                aria-pressed={filter.active}
                className={`rounded-[10px] p-[clamp(12px,1.04vw,20px)] text-[clamp(14px,1.04vw,20px)] leading-[0.9] tracking-[-0.02em] text-white uppercase ${
                  filter.active ? "bg-forest" : "bg-sage-light"
                }`}
              >
                {filter.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
