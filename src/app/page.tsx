import { SiteFooter } from "@/components/layout/SiteFooter";
import { Brands } from "@/components/sections/brands/Brands";
import { Capabilities } from "@/components/sections/Capabilities";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Reach } from "@/components/sections/Reach";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyBrands } from "@/components/sections/WhyBrands";

export default function Home() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <Hero />
        <Brands />
        <Categories />
        <Portfolio />
        <WhyBrands />
        <Reach />
        <Capabilities />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
