import Image from "next/image";
import type { CSSProperties } from "react";
import { PillLink } from "@/components/ui/PillLink";
import type { Brand, CardLayer } from "@/data/content";
import { cq, pct } from "@/lib/design";

/** Figma card size; everything inside scales from it via container query units. */
const W = 1023;
const H = 558;
const u = (px: number) => cq(px, W);

function PhotoLayer({ layer, sizes }: { layer: CardLayer; sizes: string }) {
  const transforms = [
    layer.rotate ? `rotate(${layer.rotate}deg)` : "",
    layer.flipX ? "scaleX(-1)" : "",
  ].join(" ");

  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        left: pct(layer.left, W),
        top: pct(layer.top, H),
        width: pct(layer.width, W),
        height: pct(layer.height, H),
        transform: transforms.trim() || undefined,
      }}
    >
      <Image src={layer.src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

type BrandCardProps = {
  brand: Brand;
  className?: string;
  style?: CSSProperties;
};

export function BrandCard({ brand, className = "", style }: BrandCardProps) {
  return (
    <article
      className={`@container relative flex aspect-[4/5] flex-col overflow-hidden rounded-[20px] border border-white md:aspect-[1023/558] ${className}`}
      style={{ boxShadow: brand.shadow, ...style }}
    >
      {brand.layers.map((layer, i) => (
        <PhotoLayer key={i} layer={layer} sizes="(min-width: 1100px) 1170px, 110vw" />
      ))}

      <div
        className="relative flex flex-1 flex-col items-start text-forest"
        style={{
          paddingLeft: `max(20px, ${u(53)})`,
          paddingTop: `max(20px, ${u(45)})`,
          paddingBottom: `max(20px, ${u(104.5)})`,
        }}
      >
        <h3
          className="font-valturin leading-[0.84] tracking-[-0.02em] uppercase"
          style={{ fontSize: `max(30px, ${u(71)})`, width: `max(${u(441)}, min(70%, 220px))` }}
        >
          {brand.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p
          className="leading-[1.35]"
          style={{
            marginTop: `max(10px, ${u(20)})`,
            fontSize: `max(13px, ${u(18)})`,
            width: `max(${u(brand.descriptionWidth)}, min(78%, 240px))`,
          }}
        >
          {brand.description}
        </p>
        <PillLink
          href={`/brands/${brand.slug}`}
          className="mt-auto"
          style={{
            fontSize: `max(13px, ${u(15)})`,
            paddingInline: `max(18px, ${u(25)})`,
            paddingBlock: `max(10px, ${u(15)})`,
          }}
        >
          Explore Now
        </PillLink>
      </div>
    </article>
  );
}
