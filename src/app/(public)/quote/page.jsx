// src/app/(public)/quote/page.jsx
"use client";
import { useState } from "react";
import { Upload, CheckCircle, RefreshCw, ArrowUpRight, Files } from "lucide-react";

export default function QuotePage() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "Image Retouching", notes: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please upload sample frames to process your request.");
      return;
    }
    setSubmitting(true);
    setCurrentProgress(0);

    try {
      const compiledCloudUrls = [];
      const filesArray = Array.from(selectedFiles);
      const totalFiles = filesArray.length;
      let processedCount = 0;

      // ⚡ ASYNCHRONOUS SERIAL WORKER ITERATOR: Process images sequentially to protect browser memory pools
      for (const file of filesArray) {
        // 1. Wait completely for the individual file binary read to finish
        const base64String = await convertFileToBase64(file);

        // 2. Dispatch data payload packet safely to the server pipeline
        const frameResponse = await fetch("/api/upload-frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ singleImageBase64: base64String })
        });

        if (frameResponse.ok) {
          const frameData = await frameResponse.json();
          compiledCloudUrls.push(frameData.url);

          processedCount++;
          setCurrentProgress(Math.round((processedCount / totalFiles) * 100)); // Update real-time percentage
        } else {
          const frameErr = await frameResponse.json();
          throw new Error(frameErr.error || "File upload rejected.");
        }
      }

      // 3. Final single lightweight payload commit directly into MongoDB schemas
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          notes: formData.notes,
          uploadedUrls: compiledCloudUrls
        })
      });

      if (res.ok) {
        setSuccess(true);
        setSelectedFiles([]);
        setFormData({ name: "", email: "", service: "Image Retouching", notes: "" });
      } else {
        alert("The server pool database mapping routine failed.");
      }
    } catch (err) {
      console.error("Ingestion loop broke:", err);
      alert("Bulk ingestion aborted: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
        <div className="text-center space-y-4 max-w-md bg-neutral-50 border border-neutral-200 p-8 rounded-2xl shadow-sm animate-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600"><CheckCircle className="h-6 w-6" /></div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-950">Bulk Request Matrix Dispatched!</h1>
          <p className="text-sm text-neutral-500 leading-relaxed">We have successfully ingested your massive sample asset batch directly into the retoucher shift deck. Your flat-rate production quotation will arrive within 15 minutes.</p>
          <button onClick={() => setSuccess(false)} className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 underline cursor-pointer">Submit Another Batch</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 py-16 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Request Custom Studio Quote</h1>
          <p className="text-sm text-neutral-500 mt-1">Upload high-volume sample imagery directly to our processing grid for high-speed automated evaluation.</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Full Name / Company Identity</label>
            <input type="text" required placeholder="e.g. Sarah from Nexus Brands" className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Corporate Email Address</label>
            <input type="email" required placeholder="name@yourcompany.com" className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Required Service Specification</label>
              <select className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm bg-white" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}><option>Image Retouching</option><option>Clipping Path</option><option>Background Removal</option></select>
            </div>
            <div className="space-y-1.5 border border-dashed border-neutral-200 rounded-xl p-4 text-center flex flex-col justify-center bg-neutral-50/30 hover:bg-neutral-50 transition-colors cursor-pointer relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block cursor-pointer">
                <Upload className="mx-auto h-4 w-4 text-neutral-400 mb-1" /> Choose Sample Photos
                <input type="file" accept="image/*" required multiple className="hidden" onChange={(e) => setSelectedFiles(e.target.files ? e.target.files : [])} />
              </label>
              {selectedFiles.length > 0 && (
                <p className="text-[11px] text-green-600 font-semibold flex items-center justify-center gap-1 mt-1">
                  <Files className="h-3 w-3" /> ✓ {selectedFiles.length} Images Attached
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Project Guidelines & Batch Volume Notes</label>
            <textarea rows={4} required placeholder="State your estimated monthly image volume target, background hex codes (#FFFFFF), margin spacing rules, clipping extensions, or layer delivery formats..." className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white resize-none" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
          </div>
          <button type="submit" disabled={submitting} className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:bg-neutral-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm">
            {submitting ? (
              <span className="flex items-center gap-2 font-mono"><RefreshCw className="h-4 w-4 animate-spin" /> Upload Progress: {currentProgress}%</span>
            ) : <>Submit Bulk Quote Request Matrix <ArrowUpRight className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
