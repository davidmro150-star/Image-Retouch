
import RetouchingHero from "@/components/services/image-retouching/RetouchingHero";
import RetouchingExpertise from "@/components/services/image-retouching/RetouchingExpertise";
import RetouchingProcess from "@/components/services/image-retouching/RetouchingProcess";

export const metadata = {
  title: "Image Retouching Services | Prism Studio",
  description:
    "Explore professional manual image retouching, portrait enhancement, product retouching, and color correction services from Prism Studio.",
};

export default function ImageRetouchingPage() {
  return (
    <main className="bg-black text-white">
      <RetouchingHero />
      <RetouchingExpertise />
      <RetouchingProcess />
    </main>
  );
}
