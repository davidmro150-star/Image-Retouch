
// src/app/page.jsx
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Dynamic Structural Test View */}
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-900 ring-1 ring-inset ring-neutral-200/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900" /> 100% Studio-Grade Human Precision
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl max-w-3xl mx-auto leading-[1.1]">
          Flawless Manual Image Editing for Global Brands.
        </h1>
        <p className="mt-6 text-lg leading-8 text-neutral-600 max-w-2xl mx-auto">
          No generative shortcuts. No structural AI compromises. Meticulous clipping paths, masking, and high-end professional retouching executed by expert eyes.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/quote"
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors flex items-center gap-2 group"
          >
            Request a Free Trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/services/image-retouching" className="text-sm font-semibold leading-6 text-neutral-900 hover:text-neutral-600 transition-colors">
            Explore Services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
