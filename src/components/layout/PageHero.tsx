import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { img } from "@/lib/design";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Trail after "Home"; the last item is the current page. */
  crumbs: Crumb[];
  /** Optional element on the right of the intro (a badge, a link). */
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

/** Inner-page hero: the homepage glows and leaves, breadcrumb, display title and intro. */
export function PageHero({ title, intro, crumbs, aside, children }: PageHeroProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...crumbs];

  return (
    <section className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip">
        <Image
          src={img("hero-glow-right.svg")}
          alt=""
          width={1808}
          height={1680}
          priority
          className="absolute top-[-550px] right-[-478px] h-[1680px] w-[1808px] max-w-none"
        />
        <Image
          src={img("hero-glow-left.svg")}
          alt=""
          width={1698}
          height={1325}
          className="absolute top-[200px] left-[-764px] h-[1325px] w-[1698px] max-w-none opacity-80"
        />
        <Image
          src={img("hero-leaves.svg")}
          alt=""
          width={1578}
          height={813}
          className="absolute top-[260px] left-1/2 h-[813px] w-[1578px] max-w-none -translate-x-1/2 opacity-70"
        />
      </div>

      <SiteHeader />

      <div className="mx-auto max-w-[1726px] px-4 pt-10 pb-20 sm:px-[94px] sm:pt-[60px] xl:pb-[120px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-3 text-[14px] tracking-[0.08em] text-sage-light uppercase">
            {trail.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="size-[5px] rounded-full bg-mint/70" />}
                {crumb.href && i < trail.length - 1 ? (
                  <Link href={crumb.href} className="transition-colors hover:text-cream">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-cream">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="mx-auto mt-8 max-w-[1500px] text-center font-valturin text-[clamp(3rem,7.3vw,8.75rem)] leading-[0.95] tracking-[-0.01em] text-cream uppercase">
          {title}
        </h1>

        {(intro || aside) && (
          <div className="relative mt-10 flex flex-col items-center gap-10 xl:block">
            {intro && <p className="mx-auto max-w-[945px] text-center text-lead text-cream">{intro}</p>}
            {aside && <div className="xl:absolute xl:top-[-30px] xl:right-0">{aside}</div>}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

/** The dashed-circle badge from the homepage hero, linking anywhere. */
export function CircleBadge({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative flex size-[180px] shrink-0 flex-col items-center justify-center text-center xl:size-[210px]"
    >
      <Image
        src={img("circle-dashed-lg.png")}
        alt=""
        fill
        sizes="210px"
        className="object-contain transition-transform duration-700 group-hover:rotate-45"
      />
      <Image
        src={img("arrow-diagonal.svg")}
        alt=""
        width={41}
        height={41}
        className="relative ml-[12px] size-[34px] -rotate-45 object-contain xl:size-[41px]"
      />
      <span className="relative mt-[14px] w-[135px] text-[19px] leading-[1.21] text-cream xl:text-[21px]">
        {label}
      </span>
    </Link>
  );
}
