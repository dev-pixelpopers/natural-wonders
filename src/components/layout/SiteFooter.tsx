import Image from "next/image";
import Link from "next/link";
import { contact, socials } from "@/data/content";
import { footerNav, legalNav } from "@/data/navigation";
import { img } from "@/lib/design";

type SiteFooterProps = {
  /** True when the page ends with the contact panel, whose form overhangs into the footer. */
  overlap?: boolean;
};

export function SiteFooter({ overlap = true }: SiteFooterProps) {
  return (
    // On xl screens the contact form overhangs into the footer by 164px; 292px leaves the 128px gap from Figma.
    <footer className={`bg-night px-4 pt-20 pb-[65px] text-white sm:pr-[133px] sm:pl-[125px] ${overlap ? "xl:pt-[292px]" : "xl:pt-[128px]"}`}>
      {/* Figma column widths need ~1860px; narrower desktops get proportional columns */}
      <div className="grid grid-cols-2 gap-10 xl:grid-cols-[1.2fr_1fr_1fr_1.5fr_auto] 3xl:grid-cols-[386px_312px_326px_445px_auto] 3xl:gap-0">
        <Link href="/" aria-label="Natural Wunderz home" className="col-span-2 xl:col-span-1">
          <Image src={img("logo.png")} alt="Natural Wunderz" width={201} height={117} className="h-[117px] w-[201px] object-fill" />
        </Link>

        {footerNav.map((column, i) => (
          <nav key={i} aria-label={i === 0 ? "Company" : "More"} className="mt-[5px]">
            <ul className="text-[20px] leading-[40px] tracking-[-0.03em] capitalize">
              {column.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-mint">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <address className="mt-[10px] flex flex-col gap-[20px] text-[20px] leading-[20px] tracking-[-0.03em] not-italic">
          <a href={`tel:${contact.phone}`} className="flex items-center gap-[22px]">
            <Image src={img("icon-phone.png")} alt="" width={32} height={32} className="size-[32px] brightness-0 invert" />
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-[22px]">
            <Image src={img("icon-mail.png")} alt="" width={32} height={32} className="size-[32px] brightness-0 invert" />
            {contact.email}
          </a>
        </address>

        <ul className="text-[18px] leading-[41px] tracking-[-0.02em] capitalize">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="flex items-center gap-[12px] transition-colors hover:text-mint">
                <Image src={s.icon} alt="" width={16} height={16} className="size-[16px] brightness-0 invert" />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between xl:mt-[129px]">
        <p className="text-[18px] leading-[35px] sm:ml-[6px]">© 2026 Natural Wunderz. All Rights Reserved.</p>
        <ul className="flex gap-[37px] text-[20px] leading-[33px] tracking-[0.02em] capitalize">
          {legalNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-mint">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
