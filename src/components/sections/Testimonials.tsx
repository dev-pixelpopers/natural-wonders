
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonials, type Testimonial } from "@/data/content";
import { img } from "@/lib/design";

const CORNERS = [
  "-top-[3px] -left-[3px]",
  "-top-[3px] -right-[3px]",
  "-bottom-[3px] -left-[3px]",
  "-bottom-[3px] -right-[3px]",
];

const AUTOPLAY_DELAY = 3000;

/** Text-only review card: the review itself is the focus, no product imagery. */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="w-full max-w-[640px]" style={{ rotate: `${t.tilt}deg` }}>
      <div className="relative isolate h-full">
        {/* Mint corner accents peeking out from behind the card */}
        {CORNERS.map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute -z-10 size-[clamp(40px,5vw,72px)] bg-mint ${pos}`}
          />
        ))}

        <div className="h-full bg-sage p-[clamp(16px,2.6vw,40px)]">
          <figcaption className="flex h-full flex-col rounded-[27px] bg-white p-[clamp(24px,2.6vw,40px)] text-forest shadow-xl">
            <span
              aria-hidden
              className="block h-[0.5em] font-valturin text-[clamp(72px,6vw,104px)] leading-[0.9] text-sage select-none"
            >
              &ldquo;
            </span>

            <blockquote className="mt-4">
              <p className="text-[clamp(20px,1.6vw,28px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-[clamp(16px,1.05vw,19px)] font-light leading-[1.5] text-forest/80">
                {t.body}
              </p>
            </blockquote>

            <div className="mt-auto flex items-end justify-between gap-4 border-t border-forest/10 pt-4">
              <div className="flex flex-col text-left">
                {t.author && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[20px] font-semibold leading-tight">{t.author}</span>
                    {t.badge && (
                      <span className="rounded-full bg-forest/5 px-1.5 py-0.5 text-[14px] font-medium text-forest/70">
                        {t.badge}
                      </span>
                    )}
                  </div>
                )}
                <span className="mt-1 text-[13px] font-light leading-tight text-forest/60">
                  {t.source || "Walmart Verified Buyer"}
                  {t.date ? ` • ${t.date}` : ""}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-0.5">
                <span className="mr-1.5 text-[15px] font-medium leading-none">{t.rating}</span>
                {Array.from({ length: 5 }).map((_, i) => {
                  const isPartial = i === 4 && parseFloat(t.rating) < 5;
                  return (
                    <Image
                      key={i}
                      src={img(isPartial ? "star-partial.svg" : "star.svg")}
                      alt=""
                      width={16}
                      height={15}
                      className="size-4"
                    />
                  );
                })}
                <span className="sr-only">{t.rating} out of 5 stars</span>
              </div>
            </div>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

/** How many cards are visible at once at the widest breakpoint (clones needed for the loop). */
const MAX_VISIBLE = 2;
/** Slide duration (ms) for one card step. */
const SLIDE_MS = 700;

export function Testimonials() {
  const total = testimonials.length;
  // Track = all reviews + the first few again, so the strip can run past the end and loop back.
  const track = [...testimonials, ...testimonials.slice(0, MAX_VISIBLE)];

  const [index, setIndex] = useState(0); // first visible card
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => {
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, total));
  };

  const previous = () => {
    if (index === 0) {
      // Jump (without animating) to the matching clone at the end, then slide back one.
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(total - 1);
        }),
      );
      return;
    }
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  const goTo = (i: number) => {
    setAnimate(true);
    setIndex(i);
  };

  // After sliding onto the clones, snap back to the matching real card invisibly once the
  // slide has finished. Time-based rather than `transitionend`, which may not fire when the
  // tab is in the background.
  useEffect(() => {
    if (index < total) return;
    const id = setTimeout(() => {
      setAnimate(false);
      setIndex((i) => i - total);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, total]);

  // Autoplay: one card per tick
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, total, index]);

  const active = index % total;

  return (
    <section
      className="relative isolate px-4 pt-[251px]"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip"
      >
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

      {/* Slider viewport: 1 card visible on small screens, 2 from lg (--v). The padding
          keeps the tilted cards' corners from being clipped. */}
      <div className="mx-auto mt-[70px] max-w-[1400px] overflow-hidden py-8 [--v:1] lg:[--v:2]">
        <ul
          className="flex items-stretch motion-reduce:transition-none"
          style={{
            transform: `translateX(calc(${-index} * 100% / var(--v)))`,
            transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
          }}
        >
          {track.map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= total || undefined}
              className="flex shrink-0 grow-0 basis-[calc(100%/var(--v))] justify-center px-4 lg:px-[30px]"
            >
              <TestimonialCard t={t} />
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive Carousel Controls */}
      <div className="mx-auto mt-[40px] flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={previous}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white/80 transition-all hover:border-white/60 hover:text-white"
          aria-label="Previous review"
        >
          <span className="inline-block rotate-180 font-mono text-sm leading-none">
            →
          </span>
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                active === i
                  ? "h-2.5 w-7 bg-mint shadow-[0_0_8px_rgba(194,255,214,0.6)]"
                  : "h-2.5 w-2.5 bg-[#C2FFD6]/40 hover:bg-[#C2FFD6]/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white/80 transition-all hover:border-white/60 hover:text-white"
          aria-label="Next review"
        >
          <span className="inline-block font-mono text-sm leading-none">
            →
          </span>
        </button>
      </div>
    </section>
  );
}
