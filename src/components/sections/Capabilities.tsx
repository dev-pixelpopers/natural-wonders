
"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { capabilityDetails } from "@/data/pages";
import { img } from "@/lib/design";

const photos = [
  "category-hair-care.jpg",
  "capabilities-formulation.jpg",
  "brand-natural-wunderz.jpg",
  "category-skin-care.jpg",
  "portfolio-featured.jpg",
  "category-body-bath.jpg",
  "brand-gentlemen-supply.jpg",
];

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex || animating) return;

    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }

    setAnimating(true);

    animationTimeout.current = setTimeout(() => {
      setActiveIndex(newIndex);
      setAnimating(false);
    }, 250);
  };

  // Autoplay

  // Autoplay with delay
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setAnimating(true);

      animationTimeout.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % capabilityDetails.length);
        setAnimating(false);
      }, 250);
    }, 1500);

    return () => {
      clearTimeout(timer);

      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [isPaused, activeIndex]);


  // Center the active tab horizontally
  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRefs.current[activeIndex];

    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const buttonCenter =
      buttonRect.left -
      containerRect.left +
      container.scrollLeft +
      buttonRect.width / 2;

    const targetScroll = buttonCenter - container.clientWidth / 2;

    container.scrollTo({
      left: Math.max(
        0,
        Math.min(
          targetScroll,
          container.scrollWidth - container.clientWidth
        )
      ),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePadding = () => {
      const padding = container.clientWidth / 2;
      container.style.paddingLeft = `${padding}px`;
      container.style.paddingRight = `${padding}px`;
    };

    updatePadding();

    const observer = new ResizeObserver(updatePadding);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const current = capabilityDetails[activeIndex] || capabilityDetails[0];

  return (
    <section className="relative overflow-x-clip pt-[163px]">
      <h2 className="mx-auto max-w-[1651px] px-4 text-center font-valturin text-display leading-[0.98] text-white uppercase">
        Capabilities Behind the Brands.
      </h2>

      <div
        className="mx-auto mt-[77px] grid max-w-[1920px] grid-cols-1 gap-y-16 px-4 lg:grid-cols-[minmax(0,773px)_minmax(0,1fr)] lg:gap-x-[93px] lg:pr-[149px] lg:pl-[185px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Image */}
        <div className="relative">
          <div
            className="relative aspect-[773/736] overflow-hidden"
            style={{
              maskImage: `url(${img("capabilities-mask.svg")})`,
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
            }}
          >
            {photos.map((photo, i) => (
              <Image
                key={photo}
                src={img(photo)}
                alt={capabilityDetails[i]?.title || ""}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className={`object-cover transition-opacity duration-700 ease-in-out ${i === activeIndex
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
                  }`}
              />
            ))}
          </div>

          <Image
            src={img("capabilities-leaves.svg")}
            alt=""
            aria-hidden
            width={500}
            height={259}
            className="pointer-events-none absolute top-[88.86%] left-[88.75%] z-10 h-auto w-[64.7%] max-w-none -translate-1/2 rotate-[-11.57deg]"
          />
        </div>

        {/* Right Content */}
        <div className="w-full max-w-[720px] lg:pt-[55px]">
          <div
            className={`transition-all duration-300 ease-out ${animating
              ? "translate-y-1 opacity-0"
              : "translate-y-0 opacity-100"
              }`}
          >
            <h3 className="max-w-[409px] font-valturin text-title text-white capitalize lg:ml-[70px]">
              {current.title}
            </h3>

            <div className="relative mt-[60px]">
              <div
                aria-hidden
                className="absolute top-[18px] left-0 hidden h-[2px] bg-linear-to-r from-forest to-white lg:block w-[31%]"
              />

              <p className="ml-auto max-w-[70%] text-right text-body-lg text-white capitalize">
                {current.body}
              </p>
            </div>
          </div>

          {/* Capability Tabs */}
          <div
            ref={containerRef}
            className="mt-16 overflow-x-auto py-2 font-gotham text-[28px] leading-[0.98] tracking-[-0.02em] text-stone capitalize no-scrollbar scroll-smooth lg:mt-[123px] lg:-ml-[128px]"
          >
            <div className="inline-flex w-max items-center">
              {capabilityDetails.map((item, i) => (
                <Fragment key={item.title}>
                  {i > 0 && (
                    <span className="select-none whitespace-pre text-stone">
                      {"      ·      "}
                    </span>
                  )}

                  <button
                    ref={(el) => {
                      buttonRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => changeSlide(i)}
                    className={`shrink-0 cursor-pointer outline-none transition-colors duration-300 ${i === activeIndex
                      ? "font-medium text-mist"
                      : "text-stone hover:text-white/80"
                      }`}
                    aria-label={`Select ${item.title}`}
                    aria-pressed={i === activeIndex}
                  >
                    {item.title}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
