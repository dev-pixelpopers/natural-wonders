import type { Metadata } from "next";
import Image from "next/image";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Contact } from "@/components/sections/Contact";
import { Reach } from "@/components/sections/Reach";
import { WhyBrands } from "@/components/sections/WhyBrands";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milestones, stats, values } from "@/data/pages";
import { img } from "@/lib/design";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Natural Wunderz is a Southern California beauty manufacturer and brand builder with 30 years of experience bringing products from concept to shelf.",
};

export default function AboutPage() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "About Us" }]}
          title={
            <>
              Makers Behind
              <br />
              the Brands.
            </>
          }
          intro="We are a beauty and personal-care manufacturer and brand builder. For three decades we’ve combined thoughtful formulas, carefully chosen ingredients and distinctive packaging to bring products from concept to shelf."
          aside={<CircleBadge href="#story" label="Read Our Story" />}
        />

        {/* Story: masked photo with copy, mirroring the homepage Capabilities layout */}
        <section id="story" className="relative scroll-mt-10 px-4 pt-10 sm:px-[94px] xl:pt-[60px]">
          <div className="mx-auto grid max-w-[1650px] items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,720px)] lg:gap-[93px]">
            <div className="relative">
              <div
                className="relative aspect-[773/736] overflow-hidden"
                style={{
                  maskImage: `url(${img("capabilities-mask.svg")})`,
                  maskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                }}
              >
                <Image
                  src={img("category-body-bath.jpg")}
                  alt="Natural Wunderz body care products"
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover object-[78%_50%]"
                />
              </div>
              <Image
                src={img("capabilities-leaves.svg")}
                alt=""
                aria-hidden
                width={500}
                height={259}
                className="pointer-events-none absolute top-[88.86%] left-[88.75%] z-10 h-auto w-[54%] max-w-none -translate-1/2 rotate-[-11.57deg]"
              />
            </div>

            <div>
              <SectionHeading layout="left" eyebrow="Our Story" title="From Formula to Shelf, Under One Roof." />
              <div className="relative mt-[50px]">
                <div aria-hidden className="absolute top-[18px] left-0 hidden h-[2px] w-[200px] bg-linear-to-r from-forest to-white lg:block" />
                <div className="ml-auto flex max-w-[565px] flex-col gap-6 text-body text-white lg:text-right">
                  <p>
                    Natural Wunderz began on the manufacturing floor. Long before we launched our own
                    brands, we were formulating, filling and shipping personal-care products for
                    others, learning what makes a product work in the hand and on the shelf.
                  </p>
                  <p>
                    Today we develop and manufacture a growing family of distinct brands across body
                    &amp; bath, hair care, men’s grooming and skin care. Because we make the products
                    behind our brands, the original vision stays connected to its execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <ul className="mx-auto grid max-w-[1650px] grid-cols-2 gap-y-14 border-y border-white/15 py-14 lg:grid-cols-4 lg:py-20">
            {stats.map((s, i) => (
              <li key={s.label} className={`flex flex-col items-center px-4 text-center ${i > 0 ? "lg:border-l lg:border-white/15" : ""}`}>
                <p className="font-valturin text-[clamp(4rem,8vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-cream">
                  {s.value}
                  <span className="ml-1 align-top text-[0.32em] text-mint">{s.suffix}</span>
                </p>
                <p className="mt-4 max-w-[220px] text-[16px] leading-[1.35] tracking-[0.04em] text-sage-light uppercase">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <WhyBrands />

        {/* Values on the cream stadium from the homepage Brands section */}
        <section className="relative isolate px-4 sm:px-[108px]">
          <div aria-hidden className="absolute inset-x-4 inset-y-0 -z-10 rounded-[clamp(60px,12vw,450px)] bg-cream sm:inset-x-[108px]" />
          <Image
            src={img("brands-leaves.svg")}
            alt=""
            aria-hidden
            width={823}
            height={425}
            className="pointer-events-none absolute right-[8%] bottom-[-60px] -z-10 h-auto w-[34%] max-w-none opacity-80"
          />
          <div className="mx-auto max-w-[1300px] px-2 py-[clamp(72px,8.96vw,172px)] sm:px-10">
            <SectionHeading
              tone="dark"
              layout="split"
              eyebrow="What We Value"
              title={
                <>
                  Simple Ideas.
                  <br />
                  Carefully Made.
                </>
              }
              body="Four principles guide every product we develop, from the first brief to the finished bottle on the shelf."
            />
            <ul className="mt-16 grid gap-px overflow-hidden rounded-[33px] bg-forest/15 sm:grid-cols-2 lg:mt-24">
              {values.map((v, i) => (
                <li key={v.title} className="flex flex-col gap-5 bg-sand p-8 text-forest sm:p-12">
                  <span className="text-[14px] tracking-[0.12em] text-sage">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-valturin text-[clamp(2rem,2.8vw,3.25rem)] leading-[0.9] uppercase">{v.title}</h3>
                  <p className="max-w-[420px] text-[18px] leading-[1.45]">{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <SectionHeading eyebrow="Our Journey" title="Three Decades in the Making." />
          <div className="relative mx-auto mt-20 max-w-[1650px]">
          <div aria-hidden className="absolute top-[55px] right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-sage-line to-transparent md:block" />
          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative flex flex-col items-center text-center">
                <span className="relative flex size-[112px] items-center justify-center font-valturin text-[24px] text-cream">
                  <Image src={img("circle-dashed-sm.png")} alt="" fill sizes="112px" />
                  <span className="relative">{m.year}</span>
                </span>
                <p className="mt-6 max-w-[300px] text-[18px] leading-[1.45] text-white">{m.text}</p>
              </li>
            ))}
          </ol>
          </div>
        </section>

        <Reach />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
