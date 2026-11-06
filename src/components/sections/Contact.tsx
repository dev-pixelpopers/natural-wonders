import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { contact, type Interest } from "@/data/content";
import { img } from "@/lib/design";

type ContactProps = {
  title?: React.ReactNode;
  intro?: React.ReactNode;
  /** Pre-selects the form's "Area of Interest". */
  defaultInterest?: Interest;
};

export function Contact({
  title = "Let’s Talk About What’s Next.",
  intro = "Interested in carrying our brands, learning more about our products or exploring private label? Share a brief description of what you have in mind, and our team will get back to you.",
  defaultInterest,
}: ContactProps) {
  return (
    <section id="contact" className="relative isolate px-4 pt-[clamp(120px,13.6vw,261px)] sm:px-[94px] sm:pr-[100px]">
      {/* The page turns dark two thirds of the way down the panel */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 bg-night" style={{ top: "calc(clamp(120px, 13.6vw, 261px) + 488px)" }} />

      <div className="grid min-h-[650px] gap-10 rounded-[10px] border border-[#dbdbdb] bg-sage p-6 sm:pr-[104px] sm:pl-[45px] xl:grid-cols-[minmax(360px,1fr)_minmax(0,723px)] xl:gap-8 xl:p-0 xl:pr-[104px] xl:pl-[45px]">
        <div className="flex flex-col xl:pt-[81px] xl:pb-[43px]">
          <h2 className="max-w-[638px] font-valturin text-display text-white uppercase">
            {title}
          </h2>
          <p className="mt-[22px] max-w-[582px] text-[20px] leading-[28px] tracking-[-0.03em] text-white">
            {intro}
          </p>

          <div className="mt-[85px] flex max-w-[535px] flex-wrap items-center justify-between gap-6 text-white capitalize">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-[29px]">
              <span className="relative size-[49px] shrink-0">
                <Image src={img("phone-circle.svg")} alt="" width={49} height={49} className="size-[49px]" />
                <Image
                  src={img("icon-call.png")}
                  alt=""
                  width={22}
                  height={22}
                  className="absolute top-[13px] left-[12px] size-[22px] brightness-0 invert"
                />
              </span>
              <span className="flex flex-col">
                <span className="text-[18px] leading-[24px] tracking-[-0.03em]">Call us</span>
                <span className="text-[26px] leading-[30px] tracking-[-0.03em]">{contact.phone}</span>
              </span>
            </a>
            <Link href="/contact" className="flex items-center gap-[2px] text-[20px] leading-[36px] tracking-[-0.03em] transition-opacity hover:opacity-70">
              Inquire Now
              <Image src={img("arrow-inquire.svg")} alt="" width={13} height={11} className="h-[11px] w-[12.75px]" />
            </Link>
          </div>
        </div>

        <div className="xl:mt-[65px] xl:-mb-[164px] xl:self-start">
          <ContactForm defaultInterest={defaultInterest} />
        </div>
      </div>
    </section>
  );
}
