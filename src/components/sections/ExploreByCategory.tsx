import Link from "next/link";
import { categoryProducts } from "@/data/categoryProducts";
import { categories } from "@/data/content";

type ExploreByCategoryProps = {
  /**
   * Wrap the block in its own page-width section with side padding (default).
   * Pass `false` when it sits inside something that already has that padding,
   * such as the CategoriesCatalog section.
   */
  contained?: boolean;
  /** Spacing / divider classes on the block itself. */
  className?: string;
};

/**
 * "Category Architecture / Explore By Category": a card per product category with its
 * product count, linking to that category's page. Originally part of CategoriesCatalog.
 */
export function ExploreByCategory({ contained = true, className = "pt-10" }: ExploreByCategoryProps) {
  const block = (
    <div className={className}>
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
  );

  if (!contained) return block;

  return (
    <section className="px-4 sm:px-[56px] xl:px-[94px]">
      <div className="mx-auto max-w-[1600px]">{block}</div>
    </section>
  );
}
