// src/components/common/TrialModalForm.jsx
"use client";
import { useState } from "react";
import { X, Upload, CheckCircle, RefreshCw } from "lucide-react";

export default function TrialModalForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", service: "Image Retouching", notes: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

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
    if (!selectedFile) {
      alert("Please upload a trial file to process.");
      return;
    }
    setSubmitting(true);

    try {
      const base64Image = await convertFileToBase64(selectedFile);

      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          notes: formData.notes,
          imageBase64: base64Image
        })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setSelectedFile(null);
          setFormData({ name: "", email: "", service: "Image Retouching", notes: "" });
          onClose();
        }, 3000);
      } else {
        alert("Upload engine rejected the trial asset package.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 relative space-y-6">

        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-50 transition-colors">
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-950">Trial Submitted Successfully!</h3>
            <p className="text-xs text-neutral-500">Your test image has been linked to the operations desk. We deliver finished variants within 60 minutes.</p>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-bold text-neutral-950">Deploy Free Test Selection</h2>
              <p className="text-xs text-neutral-400">Upload 1 sample frame to evaluate our clipping vectors and skin layer workflows free of charge.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Your Identity Name</label>
                <input type="text" required placeholder="e.g. John of Acme Apparel" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Business Email Address</label>
                <input type="email" required placeholder="name@brand.com" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Target Process</label>
                  <select className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm bg-white" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    <option>Image Retouching</option>
                    <option>Clipping Path</option>
                    <option>Background Removal</option>
                  </select>
                </div>

                <div className="space-y-1 border border-dashed border-neutral-200 rounded-lg p-2 text-center flex flex-col justify-center cursor-pointer hover:bg-neutral-50 transition-colors">
                  <label className="text-[11px] font-bold text-neutral-600 block cursor-pointer">
                    <Upload className="mx-auto h-4 w-4 text-neutral-400 mb-0.5" /> Attach Photo
                    <input type="file" accept="image/*" required className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                  {selectedFile && <p className="text-[9px] text-green-600 font-medium truncate mt-0.5">✓ {selectedFile.name}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Retouch Briefing Specifications</label>
                <textarea rows={3} placeholder="Provide hex background colors or drop-shadow settings..." className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm resize-none" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
              </div>

              <button type="submit" disabled={submitting} className="w-full rounded-lg bg-neutral-950 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:bg-neutral-300 transition-colors flex items-center justify-center gap-2">
                {submitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Dispatch Trial File Asset"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
