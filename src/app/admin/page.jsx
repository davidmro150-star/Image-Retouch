// src/app/admin/page.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  Layers,
  LogOut,
  Clock,
  AlertCircle,
  PlusCircle,
  Upload,
  ExternalLink,
  RefreshCw,
  X,
  Trash2,
  Download // ⚡ IMPORTED DOWNLOAD ICON FOR THE LINK ACTION CODES
} from "lucide-react";

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Lightbox Preview Window Hooks
  const [previewImage, setPreviewImage] = useState(null);

  // Portfolio Form State System
  const [contentForm, setContentForm] = useState({ title: "", category: "Retouching", beforeImage: null, afterImage: null });
  const [uploading, setUploading] = useState(false);

  const fetchAdminJobs = async () => {
    try {
      if (typeof window === "undefined") return;
      const secureToken = localStorage.getItem("prism_token");
      const res = await fetch("/api/orders", {
        cache: "no-store",
        headers: { "Authorization": `Bearer ${secureToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setQuotes(data);
      }
    } catch (err) {
      console.error("Failed to load admin logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminJobs();
  }, []);

  const advanceQuoteStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Submitted" ? "In Progress" : "Completed";
    const secureToken = localStorage.getItem("prism_token");
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${secureToken}`
        },
        body: JSON.stringify({ id, nextStatus }),
      });
      if (res.ok) fetchAdminJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrderRow = async (orderId) => {
    const doubleCheckSafetyGate = window.confirm(`Are you absolutely sure you want to permanently delete order ${orderId}?`);
    if (!doubleCheckSafetyGate) return;

    const secureToken = localStorage.getItem("prism_token");
    try {
      const res = await fetch(`/api/orders?id=${orderId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${secureToken}` }
      });

      if (res.ok) {
        alert(`Order ${orderId} wiped out successfully.`);
        await fetchAdminJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadContent = async (e) => {
    e.preventDefault();
    if (!contentForm.beforeImage || !contentForm.afterImage) {
      alert("Please select both before and after image files.");
      return;
    }
    setUploading(true);

    try {
      const beforeBase64 = await convertFileToBase64(contentForm.beforeImage);
      const afterBase64 = await convertFileToBase64(contentForm.afterImage);

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: contentForm.title,
          category: contentForm.category,
          beforeImageBase64: beforeBase64,
          afterImageBase64: afterBase64
        })
      });

      if (res.ok) {
        alert("Portfolio pair pushed to Cloudinary and live on web gallery!");
        setContentForm({ title: "", category: "Retouching", beforeImage: null, afterImage: null });
        setActiveTab("overview");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/60 flex flex-col md:flex-row">

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-neutral-200/80 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-neutral-950 text-base">PRISM<span className="font-light text-neutral-400">CONTROL</span></span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-950 text-white uppercase tracking-wide">Admin</span>
          </div>
          <nav className="space-y-1">
            <button type="button" onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-left transition-colors ${activeTab === "overview" ? "bg-neutral-50 text-neutral-950" : "text-neutral-500 hover:text-neutral-950"}`}><BarChart3 className="h-4 w-4" /> Order Overview</button>
            <button type="button" onClick={() => setActiveTab("manage-content")} className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-left transition-colors ${activeTab === "manage-content" ? "bg-neutral-50 text-neutral-950" : "text-neutral-500 hover:text-neutral-950"}`}><Layers className="h-4 w-4" /> Manage Portfolio</button>
          </nav>
        </div>
        <div className="pt-6 border-t border-neutral-100">
          <Link href="/login" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors"><LogOut className="h-4 w-4" /> Sign Out</Link>
        </div>
      </aside>

      {/* OPERATIONS CONSOLE MAIN SPACE */}
      <main className="flex-grow p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Operations Console</h1>
              <p className="text-xs text-neutral-500">Monitor active manual post-production quotes and updates globally.</p>
            </div>

            {/* Dynamic Metric Display Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-neutral-200/60 p-5 space-y-2 shadow-sm">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Queue Intake</p>
                <p className="text-2xl font-bold text-neutral-950">{quotes.filter(q => q.status === "Submitted").length} Orders</p>
              </div>
              <div className="bg-white rounded-xl border border-neutral-200/60 p-5 space-y-2 shadow-sm">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">On Shift</p>
                <p className="text-2xl font-bold text-neutral-950">{quotes.filter(q => q.status === "In Progress").length} Jobs</p>
              </div>
              <div className="bg-white rounded-xl border border-neutral-200/60 p-5 space-y-2 shadow-sm">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Completed Logs</p>
                <p className="text-2xl font-bold text-neutral-950">{quotes.filter(q => q.status === "Completed" || q.status === "Revision").length} Active</p>
              </div>
            </div>

            {/* Dynamic Logs Table */}
            <div className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
                <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Active Project Inquiries</h3>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="text-center py-12 text-sm text-neutral-400 font-medium flex items-center justify-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" /> Synchronizing master database registries...</div>
                ) : quotes.length === 0 ? (
                  <div className="text-center py-12 text-sm text-neutral-400">No active orders inside cluster schemas.</div>
                ) : (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 text-neutral-400 border-b border-neutral-100 text-xs font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3.5">Reference ID</th>
                        <th className="px-6 py-3.5">Client Identity</th>
                        <th className="px-6 py-3.5">Service Specifications</th>
                        <th className="px-6 py-3.5">Volume Count</th>
                        <th className="px-6 py-3.5">System Status</th>
                        <th className="px-6 py-3.5 text-right">Workflow Tool</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium">
                      {quotes.map((quote) => (
                        <tr key={quote.id} className="hover:bg-neutral-50/40 transition-colors">

                          {/* ⚡ EXTRACTS INTERACTIVE BULK ARRAYS DIRECTLY */}
                          <td className="px-6 py-4 font-mono font-bold text-neutral-900">
                            <div className="flex flex-col space-y-1">
                              <span className="text-neutral-950">{quote.id}</span>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {quote.downloadUrls && quote.downloadUrls.length > 0 ? (
                                  quote.downloadUrls.map((url, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() => setPreviewImage(url)}
                                      className="inline-flex items-center text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 cursor-pointer transition-all"
                                    >
                                      Img {index + 1} <ExternalLink className="h-2 w-2 ml-0.5" />
                                    </button>
                                  ))
                                ) : quote.downloadUrl ? (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewImage(quote.downloadUrl)}
                                    className="inline-flex items-center text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 cursor-pointer transition-all"
                                  >
                                    Img 1 <ExternalLink className="h-2 w-2 ml-0.5" />
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-neutral-300 font-normal italic select-none">(No Media)</span>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <p className="text-neutral-950 font-semibold">{quote.name}</p>
                            <p className="text-xs text-neutral-400 font-normal">{quote.email}</p>
                          </td>
                          <td className="px-6 py-4 text-neutral-600">{quote.service}</td>
                          <td className="px-6 py-4 text-neutral-950">{quote.images || 0} Frames</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${quote.status === "Submitted" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>{quote.status}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              {quote.status !== "Completed" ? (
                                <button type="button" onClick={() => advanceQuoteStatus(quote.id, quote.status)} className="rounded-lg bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer">{quote.status === "Submitted" ? "Assign Retoucher" : "Mark Dispatched"}</button>
                              ) : (<span className="text-xs font-medium text-neutral-400 italic">Delivered Clean</span>)}

                              <button
                                type="button"
                                onClick={() => handleDeleteOrderRow(quote.id)}
                                className="rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 p-1.5 transition-colors cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "manage-content" && (
          <div className="max-w-2xl bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-950">Add Dynamic Portfolio Project</h1>
              <p className="text-xs text-neutral-500">Upload before/after image pairs directly to Cloudinary.</p>
            </div>
            <form onSubmit={handleUploadContent} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Project Display Title</label>
                <input type="text" required placeholder="e.g. Diamond Ring Project" className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white" value={contentForm.title} onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Service Category Tag</label>
                <select className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm bg-white" value={contentForm.category} onChange={(e) => setContentForm({ ...contentForm, category: e.target.value })}><option>Retouching</option><option>Clipping Path</option></select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 border border-dashed border-neutral-200 p-4 rounded-xl text-center">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 cursor-pointer">
                    <Upload className="mx-auto h-4 w-4 text-neutral-400 mb-1" /> Choose Original (Before)
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setContentForm({ ...contentForm, beforeImage: e.target.files ? e.target.files : null })} />
                  </label>
                </div>
              </div>
              <button type="submit" disabled={uploading} className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:bg-neutral-300 transition-colors flex items-center justify-center gap-2"><PlusCircle className="h-4 w-4" /> Deploy Content</button>
            </form>
          </div>
        )}

      </main>

      {/* ⚡ THE INTERACTIVE VIEWING & DOWNLOAD LIGHTBOX MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-3 shadow-2xl flex flex-col items-center gap-3">

            <div className="w-full flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Studio Review Monitor</span>

              <div className="flex items-center gap-2">
                <a
                  href={previewImage}
                  download="prism_studio_source_asset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Download Asset
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 p-1.5 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <img
              src={previewImage}
              alt="Client Sample Operational Asset Preview"
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-neutral-100 bg-neutral-50 shadow-inner"
            />
          </div>
        </div>
      )}

    </div>
  );
}
