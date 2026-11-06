import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Contact } from "@/components/sections/Contact";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { PillLink } from "@/components/ui/PillLink";
import { brands, categories } from "@/data/content";
import { brandDetails } from "@/data/pages";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Body & bath, hair care, men's grooming and skin care: everyday categories developed with fresh perspectives by Natural Wunderz.",
};

const productTypes: Record<string, string[]> = {
  "body-bath": ["Body washes", "Exfoliating washes", "Body lotions", "Body oils"],
  "hair-care": ["Shampoos", "Conditioners", "Treatments", "Styling creams"],
  "mens-grooming": ["Beard oils", "Hair & body washes", "Conditioners", "Grooming essentials"],
  "skin-care": ["Cleansers", "Moisturizers", "Serums", "Targeted treatments"],
  "fragrance-mists": ["Body mists", "Hair mists", "Layering sets", "Travel sizes"],
  "lotions-butters": ["Body lotions", "Body butters", "Hand creams", "Whipped creams"],
};

export default function ProductsPage() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Products" }]}
          title={
            <>
              Everyday Categories.
              <br />
              Fresh Perspectives.
            </>
          }
          intro="We develop across core beauty and personal-care categories, creating products that connect a clear consumer need with a distinctive brand experience."
          aside={<CircleBadge href="#categories" label="Browse Categories" />}
        >
          <nav aria-label="Categories" className="mt-14">
            <ul className="flex flex-wrap justify-center gap-[14px]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    className="block rounded-[10px] bg-sage-light p-[20px] text-[18px] leading-[0.9] tracking-[-0.02em] text-white uppercase transition-colors hover:bg-sage"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        {/* One row per category: photo frame overlapping the cream card, as on the homepage */}
        <section id="categories" className="scroll-mt-10 px-4 sm:px-[94px]">
          <ul className="mx-auto flex max-w-[1500px] flex-col gap-[clamp(64px,8vw,140px)]">
            {categories.map((c, i) => {
              const flip = i % 2 === 1;
              const carriedBy = brands.filter((b) => brandDetails[b.slug]?.categories.includes(c.title));
              return (
                <li key={c.slug} id={c.slug} className="scroll-mt-10">
                  <article className={`relative flex flex-col lg:flex-row lg:items-center ${flip ? "lg:flex-row-reverse" : ""}`}>
                    <div className="relative z-10 mx-auto aspect-[377/586] w-[min(100%,420px)] shrink-0 overflow-hidden rounded-[49px] border-[15px] border-forest lg:mx-0 lg:w-[34%]">
                      <div className="absolute inset-0 overflow-hidden rounded-[34px]">
                        <Image src={c.image} alt="" width={2752} height={1536} sizes="1050px" className="absolute max-w-none" style={c.crop} />
                      </div>
                    </div>

                    <div
                      className={`-mt-24 flex flex-1 flex-col gap-8 rounded-[33px] bg-sand px-6 pt-32 pb-10 text-forest shadow-[0_4px_250px_0_black] sm:px-12 lg:mt-0 lg:min-h-[640px] lg:justify-center lg:py-16 ${
                        flip ? "lg:-mr-[120px] lg:pr-[180px] lg:pl-16" : "lg:-ml-[120px] lg:pr-16 lg:pl-[180px]"
                      }`}
                    >
                      <p className="text-[14px] tracking-[0.12em] text-sage uppercase">
                        Category {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="-mt-4 font-valturin text-[clamp(2.75rem,4.2vw,5rem)] leading-[0.9] tracking-[-0.02em] uppercase">{c.title}</h2>
                      <p className="max-w-[560px] text-[20px] leading-[1.45]">{c.description}</p>

                      <ul className="grid max-w-[560px] grid-cols-2 gap-x-6 gap-y-3 border-t border-forest/15 pt-6 text-[17px]">
                        {productTypes[c.slug]?.map((t) => (
                          <li key={t} className="flex items-center gap-3">
                            <span aria-hidden className="size-[6px] rounded-full bg-sage" />
                            {t}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        {carriedBy.length > 0 && (
                          <p className="text-[16px]">
                            Find it in{" "}
                            {carriedBy.map((b, j) => (
                              <span key={b.slug}>
                                {j > 0 && (j === carriedBy.length - 1 ? " & " : ", ")}
                                <Link href={`/brands/${b.slug}`} className="underline hover:text-sage">
                                  {b.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        )}
                        <PillLink href="#contact">Enquire About {c.title}</PillLink>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="pt-[clamp(72px,8vw,140px)]">
          <Portfolio />
        </div>
        <Testimonials />
        <Contact
          title="Find the Right Products."
          intro="Looking for a specific category, pack size or price point? Tell us what you have in mind and our team will put together options."
          defaultInterest="products"
        />
      </main>
      <SiteFooter />
    </>
  );
}
