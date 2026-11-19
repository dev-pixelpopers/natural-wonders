"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/ui/PillLink";
import {
  type CategoryProduct,
  type CategorySlug,
  type CategorySpotlight,
} from "@/data/categoryProducts";
import { categories } from "@/data/content";

const brandFilterTabs = [
  { id: "all", label: "All Brands" },
  { id: "natural-wunderz", label: "Natural Wunderz" },
  { id: "juice-day", label: "Juice Day" },
  { id: "suzu", label: "Suzu" },
];

function ProductCard({ product }: { product: CategoryProduct }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-[28px] border border-white/50 bg-sand p-6 text-forest shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:p-7">
      <div>
        {/* Top bar: Brand badge & Size */}
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/brands/${product.brandSlug}`}
            className="rounded-full bg-forest/8 px-3 py-1 font-gotham text-[11px] font-semibold tracking-[0.06em] text-forest uppercase transition-colors hover:bg-forest hover:text-cream"
          >
            {product.brand}
          </Link>
          <span className="font-gotham text-[12px] text-forest/60">
            {product.size}
          </span>
        </div>

        {/* Product image container */}
        <div className="relative mt-4 mb-5 flex h-[260px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-cream/60 p-4 transition-colors group-hover:bg-cream">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(68,90,75,0.08)_0%,transparent_70%)]"
          />
          <Image
            src={product.image}
            alt={product.name}
            width={240}
            height={360}
            className="relative z-10 h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 200px, 240px"
          />
        </div>

        {/* Category & Scent note */}
        <div className="flex items-center gap-2">
          <span className="font-gotham text-[11px] font-medium tracking-[0.1em] text-sage uppercase">
            {product.subCategory}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="mt-2 font-valturin text-[22px] leading-[1.05] tracking-[-0.01em] text-forest uppercase sm:text-[24px]">
          {product.name}
        </h3>

        {/* Scent note */}
        <p className="mt-2 text-[14px] leading-snug text-forest/75">
          <span className="font-medium text-forest">Scent:</span> {product.scent}
        </p>

        {/* Feature badges */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {product.highlights.map((h) => (
            <li
              key={h}
              className="rounded-[6px] bg-white/70 px-2 py-0.5 font-gotham text-[10.5px] font-medium text-forest/70"
            >
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Card bottom action */}
      <div className="mt-6 flex items-center justify-between border-t border-forest/10 pt-4">
        <Link
          href={`/brands/${product.brandSlug}`}
          className="text-[13px] font-medium text-forest/80 underline decoration-forest/30 transition-colors hover:text-sage hover:decoration-sage"
        >
          View Brand
        </Link>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1.5 font-gotham text-[11px] font-medium tracking-[0.04em] text-cream transition-all hover:bg-sage"
        >
          Enquire
          <span aria-hidden className="text-[12px]">↗</span>
        </a>
      </div>
    </article>
  );
}

type SingleCategoryCatalogProps = {
  categorySlug: CategorySlug;
  categoryTitle: string;
  categoryDescription: string;
  products: CategoryProduct[];
  spotlight?: CategorySpotlight;
};

export function SingleCategoryCatalog({
  categorySlug,
  categoryTitle,
  products,
  spotlight,
}: SingleCategoryCatalogProps) {
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Unique subcategories for format filtering
  const subCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.subCategory));
    return Array.from(set);
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand =
        activeBrand === "all" || product.brandSlug === activeBrand;
      const matchesSubCategory =
        activeSubCategory === "all" || product.subCategory === activeSubCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.scent.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesBrand && matchesSubCategory && matchesSearch;
    });
  }, [products, activeBrand, activeSubCategory, searchQuery]);

  const otherCategories = categories.filter((c) => c.slug !== categorySlug);

  return (
    <section id="products" className="scroll-mt-16 px-4 sm:px-[56px] xl:px-[94px]">
      <div className="mx-auto max-w-[1600px]">
        {/* Category Spotlight Banner */}
        {spotlight && (
          <div className="overflow-hidden rounded-[36px] border border-white/20 bg-sand p-8 text-forest shadow-[0_8px_40px_rgba(0,0,0,0.18)] sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="font-gotham text-[12px] font-semibold tracking-[0.16em] text-sage uppercase">
                  Category Spotlight • {spotlight.brand}
                </span>
                <h2 className="mt-3 font-valturin text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] uppercase">
                  {spotlight.title}
                </h2>
                <p className="mt-2 text-[18px] font-medium text-sage">
                  {spotlight.subtitle}
                </p>
                <p className="mt-4 max-w-[540px] text-[16px] leading-[1.5] text-forest/85">
                  {spotlight.description}
                </p>

                {/* Key Benefits */}
                <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {spotlight.keyBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2.5 text-[14.5px]">
                      <span aria-hidden className="size-2 rounded-full bg-sage" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <PillLink href={`/brands/${spotlight.brandSlug}`}>
                    Explore {spotlight.brand}
                  </PillLink>
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full border border-forest/25 px-6 py-3 font-gotham text-[13px] font-semibold tracking-[0.06em] text-forest uppercase transition-colors hover:border-forest hover:bg-forest hover:text-cream"
                  >
                    Custom Formulation
                  </a>
                </div>
              </div>

              {/* Presentation lineup image */}
              <div className="relative mx-auto aspect-[16/10] w-full max-w-[620px] overflow-hidden rounded-[24px] bg-cream/70 p-4 shadow-inner">
                <Image
                  src={spotlight.presentationImage}
                  alt={spotlight.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 620px"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls Bar (No category tabs - focused purely on formats, brands & search) */}
        <div className="mt-12 rounded-[32px] border border-white/10 bg-forest-light/60 p-6 backdrop-blur-md sm:p-8">
          {/* Format Subcategories Pills (if more than 1 format available) */}
          {subCategories.length > 1 && (
            <div>
              <p className="font-gotham text-[12px] font-semibold tracking-[0.14em] text-mint uppercase">
                Filter By Format / Line
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubCategory("all")}
                  className={`cursor-pointer rounded-[10px] px-4 py-2 font-gotham text-[12.5px] font-medium tracking-[0.02em] uppercase transition-all ${
                    activeSubCategory === "all"
                      ? "bg-mint text-forest shadow-[0_4px_16px_rgba(194,255,214,0.35)]"
                      : "bg-forest/80 text-cream/90 hover:bg-forest hover:text-white"
                  }`}
                >
                  All Formats ({products.length})
                </button>
                {subCategories.map((sub) => {
                  const count = products.filter((p) => p.subCategory === sub).length;
                  const active = activeSubCategory === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setActiveSubCategory(sub)}
                      className={`cursor-pointer rounded-[10px] px-4 py-2 font-gotham text-[12.5px] font-medium tracking-[0.02em] uppercase transition-all ${
                        active
                          ? "bg-mint text-forest shadow-[0_4px_16px_rgba(194,255,214,0.35)]"
                          : "bg-forest/80 text-cream/90 hover:bg-forest hover:text-white"
                      }`}
                    >
                      {sub} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-bar: Brand filter + Search bar */}
          <div
            className={`flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between ${
              subCategories.length > 1 ? "mt-6 border-t border-white/10 pt-6" : ""
            }`}
          >
            {/* Brand pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 font-gotham text-[12px] tracking-[0.08em] text-sage-light uppercase">
                Brand:
              </span>
              {brandFilterTabs.map((brand) => {
                const count =
                  brand.id === "all"
                    ? products.length
                    : products.filter((p) => p.brandSlug === brand.id).length;
                if (brand.id !== "all" && count === 0) return null;
                const active = activeBrand === brand.id;
                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setActiveBrand(brand.id)}
                    className={`cursor-pointer rounded-full px-3.5 py-1 text-[12px] font-medium transition-colors ${
                      active
                        ? "bg-white text-forest"
                        : "bg-white/10 text-cream/80 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {brand.label} {brand.id !== "all" && `(${count})`}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scent, formula, ingredient..."
                className="w-full rounded-full border border-white/20 bg-forest/80 px-4 py-2 text-[14px] text-cream placeholder:text-cream/40 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-cream/50 hover:text-cream"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results summary bar */}
        <div className="mt-10 flex items-center justify-between px-2 text-cream">
          <p className="font-gotham text-[14px] text-cream/80">
            Showing <strong className="text-mint">{filteredProducts.length}</strong> of{" "}
            {products.length} products in <strong className="text-white">{categoryTitle}</strong>
            {activeBrand !== "all" && (
              <> from <span className="capitalize">{activeBrand.replace("-", " ")}</span></>
            )}
            {activeSubCategory !== "all" && <> ({activeSubCategory})</>}
          </p>

          {(activeBrand !== "all" || activeSubCategory !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveBrand("all");
                setActiveSubCategory("all");
                setSearchQuery("");
              }}
              className="text-[13px] text-mint underline decoration-mint/40 hover:decoration-mint"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : products.length === 0 ? (
          // Category with no products yet (e.g. new placeholder categories)
          <div className="mt-12 rounded-[28px] border border-white/10 bg-forest-light/40 py-20 text-center text-cream">
            <p className="font-valturin text-[28px] uppercase">{categoryTitle} products coming soon</p>
            <p className="mt-2 text-[15px] text-cream/70">
              We&rsquo;re developing this range now. Get in touch to hear about it first.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-full bg-mint px-6 py-2.5 font-gotham text-[13px] font-semibold text-forest uppercase"
            >
              Get In Touch
            </a>
          </div>
        ) : (
          <div className="mt-12 rounded-[28px] border border-white/10 bg-forest-light/40 py-20 text-center text-cream">
            <p className="font-valturin text-[28px] uppercase">No matching products found</p>
            <p className="mt-2 text-[15px] text-cream/70">
              Try adjusting your format selection, brand filter, or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveBrand("all");
                setActiveSubCategory("all");
                setSearchQuery("");
              }}
              className="mt-6 inline-block rounded-full bg-mint px-6 py-2.5 font-gotham text-[13px] font-semibold text-forest uppercase"
            >
              Show All {categoryTitle}
            </button>
          </div>
        )}

        {/* Other Categories Section */}
        <div className="mt-24 border-t border-white/10 pt-20">
          <div className="text-center">
            <span className="font-gotham text-[13px] font-semibold tracking-[0.16em] text-mint uppercase">
              Explore More
            </span>
            <h2 className="mt-4 font-valturin text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.94] text-cream uppercase">
              Other Categories
            </h2>
            <p className="mx-auto mt-4 max-w-[680px] text-lead text-cream/80">
              Discover our complete range across personal care, bath, grooming, and fragrance.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {otherCategories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col justify-between rounded-[24px] border border-white/20 bg-sand p-6 text-forest shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-gotham text-[11px] font-medium tracking-[0.14em] text-sage uppercase">
                      Category {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="flex size-6 items-center justify-center rounded-full bg-forest/5 text-[12px] text-forest/40 transition-colors duration-300 group-hover:bg-forest group-hover:text-cream"
                    >
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-3 font-valturin text-[24px] leading-[0.92] text-forest uppercase">
                    {cat.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13.5px] leading-[1.35] text-forest/75">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-forest/10 pt-3">
                  <span className="text-[13px] font-semibold text-forest group-hover:text-sage">
                    View Category →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-6 py-3 font-gotham text-[13px] font-semibold text-mint uppercase transition-colors hover:bg-mint hover:text-forest"
            >
              ← Back to All Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
