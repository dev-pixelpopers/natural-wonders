"use client";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { img } from "@/lib/design";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function ExploreBrandsBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="#brands"
      className={`relative flex size-[210px] shrink-0 flex-col items-center justify-center text-center ${className}`}
    >
      <Image src={img("circle-dashed-lg.png")} alt="" fill sizes="210px" className="object-contain" />
      <Image
        src={img("arrow-diagonal.svg")}
        alt=""
        width={41}
        height={41}
        className="relative ml-[12px] size-[41px] -rotate-45"
        style={{ objectFit: "contain" }}
      />
      <span className="relative mt-[17px] w-[135px] text-[21px] leading-[1.21] text-cream">
        Explore Our Brands
      </span>
    </a>
  );
}

export default function Hero() {
  const HeroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to("h1", { clipPath: "inset(0% 0% 0% 0%)", duration: 1 });
    tl.to(".hero-desc", { opacity: 1, duration: 1 });
    tl.to(".hero-button", { y: 0, opacity: 1, duration: 1 });
  });
  return (
    <section ref={HeroRef} className="relative isolate">
      {/* Decorative light glows and leaf watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
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
          className="absolute top-[330px] left-[-664px] h-[1325px] w-[1698px] max-w-none"
        />
        <Image
          src={img("hero-leaves.svg")}
          alt=""
          width={1578}
          height={813}
          className="absolute top-[380px] left-1/2 h-[813px] w-[1578px] max-w-none -translate-x-1/2"
        />
      </div>

      <SiteHeader />

      <h1 className="mx-auto mt-10 max-w-[1726px] px-4 text-center font-valturin text-hero text-cream uppercase"
        style={{
          clipPath: "inset(0% 0% 100% 0%)"
        }}>
        Powering the Next Generation of Beauty.
      </h1>

      <div className="relative mx-auto mt-[10px] flex flex-col items-center gap-10 px-4 pb-24 xl:block xl:pb-[96px]">
        <p className="hero-desc mx-auto max-w-[945px] text-center text-lead text-cream opacity-0">
          Natural Wunderz is a beauty and personal-care manufacturer and brand builder, bringing
          products from concept to shelf. We combine thoughtful formulas, carefully chosen
          ingredients and distinctive packaging with an integrated approach designed for speed to
          market.
        </p>
        <ExploreBrandsBadge className="hero-button xl:absolute xl:top-[8px] xl:right-[100px] translate-y-[120%] opacity-0" />
      </div>
    </section>
  );
}
