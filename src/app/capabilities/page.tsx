import type { Metadata } from "next";
import Image from "next/image";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CapabilityExplorer } from "@/components/sections/CapabilityExplorer";
import { Contact } from "@/components/sections/Contact";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CornerCard } from "@/components/ui/CornerCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/data/content";
import { privateLabelSteps, stats } from "@/data/pages";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Product strategy, custom formulation, brand design, sourcing, manufacturing, quality control and fulfillment: the integrated capabilities behind Natural Wunderz.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Capabilities" }]}
          title={
            <>
              Capabilities Behind
              <br />
              the Brands.
            </>
          }
          intro="From the first formula to the final shipment, every step happens with us. Integrated development, branding, sourcing, manufacturing and fulfillment let us launch quickly with quality, value and shelf appeal."
          aside={<CircleBadge href="#explore" label="Explore What We Do" />}
        />

        <section id="explore" className="relative scroll-mt-10">
          <CapabilityExplorer />
        </section>

        {/* Proof points */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <ul className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.label} style={{ rotate: `${[-3, -1, 1, 3][i]}deg` }}>
                <CornerCard className="h-full" corner={40}>
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-10 text-center text-white">
                    <p className="font-valturin text-[clamp(3rem,5vw,5.5rem)] leading-[0.9]">
                      {s.value}
                      <span className="text-[0.4em] text-mint">{s.suffix}</span>
                    </p>
                    <p className="text-[14px] tracking-[0.08em] uppercase">{s.label}</p>
                  </div>
                </CornerCard>
              </li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <SectionHeading
            eyebrow="How We Work"
            title="One Partner, Concept to Shelf."
            body="A single connected process keeps the original idea intact and the timeline short."
          />
          <div className="mt-20">
            <ProcessSteps steps={privateLabelSteps} />
          </div>
        </section>

        {/* Why it matters */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <div className="mx-auto max-w-[1650px] rounded-[33px] bg-sand px-6 py-16 text-forest sm:px-16 lg:py-24">
            <SectionHeading tone="dark" layout="split" title="Why Integrated Matters." body="When the people who formulate a product also make it, decisions happen faster and quality stays consistent." />
            <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {pillars.map((p) => (
                <li key={p.label} className="flex flex-col items-center gap-5 text-center">
                  <span className="flex size-[110px] items-center justify-center rounded-full bg-sage">
                    <Image src={p.icon} alt="" width={113} height={110} className="h-[70px] w-auto" />
                  </span>
                  <p className="max-w-[220px] font-valturin text-[24px] leading-[0.95] uppercase">{p.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact
          title="Put Our Capabilities to Work."
          intro="Have a product idea, a range to scale or a launch to accelerate? Tell us what you need and our team will recommend the right path."
          defaultInterest="private-label"
        />
      </main>
      <SiteFooter />
    </>
  );
}
