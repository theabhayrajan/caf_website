import Image from "next/image";
import Programs from "../components/Programs";
import CafAssessments from "../components/CafAssessments";
import CAFHelpSection from "../components/CAFHelpSection";
import ProgramsSection from "../components/ProgramSection";
import QuoteSection from "../components/QuotaSection";
import FAQSection from "../components/FAQSection";
import FooterSection from "../components/FooterSection";
import Header from "../components/Header";
import ChildDevelopmentSection from "../components/ChildDevelopementSection";


export default function Home() {
  return (
    <div className="w-full bg-white">
      <Header />
      <QuoteSection />
      <ProgramsSection />
      <CafAssessments />
      <Programs />
      <ChildDevelopmentSection/>
      <FAQSection />
      <FooterSection />
    </div>
  );
}
