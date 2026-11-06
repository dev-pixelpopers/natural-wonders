import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { LEGAL_UPDATED, returns } from "@/data/legal";

const intro = "Our approach to returns, product concerns and wholesale order issues.";

export const metadata: Metadata = { title: "Returns", description: intro };

export default function ReturnsPage() {
  return <LegalPage title="Returns" href="/returns" updated={LEGAL_UPDATED} intro={intro} sections={returns} />;
}
