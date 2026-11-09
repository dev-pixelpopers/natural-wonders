"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { img } from "@/lib/design";

gsap.registerPlugin(useGSAP);

/**
 * Preloader — Figma "Natural Wunderz Preloader" component set (node 438:64).
 *
 * The seven Figma variants are the keyframes of one sequence: each step lifts
 * a bottle out of a blur from below the fold, rolls the counter to the next
 * value and extends the progress bar. The final step (100) waits until the
 * page has actually finished loading before it plays.
 */

type Bottle = {
  file: string;
  width: number;
  height: number;
  /** Order in which the bottle rises into view (0 = first). */
  reveal: number;
};

/** Left-to-right as laid out in Figma; `reveal` follows product01 → product06. */
const BOTTLES: readonly Bottle[] = [
  { file: "preloader/product-05.png", width: 143, height: 515, reveal: 4 },
  { file: "preloader/product-03.png", width: 139, height: 517, reveal: 2 },
  { file: "preloader/product-01.png", width: 161, height: 515, reveal: 0 },
  { file: "preloader/product-02.png", width: 162, height: 515, reveal: 1 },
  { file: "preloader/product-04.png", width: 120, height: 515, reveal: 3 },
  { file: "preloader/product-06.png", width: 120, height: 515, reveal: 5 },
];

/** Counter value and bar fill (Figma bar width / 1820px track) per variant. */
const STEPS: readonly { value: number; fill: number }[] = [
  { value: 10, fill: 200 / 1820 },
  { value: 20, fill: 500 / 1820 },
  { value: 60, fill: 900 / 1820 },
  { value: 80, fill: 1400 / 1820 },
  { value: 90, fill: 1550 / 1820 },
  { value: 100, fill: 1 },
];

/** First row is the blank "Default" state before any bottle has landed. */
const COUNTER_ROWS = [" ", ...STEPS.map((s) => String(s.value))];

const BLUR = "blur(12.5px)";

export type PreloaderProps = {
  /** Called once the exit transition has finished and the page is uncovered. */
  onComplete?: () => void;
  /** Upper bound (ms) to wait for the window `load` event before finishing anyway. */
  maxWait?: number;
  className?: string;
};

/** Resolves once fonts and every page resource have loaded, or after `maxWait`. */
function whenPageReady(maxWait: number): Promise<void> {
  const loaded = new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });
  const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, maxWait));
  return Promise.race([Promise.all([loaded, fonts]).then(() => undefined), timeout]);
}

