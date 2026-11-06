import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { img } from "@/lib/design";

type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  style?: CSSProperties;
};

/** Outlined pill link with a trailing arrow ("Explore Now", "Discuss Your Requirement"). */
export function PillLink({ href, children, tone = "dark", className = "", style }: PillLinkProps) {
  const toneClass =
    tone === "dark" ? "border-forest text-forest" : "border-sage-line text-white";
  const arrow = tone === "dark" ? "arrow-right-dark.svg" : "arrow-right-light.svg";

  return (
    <Link
      href={href}
      style={style}
      className={`inline-flex items-center justify-center gap-[10px] rounded-[30px] border px-[25px] py-[15px] text-[15px] leading-[1.21] whitespace-nowrap transition-[gap,background-color] duration-300 hover:gap-[16px] ${toneClass} ${className}`}
    >
      {children}
      <Image src={img(arrow)} alt="" width={25.5} height={7.36} className="h-[7.36px] w-[25.5px]" />
    </Link>
  );
}
