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
 * A real preloader: the counter and progress bar follow actual loading progress
 * (eagerly loaded images, web fonts and the window `load` event), each bottle
 * rises once progress passes its share of 100, and the curtain lifts as soon as
 * the page is ready (or after `maxWait`), never on a fixed timer.
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

const BLUR = "blur(12.5px)";

/** Shortest time the loader stays up (s), so a cached page doesn't just flash it. */
const MIN_VISIBLE = 1.2;

export type PreloaderProps = {
  /** Called when the curtain starts lifting, so page entrances can play as it uncovers. */
  onReveal?: () => void;
  /** Called once the exit transition has finished and the page is uncovered. */
  onComplete?: () => void;
  /** Upper bound (ms) to wait for loading before finishing anyway. */
  maxWait?: number;
  className?: string;
};

/**
 * Tracks real page loading. Reports 0–1 as eagerly loaded images and web fonts
 * finish, and 1 once the window `load` event has fired (or `maxWait` passes).
 * Lazy images are skipped: they only load when scrolled to, so they'd never finish here.
 */
function trackLoading(onProgress: (p: number) => void, maxWait: number) {
  const images = Array.from(document.images).filter((im) => im.loading !== "lazy");
  // Each image and the fonts count as one unit; the window `load` event is the final unit.
  const total = images.length + 2;
  let done = 0;
  let finished = false;

  const report = () => {
    if (!finished) onProgress(Math.min(done / total, 0.99));
  };
  const finish = () => {
    if (finished) return;
    finished = true;
    onProgress(1);
  };
  const tick = () => {
    done += 1;
    report();
  };

  const cleanups: (() => void)[] = [];
  images.forEach((im) => {
    if (im.complete) {
      done += 1;
      return;
    }
    const once = () => {
      im.removeEventListener("load", once);
      im.removeEventListener("error", once);
      tick();
    };
    im.addEventListener("load", once);
    im.addEventListener("error", once); // a broken image shouldn't block the page
    cleanups.push(() => {
      im.removeEventListener("load", once);
      im.removeEventListener("error", once);
    });
  });

  (document.fonts?.ready ?? Promise.resolve()).then(tick);

  if (document.readyState === "complete") window.setTimeout(finish, 0);
  else {
    window.addEventListener("load", finish, { once: true });
    cleanups.push(() => window.removeEventListener("load", finish));
  }

  const timeout = window.setTimeout(finish, maxWait);
  report();

  return () => {
    finished = true;
    window.clearTimeout(timeout);
    cleanups.forEach((fn) => fn());
  };
}

export default function Preloader({ onReveal, onComplete, maxWait = 8000, className = "" }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onRevealRef.current = onReveal;
    onCompleteRef.current = onComplete;
  }, [onReveal, onComplete]);

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
      const fill = q<HTMLElement>("[data-fill]")[0];
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

      let entered = false;
      let exiting = false;
      let fast = false;
      let target = 0; // real progress, 0–100
      const shown = { value: 0 }; // what the counter and bar display
      let revealed = 0; // bottles risen so far
      const startedAt = performance.now();

      // Entrance: glow, label/counter and the empty track.
      gsap
        .timeline({ defaults: { ease: "power3.out" }, onComplete: () => (entered = true) })
        .timeScale(reduceMotion ? 2.5 : 1)
        .fromTo(q("[data-glow]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: "power2.out" })
        .to(q("[data-label], [data-count-mask]"), { yPercent: 0, duration: 0.8, stagger: 0.1 }, 0.2)
        .fromTo(track, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.3);

      const render = () => {
        const value = Math.round(shown.value);
        counter.textContent = String(value);
        gsap.set(fill, { scaleX: shown.value / 100 });
        track.setAttribute("aria-valuenow", String(value));

        // One bottle per sixth of progress; the last lands at 100.
        const due = Math.min(BOTTLES.length, Math.floor((shown.value / 100) * BOTTLES.length + 1e-6));
        for (; revealed < due; revealed++) {
          gsap.to(bottles[revealed], { y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" });
        }
      };

      // Exit: bottles lift away from the centre out, footer drops, curtain rises.
      const exit = () => {
        exiting = true;
        dots.kill();
        gsap
          .timeline()
          .to(q("[data-label], [data-count-mask]"), { yPercent: 110, duration: 0.5, ease: "power2.in" }, 0.35)
          .to(track, { scaleX: 0, transformOrigin: "right center", duration: 0.6, ease: "power2.in" }, 0.35)
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
            0.35,
          )
          .add(() => onRevealRef.current?.(), 0.8)
          .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, 0.8)
          .add(() => onCompleteRef.current?.());
      };

      // Ease the displayed value toward real progress every frame.
      const update = () => {
        if (exiting || !entered) return;
        const gap = target - shown.value;
        if (gap > 0) {
          const speed = fast ? 0.35 : 0.08;
          shown.value = Math.min(target, shown.value + Math.max(gap * speed, 0.35));
          render();
        }
        const minElapsed = (performance.now() - startedAt) / 1000 >= MIN_VISIBLE;
        if (shown.value >= 100 && minElapsed) exit();
      };
      gsap.ticker.add(update);

      const stopTracking = trackLoading((p) => {
        target = Math.max(target, p * 100);
      }, maxWait);

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

      // Click the backdrop: catch the counter up faster (it still can't pass real progress).
      const onSkip = () => {
        fast = true;
      };

      bottles.forEach((el) => {
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("click", onBottleClick);
      });
      const backdrop = root.current;
      backdrop?.addEventListener("click", onSkip);

      return () => {
        gsap.ticker.remove(update);
        stopTracking();
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
            <div data-count-mask className="invisible text-right tabular-nums">
              <p data-counter>0</p>
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
