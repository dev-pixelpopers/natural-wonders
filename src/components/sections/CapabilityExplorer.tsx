
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


export function CapabilityExplorer() {
  const totalSlides = capabilityDetails.length;

  // Start in the middle set
  const [virtualIndex, setVirtualIndex] = useState(totalSlides + 1);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const activeIndex = virtualIndex % totalSlides;

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recenterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipCenter = useRef(false);

  // Change slide
  const changeSlide = (index: number) => {
    const newIndex = totalSlides + index;

    if (index === activeIndex || animating) return;

    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }

    if (recenterTimeout.current) {
      clearTimeout(recenterTimeout.current);
    }

    setAnimating(true);

    animationTimeout.current = setTimeout(() => {
      setVirtualIndex(newIndex);
      setAnimating(false);
    }, 250);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setAnimating(true);

      animationTimeout.current = setTimeout(() => {
        setVirtualIndex((prev) => prev + 1);
        setAnimating(false);
      }, 250);
    }, 1500);

    return () => {
      clearTimeout(timer);

      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [isPaused, virtualIndex]);

  // Dynamic side padding
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

  // Center active tab
  useEffect(() => {
    if (skipCenter.current) {
      skipCenter.current = false;
      return;
    }

    const container = containerRef.current;
    const button = buttonRefs.current[virtualIndex];

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

    // Recenter silently after reaching the third set
    if (virtualIndex >= totalSlides * 2) {
      recenterTimeout.current = setTimeout(() => {
        const middleButton = buttonRefs.current[totalSlides + activeIndex];
        const currentButton = buttonRefs.current[virtualIndex];

        if (!container || !middleButton || !currentButton) return;

        const offsetDifference =
          middleButton.offsetLeft - currentButton.offsetLeft;

        // Move to the identical tab in the middle set without animation
        container.style.scrollBehavior = "auto";
        container.scrollLeft += offsetDifference;

        skipCenter.current = true;
        setVirtualIndex(totalSlides + activeIndex);

        requestAnimationFrame(() => {
          if (container) {
            container.style.scrollBehavior = "";
          }
        });
      }, 700);
    }

    return () => {
      if (recenterTimeout.current) {
        clearTimeout(recenterTimeout.current);
      }
    };
  }, [virtualIndex, totalSlides, activeIndex]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }

      if (recenterTimeout.current) {
        clearTimeout(recenterTimeout.current);
      }
    };
  }, []);

  return (
    <section className="relative overflow-x-clip pt-[163px]">
      <h2 id="capabilities-heading" className="mx-auto max-w-[1651px] px-4 text-center font-valturin text-display leading-[0.98] text-white uppercase">
        Capabilities Behind the Brands.
      </h2>

      {/* <div
        className="mx-auto mt-[77px] grid max-w-[1920px] grid-cols-1 gap-y-16 px-4 lg:grid-cols-[minmax(0,773px)_minmax(0,1fr)] lg:gap-x-[93px] lg:pr-[149px] lg:pl-[185px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      > */}
       <div
        className="mx-auto mt-[77px] grid max-w-[1920px] grid-cols-1 gap-y-16 px-4 lg:grid-cols-[minmax(0,650px)_minmax(0,1fr)] lg:gap-x-[93px] lg:pr-[149px] lg:pl-[185px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Image */}
        <div className="relative flex">
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
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  i === activeIndex
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
            className="pointer-events-none absolute top-[90%] left-[88.75%] z-10 h-auto w-[64.7%] max-w-none -translate-1/2 rotate-[-11.57deg]"
          />
        </div>

        {/* Right Content */}
        <div className="w-full max-w-[720px]">
          {/* Every capability's text sits in the same grid cell, so this block always takes
              the height of the longest one and the section never grows or shrinks between slides. */}
          <div className="grid">
            {capabilityDetails.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={item.title}
                  aria-hidden={!isActive}
                  className={`transition-all duration-300 ease-out [grid-area:1/1] ${
                    !isActive
                      ? "invisible opacity-0"
                      : animating
                        ? "translate-y-1 opacity-0"
                        : "translate-y-0 opacity-100"
                  }`}
                >
                  <h3 className="max-w-[409px] font-valturin text-title text-white capitalize lg:ml-[70px]">
                    {item.title}
                  </h3>

                  <div className="relative mt-[60px]">
                    <div
                      aria-hidden
                      className="absolute top-[18px] left-0 hidden h-[2px] w-[31%] bg-linear-to-r from-forest to-white lg:block"
                    />

                    <p className="ml-auto max-w-[70%] text-right text-body-lg text-white capitalize">
                      {item.body}
                    </p>
                    <ul className="mt-10 flex flex-wrap gap-3 lg:justify-end">
            {item.points.map((p) => (
              <li key={p} className="rounded-[30px] border border-sage-line px-5 py-3 text-[15px] text-white">
                {p}
              </li>
            ))}
          </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Infinite Capability Tabs */}
          <div
            ref={containerRef}
            className="mt-16 overflow-x-auto py-2 font-gotham text-[28px] leading-[0.98] tracking-[-0.02em] text-stone capitalize no-scrollbar scroll-smooth lg:mt-[50px] lg:-ml-[128px]"
          >
            <div className="inline-flex w-max items-center">
              {Array.from({ length: totalSlides * 3 }, (_, index) => {
                const itemIndex = index % totalSlides;
                const item = capabilityDetails[itemIndex];

                return (
                  <Fragment key={index}>
                    {index > 0 && (
                      <span className="select-none whitespace-pre text-stone">
                        {"      ·      "}
                      </span>
                    )}

                    <button
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      type="button"
                      onClick={() => changeSlide(itemIndex)}
                      className={`shrink-0 cursor-pointer outline-none transition-colors duration-300 ${
                        itemIndex === activeIndex
                          ? "font-medium text-mist"
                          : "text-stone hover:text-white/80"
                      }`}
                      aria-label={`Select ${item.title}`}
                      aria-pressed={itemIndex === activeIndex}
                    >
                      {item.title}
                    </button>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
