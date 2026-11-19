"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PillLink } from "@/components/ui/PillLink";
import type { CategoryProduct, CategorySlug } from "@/data/categoryProducts";
import { categories } from "@/data/content";

type Filter = "all" | CategorySlug;

/** Products shown at first, and added by each "Load More" click. */
const PAGE_SIZE = 8;

const categoryTitle = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.title ?? slug;

function ProductCard({ product }: { product: CategoryProduct }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-[24px] bg-sand text-forest shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] motion-safe:animate-[collection-in_0.45s_ease-out]">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        {/* Soft glow behind the cut-out product */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(68,90,75,0.12)_0%,transparent_65%)]"
        />
        {/* Inset frame keeps the bottle clear of the card edges and the pill */}
        <div className="absolute inset-x-6 top-12 bottom-5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        {/* Category pill */}
        <span className="absolute top-4 left-4 rounded-full bg-forest/85 px-3.5 py-1.5 text-[12px] font-medium tracking-[0.08em] text-cream uppercase backdrop-blur-sm">
          {categoryTitle(product.categorySlug)}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-start gap-3 p-6 text-left">
        <h3 className="font-valturin text-[clamp(22px,1.6vw,28px)] leading-[0.95] tracking-[-0.01em] uppercase">
          {product.name}
        </h3>
        <p className="text-[15px] leading-[1.45] text-forest/80">{product.summary}</p>
        <PillLink href="#" className="mt-auto px-[20px] py-[11px] text-[14px]">
          View Product
        </PillLink>
      </div>
    </li>
  );
}

/** "The Collection" on a brand page: the brand's products with a category filter. */
export function BrandCollection({
  brandName,
  products,
}: {
  brandName: string;
  products: CategoryProduct[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(PAGE_SIZE);

  // Changing category starts again from the first page
  const selectFilter = (next: Filter) => {
    setFilter(next);
    setShown(PAGE_SIZE);
  };

  // Only the categories this brand actually has, in the site-wide category order
  const tabs = useMemo(
    () =>
      categories
        .map((c) => c.slug as CategorySlug)
        .filter((slug) => products.some((p) => p.categorySlug === slug))
        .map((slug) => ({
          id: slug as Filter,
          label: categoryTitle(slug),
          count: products.filter((p) => p.categorySlug === slug).length,
        })),
    [products],
  );

  const filtered = filter === "all" ? products : products.filter((p) => p.categorySlug === filter);
  const visible = filtered.slice(0, shown);
  const remaining = filtered.length - visible.length;

  if (products.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-[1650px] rounded-[28px] border border-white/10 bg-forest-light/40 px-6 py-20 text-center text-cream">
        <p className="font-valturin text-[clamp(26px,2.4vw,36px)] uppercase">
          {brandName} products coming soon
        </p>
        <p className="mx-auto mt-3 max-w-[520px] text-[16px] text-cream/75">
          We&rsquo;re putting the finishing touches on this collection. Get in touch to hear about it first.
        </p>
        <a
          href="#contact"
          className="mt-7 inline-block rounded-full bg-mint px-6 py-2.5 font-gotham text-[13px] font-semibold text-forest uppercase"
        >
          Get In Touch
        </a>
      </div>
    );
  }

  const tabClass = (active: boolean) =>
    `cursor-pointer rounded-full border px-5 py-2.5 text-[13px] font-medium tracking-[0.06em] uppercase transition-colors duration-300 ${
      active
        ? "border-mint bg-mint text-forest"
        : "border-white/25 text-cream/85 hover:border-white/60 hover:text-white"
    }`;

  return (
    <div className="mx-auto mt-12 max-w-[1650px]">
      {/* Category filter */}
      <div role="tablist" aria-label={`Filter ${brandName} products by category`} className="flex flex-wrap gap-3">
        <button
          type="button"
          role="tab"
          aria-selected={filter === "all"}
          onClick={() => selectFilter("all")}
          className={tabClass(filter === "all")}
        >
          All ({products.length})
        </button>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={filter === t.id}
            onClick={() => selectFilter(t.id)}
            className={tabClass(filter === t.id)}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Products, 4 per row on desktop; keyed by filter so a new category re-renders cleanly.
          Each card fades up on mount, so "Load More" cards animate in too. */}
      <ul key={filter} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ul>

      {/* Load the next page; hidden once everything in this category is shown */}
      {remaining > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="cursor-pointer rounded-full border border-white/40 px-8 py-3.5 text-[14px] font-medium tracking-[0.06em] text-cream uppercase transition-colors duration-300 hover:border-mint hover:bg-mint hover:text-forest"
          >
            Load More ({remaining})
          </button>
        </div>
      )}
    </div>
  );
}
