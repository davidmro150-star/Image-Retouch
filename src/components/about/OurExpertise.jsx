
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Scissors,
  Layers3,
  Image,
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Image Retouching",
    description:
      "Enhance product images with careful color correction, surface cleanup, and professional finishing.",
    href: "/services/image-retouching",
  },
  {
    icon: Scissors,
    title: "Clipping Path",
    description:
      "Create precise image cutouts for e-commerce products, catalogs, and professional photography.",
    href: "/services/clipping-path",
  },
  {
    icon: Layers3,
    title: "Image Masking",
    description:
      "Preserve fine details around hair, fur, transparent objects, and complex edges.",
    href: "/services/image-masking",
  },
  {
    icon: Image,
    title: "Background Removal",
    description:
      "Remove distracting backgrounds to create clean, consistent product images.",
    href: "/services/background-removal",
  },
];

export default function OurExpertise() {
  return (
    <section className="border-y border-white/10 bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            What We Do
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Expertise That Shows
            <span className="block text-white/45">
              in Every Image.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            Specialized image-editing services designed to meet the
            needs of modern brands, photographers, and online retailers.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.05] sm:p-7"
              >
                <div className="mb-7 inline-flex rounded-xl bg-amber-400/10 p-3.5 text-amber-400 transition-colors group-hover:bg-amber-400 group-hover:text-black">
                  <Icon size={25} />
                </div>

                <h3 className="text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
