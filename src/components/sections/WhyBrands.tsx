"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { pillars } from "@/data/content";
import { cq, img } from "@/lib/design";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Pillar card internals scale from its 276px Figma width. */
const u = (px: number) => cq(px, 276);
/** The fan is laid out on the 1920px Figma frame. */
const f = (px: number) => cq(px, 1920);

const CORNERS = ["-top-[2px] -left-[2px]", "-top-[2px] -right-[2px]", "-bottom-[2px] -left-[2px]", "-bottom-[2px] -right-[2px]"];

/** Outer cards sit behind inner ones; the centre card is on top. */
const STACKING = ["z-10", "z-20", "z-30", "z-20", "z-10"];
const CENTER = 2;

/** CSS-variable pose of a fan position (what the `lg:` translate/rotate utilities read). */
const pose = (i: number) => ({
  "--x": f(pillars[i].x),
  "--y": f(pillars[i].y),
  "--r": `${pillars[i].rotate}deg`,
});

function PillarCard({ label, icon, size, labelWidth, withLeaves }: (typeof pillars)[number] & { withLeaves: boolean }) {
  return (
    <div className="relative isolate aspect-[276/294] w-full">
      {/* Mint corner accents peeking out from behind the card */}
      {CORNERS.map((pos) => (
        <span key={pos} aria-hidden className={`absolute -z-10 bg-mint ${pos}`} style={{ width: u(60), height: u(60) }} />
      ))}
      <div className="flex h-full flex-col items-center bg-sage" style={{ paddingTop: u(39), paddingBottom: u(16) }}>
        <Image src={icon} alt="" width={113} height={110} className="object-fill" style={{ width: u(113), height: u(110) }} />
        <div className="flex flex-1 items-center">
          <p
            className="text-center font-valturin leading-[0.9] tracking-[-0.02em] text-white uppercase"
            style={{ fontSize: u(size), width: u(labelWidth) }}
          >
            {label}
          </p>
        </div>
      </div>
      {withLeaves && (
        <Image
          src={img("leaves-small.svg")}
          alt=""
          aria-hidden
          width={91}
          height={47}
          className="absolute left-1/2 -translate-x-1/2 rotate-[7.64deg]"
          style={{ top: u(253), width: u(91), height: u(47) }}
        />
      )}
    </div>
  );
}

export function WhyBrands() {
  const trackRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(trackRef);
      const heading = q("[data-why-heading]");
      const intro = q("[data-why-intro]");
      const outro = q("[data-why-outro]");
      const arc = q("[data-why-arc]");
      const cards = q<HTMLElement>("[data-pillar]");

      const hiddenHeading = { clipPath: "inset(0% 0% 100% 0%)" };
      const shownHeading = { clipPath: "inset(0% 0% 0% 0%)" };

      const mm = gsap.matchMedia();

      // Desktop: one scrubbed sequence while the sticky stage holds the section in view.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 1 },
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Side cards stay hidden until their turn so they never show before the centre card.
        gsap.set(cards.filter((_, i) => i !== CENTER), { autoAlpha: 0 });

        // 1. Heading wipes in from the top
        tl.fromTo(heading, hiddenHeading, { ...shownHeading, ease: "power2.inOut" })
          // 2. First description
          .fromTo(intro, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, "-=0.3")
          // 3. Arc draws left to right
          .fromTo(
            arc,
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power1.inOut" },
          )
          // 4. Centre card rises from below the viewport (GSAP `y` lives on `transform`,
          //    separate from the `translate`/`rotate` properties the CSS variables drive)
          .fromTo(cards[CENTER], { y: () => window.innerHeight }, { y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6");

        // 5 & 6. Each pair fans out from the card in front of it
        // [card, card it emerges from]
        const pairs: [number, number][][] = [
          [[1, CENTER], [3, CENTER]],
          [[0, 1], [4, 3]],
        ];
        pairs.forEach((pair, step) => {
          const label = `fan${step}`;
          tl.addLabel(label, step === 0 ? "-=0.1" : "-=0.35");
          pair.forEach(([i, from]) => {
            tl.set(cards[i], { autoAlpha: 1 }, label).fromTo(
              cards[i],
              pose(from),
              { ...pose(i), duration: 1, ease: "power3.out" },
              label,
            );
          });
        });

        // 7. Closing description once the fan has settled
        tl.fromTo(outro, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, "-=0.2")
          // Hold the finished layout briefly before the stage releases
          .to({}, { duration: 0.4 });
      });

      // Mobile / tablet: plain grid, each block reveals as it scrolls into view.
      mm.add("(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)", () => {
        const reveal = (targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, trigger: Element) =>
          gsap.fromTo(targets, from, {
            ...to,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger, start: "top 85%", toggleActions: "play none none reverse" },
          });

        reveal(heading, hiddenHeading, shownHeading, heading[0]);
        reveal(intro, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, intro[0]);
        reveal(cards, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, cards[0]);
        reveal(outro, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, outro[0]);
      });

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  return (
    // Tall scroll track on desktop; its extra height is the distance the sequence is scrubbed over
    <section ref={trackRef} className="relative isolate lg:h-[350vh]">
      <div className="px-4 pt-[125px] pb-[152px] lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-[min(6vh,80px)]">
        <h2
          data-why-heading
          className="mx-auto max-w-[1426px] text-center font-valturin text-display text-white uppercase"
        >
          Thoughtful Products, From Formula to Shelf.
        </h2>
        <p
          data-why-intro
          className="mx-auto mt-[50px] max-w-[1049px] text-center text-body text-white lg:mt-[min(50px,3.5vh)]"
        >
          Natural Wunderz develops and manufactures beauty and personal-care products with a clear
          sense of who they are for and what makes them different. We bring the formula, the brand and
          the finished product together, creating collections with purpose and a direct path to market.
        </p>

        {/* Fan of pillars on large screens, a simple grid below */}
        <div className="@container relative mx-auto mt-[79px] w-full max-w-[1920px] lg:mt-[min(79px,5vh)]">
          {/* Arc the fan sits on, positioned against the 1920px frame */}
          <Image
            data-why-arc
            src={img("arc-line.svg")}
            alt=""
            aria-hidden
            width={2378}
            height={1189}
            className="pointer-events-none absolute -z-10 hidden max-w-none -translate-x-1/2 lg:block"
            style={{ top: f(150), left: `calc(50% + ${f(12)})`, width: f(2378), height: f(1189) }}
          />

          <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:justify-items-center lg:gap-0">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.label}
                data-pillar
                className={`@container relative ${STACKING[i]} lg:w-(--w) lg:translate-x-(--x) lg:translate-y-(--y) lg:rotate-(--r) lg:[grid-area:1/1]`}
                style={{ "--w": f(276), ...pose(i) } as CSSProperties}
              >
                <PillarCard {...pillar} withLeaves={i === CENTER} />
              </li>
            ))}
          </ul>
        </div>

        <p
          data-why-outro
          className="mx-auto mt-16 max-w-[479px] text-center text-[18px] leading-[1.35] text-white lg:mt-[min(126px,9vh)]"
        >
          With 30 years of manufacturing experience, we make the products behind our brands. From
          developing the formula to producing the finished product, our direct involvement keeps the
          original vision connected to its execution.
        </p>
      </div>
    </section>
  );
}
