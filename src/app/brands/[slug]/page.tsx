import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BrandCollection } from "@/components/sections/brands/BrandCollection";
import { Contact } from "@/components/sections/Contact";
import { CornerCard } from "@/components/ui/CornerCard";
import { PillLink } from "@/components/ui/PillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryProducts } from "@/data/categoryProducts";
import { brands, categories } from "@/data/content";
import { brandDetails } from "@/data/pages";
import { img } from "@/lib/design";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return {};
  return { title: brand.name, description: brand.description };
}

export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  const detail = brandDetails[slug];
  if (!brand || !detail) notFound();

  const others = brands.filter((b) => b.slug !== slug);
  const brandProducts = categoryProducts.filter((p) => p.brandSlug === slug);
  const brandCategories = categories.filter((c) => detail.categories.includes(c.title));

  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Our Brands", href: "/brands" }, { label: brand.name }]}
          title={brand.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          intro={detail.intro}
        />

        {/* Wide brand photo framed like the homepage brand cards */}
        <section className="px-4 sm:px-[94px]">
          <div className="relative mx-auto aspect-[4/3] max-w-[1650px] overflow-hidden rounded-[20px] border border-white shadow-[0_4px_250px_rgba(0,0,0,0.54)] md:aspect-[1650/760]">
            <Image src={detail.hero} alt={`${brand.name} products`} fill priority sizes="(min-width: 1800px) 1650px, 100vw" className="object-cover" />
          </div>
        </section>

        {/* Story */}
        <section className="relative isolate px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <div className="mx-auto max-w-[1650px]">
            {/* Editorial Header */}
            <div className="max-w-[1250px]">
              <p className="flex items-center gap-3 text-[14px] tracking-[0.14em] text-mint uppercase">
                <span aria-hidden className="h-px w-8 bg-current" />
                The Story Behind {brand.name}
              </p>
              <h2 className="mt-5 font-valturin text-[clamp(2.5rem,4.2vw,4.75rem)] leading-[0.94] tracking-[-0.02em] text-white uppercase">
                {detail.tagline}
              </h2>
            </div>

            {/* Decorative Divider Line */}
            <div className="my-10 h-px w-full bg-linear-to-r from-mint/50 via-white/20 to-transparent sm:my-14" />

            {/* Story Paragraphs & Category Highlights in balanced columns */}
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
              <div className="flex flex-col gap-6 text-[clamp(1.15rem,1.4vw,1.4rem)] leading-[1.7] text-white/95">
                <p className="first-letter:float-left first-letter:mr-3.5 first-letter:font-valturin first-letter:text-[3.8rem] first-letter:leading-[0.8] first-letter:text-mint">
                  {detail.story[0]}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-8 text-[clamp(1.05rem,1.25vw,1.225rem)] leading-[1.7] text-white/80">
                <p>{detail.story[1] || detail.intro}</p>

                <div className="rounded-[22px] border border-white/15 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-xs">
                  <span className="block text-[12px] font-semibold tracking-[0.14em] text-mint uppercase">
                    Core Product Focus
                  </span>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {detail.categories.map((c) => (
                      <li
                        key={c}
                        className="rounded-[10px] bg-sage-light px-4 py-2.5 text-[14px] leading-none tracking-[-0.01em] text-white uppercase font-medium shadow-sm transition-transform hover:scale-105"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <ul className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3 md:gap-8">
            {detail.highlights.map((h, i) => (
              <li key={h.title} style={{ rotate: `${(i - 1) * 2}deg` }}>
                <CornerCard className="h-full">
                  <div className="flex h-full flex-col gap-5 p-8 text-white sm:p-10">
                    <span className="text-[14px] tracking-[0.12em] text-mint">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-valturin text-[clamp(1.75rem,2.2vw,2.5rem)] leading-[0.95] uppercase">{h.title}</h3>
                    <p className="text-[18px] leading-[1.45]">{h.body}</p>
                  </div>
                </CornerCard>
              </li>
            ))}
          </ul>
        </section>

        {/* Gallery */}
        {/* <section className="relative isolate px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <Image
            src={img("portfolio-leaves.svg")}
            alt=""
            aria-hidden
            width={793}
            height={410}
            className="pointer-events-none absolute top-[60px] right-[-120px] -z-10 h-auto w-[min(793px,60vw)] max-w-none rotate-[7.64deg] opacity-80"
          />
          <SectionHeading layout="split" title="The Collection" body={`Browse the ${brand.name} range by category.`} className="mx-auto max-w-[1650px]" />
          <BrandCollection brandName={brand.name} products={brandProducts} /> */}

          {/* Previous image-only gallery (brandDetails.gallery), kept for reference.
          <ul className="mx-auto mt-16 grid max-w-[1650px] auto-rows-[260px] grid-cols-2 gap-4 md:auto-rows-[340px] md:grid-cols-4 md:gap-6">
            {detail.gallery.map((g, i) => (
              <li
                key={g.src}
                className={`relative overflow-hidden rounded-[20px] border border-white/40 ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div>
                  <h2>HEllo</h2>
                </div>
              </li>
            ))}
          </ul>
          */}
        {/* </section> */}

        {/* Categories this brand covers */}
        {/* {brandCategories.length > 0 && (
          <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
            <SectionHeading eyebrow="Shop by Category" title="Where You’ll Find It." />
            <ul className="mx-auto mt-16 grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brandCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products#${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[33px] bg-sand text-forest"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 450px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-8">
                      <h3 className="font-valturin text-[36px] leading-[0.9] tracking-[-0.02em] uppercase">{c.title}</h3>
                      <p className="text-[17px] leading-[1.4]">{c.description}</p>
                      <span className="mt-auto pt-3 text-[16px] underline">Learn More</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )} */}

        {/* Other brands */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <SectionHeading eyebrow="Keep Exploring" title="More From Our Family." />
          <ul className="mx-auto mt-16 grid max-w-[1400px] gap-12 md:grid-cols-3">
            {others.map((b) => (
              <li key={b.slug} className="flex flex-col items-center gap-8 text-center">
                <Link href={`/brands/${b.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-white">
                  <Image src={brandDetails[b.slug].hero} alt={`${b.name} products`} fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </Link>
                <h3 className="font-valturin text-[36px] leading-[0.9] tracking-[-0.02em] uppercase">{b.name}</h3>
                <PillLink href={`/brands/${b.slug}`} tone="light">
                  Explore Now
                </PillLink>
              </li>
            ))}
          </ul>
        </section>

        <Contact
          title={`Carry ${brand.name}.`}
          intro={`Interested in stocking ${brand.name}? Share a little about your stores and our team will send line sheets, pricing and availability.`}
          defaultInterest="brands"
        />
      </main>
      <SiteFooter />
    </>
  );
}
