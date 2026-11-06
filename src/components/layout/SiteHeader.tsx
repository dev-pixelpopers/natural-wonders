"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { PillLink } from "@/components/ui/PillLink";
import { contact, socials } from "@/data/content";
import { mainNav } from "@/data/navigation";
import { img } from "@/lib/design";

function MenuLines({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-[6px] w-[25px] flex-col justify-between" aria-hidden>
      <span
        className={`h-px w-full bg-cream transition-transform duration-300 ${open ? "translate-y-[2.5px] rotate-45" : ""}`}
      />
      <span
        className={`h-px w-full bg-cream transition-transform duration-300 ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`}
      />
    </span>
  );
}

const noopSubscribe = () => () => {};

export function SiteHeader() {
  // The menu is portalled to <body> so it escapes the hero's stacking context; only after hydration.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll and listen for Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="relative z-10 flex items-start justify-between px-4 pt-6 sm:px-[56px]">
        <Link href="/" aria-label="Natural Wunderz home">
          <Image
            src={img("logo.png")}
            alt="Natural Wunderz"
            width={164}
            height={95}
            priority
            className="h-auto w-[110px] object-fill sm:h-[95px] sm:w-[164px]"
          />
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
          className="mt-[41px] flex items-center gap-[14px] text-[14px] leading-[1.35] text-cream uppercase transition-opacity hover:opacity-70 sm:mr-[4px]"
        >
          <MenuLines open={false} />
          Menu
        </button>
      </header>

      {mounted && createPortal(
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 z-50 overflow-y-auto bg-night text-cream transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src={img("hero-glow-right.svg")}
            alt=""
            width={1808}
            height={1680}
            className="absolute top-[-550px] right-[-600px] h-[1680px] w-[1808px] max-w-none opacity-60"
          />
          <Image
            src={img("hero-leaves.svg")}
            alt=""
            width={1578}
            height={813}
            className="absolute bottom-[-200px] left-[-300px] h-[813px] w-[1578px] max-w-none opacity-40"
          />
        </div>

        <div className="relative flex min-h-full flex-col px-4 pt-6 pb-12 sm:px-[56px]">
          <div className="flex items-start justify-between">
            <Link href="/" aria-label="Natural Wunderz home" onClick={() => setOpen(false)}>
              <Image
                src={img("logo.png")}
                alt="Natural Wunderz"
                width={164}
                height={95}
                className="h-auto w-[110px] object-fill sm:h-[95px] sm:w-[164px]"
              />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="mt-[41px] flex items-center gap-[14px] text-[14px] leading-[1.35] uppercase transition-opacity hover:opacity-70 sm:mr-[4px]"
            >
              <MenuLines open />
              Close
            </button>
          </div>

          <div className="mt-12 grid flex-1 gap-16 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-24 xl:px-[70px]">
            <nav aria-label="Main">
              <ol className="flex flex-col">
                {mainNav.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href} className="border-b border-white/10">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-baseline gap-6 py-3 font-valturin text-[clamp(2rem,4.2vw,4.375rem)] leading-[1] uppercase transition-colors sm:py-4 ${
                          active ? "text-mint" : "hover:text-mint"
                        }`}
                      >
                        <span className="w-8 font-gotham text-[14px] tracking-normal text-sage-light">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-3">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="flex flex-col gap-10 lg:justify-end lg:pb-4">
              <p className="font-valturin text-[clamp(1.75rem,2.6vw,3rem)] leading-[1] uppercase">
                Let’s talk about what’s next.
              </p>
              <address className="flex flex-col gap-4 text-[18px] not-italic">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-4 hover:text-mint">
                  <Image src={img("icon-phone.png")} alt="" width={24} height={24} className="size-6 brightness-0 invert" />
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 hover:text-mint">
                  <Image src={img("icon-mail.png")} alt="" width={24} height={24} className="size-6 brightness-0 invert" />
                  {contact.email}
                </a>
              </address>
              <ul className="flex gap-6 text-[16px] capitalize">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="flex items-center gap-2 hover:text-mint">
                      <Image src={s.icon} alt="" width={16} height={16} className="size-4 brightness-0 invert" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div onClick={() => setOpen(false)}>
                <PillLink href="/contact" tone="light">
                  Start a Conversation
                </PillLink>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
      )}
    </>
  );
}
