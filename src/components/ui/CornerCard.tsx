type CornerCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Size of the mint corner squares peeking out from behind the card. */
  corner?: number;
};

const CORNERS = ["-top-[2px] -left-[2px]", "-top-[2px] -right-[2px]", "-bottom-[2px] -left-[2px]", "-bottom-[2px] -right-[2px]"];

/** Sage card with mint corner accents, as on the homepage pillar and testimonial cards. */
export function CornerCard({ children, className = "", corner = 48 }: CornerCardProps) {
  return (
    <div className={`relative isolate ${className}`}>
      {CORNERS.map((pos) => (
        <span key={pos} aria-hidden className={`absolute -z-10 bg-mint ${pos}`} style={{ width: corner, height: corner }} />
      ))}
      <div className="h-full bg-sage">{children}</div>
    </div>
  );
}
