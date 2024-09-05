import dynamic from "next/dynamic";
import { Metadata } from "next";
import EstimateEarnings from "@/components/pages/EstimateEarnings";
import StepsTimeline from "@/components/pages/StepsTimeline";

const FAQSection = dynamic(() => import("@/components/pages/FAQSection"));
const Hero = dynamic(() => import("@/components/pages/hero"));

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
  keywords: ["home", "page"],
}

export default function Home() {
  return (
    <div>
      <Hero />
      <StepsTimeline />
      <EstimateEarnings />
      <FAQSection />
    </div>
  )
}
