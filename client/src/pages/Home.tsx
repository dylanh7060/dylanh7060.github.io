import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import BusinessSection from "@/components/home/BusinessSection";
import SquashSection from "@/components/home/SquashSection";
import BeyondSection from "@/components/home/BeyondSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BusinessSection />
        <SquashSection />
        <BeyondSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
