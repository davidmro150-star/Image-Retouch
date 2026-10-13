
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  Layers3,
  ShoppingBag,
  Sparkles,
  Scissors,
} from "lucide-react";

const backgroundServices = [
  {
    number: "01",
    title: "E-commerce Product Background Removal",
    description:
      "Remove distracting backgrounds from product photos and create clean, professional images for online stores, marketplaces, and product catalogs.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    tag: "Online Store Ready",
  },
  {
    number: "02",
    title: "Furniture & Lifestyle Background Removal",
    description:
      "Isolate furniture and lifestyle products with precise edges, natural proportions, and a polished finish for catalogs, advertising, and promotional materials.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=85",
    tag: "Clean Product Isolation",
  },
  {
    number: "03",
    title: "White & Transparent Backgrounds",
    description:
      "Replace unwanted backgrounds with pure white or transparent backgrounds, helping your products maintain a consistent and professional appearance.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85",
    tag: "Marketplace Ready",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Upload Your Images",
    description:
      "Send your product images and tell us your preferred background style.",
  },
  {
    number: "02",
    title: "Manual Background Removal",
    description:
      "Our editors carefully isolate each subject and refine its edges for a clean result.",
  },
  {
    number: "03",
    title: "Quality Check",
    description:
      "We inspect the edges, shadows, and overall image quality before delivery.",
  },
  {
    number: "04",
    title: "Receive Your Images",
    description:
      "Get your professionally edited images in your requested format.",
  },
];

export default function BackgroundRemovalPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-gray-900">
      {/* PART 1: HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#101114] px-5 py-20 text-white sm:px-8 sm:py-28 lg:py-32">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <Sparkles size={16} className="text-orange-400" />
              Professional Background Removal
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Remove the Background.
              <span className="mt-2 block text-orange-400">
                Reveal the Product.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
              Turn ordinary product photographs into clean, professional
              visuals. Our manual image editing services deliver precise
              edges, consistent backgrounds, and polished results for your
              business.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600"
              >
                Get a Free Quote
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-orange-400 hover:text-orange-400"
              >
                Talk to Our Team
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-orange-400" />
                Precise Edges
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-orange-400" />
                Consistent Results
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-orange-400" />
                Business Ready
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-3xl bg-orange-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90"
                alt="Red sneaker product photography for background removal"
                className="h-[320px] w-full rounded-xl object-cover sm:h-[440px]"
              />

              <div className="absolute bottom-7 left-7 rounded-xl border border-white/15 bg-black/75 px-4 py-3 backdrop-blur-md">
                <p className="text-xs text-gray-400">
                  PROFESSIONAL EDITING
                </p>
                <p className="mt-1 font-semibold text-white">
                  Clean. Precise. Consistent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: THREE BACKGROUND REMOVAL SERVICES */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              What We Do
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Background Removal for Every Product
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              From individual products to large e-commerce catalogs, we
              create clean images that help your products stand out.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {backgroundServices.map((service) => (
              <article
                key={service.number}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-72"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                    {service.tag}
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
                    {service.number === "01" ? (
                      <ShoppingBag size={22} />
                    ) : service.number === "02" ? (
                      <Layers3 size={22} />
                    ) : (
                      <ImageIcon size={22} />
                    )}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-sm font-semibold tracking-wider text-orange-500">
                    SERVICE {service.number}
                  </p>

                  <h3 className="mt-3 text-xl font-bold leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <Link
                    href="/quote"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-gray-900 transition hover:text-orange-500"
                  >
                    Request This Service
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PART 3: PROCESS + CALL TO ACTION */}
      <section className="bg-[#f7f7f8] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                Our Workflow
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                From Raw Images to Professional Results
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                We follow a clear, quality-focused process to ensure your
                images meet your business requirements. Every image is
                manually reviewed before delivery.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl bg-[#101114] p-7 text-white sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                  <Scissors size={25} />
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Need a large batch edited?
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Tell us about your image volume, preferred background,
                  output format, and deadline. We will help you find the
                  right workflow for your project.
                </p>

                <Link
                  href="/quote"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Request a Quote
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-orange-300 sm:gap-6 sm:p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg font-bold text-orange-500">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
