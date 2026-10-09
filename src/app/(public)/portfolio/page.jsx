// src/app/(public)/portfolio/page.jsx
"use client";
import { useState } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const categories = ["All Work", "Retouching", "Clipping Path", "Image Masking"];

const portfolioItems = [
  {
    category: "Retouching",
    title: "Luxe Fashion Editorial",
    before: "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='500' style='background:%23e5e5e5'><text x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' font-size='20' fill='%23999'>Raw Editorial Frame</text></svg>",
    after: "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='500' style='background:%23171717'><text x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' font-size='20' fill='%23fff'>Studio Retouched Polish</text></svg>"
  },
  {
    category: "Clipping Path",
    title: "E-Commerce Product Separation",
    before: "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='500' style='background:%23e5e5e5'><text x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' font-size='20' fill='%23999'>Raw Product Studio Shot</text></svg>",
    after: "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='500' style='background:%23f4f4f5'><text x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' font-size='20' fill='%2318181b'>Hand-Drawn Vector Path</text></svg>"
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All Work");

  const filteredItems = portfolioItems.filter(item =>
    activeTab === "All Work" ? true : item.category === activeTab
  );

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Studio Portfolio</h1>
          <p className="mt-4 text-sm text-neutral-500">Examine the strict precision of our manual editing across recent commercial assignments.</p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${activeTab === tab ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Display Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <div key={index} className="space-y-3">
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                beforeLabel="Original Input"
                afterLabel="Manual Studio Edit"
              />
              <div className="flex justify-between items-center px-1">
                <h3 className="text-sm font-semibold text-neutral-950">{item.title}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
