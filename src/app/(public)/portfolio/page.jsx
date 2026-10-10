// src/app/(public)/portfolio/page.jsx
"use client";
import { useState, useEffect } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const categories = ["All Work", "Retouching", "Clipping Path", "Image Masking", "Background Removal"];

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [activeTab, setActiveTab] = useState("All Work");
  const [loading, setLoading] = useState(true);

  // Pull dynamic image rows down from the database on page mount
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setPortfolioItems(data);
        }
      } catch (err) {
        console.error("Failed to load portfolio grid data stream:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

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
        <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {categories.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors shrink-0 ${activeTab === tab ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Display Matrix Grid */}
        {loading ? (
          <div className="text-center text-sm font-medium text-neutral-400 py-20">Syncing gallery data logs...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-sm font-medium text-neutral-400 py-20">No matching portfolio projects published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div key={item._id} className="space-y-3">
                <BeforeAfterSlider
                  beforeImage={item.beforeImageUrl}
                  afterImage={item.afterImageUrl}
                  beforeLabel="Original"
                  afterLabel="Retouched"
                />
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-sm font-semibold text-neutral-950">{item.title}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}