import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { LEGAL_UPDATED, terms } from "@/data/legal";

const intro = "Please read these terms carefully before using the Natural Wunderz website.";

export const metadata: Metadata = { title: "Terms of Use", description: intro };

export default function TermsPage() {
  return <LegalPage title="Terms of Use" href="/terms" updated={LEGAL_UPDATED} intro={intro} sections={terms} />;
}
