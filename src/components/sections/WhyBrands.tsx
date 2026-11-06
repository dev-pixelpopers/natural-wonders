import Image from "next/image";
import type { CSSProperties } from "react";
import { pillars } from "@/data/content";
import { cq, img } from "@/lib/design";

/** Pillar card internals scale from its 276px Figma width. */
const u = (px: number) => cq(px, 276);
/** The fan is laid out on the 1920px Figma frame. */
const f = (px: number) => cq(px, 1920);

const CORNERS = ["-top-[2px] -left-[2px]", "-top-[2px] -right-[2px]", "-bottom-[2px] -left-[2px]", "-bottom-[2px] -right-[2px]"];

function PillarCard({ label, icon, size, labelWidth, withLeaves }: (typeof pillars)[number] & { withLeaves: boolean }) {
  return (
    <div className="relative isolate aspect-[276/294] w-full">
      {/* Mint corner accents peeking out from behind the card */}
      {CORNERS.map((pos) => (
        <span key={pos} aria-hidden className={`absolute -z-10 bg-mint ${pos}`} style={{ width: u(60), height: u(60) }} />
      ))}
      <div className="flex h-full flex-col items-center bg-sage" style={{ paddingTop: u(39), paddingBottom: u(16) }}>
        <Image src={icon} alt="" width={113} height={110} className="object-fill" style={{ width: u(113), height: u(110) }} />
        <div className="flex flex-1 items-center">
          <p
            className="text-center font-valturin leading-[0.9] tracking-[-0.02em] text-white uppercase"
            style={{ fontSize: u(size), width: u(labelWidth) }}
          >
            {label}
          </p>
        </div>
      </div>
      {withLeaves && (
        <Image
          src={img("leaves-small.svg")}
          alt=""
          aria-hidden
          width={91}
          height={47}
          className="absolute left-1/2 -translate-x-1/2 rotate-[7.64deg]"
          style={{ top: u(253), width: u(91), height: u(47) }}
        />
      )}
    </div>
  );
}

export function WhyBrands() {
  return (
    <section className="relative isolate px-4 pt-[125px] pb-[152px]">
      <Image
        src={img("arc-line.svg")}
        alt=""
        aria-hidden
        width={2378}
        height={1189}
        className="pointer-events-none absolute top-[756px] left-[calc(50%+12px)] -z-10 hidden h-[1189px] w-[2378px] max-w-none -translate-x-1/2 -scale-x-100 lg:block"
      />

      <h2 className="mx-auto max-w-[1426px] text-center font-valturin text-display text-white uppercase">
        Thoughtful Products, From Formula to Shelf.
      </h2>
      <p className="mx-auto mt-[50px] max-w-[1049px] text-center text-body text-white">
        Natural Wunderz develops and manufactures beauty and personal-care products with a clear
        sense of who they are for and what makes them different. We bring the formula, the brand and
        the finished product together, creating collections with purpose and a direct path to market.
      </p>

      {/* Fan of pillars on large screens, a simple grid below */}
      <div className="@container mx-auto mt-[79px] max-w-[1920px]">
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:justify-items-center lg:gap-0">
          {pillars.map((pillar) => (
            <li
              key={pillar.label}
              className="@container lg:w-(--w) lg:translate-x-(--x) lg:translate-y-(--y) lg:rotate-(--r) lg:[grid-area:1/1]"
              style={
                {
                  "--w": f(276),
                  "--x": f(pillar.x),
                  "--y": f(pillar.y),
                  "--r": `${pillar.rotate}deg`,
                } as CSSProperties
              }
            >
              <PillarCard {...pillar} withLeaves={pillar.rotate === 0} />
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-16 max-w-[479px] text-center text-[18px] leading-[1.35] text-white lg:mt-[126px]">
        With 30 years of manufacturing experience, we make the products behind our brands. From
        developing the formula to producing the finished product, our direct involvement keeps the
        original vision connected to its execution.
      </p>
    </section>
  );
}
