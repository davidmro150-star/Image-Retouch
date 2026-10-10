// src/components/common/ServicePageLayout.jsx
"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

// Safe inline vector data to avoid 404 upstream errors
const defaultBefore = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='500' style='background:%23e5e5e5'><text x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' font-size='20' fill='%23999'>Raw Studio Shot</text></svg>";
const defaultAfter = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='500' style='background:%23171717'><text x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' font-size='20' fill='%23fff'>Manual Premium Edit</text></svg>";

export default function ServicePageLayout({ title, description, benefits, beforeImage, afterImage, features }) {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-950 tracking-tight">Interactive Quality Comparison</h2>
            <BeforeAfterSlider
              beforeImage={beforeImage || defaultBefore}
              afterImage={afterImage || defaultAfter}
              beforeLabel="Original Input"
              afterLabel="Manual Studio Edit"
            />
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200/60 space-y-6">
            <h3 className="text-lg font-bold text-neutral-950">Why Outsource This to Our Studio?</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed">
                  <CheckCircle className="h-5 w-5 text-neutral-950 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-16">
          <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-8">Technical Deliverables Included</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="border border-neutral-200/60 p-6 rounded-xl space-y-2">
                <h4 className="font-semibold text-neutral-950 text-base">{feat.name}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold sm:text-3xl">Ready to test our turnaround capabilities?</h3>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">Get up to 3 trial image updates edited absolutely free of cost to evaluate workflow integration.</p>
          <div className="pt-2">
            <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
              Submit Free Trial Job <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
