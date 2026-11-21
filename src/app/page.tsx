import { SiteFooter } from "@/components/layout/SiteFooter";
// Previous scroll-stacked version, kept for reference; uncomment to switch back.
// import { Brands } from "@/components/sections/brands/Brands";
import { BrandsNew } from "@/components/sections/brands/BrandsNew";
import { Capabilities } from "@/components/sections/Capabilities";
import { Categories } from "@/components/sections/Categories-New";
import { Contact } from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
// Hidden per client feedback; uncomment to bring the section back.
// import { Portfolio } from "@/components/sections/Portfolio";
import { Reach } from "@/components/sections/Reach";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyBrands } from "@/components/sections/WhyBrands";

export default function Home() {
  return (
    <>
      <main className="relative overflow-x-clip bg-forest">
        <Hero />
        {/* <Brands /> */}
        <BrandsNew />
        <Categories />
        {/* <Portfolio /> */}
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
