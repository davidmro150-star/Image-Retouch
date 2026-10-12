
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Scissors,
  ShieldCheck,
  Target,
} from "lucide-react";

export default function ClippingPathHero() {
  const benefits = [
    { icon: Target, label: "Precise Edges" },
    { icon: Scissors, label: "Manual Path Creation" },
    { icon: ShieldCheck, label: "Quality Focused" },
  ];

  return (
    <section className="border-b border-white/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/45">
            <Link href="/" className="hover:text-amber-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-amber-400">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-400">Clipping Path</span>
          </div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Professional Image Editing
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Clipping Path
            <span className="mt-2 block text-amber-400">
              Precision in Every Edge.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
            Get clean, accurate product cutouts with professional manual
            clipping path services. We carefully isolate objects to help
            your products stand out in catalogs, advertisements, and
            e-commerce stores.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {benefits.map(({ icon: Icon, label }) => (
              <div key={label}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/40 text-amber-400">
                  <Icon size={21} />
                </div>

                <p className="max-w-32 text-sm leading-5 text-white/75">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/quote"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Get a Quote
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury handbag product photography for clipping path editing"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/85 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
            <div>
              <p className="text-xs text-white/45">
                Our specialty
              </p>
              <p className="mt-1 font-semibold">
                Clean Cuts. Precise Details.
              </p>
            </div>

            <CheckCircle2
              className="shrink-0 text-amber-400"
              size={26}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
