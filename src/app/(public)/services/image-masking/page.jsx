
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Scan,
  Sparkles,
  Scissors,
} from "lucide-react";

const maskingServices = [
  {
    number: "01",
    title: "Product Image Masking",
    description:
      "Create clean, precise masks for headphones, electronics, furniture, and other products with intricate edges.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    icon: Scan,
    label: "PRODUCT PRECISION",
  },
  {
    number: "02",
    title: "Hair & Fur Masking",
    description:
      "Preserve fine hair strands, soft fur, and natural edges for realistic portraits and professional photography.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    icon: Sparkles,
    label: "FINE DETAIL",
  },
  {
    number: "03",
    title: "Complex Object Masking",
    description:
      "Handle transparent glass, delicate objects, and intricate shapes with carefully refined manual masks.",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85",
    icon: Layers3,
    label: "COMPLEX EDGES",
  },
];

export default function ImageMaskingPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Part 1: Hero */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              <Sparkles size={15} />
              Professional Image Masking
            </span>

            <h1 className="max-w-2xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Every Detail Matters.
              <span className="mt-2 block text-blue-600">
                Perfectly Masked.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Reveal the finest details in your images with professional
              manual masking. From delicate hair strands to transparent
              objects, we create accurate masks with natural-looking edges.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Get a Free Quote
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3.5 font-semibold transition hover:border-blue-600 hover:text-blue-600"
              >
                View Our Work
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              {[
                "Precise manual masking",
                "Natural edge details",
                "Professional output",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-blue-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-blue-100/60 blur-2xl" />

            <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=85"
                  alt="Bird photography illustrating fine feather details for image masking"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                  <span className="text-sm font-semibold text-white">
                    Fine-detail masking
                  </span>
                  <p className="mt-1 text-sm text-white/80">
                    Carefully isolated edges and intricate details
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 px-2 pt-4 pb-2">
                <div>
                  <p className="font-semibold">Precision in every pixel</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Professional manual editing
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Layers3 size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Three masking services */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Our Expertise
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Image Masking for Every Detail
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Every image is different. Our masking specialists select the
            right techniques to preserve fine details and produce clean,
            professional results.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {maskingServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute top-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-800 backdrop-blur">
                    {service.label}
                  </span>

                  <span className="absolute right-4 bottom-4 rounded-lg bg-white/95 p-3 text-blue-600 shadow-md">
                    <Icon size={22} />
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-600">
                      {service.number}
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <Link
                    href="/quote"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
                  >
                    Request This Service
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Part 3: Workflow and CTA */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Our Process
            </span>

            <h2 className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">
              Clean Masks.
              <span className="block text-blue-400">
                Exceptional Details.
              </span>
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              We carefully analyze each image, refine complex edges, and
              deliver professional masked images based on your requirements.
              Our team focuses on accuracy, consistency, and quality.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: "01. Image Analysis",
                  description:
                    "We examine edges, fine details, and transparency requirements.",
                },
                {
                  title: "02. Precision Masking",
                  description:
                    "Our editors carefully refine the mask to preserve important details.",
                },
                {
                  title: "03. Quality Review",
                  description:
                    "We inspect the final result and prepare files in your requested format.",
                },
              ].map((step) => (
                <div key={step.title} className="flex gap-4">
                  <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                    <Scissors size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-7 sm:p-10">
            <div className="mb-6 inline-flex rounded-xl bg-blue-500/15 p-4 text-blue-400">
              <Layers3 size={30} />
            </div>

            <h3 className="text-2xl font-bold">
              Need precise image masking?
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Share your images and requirements with our team. We will
              review your project and help you choose the right masking
              service.
            </p>

            <Link
              href="/quote"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
            >
              Request a Quote
              <ArrowRight size={18} />
            </Link>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Pricing and turnaround depend on image complexity and order
              requirements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
