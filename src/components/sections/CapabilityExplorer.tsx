"use client";

import Image from "next/image";
import { useState } from "react";
import { capabilityDetails } from "@/data/pages";
import { img } from "@/lib/design";

const photos = [
  "category-hair-care.jpg",
  "capabilities-formulation.jpg",
  "brand-natural-wunderz.jpg",
  "category-skin-care.jpg",
  "portfolio-featured.jpg",
  "category-body-bath.jpg",
  "brand-gentlemen-supply.jpg",
];

/** The homepage Capabilities layout, with every capability selectable. */
export function CapabilityExplorer() {
  const [active, setActive] = useState(1);
  const item = capabilityDetails[active];

  return (
    <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-y-16 px-4 sm:px-[94px] lg:grid-cols-2 lg:gap-x-16 3xl:grid-cols-[minmax(0,773px)_minmax(0,1fr)] 3xl:gap-x-[93px] 3xl:pr-[149px] 3xl:pl-[185px]">
      <div className="relative">
        <div
          className="relative aspect-[773/736] overflow-hidden"
          style={{
            maskImage: `url(${img("capabilities-mask.svg")})`,
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
          }}
        >
          {photos.map((photo, i) => (
            <Image
              key={photo}
              src={img(photo)}
              alt={i === active ? item.title : ""}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <Image
          src={img("capabilities-leaves.svg")}
          alt=""
          aria-hidden
          width={500}
          height={259}
          className="pointer-events-none absolute top-[88.86%] left-[88.75%] h-auto w-[48%] max-w-none -translate-1/2 rotate-[-11.57deg]"
        />
      </div>

      <div className="relative w-full max-w-[720px] lg:pt-[55px]">
        <div role="tabpanel" id="capability-panel" aria-labelledby={`capability-tab-${active}`} aria-live="polite">
          <p className="text-[14px] tracking-[0.12em] text-mint uppercase lg:ml-[70px]">
            {String(active + 1).padStart(2, "0")} / {String(capabilityDetails.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 max-w-[480px] font-valturin text-title text-white capitalize lg:ml-[70px]">{item.title}</h3>

          <div className="relative mt-[50px]">
            <div aria-hidden className="absolute top-[18px] left-0 hidden h-[2px] w-[220px] bg-linear-to-r from-forest to-white lg:block" />
            <p className="ml-auto max-w-[565px] text-body-lg text-white lg:text-right">{item.body}</p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3 lg:justify-end">
            {item.points.map((p) => (
              <li key={p} className="rounded-[30px] border border-sage-line px-5 py-3 text-[15px] text-white">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div role="tablist" aria-label="Capabilities" className="mt-16 flex flex-wrap gap-x-6 gap-y-3 lg:mt-[90px]">
          {capabilityDetails.map((c, i) => (
            <button
              key={c.title}
              id={`capability-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="capability-panel"
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 text-left text-[clamp(18px,1.45vw,28px)] leading-[1.2] tracking-[-0.02em] capitalize transition-colors ${
                i === active ? "text-mist" : "text-sage-light/55 hover:text-sage-light"
              }`}
            >
              {i > 0 && <span aria-hidden className="text-sage-light/40">·</span>}
              {c.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
