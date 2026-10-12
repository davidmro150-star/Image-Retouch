// src/app/client/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, FolderOpen, Clock, RefreshCw, Upload, Files, LogOut, AlertTriangle, ArrowUpRight } from "lucide-react";

const INITIAL_FORM = { referenceName: "", service: "Image Retouching", notes: "" };

export default function ClientDashboard() {
  const [orders, setOrders] = useState([]);
  const [newOrderForm, setNewOrderForm] = useState(INITIAL_FORM);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [businessName, setBusinessName] = useState("Client Workspace");
  const router = useRouter();

  const fetchClientJobs = async () => {
    try {
      if (typeof window === "undefined") return;
      const secureToken = localStorage.getItem("prism_token");
      setBusinessName(localStorage.getItem("prism_business") || "Client Workspace");

      if (!secureToken) {
        setAuthError(true);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/orders", {
        cache: "no-store",
        headers: { "Authorization": `Bearer ${secureToken}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(Array.isArray(data) ? data : []);
      else setAuthError(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientJobs();
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please upload at least 1 image file for testing purpose.");
      return;
    }
    setIsSubmitting(true);
    setCurrentProgress(0);
    const secureToken = localStorage.getItem("prism_token");

    try {
      const compiledCloudUrls = [];
      const filesArray = Array.from(selectedFiles);
      const totalFiles = filesArray.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = filesArray[i];
        const base64String = await convertFileToBase64(file);

        const frameResponse = await fetch("/api/upload-frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ singleImageBase64: base64String })
        });

        if (frameResponse.ok) {
          const frameData = await frameResponse.json();
          compiledCloudUrls.push(frameData.url);
          setCurrentProgress(Math.round(((i + 1) / totalFiles) * 100));
        } else {
          throw new Error(`File ${i + 1} rejected.`);
        }
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${secureToken}`
        },
        body: JSON.stringify({
          referenceName: newOrderForm.referenceName,
          service: newOrderForm.service,
          notes: newOrderForm.notes,
          downloadUrls: compiledCloudUrls
        }),
      });

      if (res.ok) {
        await fetchClientJobs();
        setNewOrderForm(INITIAL_FORM);
        setSelectedFiles([]);
        setActiveTab("overview");
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <div className="text-center space-y-4 max-w-sm bg-white border p-8 rounded-2xl shadow-sm">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
          <h1 className="text-lg font-bold text-neutral-950">Session Expired</h1>
          <button onClick={() => router.push("/login")} className="w-full rounded-lg bg-neutral-950 py-2.5 text-xs font-semibold text-white">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100/60 flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 bg-white border-r border-neutral-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <span className="font-bold text-neutral-950 text-base">PRISM<span className="font-light text-neutral-400">PORTAL</span></span>
          <nav className="flex lg:flex-col gap-1">
            <button type="button" onClick={() => setActiveTab("overview")} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === "overview" ? "bg-neutral-950 text-white" : "text-neutral-500"}`}><FolderOpen className="h-4 w-4" /> Order History</button>
            <button type="button" onClick={() => setActiveTab("new-job")} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === "new-job" ? "bg-neutral-950 text-white" : "text-neutral-500"}`}><PlusCircle className="h-4 w-4" /> Submit New Job</button>
          </nav>
        </div>
        <button type="button" onClick={() => { localStorage.clear(); router.push("/login"); }} className="flex items-center gap-2 text-xs font-semibold text-neutral-400 w-full text-left"><LogOut className="h-3.5 w-3.5" /> Sign Out</button>
      </aside>

      <main className="flex-grow p-4 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div><h1 className="text-2xl font-bold text-neutral-950">{businessName} Workspace</h1><p className="text-xs text-neutral-500">Track your project pipelines live.</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border p-4 shadow-sm"><p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Projects</p><p className="text-xl font-bold text-neutral-950">{orders.length}</p></div>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-sm text-neutral-400 flex items-center justify-center gap-2"><RefreshCw className="h-4 w-4 animate-spin" /> Synchronizing data...</div>
              ) : orders.length === 0 ? (
                <div className="text-center bg-white border rounded-xl py-12 text-sm text-neutral-400">No project orders logged yet.</div>
              ) : (
                orders.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl border p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2"><span className="text-xs font-mono font-bold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded border">{job.id}</span><span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium border bg-amber-50 text-amber-700">{job.status}</span></div>
                      <h3 className="text-base font-bold text-neutral-950">{job.referenceName}</h3>
                      <p className="text-xs text-neutral-500"><span className="font-semibold text-neutral-700">{job.service}</span> &bull; {job.images} Frames</p>
                      <p className="text-xs text-gray-800 leading-relaxed italic">Briefing: "{job.notes}"</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "new-job" && (
          <div className="max-w-2xl bg-white border rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Project Reference Name</label>
                <input type="text" required placeholder="e.g. Jacket Drop" className="w-full rounded-lg border px-4 py-2.5 text-sm bg-white" value={newOrderForm.referenceName} onChange={(e) => setNewOrderForm({ ...newOrderForm, referenceName: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Service Category</label>
                  <select className="w-full rounded-lg border px-4 py-3 text-sm bg-white" value={newOrderForm.service} onChange={(e) => setNewOrderForm({ ...newOrderForm, service: e.target.value })}><option>Image Retouching</option><option>Clipping Path</option><option>Background Removal</option></select>
                </div>
                <div className="space-y-1.5 border border-dashed border-neutral-200 rounded-xl p-4 text-center flex flex-col justify-center bg-neutral-50/30 cursor-pointer relative">
                  <label className="text-xs font-semibold block cursor-pointer">
                    <Upload className="mx-auto h-4 w-4 text-neutral-400 mb-1" /> Attach Test Images
                    <input type="file" accept="image/*" required multiple className="hidden" onChange={(e) => setSelectedFiles(e.target.files ? e.target.files : [])} />
                  </label>
                  {selectedFiles.length > 0 && <p className="text-[11px] text-green-600 font-semibold mt-1"><Files className="h-3 w-3 inline mr-1" /> ✓ {selectedFiles.length} Attached</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Meticulous Notes</label>
                <textarea rows={4} required placeholder="Outline backdrop hex rules..." className="w-full rounded-lg border px-4 py-2.5 text-sm bg-white resize-none" value={newOrderForm.notes} onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })} />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-semibold text-white flex items-center justify-center gap-2">
                {isSubmitting ? <span className="flex items-center gap-2 font-mono"><RefreshCw className="h-4 w-4 animate-spin" /> Streaming: {currentProgress}%</span> : <>Deploy Active Job Assignment <ArrowUpRight className="h-4 w-4" /></>}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