export default function Preloader({ onComplete, maxWait = 8000, className = "" }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Keep the page underneath from scrolling while it is covered.
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, []);

  useGSAP(
    (_context, contextSafe) => {
      const q = gsap.utils.selector(root);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const blur = reduceMotion ? "blur(0px)" : BLUR;

      const bottles = q<HTMLElement>("[data-bottle]").sort(
        (a, b) => Number(a.dataset.bottle) - Number(b.dataset.bottle),
      );
      const track = q<HTMLElement>("[data-track]")[0];
      const counter = q<HTMLElement>("[data-counter]")[0];

      gsap.set(bottles, { y: () => window.innerHeight, filter: blur, autoAlpha: 1 });
      gsap.set(q("[data-label], [data-count-mask]"), { yPercent: 110, autoAlpha: 1 });

      // Ellipsis pulses for as long as the loader is on screen.
      const dots = gsap.to(q("[data-dot]"), {
        opacity: 0.2,
        duration: 0.5,
        stagger: { each: 0.15, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      let waiting = false;
      let exiting = false;
      let ready = false;
      const step = 0.55;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (reduceMotion) tl.timeScale(2.5);

      // Entrance
      tl.fromTo(q("[data-glow]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: "power2.out" })
        .to(q("[data-label], [data-count-mask]"), { yPercent: 0, duration: 0.8, stagger: 0.1 }, 0.2)
        .fromTo(track, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.3)
        .addLabel("progress", "-=0.2");

      // Loading progression: one Figma variant per step.
      STEPS.forEach(({ value, fill }, i) => {
        const at = `progress+=${i * step}`;
        if (i === STEPS.length - 1) {
          // Hold just before 100 until the page has really finished loading.
          tl.add(() => {
            if (!ready) {
              waiting = true;
              tl.pause();
            }
          }, at);
        }
        tl.to(bottles[i], { y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" }, at)
          .to(counter, { yPercent: (-100 * (i + 1)) / COUNTER_ROWS.length, duration: 0.6, ease: "power4.inOut" }, at)
          .to(q("[data-fill]"), { scaleX: fill, duration: 0.9, ease: "power3.inOut" }, at)
          .add(() => track.setAttribute("aria-valuenow", String(value)), at);
      });

      // Exit: bottles lift away from the centre out, footer drops, curtain rises.
      tl.addLabel("exit", "+=0.6")
        .add(() => {
          exiting = true;
          dots.kill();
        }, "exit")
        .to(q("[data-label], [data-count-mask]"), { yPercent: 110, duration: 0.5, ease: "power2.in" }, "exit")
        .to(track, { scaleX: 0, transformOrigin: "right center", duration: 0.6, ease: "power2.in" }, "exit")
        .to(
          q("[data-bottle-inner]"),
          {
            yPercent: -12,
            autoAlpha: 0,
            filter: blur,
            duration: 0.6,
            ease: "power2.in",
            stagger: { each: 0.06, from: "center" },
          },
          "exit",
        )
        .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "exit+=0.45")
        .add(() => onCompleteRef.current?.());

      whenPageReady(maxWait).then(() => {
        ready = true;
        if (waiting) tl.play();
      });

      // Interactive states ---------------------------------------------------
      const inners = q<HTMLElement>("[data-bottle-inner]");

      const onEnter = contextSafe!((event: Event) => {
        if (exiting) return;
        const inner = (event.currentTarget as HTMLElement).querySelector("[data-bottle-inner]");
        gsap.to(inner, { yPercent: -4, scale: 1.04, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(inners.filter((el) => el !== inner), { opacity: 0.55, duration: 0.4, overwrite: "auto" });
      });

      const onLeave = contextSafe!(() => {
        if (exiting) return;
        gsap.to(inners, { yPercent: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      });

      // Click a bottle: squash-and-stretch bounce.
      const onBottleClick = contextSafe!((event: Event) => {
        event.stopPropagation();
        if (exiting) return;
        const inner = (event.currentTarget as HTMLElement).querySelector("[data-bottle-inner]");
        gsap
          .timeline()
          .to(inner, { scaleY: 0.92, scaleX: 1.06, yPercent: 0, duration: 0.12, ease: "power2.out" })
          .to(inner, { scaleY: 1.04, scaleX: 0.98, yPercent: -8, duration: 0.25, ease: "power2.out" })
          .to(inner, { scaleY: 1, scaleX: 1, yPercent: -4, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });

      // Click the backdrop: fast-forward (the final step still waits for the page).
      const onSkip = () => {
        tl.timeScale(Math.max(tl.timeScale(), 3));
      };

      bottles.forEach((el) => {
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("click", onBottleClick);
      });
      const backdrop = root.current;
      backdrop?.addEventListener("click", onSkip);

      return () => {
        bottles.forEach((el) => {
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
          el.removeEventListener("click", onBottleClick);
        });
        backdrop?.removeEventListener("click", onSkip);
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`fixed inset-0 z-[100] flex flex-col overflow-hidden bg-moss text-cream select-none ${className}`}
    >
      {/* Half-ring glow (Ellipse 28), anchored to the bottom edge */}
      <div
        aria-hidden
        data-glow
        className="pointer-events-none invisible absolute left-1/2 -translate-x-1/2 [--glow:max(166.6vw,170svh)] bottom-[calc(var(--glow)*-0.3397)] w-(--glow)"
      >
        <Image
          src={img("preloader/glow.svg")}
          alt=""
          width={3199}
          height={2100}
          priority
          unoptimized
          className="block h-auto w-full max-w-none"
        />
      </div>

      {/* Bottles */}
      <div className="relative flex flex-1 items-center justify-center px-4">
        <div
          aria-hidden
          className="flex h-[46vw] items-end gap-[2vw] md:h-[min(37.4vw,73svh)] md:gap-[2.0833vw]"
        >
          {BOTTLES.map((bottle) => (
            <div
              key={bottle.file}
              data-bottle={bottle.reveal}
              className="invisible h-full cursor-pointer"
            >
              <div data-bottle-inner className="h-full origin-bottom will-change-transform">
                <Image
                  src={img(bottle.file)}
                  alt=""
                  width={bottle.width}
                  height={bottle.height}
                  priority
                  draggable={false}
                  className="pointer-events-none h-full w-auto max-w-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: label, counter and progress bar */}
      <div className="relative flex flex-col gap-[clamp(1rem,2.0833vw,2.5rem)] px-[clamp(1rem,2.6042vw,3.125rem)] pb-[clamp(0.75rem,0.9375vw,1.125rem)] font-valturin text-loader uppercase">
        <div className="flex items-end justify-between">
          <p className="overflow-hidden md:ml-[5.2083vw]" role="status">
            <span data-label className="invisible block">
              Loading
              {[0, 1, 2, 3].map((dot) => (
                <span key={dot} data-dot aria-hidden>
                  .
                </span>
              ))}
            </span>
          </p>

          <div aria-hidden className="overflow-hidden">
            <div data-count-mask className="invisible h-[0.85em] overflow-hidden text-right">
              <div data-counter>
                {COUNTER_ROWS.map((row, i) => (
                  <p key={i}>{row}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          data-track
          role="progressbar"
          aria-label="Page loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          className="h-[clamp(0.25rem,0.5208vw,0.625rem)] w-full"
          style={{ transform: "scaleX(0)" }}
        >
          <div data-fill className="size-full origin-left bg-silver" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
