// src/app/(public)/quote/page.jsx
"use client";
import { useState } from "react";
import { Upload, HelpCircle, Layers, CheckCircle2 } from "lucide-react";

export default function GetQuotePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    service: "Image Retouching",
    imageCount: "",
    instructions: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary frontend mock until we activate the MongoDB layer in Step 11
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-900">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Quote Request Received</h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Thank you, {formData.fullName}. A senior retoucher will review your specifications and send a custom quote to {formData.email} within 45 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Request a Custom Quote</h1>
          <p className="mt-3 text-sm text-neutral-500">Submit your commercial volume specs. Get a manual evaluation edit for free.</p>
        </div>

        <form onSubmit={handleSubmit} className="border border-neutral-200/80 rounded-2xl p-6 sm:p-10 space-y-6 shadow-sm">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Full Name</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Business Email</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Required Service</label>
              <select
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm bg-white focus:border-neutral-950 transition-colors appearance-none"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option>Image Retouching</option>
                <option>Clipping Path</option>
                <option>Image Masking</option>
                <option>Background Removal</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Estimated Image Count</label>
              <input
                type="number"
                required
                min="1"
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors"
                placeholder="e.g. 150"
                value={formData.imageCount}
                onChange={(e) => setFormData({ ...formData, imageCount: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Instructions & Specifications</label>
            <textarea
              rows={4}
              required
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors resize-none"
              placeholder="Please outline background choices, clipping criteria, or shadow requirements..."
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Submit Detailed Quote Request
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
