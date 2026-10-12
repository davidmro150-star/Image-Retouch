
import ClippingPathHero from "@/components/services/clipping-path/ClippingPathHero";
import ClippingPathExpertise from "@/components/services/clipping-path/ClippingPathExpertise";
import ClippingPathProcess from "@/components/services/clipping-path/ClippingPathProcess";

export const metadata = {
  title: "Clipping Path Services | Prism Studio",
  description:
    "Professional manual clipping path services for precise product cutouts, clean edges, and e-commerce photography.",
};

export default function ClippingPathPage() {
  return (
    <main className="bg-black text-white">
      <ClippingPathHero />
      <ClippingPathExpertise />
      <ClippingPathProcess />
    </main>
  );
}
