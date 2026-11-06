import { PageHero } from "@/components/layout/PageHero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PillLink } from "@/components/ui/PillLink";

export default function NotFound() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest pb-[clamp(96px,10vw,180px)]">
        <PageHero
          crumbs={[{ label: "Page Not Found" }]}
          title="Lost in the Garden."
          intro="The page you’re looking for has moved or no longer exists."
        >
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <PillLink href="/" tone="light">
              Back to Home
            </PillLink>
            <PillLink href="/contact" tone="light">
              Contact Us
            </PillLink>
          </div>
        </PageHero>
      </main>
      <SiteFooter overlap={false} />
    </>
  );
}
