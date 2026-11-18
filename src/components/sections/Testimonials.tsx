"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials, type Testimonial } from "@/data/content";
import { cq, img } from "@/lib/design";

/** Card internals scale from the 756px Figma card width. */
const u = (px: number) => cq(px, 756);
const box = (left: number, top: number, width: number, height: number) => ({
  left: u(left),
  top: u(top),
  width: u(width),
  height: u(height),
});

const CORNERS = ["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="@container w-full max-w-[756px]" style={{ rotate: `${t.tilt}deg` }}>
      <div className="relative isolate aspect-[756/758]">
        {/* Mint corner accents peeking out from behind the card */}
        {CORNERS.map((pos) => (
          <span key={pos} aria-hidden className={`absolute bg-mint ${pos}`} style={{ width: u(87), height: u(87) }} />
        ))}
        <div aria-hidden className="absolute inset-0 bg-sage" />

        {/* White bracket frame, its top edge interrupted by a sage block */}
        <div aria-hidden className="absolute rounded-b-[32px] border-[6px] border-white" style={box(174, 180, 410, 446)} />
        <div aria-hidden className="absolute bg-sage" style={box(243, 155, 276, 111)} />

        <div
          className="absolute top-1/2 left-1/2 -translate-1/2 overflow-hidden"
          style={{
            width: u(t.frame.width),
            height: u(t.frame.height),
            borderRadius: u(t.frame.radius),
            rotate: `${t.productTilt}deg`,
          }}
        >
          <Image src={t.image} alt={t.imageAlt} width={1200} height={1200} sizes="700px" className="absolute max-w-none" style={t.crop} />
        </div>

        <figcaption
          className="absolute flex flex-col rounded-[27px] bg-white text-forest shadow-xl"
          style={{
            left: u(178),
            top: u(422),
            width: u(410),
            minHeight: u(204),
            padding: `${u(22)} ${u(24)} ${u(20)} ${u(28)}`,
          }}
        >
          <blockquote>
            <p className="font-semibold leading-[1.3] tracking-[-0.02em] text-forest" style={{ fontSize: `max(13px, ${u(18.5)})` }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-light leading-[1.35] tracking-[-0.01em] text-forest/80" style={{ marginTop: u(8), fontSize: `max(9px, ${u(13.5)})` }}>
              {t.body}
            </p>
          </blockquote>

          <div className="mt-auto pt-3 flex items-end justify-between border-t border-forest/10" style={{ marginTop: u(12) }}>
            <div className="flex flex-col text-left">
              {t.author && (
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-forest leading-tight" style={{ fontSize: `max(10px, ${u(13)})` }}>
                    {t.author}
                  </span>
                  {t.badge && (
                    <span className="rounded-full bg-forest/5 px-1.5 py-0.5 text-forest/70 font-medium" style={{ fontSize: `max(7px, ${u(9.5)})` }}>
                      {t.badge}
                    </span>
                  )}
                </div>
              )}
              <span className="text-forest/60 font-light leading-tight mt-0.5" style={{ fontSize: `max(8px, ${u(10.5)})` }}>
                {t.source || "Walmart Verified Buyer"}{t.date ? ` • ${t.date}` : ""}
              </span>
            </div>

            <div className="flex items-center shrink-0" style={{ gap: u(2) }}>
              <span className="font-medium leading-none" style={{ fontSize: `max(9px, ${u(13)})`, marginRight: u(4) }}>
                {t.rating}
              </span>
              {Array.from({ length: 5 }).map((_, i) => {
                const isPartial = i === 4 && parseFloat(t.rating) < 5;
                return (
                  <span key={i} className="flex items-center justify-center" style={{ width: u(14), height: u(14) }}>
                    <Image
                      src={img(isPartial ? "star-partial.svg" : "star.svg")}
                      alt=""
                      width={10}
                      height={10}
                      style={{ width: u(10.1), height: u(9.7) }}
                    />
                  </span>
                );
              })}
              <span className="sr-only">{t.rating} out of 5 stars</span>
            </div>
          </div>
        </figcaption>

        <Image
          src={img("quote.svg")}
          alt=""
          aria-hidden
          width={135}
          height={100}
          className="absolute pointer-events-none"
          style={box(t.quoteAt.x, t.quoteAt.y, 135, 100)}
        />
      </div>
    </figure>
  );
}

export function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 2;
  const totalPages = Math.ceil(testimonials.length / pageSize);

  const visibleTestimonials = testimonials.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <section className="relative isolate px-4 pt-[251px]" id="testimonials">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip">
        <Image
          src={img("testimonials-glow-right.svg")}
          alt=""
          width={1923}
          height={1774}
          className="absolute top-[-662px] right-[-751px] h-[1774px] w-[1923px] max-w-none"
        />
        <Image
          src={img("testimonials-glow-left.svg")}
          alt=""
          width={1795}
          height={1362}
          className="absolute top-[361px] left-[-709px] h-[1362px] w-[1795px] max-w-none"
        />
      </div>

      <h2 className="mx-auto max-w-[1148px] text-center font-valturin text-display leading-[0.98] text-white uppercase">
        What People Are Saying About Our Products
      </h2>

      {/* Cards container */}
      <div className="mt-[102px] flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-center lg:gap-[60px] transition-opacity duration-300">
        {visibleTestimonials.map((t, i) => (
          <TestimonialCard key={`${currentPage}-${i}`} t={t} />
        ))}
      </div>

      {/* Interactive Carousel Controls */}
      <div className="mx-auto mt-[72px] flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => (p > 0 ? p - 1 : totalPages - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 hover:border-white/60 hover:text-white transition-all cursor-pointer"
          aria-label="Previous testimonials"
        >
          <span className="rotate-180 inline-block font-mono text-sm leading-none">→</span>
        </button>

        <div className="flex items-center gap-2.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentPage === i
                  ? "h-2.5 w-7 bg-mint shadow-[0_0_8px_rgba(194,255,214,0.6)]"
                  : "h-2.5 w-2.5 bg-[#C2FFD6]/40 hover:bg-[#C2FFD6]/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => (p < totalPages - 1 ? p + 1 : 0))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 hover:border-white/60 hover:text-white transition-all cursor-pointer"
          aria-label="Next testimonials"
        >
          <span className="inline-block font-mono text-sm leading-none">→</span>
        </button>
      </div>
    </section>
  );
}
