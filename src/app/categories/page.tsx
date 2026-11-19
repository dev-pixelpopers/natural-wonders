import type { Metadata } from "next";
import Link from "next/link";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CategoriesCatalog } from "@/components/sections/CategoriesCatalog";
import { Contact } from "@/components/sections/Contact";
import { Testimonials } from "@/components/sections/Testimonials";
import { categories } from "@/data/content";

export const metadata: Metadata = {
  title: "Product Categories | Natural Wunderz",
  description:
    "Hair care, body care, skin care, men's care, pet care and baby care: everyday personal care categories developed with fresh perspectives by Natural Wunderz.",
};

export default function CategoriesPage() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        {/* Same Hero Banner as Products Page */}
        <PageHero
          crumbs={[{ label: "Categories" }]}
          title={
            <>
              Product Categories.
              <br />
              Everyday Essentials.
            </>
          }
          intro="We develop across core beauty and personal-care categories, creating everyday essentials with standout formulas, distinctive fragrances, and accessible price points."
          aside={<CircleBadge href="#categories-catalog" label="Browse Catalog" />}
        >
          <nav aria-label="Categories" className="mt-14">
            <ul className="flex flex-wrap justify-center gap-[14px]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="block rounded-[10px] bg-sage-light p-[20px] text-[18px] leading-[0.9] tracking-[-0.02em] text-white uppercase transition-colors hover:bg-sage"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        {/* Categories Catalog with interactive filters, spotlight and products grid */}
        <div className="pt-10">
          <CategoriesCatalog />
        </div>

        {/* Real Customer Testimonials */}
        <Testimonials />

        {/* Contact Section */}
        <Contact
          title="Develop With Us Across Categories."
          intro="Looking for specific formulas, custom pack sizes, or private label options in these categories? Tell us what you have in mind and our team will put together options."
          defaultInterest="products"
        />
      </main>
      <SiteFooter />
    </>
  );
}
