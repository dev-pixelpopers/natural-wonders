import Image from "next/image";
import { portfolioFilters, portfolioTiles, type PortfolioTile } from "@/data/content";
import { img } from "@/lib/design";

function Tile({ tile }: { tile: PortfolioTile }) {
  const { box, window } = tile;
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: window.width, height: window.height }}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        width={box.width}
        height={box.height}
        sizes={`${box.width}px`}
        className="absolute max-w-none object-cover"
        style={{ left: -window.x, top: -window.y, width: box.width, height: box.height }}
      />
    </div>
  );
}

export function Portfolio() {
  return (
    <section className="relative isolate pt-[99px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={img("portfolio-glow.svg")}
          alt=""
          width={3070}
          height={1822}
          className="absolute top-[625px] left-1/2 h-[1822px] w-[3070px] max-w-none -translate-1/2 -rotate-18"
        />
        <div className="absolute top-[470px] left-1/2 h-[538px] w-[1920px] -translate-x-1/2 bg-linear-to-r from-[rgba(210,215,213,0)] via-[#d2d7d5] via-[45.386%] to-[rgba(210,215,213,0)] opacity-17" />
        <Image
          src={img("portfolio-leaves.svg")}
          alt=""
          width={793}
          height={410}
          className="absolute top-[336px] left-[calc(50%+564px)] h-[410px] w-[793px] max-w-none -translate-1/2 rotate-[7.64deg]"
        />
      </div>

      <h2 className="max-w-[1111px] px-4 font-valturin text-display text-white uppercase sm:px-[108px]">
        A Portfolio of Beauty Brands
      </h2>

      <div className="no-scrollbar mt-[82px] overflow-x-auto">
        <div className="mx-auto flex w-max items-end gap-[37px] px-4">
          {portfolioTiles.map((tile) => (
            <Tile key={tile.src} tile={tile} />
          ))}
        </div>
      </div>

      <ul className="mt-[64px] flex flex-wrap justify-center gap-[14px] px-4">
        {portfolioFilters.map((filter) => (
          <li key={filter.label}>
            <button
              type="button"
              aria-pressed={filter.active}
              className={`rounded-[10px] p-[20px] text-[20px] leading-[0.9] tracking-[-0.02em] text-white uppercase ${
                filter.active ? "bg-forest" : "bg-sage-light"
              }`}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
