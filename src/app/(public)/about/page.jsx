import AboutHero from "@/components/about/AboutHero";
import OurExpertise from "@/components/about/OurExpertise";
import OurProcess from "@/components/about/OurProcess";
import OurStory from "@/components/about/OurStory";




export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <AboutHero />
      <OurStory />
      <OurExpertise/>
      <OurProcess />
    </main>
  );
}
