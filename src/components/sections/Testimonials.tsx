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
          className="absolute flex flex-col rounded-[27px] bg-white text-forest"
          style={{
            left: u(178),
            top: u(422),
            width: u(410),
            minHeight: u(204),
            padding: `${u(25)} ${u(18)} ${u(22)} ${u(33)}`,
          }}
        >
          <blockquote>
            <p className="font-medium leading-[1.31] tracking-[-0.02em]" style={{ fontSize: `max(13px, ${u(20)})`, width: u(215) }}>
              {t.quote}
            </p>
            <p className="font-light leading-[1.31] tracking-[-0.02em]" style={{ marginTop: u(8), fontSize: `max(9px, ${u(14)})`, width: u(352) }}>
              {t.body}
            </p>
          </blockquote>
          <div className="mt-auto flex items-center justify-end" style={{ gap: u(1) }}>
            <span className="font-medium leading-[1.31]" style={{ fontSize: `max(9px, ${u(13)})`, marginRight: u(4) }}>
              {t.rating}
            </span>
            {["star.svg", "star.svg", "star.svg", "star.svg", "star-partial.svg"].map((star, i) => (
              <span key={i} className="flex items-center justify-center" style={{ width: u(15), height: u(15) }}>
                <Image src={img(star)} alt="" width={10} height={10} style={{ width: u(10.1), height: u(9.7) }} />
              </span>
            ))}
            <span className="sr-only">out of 5 stars</span>
          </div>
        </figcaption>

        <Image
          src={img("quote.svg")}
          alt=""
          aria-hidden
          width={135}
          height={100}
          className="absolute"
          style={box(t.quoteAt.x, t.quoteAt.y, 135, 100)}
        />
      </div>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="relative isolate px-4 pt-[251px]">
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
        What Customers Say?
      </h2>

      {/* Figma spacing is measured to the tilted cards' bounding boxes, 15px outside the cards */}
      <div className="mt-[102px] flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-center lg:gap-[60px]">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>

      <Image
        src={img("carousel-dots.svg")}
        alt=""
        aria-hidden
        width={50}
        height={10}
        className="mx-auto mt-[72px] h-[10px] w-[50px]"
      />
    </section>
  );
}
