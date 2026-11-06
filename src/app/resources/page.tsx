import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/data/content";
import { faqs, resources } from "@/data/pages";
import { img } from "@/lib/design";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, category insights and answers to common questions about working with Natural Wunderz.",
};

export default function ResourcesPage() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Resources" }]}
          title={
            <>
              Insights &amp;
              <br />
              Answers.
            </>
          }
          intro="Guides for planning a launch, perspectives on the categories we work in and answers to the questions retailers and partners ask us most."
        />

        {/* Resource cards */}
        <section className="px-4 sm:px-[94px]">
          <ul className="mx-auto grid max-w-[1650px] gap-10 md:grid-cols-3 md:gap-8">
            {resources.map((r) => (
              <li key={r.title}>
                <Link href={r.href} className="group flex h-full flex-col overflow-hidden rounded-[33px] bg-sand text-forest shadow-[0_4px_120px_rgba(0,0,0,0.35)]">
                  <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-[24px]">
                    <Image src={r.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 rounded-[10px] bg-forest/85 px-4 py-2 text-[13px] tracking-[0.08em] text-white uppercase">
                      {r.kind}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 px-7 pt-5 pb-8">
                    <h2 className="font-valturin text-[clamp(1.75rem,2.2vw,2.5rem)] leading-[0.95] uppercase">{r.title}</h2>
                    <p className="text-[17px] leading-[1.45]">{r.body}</p>
                    <span className="mt-auto flex items-center gap-[10px] pt-4 text-[15px]">
                      {r.cta}
                      <Image
                        src={img("arrow-right-dark.svg")}
                        alt=""
                        width={25.5}
                        height={7.36}
                        className="h-[7.36px] w-[25.5px] transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-10 px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <div className="mx-auto grid max-w-[1650px] gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-24">
            <div>
              <SectionHeading layout="left" eyebrow="FAQ" title="Questions, Answered." />
              <p className="mt-8 max-w-[440px] text-body text-white/85">
                Can’t find what you’re looking for? Call us on{" "}
                <a href={`tel:${contact.phone}`} className="underline hover:text-mint">
                  {contact.phone}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${contact.email}`} className="underline hover:text-mint">
                  {contact.email}
                </a>
                .
              </p>
              <Image
                src={img("about-leaves.svg")}
                alt=""
                aria-hidden
                width={515}
                height={266}
                className="mt-14 hidden h-auto w-[320px] rotate-[7.64deg] lg:block"
              />
            </div>
            <Faq items={faqs} />
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
