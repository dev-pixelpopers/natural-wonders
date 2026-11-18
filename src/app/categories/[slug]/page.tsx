import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Contact } from "@/components/sections/Contact";
import { SingleCategoryCatalog } from "@/components/sections/SingleCategoryCatalog";
import { Testimonials } from "@/components/sections/Testimonials";
import {
  categoryProducts,
  categorySpotlights,
  type CategorySlug,
} from "@/data/categoryProducts";
import { categories } from "@/data/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.title} | Natural Wunderz`,
    description: category.description,
  };
}

export default async function SingleCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = categoryProducts.filter((p) => p.categorySlug === slug);
  const spotlight = categorySpotlights.find((s) => s.slug === slug);

  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        {/* Same Hero Banner matching Products and Categories pages, tailored for this category */}
        <PageHero
          crumbs={[{ label: "Categories", href: "/categories" }, { label: category.title }]}
          title={<>{category.title}.</>}
          intro={category.description}
          aside={<CircleBadge href="#products" label="View Products" />}
        />

        {/* Single Category Catalog without category tabs, focused on products & formats */}
        <div className="pt-10">
          <SingleCategoryCatalog
            categorySlug={category.slug as CategorySlug}
            categoryTitle={category.title}
            categoryDescription={category.description}
            products={products}
            spotlight={spotlight}
          />
        </div>

        {/* Real Customer Testimonials */}
        <Testimonials />

        {/* Contact Section */}
        <Contact
          title={`Develop ${category.title} Products With Us.`}
          intro={`Looking for custom formulations, pack sizes, or private label solutions in ${category.title.toLowerCase()}? Tell us what you have in mind.`}
          defaultInterest="products"
        />
      </main>
      <SiteFooter />
    </>
  );
}
