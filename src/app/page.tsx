import Motion from "@/components/Motion";
import { SiteConfigProvider } from "@/components/SiteConfig";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Plates from "@/components/Plates";
import Ribbon from "@/components/Ribbon";
import GoalMatch from "@/components/GoalMatch";
import AppShowcase from "@/components/AppShowcase";
import Verified from "@/components/Verified";
import Kitchens from "@/components/Kitchens";
import Difference from "@/components/Difference";
import Delivery from "@/components/Delivery";
import Plus from "@/components/Plus";
import City from "@/components/City";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SiteConfigProvider>
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Plates />
        <Ribbon />
        <GoalMatch />
        <AppShowcase />
        <Verified />
        <Kitchens />
        <Difference />
        <Delivery />
        <Plus />
        <City />
        <Faq />
      </main>
      <Footer />
    </SiteConfigProvider>
  );
}
