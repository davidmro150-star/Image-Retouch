
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Scissors,
  Layers3,
  Image as ImageIcon,
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Image Retouching",
    description:
      "Enhance product photos with professional color correction, scratch removal, and fine-detail refinement.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    href: "/services/image-retouching",
    label: "Detail Enhancement",
    icon: Sparkles,
  },
  {
    id: "02",
    title: "Image Masking",
    description:
      "Precisely isolate hair, fur, transparent objects, and complex edges while preserving important details.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
    href: "/services/image-masking",
    label: "Complex Edges",
    icon: Layers3,
  },
  {
    id: "03",
    title: "Clipping Path",
    description:
      "Get precise product cutouts for catalogs, e-commerce stores, and professional commercial photography.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    href: "/services/clipping-path",
    label: "Precise Cutouts",
    icon: Scissors,
  },
  {
    id: "04",
    title: "Background Removal",
    description:
      "Remove unwanted backgrounds and prepare clean white, transparent, or replacement backgrounds.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85",
    href: "/services/background-removal",
    label: "Clean Backgrounds",
    icon: ImageIcon,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#101114] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
            <Sparkles size={17} />
            Our Expertise
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Professional Image Editing
            <span className="mt-2 block text-orange-400">
              Services for Your Business
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Explore our professional manual image editing services,
            designed to help photographers, brands, and e-commerce
            businesses achieve outstanding visual quality.
          </p>
        </div>

        {/* Four service cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-orange-400/50 hover:shadow-xl hover:shadow-orange-950/20"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-60 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-64"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-2 text-xs text-white backdrop-blur-md">
                    {service.label}
                  </span>

                  <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                    <Icon size={21} />
                  </span>

                  <span className="absolute bottom-4 right-4 text-2xl font-bold text-white/80">
                    {service.id}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold transition group-hover:text-orange-400">
                    {service.title}
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-semibold">
                      Explore Service
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition group-hover:border-orange-400 group-hover:bg-orange-500">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Have a project in mind?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Tell us about your images, requirements, and expected delivery.
            We will help you choose the right editing service.
          </p>

          <Link
            href="/quote"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600"
          >
            Request a Quote
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
