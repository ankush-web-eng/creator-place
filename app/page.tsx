import FAQSection from "@/components/pages/FAQSection";
import Hero from "@/components/pages/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
  keywords: ["home", "page"],
}

export default function Home() {
  return (
    <div>
      <Hero />
      <FAQSection />
    </div>
  )
}
