import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { contact } from "@/data/content";
import { legalNav } from "@/data/navigation";

export type LegalSection = { heading: string; body: string[] };

type LegalPageProps = {
  title: string;
  href: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/** Shared layout for Terms, Privacy and Returns: hero, side navigation and a cream reading panel. */
export function LegalPage({ title, href, updated, intro, sections }: LegalPageProps) {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest pb-[clamp(96px,10vw,180px)]">
        <PageHero crumbs={[{ label: title }]} title={title} intro={intro} />

        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-[94px] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-3 lg:flex-col">
                {legalNav.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={l.href === href ? "page" : undefined}
                      className={`block rounded-[10px] px-5 py-4 text-[18px] leading-[0.9] tracking-[-0.02em] text-white uppercase transition-colors ${
                        l.href === href ? "bg-sage" : "bg-sage-light/40 hover:bg-sage-light/70"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ol className="mt-10 hidden flex-col gap-3 text-[15px] text-sage-light lg:flex">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#section-${i + 1}`} className="hover:text-cream">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="rounded-[33px] bg-sand px-6 py-12 text-forest sm:px-14 lg:py-16">
            <p className="text-[14px] tracking-[0.1em] text-sage uppercase">Last updated {updated}</p>
            <div className="mt-10 flex flex-col gap-12">
              {sections.map((s, i) => (
                <section key={s.heading} id={`section-${i + 1}`} className="scroll-mt-10">
                  <h2 className="font-valturin text-[clamp(1.75rem,2.4vw,2.75rem)] leading-[0.95] uppercase">
                    {i + 1}. {s.heading}
                  </h2>
                  <div className="mt-5 flex flex-col gap-4 text-[18px] leading-[1.6]">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <p className="mt-14 border-t border-forest/15 pt-8 text-[17px] leading-[1.6]">
              Questions about this page? Contact us at{" "}
              <a href={`mailto:${contact.email}`} className="underline hover:text-sage">
                {contact.email}
              </a>{" "}
              or{" "}
              <a href={`tel:${contact.phone}`} className="underline hover:text-sage">
                {contact.phone}
              </a>
              .
            </p>
          </article>
        </div>
      </main>
      <SiteFooter overlap={false} />
    </>
  );
}
