type FaqItem = { q: string; a: string };

/** Accordion built on <details>, so it works without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <ul className="flex flex-col border-t border-white/15">
      {items.map((item) => (
        <li key={item.q} className="border-b border-white/15">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-white [&::-webkit-details-marker]:hidden">
              <span className="text-[clamp(1.125rem,1.5vw,1.625rem)] leading-[1.3] tracking-[-0.02em]">{item.q}</span>
              <span
                aria-hidden
                className="relative flex size-[44px] shrink-0 items-center justify-center rounded-full border border-sage-line transition-colors group-open:bg-sage"
              >
                <span className="absolute h-px w-[14px] bg-white" />
                <span className="absolute h-[14px] w-px bg-white transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <p className="max-w-[860px] pb-8 text-body text-white/85">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
