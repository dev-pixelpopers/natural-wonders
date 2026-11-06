import Image from "next/image";
import { Fragment } from "react";
import { capabilities } from "@/data/content";
import { img } from "@/lib/design";

const ACTIVE = "Custom formulation & R&D";

export function Capabilities() {
  return (
    <section className="relative overflow-x-clip pt-[163px]">
      <h2 className="mx-auto max-w-[1651px] px-4 text-center font-valturin text-display leading-[0.98] text-white uppercase">
        Capabilities Behind the Brands.
      </h2>

      <div className="mx-auto mt-[77px] grid max-w-[1920px] grid-cols-1 gap-y-16 px-4 lg:grid-cols-[minmax(0,773px)_minmax(0,1fr)] lg:gap-x-[93px] lg:pr-[149px] lg:pl-[185px]">
        <div className="relative">
          {/* Photo clipped to the Figma mask: rounded corners with a large bottom-right curve */}
          <div
            className="relative aspect-[773/736] overflow-hidden"
            style={{
              maskImage: `url(${img("capabilities-mask.svg")})`,
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
            }}
          >
            <Image
              src={img("capabilities-formulation.jpg")}
              alt="Natural Wunderz curl defining cream jars on a production line"
              width={2048}
              height={2048}
              sizes="(min-width: 1024px) 800px, 100vw"
              className="absolute max-w-none"
              style={{ left: "-2.07%", top: "-5.03%", width: "102.72%", height: "107.85%" }}
            />
          </div>
          <Image
            src={img("capabilities-leaves.svg")}
            alt=""
            aria-hidden
            width={500}
            height={259}
            className="pointer-events-none absolute top-[88.86%] left-[88.75%] z-10 h-auto w-[64.7%] max-w-none -translate-1/2 rotate-[-11.57deg]"
          />
        </div>

        <div className="w-full max-w-[720px] lg:pt-[55px]">
          <h3 className="max-w-[409px] font-valturin text-title text-white capitalize lg:ml-[70px]">
            Custom formulation &amp; R&amp;D
          </h3>

          <div className="relative mt-[60px]">
            <div
              aria-hidden
              className="absolute top-[18px] left-0 hidden h-[2px] w-[270px] bg-linear-to-r from-forest to-white lg:block"
            />
            <p className="ml-auto max-w-[565px] text-right text-body-lg text-white capitalize">
              We develop distinctive, high-performance formulas through thoughtful research,
              innovation, and a deep understanding of evolving beauty and personal-care needs.
            </p>
          </div>

          <p className="mt-16 font-gotham lg:mt-[123px] text-[28px] leading-[0.98] tracking-[-0.02em] text-stone capitalize lg:-ml-[128px] lg:whitespace-nowrap">
            {capabilities.map((item, i) => (
              <Fragment key={item}>
                {i > 0 && <span className="whitespace-pre-wrap lg:whitespace-pre">{"      ·      "}</span>}
                <span className={item === ACTIVE ? "text-mist" : undefined}>{item}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
