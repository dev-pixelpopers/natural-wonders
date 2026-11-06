import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { LEGAL_UPDATED, privacy } from "@/data/legal";

const intro = "How Natural Wunderz collects, uses and protects the information you share with us.";

export const metadata: Metadata = { title: "Privacy Policy", description: intro };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" href="/privacy" updated={LEGAL_UPDATED} intro={intro} sections={privacy} />;
}
