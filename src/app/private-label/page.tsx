import type { Metadata } from "next";
import Image from "next/image";
import { CircleBadge, PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CornerCard } from "@/components/ui/CornerCard";
import { PillLink } from "@/components/ui/PillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/content";
import { faqs, privateLabelBenefits, privateLabelSteps } from "@/data/pages";
import { img } from "@/lib/design";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Private Label",
  description:
    "Launch your own beauty and personal-care line with Natural Wunderz: formulation, packaging, manufacturing and fulfillment under one roof.",
};

export default function PrivateLabelPage() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Private Label" }]}
          title={
            <>
              Your Brand.
              <br />
              Our Expertise.
            </>
          }
          intro="Launch a beauty or personal-care line with a manufacturer that builds brands of its own. We bring the formulas, packaging, production and fulfillment so you can focus on your customer."
          aside={<CircleBadge href="#contact" label="Start Your Project" />}
        />

        {/* Benefits */}
        <section className="px-4 sm:px-[94px]">
          <ul className="mx-auto grid max-w-[1500px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {privateLabelBenefits.map((b, i) => (
              <li key={b.title} style={{ rotate: `${[-4, -1.5, 1.5, 4][i]}deg` }} className="lg:[&:nth-child(2)]:-translate-y-6 lg:[&:nth-child(3)]:-translate-y-6">
                <CornerCard className="h-full" corner={56}>
                  <div className="flex h-full flex-col items-center gap-5 px-6 pt-10 pb-10 text-center text-white">
                    <Image src={b.icon} alt="" width={113} height={110} className="h-[96px] w-auto" />
                    <h2 className="font-valturin text-[28px] leading-[0.92] uppercase">{b.title}</h2>
                    <p className="text-[17px] leading-[1.45]">{b.body}</p>
                  </div>
                </CornerCard>
              </li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <SectionHeading
            eyebrow="The Process"
            title="From Brief to Shelf in Five Steps."
            body="A clear, collaborative path with one team accountable from the first conversation to replenishment."
          />
          <div className="mt-20">
            <ProcessSteps steps={privateLabelSteps} />
          </div>
        </section>

        {/* Categories on the cream stadium */}
        <section className="relative isolate mt-[clamp(96px,10vw,180px)] px-4 sm:px-[108px]">
          <div aria-hidden className="absolute inset-x-4 inset-y-0 -z-10 rounded-[clamp(60px,12vw,450px)] bg-cream sm:inset-x-[108px]" />
          <div className="mx-auto max-w-[1300px] px-2 py-[clamp(72px,8.96vw,172px)] sm:px-10">
            <SectionHeading
              tone="dark"
              layout="split"
              eyebrow="What We Make"
              title="Formulas Ready for Your Label."
              body="Start from our library of proven formulas or develop something new. We cover the categories shoppers buy every week."
            />
            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <li key={c.slug} className="overflow-hidden rounded-[33px] border-[10px] border-forest bg-forest">
                  <div className="relative aspect-[377/420] overflow-hidden rounded-[24px]">
                    <Image src={c.image} alt="" width={2752} height={1536} sizes="600px" className="absolute max-w-none" style={c.crop} />
                  </div>
                  <h3 className="px-4 pt-5 pb-3 text-center font-valturin text-[26px] leading-[0.9] text-white uppercase">{c.title}</h3>
                </li>
              ))}
            </ul>
            <div className="mt-14 flex justify-center">
              <PillLink href="/products">See All Categories</PillLink>
            </div>
          </div>
        </section>

        <Capabilities />

        <section className="px-4 pt-[clamp(96px,10vw,180px)] sm:px-[94px]">
          <SectionHeading eyebrow="Good to Know" title="Private Label FAQs" />
          <div className="mx-auto mt-16 max-w-[1100px]">
            <Faq items={faqs.slice(1, 6)} />
          </div>
        </section>

        <Image
          src={img("about-leaves.svg")}
          alt=""
          aria-hidden
          width={515}
          height={266}
          className="mx-auto mt-[clamp(72px,8vw,140px)] h-auto w-[min(380px,50vw)] rotate-[7.64deg]"
        />

        <Contact
          title="Let’s Build Your Line."
          intro="Share your concept, target customer and price point. Our team will come back with a recommended approach, timelines and next steps."
          defaultInterest="private-label"
        />
      </main>
      <SiteFooter />
    </>
  );
}
