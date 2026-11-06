import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Contact } from "@/components/sections/Contact";
import { CornerCard } from "@/components/ui/CornerCard";
import { contact, interestOptions, socials, type Interest } from "@/data/content";
import { img } from "@/lib/design";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Natural Wunderz about carrying our brands, our products or private label.",
};

const isInterest = (v: unknown): v is Interest => interestOptions.some((o) => o.value === v);

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // /contact?interest=private-label pre-selects the form's area of interest
  const { interest } = await searchParams;
  const defaultInterest = isInterest(interest) ? interest : undefined;

  const channels = [
    {
      label: "Call Us",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      icon: img("icon-call.png"),
      note: "Mon – Fri, 9am – 5pm PT",
    },
    {
      label: "Email Us",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: img("icon-mail.png"),
      note: "We reply within one business day",
    },
    {
      label: "Visit",
      value: "Southern California",
      href: undefined,
      icon: img("icon-manufacturing.png"),
      note: "Meetings by appointment",
    },
  ];

  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <PageHero
          crumbs={[{ label: "Contact" }]}
          title={
            <>
              Let’s Talk About
              <br />
              What’s Next.
            </>
          }
          intro="Interested in carrying our brands, learning more about our products or exploring private label? We’d love to hear from you."
        />

        <section className="px-4 sm:px-[94px]">
          <ul className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3 md:gap-8">
            {channels.map((c, i) => {
              const inner = (
                <div className="flex h-full flex-col items-center gap-4 px-6 py-12 text-center text-white">
                  <span className="relative flex size-[72px] items-center justify-center rounded-full border border-white/60">
                    <Image src={c.icon} alt="" width={32} height={32} className="size-[32px] object-contain brightness-0 invert" />
                  </span>
                  <p className="text-[14px] tracking-[0.12em] text-mint uppercase">{c.label}</p>
                  <p className="font-valturin text-[clamp(1.5rem,2vw,2.25rem)] leading-[1] break-all sm:break-normal">{c.value}</p>
                  <p className="text-[15px] text-white/80">{c.note}</p>
                </div>
              );
              return (
                <li key={c.label} style={{ rotate: `${(i - 1) * 2}deg` }}>
                  <CornerCard className="h-full">
                    {c.href ? (
                      <a href={c.href} className="block h-full transition-opacity hover:opacity-85">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </CornerCard>
                </li>
              );
            })}
          </ul>

          <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[18px] text-cream">
            <span className="text-sage-light">Follow along</span>
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="flex items-center gap-3 capitalize hover:text-mint">
                <Image src={s.icon} alt="" width={18} height={18} className="size-[18px] brightness-0 invert" />
                {s.label}
              </a>
            ))}
            <Link href="/resources#faq" className="underline underline-offset-4 hover:text-mint">
              Read our FAQs
            </Link>
          </div>
        </section>

        <Contact
          title="Send Us a Message."
          intro="Share a brief description of what you have in mind, and our team will get back to you."
          defaultInterest={defaultInterest}
        />
      </main>
      <SiteFooter />
    </>
  );
}
