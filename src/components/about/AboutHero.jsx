
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye } from "lucide-react";

export default function AboutHero() {
  const values = [
    "Attention to every detail",
    "Natural and consistent results",
    "Quality-focused editing",
    "Client-focused collaboration",
  ];

  return (
    <section className="border-b border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left content */}
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            About Prism Studio
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Every Detail
            <span className="block text-amber-400">
              Makes a Difference.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
            We help brands present their products at their best through
            professional, manually crafted image editing. From precise
            cutouts to refined retouching, we turn ordinary images into
            polished visual assets.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-black transition-colors hover:bg-amber-300"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-medium transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right content */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-sm text-white/50">
                Our philosophy
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Precision by hand.
              </h2>
            </div>

            <div className="rounded-2xl bg-amber-400/10 p-4 text-amber-400">
              <Eye size={30} />
            </div>
          </div>

          <div className="space-y-6 pt-7">
            {values.map((value) => (
              <div key={value} className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-400"
                />
                <p className="text-white/75">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 rounded-2xl bg-amber-400 p-5 text-black">
            <p className="text-sm font-medium">Our commitment</p>
            <p className="mt-2 text-xl font-semibold">
              Quality in every pixel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
