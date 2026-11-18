"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/ui/PillLink";
import {
  categoryProducts,
  categorySpotlights,
  type CategoryProduct,
  type CategorySlug,
} from "@/data/categoryProducts";
import { categories } from "@/data/content";

const categoryFilterTabs: { id: "all" | CategorySlug; label: string }[] = [
  { id: "all", label: "All Categories" },
  { id: "body-bath", label: "Body & Bath" },
  { id: "hair-care", label: "Hair Care" },
  { id: "mens-grooming", label: "Men's Grooming" },
  { id: "lotions-butters", label: "Lotions & Butters" },
  { id: "fragrance-mists", label: "Fragrance Mists" },
  { id: "skin-care", label: "Skin Care" },
];

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
          {/* Subtle radial ambient glow */}
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

export function CategoriesCatalog() {
  const [activeCategory, setActiveCategory] = useState<"all" | CategorySlug>("all");
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.categorySlug === activeCategory;
      const matchesBrand =
        activeBrand === "all" || product.brandSlug === activeBrand;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.scent.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [activeCategory, activeBrand, searchQuery]);

  // Active spotlight
  const currentSpotlight = useMemo(() => {
    if (activeCategory === "all") return null;
    return categorySpotlights.find((s) => s.slug === activeCategory) || null;
  }, [activeCategory]);

  return (
    <section id="categories-catalog" className="scroll-mt-16 px-4 sm:px-[56px] xl:px-[94px]">
      <div className="mx-auto max-w-[1600px]">
        {/* Navigation & Filters Bar */}
        <div className="rounded-[32px] border border-white/10 bg-forest-light/60 p-6 backdrop-blur-md sm:p-8">
          {/* Category Tabs */}
          <div>
            <p className="font-gotham text-[12px] font-semibold tracking-[0.14em] text-mint uppercase">
              Filter By Category
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              {categoryFilterTabs.map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`cursor-pointer rounded-[10px] px-4 py-2.5 font-gotham text-[13px] font-medium tracking-[0.02em] uppercase transition-all duration-200 ${
                      active
                        ? "bg-mint text-forest shadow-[0_4px_16px_rgba(194,255,214,0.35)]"
                        : "bg-forest/80 text-cream/90 hover:bg-forest hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-bar: Brand filter + Search bar */}
          <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Brand pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 font-gotham text-[12px] tracking-[0.08em] text-sage-light uppercase">
                Brand:
              </span>
              {brandFilterTabs.map((brand) => {
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
                    {brand.label}
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

        {/* Category Spotlight (Shows when a specific category tab is selected) */}
        {currentSpotlight && (
          <div className="mt-12 overflow-hidden rounded-[36px] border border-white/20 bg-sand p-8 text-forest shadow-[0_8px_40px_rgba(0,0,0,0.18)] sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="font-gotham text-[12px] font-semibold tracking-[0.16em] text-sage uppercase">
                  Category Spotlight • {currentSpotlight.brand}
                </span>
                <h2 className="mt-3 font-valturin text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] uppercase">
                  {currentSpotlight.title}
                </h2>
                <p className="mt-2 text-[18px] font-medium text-sage">
                  {currentSpotlight.subtitle}
                </p>
                <p className="mt-4 max-w-[540px] text-[16px] leading-[1.5] text-forest/85">
                  {currentSpotlight.description}
                </p>

                {/* Key Benefits */}
                <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {currentSpotlight.keyBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2.5 text-[14.5px]">
                      <span aria-hidden className="size-2 rounded-full bg-sage" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/categories/${currentSpotlight.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-gotham text-[13px] font-semibold tracking-[0.04em] text-cream uppercase transition-colors hover:bg-sage"
                  >
                    View {currentSpotlight.title} Page
                    <span aria-hidden>→</span>
                  </Link>
                  <PillLink href={`/brands/${currentSpotlight.brandSlug}`}>
                    Explore {currentSpotlight.brand}
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
                  src={currentSpotlight.presentationImage}
                  alt={currentSpotlight.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results summary bar */}
        <div className="mt-12 flex items-center justify-between px-2 text-cream">
          <p className="font-gotham text-[14px] text-cream/80">
            Showing <strong className="text-mint">{filteredProducts.length}</strong> products
            {activeCategory !== "all" && (
              <> in <span className="capitalize">{activeCategory.replace("-", " ")}</span></>
            )}
            {activeBrand !== "all" && (
              <> from <span className="capitalize">{activeBrand.replace("-", " ")}</span></>
            )}
          </p>

          {(activeCategory !== "all" || activeBrand !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveBrand("all");
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
        ) : (
          <div className="mt-12 rounded-[28px] border border-white/10 bg-forest-light/40 py-20 text-center text-cream">
            <p className="font-valturin text-[28px] uppercase">No matching products found</p>
            <p className="mt-2 text-[15px] text-cream/70">
              Try adjusting your category filter, brand selection, or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveBrand("all");
                setSearchQuery("");
              }}
              className="mt-6 inline-block rounded-full bg-mint px-6 py-2.5 font-gotham text-[13px] font-semibold text-forest uppercase"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Category Editorial Cards Section (when in All Categories view) */}
        {activeCategory === "all" && !searchQuery && activeBrand === "all" && (
          <div className="mt-24 border-t border-white/10 pt-20">
            <div className="text-center">
              <span className="font-gotham text-[13px] font-semibold tracking-[0.16em] text-mint uppercase">
                Category Architecture
              </span>
              <h2 className="mt-4 font-valturin text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.94] text-cream uppercase">
                Explore By Category
              </h2>
              <p className="mx-auto mt-4 max-w-[680px] text-lead text-cream/80">
                Each product category is crafted with tailored active ingredients, clean formulations, and captivating fragrance profiles.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, idx) => {
                const count = categoryProducts.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group flex flex-col justify-between rounded-[28px] border border-white/20 bg-sand p-7 text-forest shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-gotham text-[12px] font-medium tracking-[0.14em] text-sage uppercase">
                          Category {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-forest/10 px-2.5 py-0.5 font-gotham text-[11px] font-semibold text-forest">
                          {count} Products
                        </span>
                      </div>

                      <h3 className="mt-5 font-valturin text-[30px] leading-[0.92] text-forest uppercase sm:text-[34px]">
                        {cat.title}
                      </h3>

                      <p className="mt-3 text-[15px] leading-[1.4] text-forest/80">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-forest/10 pt-4">
                      <span className="text-[14px] font-semibold text-forest group-hover:text-sage">
                        Browse Category Page →
                      </span>
                      <span className="text-[12px] text-forest/40 uppercase">
                        Explore
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
