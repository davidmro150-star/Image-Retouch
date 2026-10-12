
import Link from "next/link";
import {
  ArrowRight,
  UserRound,
  Watch,
  Palette,
  Image,
  Scan,
  Sparkles,
} from "lucide-react";

const expertise = [
  {
    icon: UserRound,
    title: "Portrait Retouching",
    description:
      "Refine blemishes, balance skin tones, and preserve natural skin texture for polished portraits.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    alt: "Professional portrait photography",
  },
  {
    icon: Watch,
    title: "Product Enhancement",
    description:
      "Improve product details, remove minor imperfections, and create a premium visual presentation.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    alt: "Wristwatch product photography",
  },
  {
    icon: Palette,
    title: "Color Correction",
    description:
      "Balance exposure, refine colors, and maintain a consistent look across your image collection.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    alt: "Fashion product photography",
  },
  {
    icon: Image,
    title: "Photo Restoration",
    description:
      "Improve the appearance of old or damaged photographs with careful restoration work.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    alt: "Camera and photography equipment",
  },
  {
    icon: Scan,
    title: "Background Cleanup",
    description:
      "Remove unwanted visual distractions and help your main subject stand out clearly.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    alt: "Red sneaker product photography",
  },
  {
    icon: Sparkles,
    title: "High-End Finishing",
    description:
      "Apply precise finishing touches for advertising, e-commerce, catalogs, and brand campaigns.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    alt: "Fashion editorial photography",
  },
];

export default function RetouchingExpertise() {
  return (
    <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Our Expertise
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Professional Retouching
            <span className="mt-2 block text-white/45">
              That Makes a Difference.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            Every image has different needs. We tailor our manual editing
            approach to the subject, purpose, and desired result.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map(({ icon: Icon, ...service }) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors hover:border-amber-400/40"
            >
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {service.description}
                </p>

                <Link
                  href="/quote"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
                >
                  Discuss Your Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
