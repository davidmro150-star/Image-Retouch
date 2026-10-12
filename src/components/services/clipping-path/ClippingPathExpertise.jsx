
import Link from "next/link";
import {
  ArrowRight,
  Scissors,
  Layers3,
  CircleDot,
  Target,
} from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Basic Clipping Path",
    description:
      "Precisely isolate products with simple outlines, ideal for bottles, boxes, furniture, and other straightforward shapes.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    alt: "Sneaker product photography",
  },
  {
    icon: Target,
    title: "Complex Clipping Path",
    description:
      "Handle detailed product contours, intricate shapes, and challenging edges with careful manual path creation.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    alt: "Watch with detailed product contours",
  },
  {
    icon: Layers3,
    title: "Compound Clipping Path",
    description:
      "Isolate products containing multiple areas, holes, and openings while maintaining accurate interior cutouts.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    alt: "Handbag product photography",
  },
  {
    icon: CircleDot,
    title: "Multiple Clipping Paths",
    description:
      "Separate selected product components so colors and individual areas can be adjusted independently in post-production.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    alt: "Headphones product photography",
  },
];

export default function ClippingPathExpertise() {
  return (
    <section className="bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Our Expertise
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Clean Cutouts.
            <span className="mt-2 block text-white/45">
              Exceptional Precision.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            From simple product outlines to intricate shapes, our clipping
            path services help create clean, professional product imagery.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, ...service }) => (
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

              <div className="p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {service.description}
                </p>

                <Link
                  href="/quote"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
                >
                  Get a Quote
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
