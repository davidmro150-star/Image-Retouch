
"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  FolderOpen,
  Clock,
  CheckCircle,
  RefreshCw,
  MessageSquare,
  ArrowUpRight,
  Download,
} from "lucide-react";

const INITIAL_FORM = {
  referenceName: "",
  service: "Image Retouching",
  images: "",
  notes: "",
};

export default function ClientDashboard() {
  const [orders, setOrders] = useState([]);
  const [newOrderForm, setNewOrderForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState("Client Workspace");

  // Load only the orders permitted by the authenticated session.
  const fetchClientJobs = async () => {
    try {
      setBusinessName(
        localStorage.getItem("prism_business") || "Client Workspace"
      );

      const res = await fetch("/api/orders", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load your orders.");
      }

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected orders response.");
      }

      setOrders(data);
    } catch (err) {
      console.error("Failed to load client jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientJobs();
  }, []);

  // Submit a new job for the authenticated client.
  const handleCreateJob = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceName: newOrderForm.referenceName.trim(),
          service: newOrderForm.service,
          images: Number(newOrderForm.images),
          notes: newOrderForm.notes.trim(),
        }),
      });

      const responseText = await res.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Unexpected API response:", responseText);

        throw new Error(
          "The server returned an invalid response. Check your Next.js terminal."
        );
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit the new job.");
      }

      // Add the saved order immediately, then refresh from the server.
      if (data.data) {
        setOrders((currentOrders) => [
          data.data,
          ...currentOrders.filter((order) => order.id !== data.data.id),
        ]);
      }

      await fetchClientJobs();

      setNewOrderForm({ ...INITIAL_FORM });
      setActiveTab("overview");
    } catch (err) {
      console.error("Create job error:", err);
      alert(err.message || "Unable to submit the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/60 flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-neutral-200/80 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-neutral-950 text-base">
              PRISM
              <span className="font-light text-neutral-400">PORTAL</span>
            </span>
          </div>

          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors shrink-0 ${activeTab === "overview"
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-500 hover:text-neutral-950"
                }`}
            >
              <FolderOpen className="h-4 w-4" />
              Order History
            </button>

            <button
              onClick={() => setActiveTab("new-job")}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors shrink-0 ${activeTab === "new-job"
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-500 hover:text-neutral-950"
                }`}
            >
              <PlusCircle className="h-4 w-4" />
              Submit New Job
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-grow p-4 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
                {businessName} Retouch Workspace
              </h1>
              <p className="text-xs text-neutral-500">
                Track your projects, check order progress, and request
                revisions for completed work.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-neutral-200/60 p-4 space-y-1 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Total Projects
                </p>
                <p className="text-xl font-bold text-neutral-950">
                  {orders.length}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/60 p-4 space-y-1 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  In Production
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {
                    orders.filter(
                      (o) =>
                        o.status === "In Progress" ||
                        o.status === "Submitted"
                    ).length
                  }
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/60 p-4 space-y-1 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  In Revision
                </p>
                <p className="text-xl font-bold text-amber-600">
                  {orders.filter((o) => o.status === "Revision").length}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/60 p-4 space-y-1 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Delivered Ready
                </p>
                <p className="text-xl font-bold text-green-600">
                  {orders.filter((o) => o.status === "Completed").length}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                Current Pipeline Log
              </h2>

              {loading ? (
                <div className="text-center py-12 text-sm text-neutral-400 font-medium flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Fetching cloud project rows...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center bg-white border border-neutral-200 rounded-xl py-12 text-sm text-neutral-400">
                  No project orders logged. Click "Submit New Job" to begin.
                </div>
              ) : (
                orders.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl border border-neutral-200/80 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-neutral-900 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200">
                          {job.id}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${job.status === "Submitted"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                        >
                          <Clock className="h-2.5 w-2.5" />
                          {job.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-neutral-950">
                        {job.referenceName}
                      </h3>

                      <p className="text-xs text-neutral-500">
                        <span className="font-semibold text-neutral-700">
                          {job.service}
                        </span>{" "}
                        &bull; {job.images} High-Res Frames
                      </p>

                      <p className="text-xs text-neutral-400 leading-relaxed italic">
                        Briefing: "{job.notes}"
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "new-job" && (
          <div className="max-w-2xl bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-950">
                Initialize New Project Batch
              </h1>
              <p className="text-xs text-neutral-500">
                Outline image targets and constraints.
              </p>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Project Reference Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Jacket Drop 2026"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white"
                  value={newOrderForm.referenceName}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      referenceName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    Service Category
                  </label>
                  <select
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm bg-white"
                    value={newOrderForm.service}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        service: e.target.value,
                      })
                    }
                  >
                    <option>Image Retouching</option>
                    <option>Clipping Path</option>
                    <option>Background Removal</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    Total Frame Volume
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="10000"
                    step="1"
                    placeholder="e.g. 75"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white"
                    value={newOrderForm.images}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        images: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Meticulous Notes
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Clearly outline background codes, shadow depths, or specific retouch rules..."
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white resize-none"
                  value={newOrderForm.notes}
                  onChange={(e) =>
                    setNewOrderForm({
                      ...newOrderForm,
                      notes: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:bg-neutral-300 transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting
                  ? "Syncing System..."
                  : "Deploy Active Job Assignment"}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
