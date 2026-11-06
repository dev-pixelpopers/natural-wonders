import type { Metadata } from "next";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BrandCard } from "@/components/sections/brands/BrandCard";
import { Contact } from "@/components/sections/Contact";
import { Portfolio } from "@/components/sections/Portfolio";
import { PillLink } from "@/components/ui/PillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/content";
import { brandDetails } from "@/data/pages";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Explore the Natural Wunderz family of beauty and personal-care brands, each with its own personality, ingredient story and product focus.",
};

export default function BrandsPage() {
  // Show the front card of the homepage stack first
  const ordered = [...brands].reverse();

  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Our Brands" }]}
          title={
            <>
              Distinct Brands.
              <br />
              One Approach.
            </>
          }
          intro="Explore our family of beauty and personal-care brands. Each has its own personality, ingredient story and product focus, creating distinct collections for different consumers and everyday routines."
          aside={<CircleBadge href="#brand-list" label="Meet the Brands" />}
        />

        <section id="brand-list" className="relative scroll-mt-10 px-4 sm:px-[94px]">
          <ul className="mx-auto flex max-w-[1650px] flex-col gap-[clamp(96px,10vw,180px)]">
            {ordered.map((brand, i) => {
              const detail = brandDetails[brand.slug];
              const flip = i % 2 === 1;
              return (
                <li
                  key={brand.slug}
                  className={`grid items-center gap-12 lg:gap-20 ${flip ? "lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]"}`}
                >
                  <div className={`@container ${flip ? "lg:order-2" : ""}`}>
                    <BrandCard brand={brand} style={{ rotate: flip ? "-2deg" : "2deg" }} />
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    <p className="text-[14px] tracking-[0.12em] text-mint uppercase">
                      {String(i + 1).padStart(2, "0")} / {String(ordered.length).padStart(2, "0")}
                    </p>
                    <h2 className="mt-5 font-valturin text-title text-white uppercase">{brand.name}</h2>
                    <p className="mt-6 font-valturin text-[clamp(1.375rem,1.8vw,2.125rem)] leading-[1.2] text-cream">
                      {detail.tagline}
                    </p>
                    <p className="mt-6 text-body text-white/90">{detail.intro}</p>
                    <ul className="mt-8 flex flex-wrap gap-3">
                      {detail.categories.map((c) => (
                        <li key={c} className="rounded-[10px] bg-sage-light px-4 py-3 text-[15px] leading-[0.9] tracking-[-0.02em] text-white uppercase">
                          {c}
                        </li>
                      ))}
                    </ul>
                    <PillLink href={`/brands/${brand.slug}`} tone="light" className="mt-10">
                      Explore {brand.name}
                    </PillLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="pt-[clamp(72px,8vw,140px)]">
          <Portfolio />
        </div>

        <section className="px-4 pt-[clamp(96px,10vw,180px)]">
          <SectionHeading
            eyebrow="For Retailers"
            title="Bring Our Brands to Your Shelves."
            body="Our brands are carried by leading off-price and online retailers across more than 5,500 US stores. Ask for line sheets, pricing and availability."
          />
        </section>

        <Contact
          title="Carry Our Brands."
          intro="Tell us about your stores, your shoppers and the categories you’re building. Our team will follow up with line sheets and next steps."
          defaultInterest="brands"
        />
      </main>
      <SiteFooter />
    </>
  );
}
