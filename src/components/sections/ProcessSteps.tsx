import Image from "next/image";
import { img } from "@/lib/design";

type Step = { title: string; body: string };

/** Numbered dashed-circle steps joined by a soft line, used for "how we work" flows. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative mx-auto max-w-[1650px]">
      <div aria-hidden className="absolute top-[56px] right-[8%] left-[8%] hidden h-px bg-linear-to-r from-transparent via-sage-line to-transparent lg:block" />
      <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col items-center text-center">
            <span className="relative flex size-[112px] items-center justify-center bg-forest font-valturin text-[34px] text-cream [border-radius:50%]">
              <Image src={img("circle-dashed-sm.png")} alt="" fill sizes="112px" />
              <span className="relative">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <h3 className="mt-7 font-valturin text-[clamp(1.75rem,2vw,2.375rem)] leading-[0.95] text-white uppercase">{s.title}</h3>
            <p className="mt-4 max-w-[300px] text-[17px] leading-[1.45] text-white/85">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
