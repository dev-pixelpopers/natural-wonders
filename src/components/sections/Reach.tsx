import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { retailers } from "@/data/content";
import { img } from "@/lib/design";

/** Company statement, store count, US map and retailer logos under one arched backdrop. */
export function Reach() {
  return (
    <section className="relative isolate">
      <Image
        src={img("about-arc.svg")}
        alt=""
        aria-hidden
        width={3568}
        height={3568}
        className="pointer-events-none absolute top-0 left-1/2 -z-10 size-[3568px] max-w-none -translate-x-1/2"
      />

      <Image
        src={img("about-leaves.svg")}
        alt=""
        aria-hidden
        width={515}
        height={266}
        className="mx-auto mt-[126px] h-auto w-[min(515px,60vw)] rotate-[7.64deg]"
      />

      <p className="mx-auto mt-[54px] max-w-[1647px] px-4 text-center font-valturin text-statement text-white capitalize">
        Natural Wunderz is a Southern California beauty company offering hair, body, and skin
        products. With integrated development, branding, sourcing, manufacturing, and fulfillment, we
        scale proven products and launch new concepts quickly with quality, value, and shelf appeal.
      </p>

      {/* 5,500 with the caption set inside the last zero, positioned in em of the figure size */}
      <div className="relative mt-[clamp(48px,9.2vw,177px)] flex h-[0.8644em] items-center justify-center font-valturin text-mega text-white">
        <p className="leading-[1.48]">5,500</p>
        <p className="absolute top-[0.3085em] left-[calc(50%+0.9822em)] -translate-x-1/2 leading-none">
          <span className="block text-[0.0644em] leading-[1.48] tracking-[-0.02em] whitespace-nowrap">
            US Stores
          </span>
        </p>
      </div>

      <Image
        src={img("us-map.svg")}
        alt="Map of the United States with pins marking retail locations"
        width={1434}
        height={969}
        className="relative mx-auto -mt-[clamp(0px,3.6vw,69px)] h-auto w-[min(1434px,calc(100%-32px))]"
      />

      <div className="relative mt-[80px] overflow-x-clip">
        <ul className="relative left-1/2 flex w-max -translate-x-1/2 items-start gap-[32px]">
          {retailers.map((r) => (
            <li key={r.name} style={{ marginTop: r.offset }}>
              <Image
                src={r.src}
                alt={r.name}
                width={Math.round(r.width)}
                height={Math.round(r.height)}
                className="object-fill brightness-0 invert"
                style={{ width: r.width, height: r.height }}
              />
            </li>
          ))}
        </ul>
        {/* Soft fades over the outer logos */}
        <Image
          src={img("logos-fade-left.svg")}
          alt=""
          aria-hidden
          width={418}
          height={418}
          className="pointer-events-none absolute top-[-117px] left-[-178px] size-[418px] max-w-none"
        />
        <Image
          src={img("logos-fade-right.svg")}
          alt=""
          aria-hidden
          width={418}
          height={418}
          className="pointer-events-none absolute top-[-117px] right-[-177px] size-[418px] max-w-none"
        />
      </div>

      <div className="mt-[75px] flex justify-center">
        <PillLink href="#contact" tone="light">
          Discuss Your Requirement
        </PillLink>
      </div>
    </section>
  );
}
