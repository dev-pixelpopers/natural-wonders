type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** "split" puts the copy to the right of the title, as in the homepage Categories header. */
  layout?: "center" | "split" | "left";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
  /** "title" uses the smaller 70px sub-heading scale. */
  size?: "display" | "title";
};

/** Valturin display heading with optional eyebrow and supporting copy, matching the homepage sections. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  layout = "center",
  tone = "light",
  className = "",
  as: Tag = "h2",
  size = "display",
}: SectionHeadingProps) {
  const scale = size === "display" ? "text-display" : "text-title";
  const color = tone === "light" ? "text-white" : "text-forest";
  const eyebrowColor = tone === "light" ? "text-mint" : "text-sage";

  const Eyebrow = eyebrow ? (
    <p className={`mb-5 flex items-center gap-3 text-[14px] tracking-[0.12em] uppercase ${eyebrowColor} ${layout === "center" ? "justify-center" : ""}`}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {eyebrow}
      {layout === "center" && <span aria-hidden className="h-px w-8 bg-current" />}
    </p>
  ) : null;

  if (layout === "split") {
    return (
      <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 ${color} ${className}`}>
        <div className="max-w-[1117px]">
          {Eyebrow}
          <Tag className={`font-valturin ${scale} uppercase`}>{title}</Tag>
        </div>
        {body && <div className="max-w-[492px] text-body lg:text-right">{body}</div>}
      </div>
    );
  }

  const center = layout === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${color} ${className}`}>
      {Eyebrow}
      <Tag className={`font-valturin ${scale} uppercase ${center ? "mx-auto max-w-[1426px]" : "max-w-[1117px]"}`}>{title}</Tag>
      {body && <div className={`mt-8 text-body ${center ? "mx-auto max-w-[1049px]" : "max-w-[720px]"}`}>{body}</div>}
    </div>
  );
}
