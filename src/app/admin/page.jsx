
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  LogOut,
  Upload,
  ExternalLink,
  RefreshCw,
  X,
  Trash2,
  Download,
  Home,
} from "lucide-react";

// Format order submission date in Bangladesh time
const formatOrderDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
};

// Format order submission time in Bangladesh time
const formatOrderTime = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
};

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  // Dynamic Homepage Media Manager State
  const [heroForm, setHeroForm] = useState({
    beforeImage: null,
    afterImage: null,
  });
  const [updatingHero, setUpdatingHero] = useState(false);

  const fetchAdminJobs = async () => {
    try {
      if (typeof window === "undefined") return;

      const secureToken = localStorage.getItem("prism_token");

      const res = await fetch("/api/orders", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${secureToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setQuotes(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch orders:", res.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminJobs();
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handles converting and deploying fresh hero images
  const handleUpdateHomepageHero = async (e) => {
    e.preventDefault();

    if (!heroForm.beforeImage || !heroForm.afterImage) {
      alert("Please select both before and after image files.");
      return;
    }

    setUpdatingHero(true);
    const secureToken = localStorage.getItem("prism_token");

    try {
      const beforeBase64 = await convertFileToBase64(
        heroForm.beforeImage
      );
      const afterBase64 = await convertFileToBase64(
        heroForm.afterImage
      );

      // 1. Upload Before file to Cloudinary
      const beforeRes = await fetch("/api/upload-frame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          singleImageBase64: beforeBase64,
        }),
      });

      const beforeData = await beforeRes.json();

      if (!beforeRes.ok) {
        throw new Error(beforeData.error || "Before image upload failed.");
      }

      // 2. Upload After file to Cloudinary
      const afterRes = await fetch("/api/upload-frame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          singleImageBase64: afterBase64,
        }),
      });

      const afterData = await afterRes.json();

      if (!afterRes.ok) {
        throw new Error(afterData.error || "After image upload failed.");
      }

      // 3. Save the links to the Settings collection
      const saveSettingsRes = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secureToken}`,
        },
        body: JSON.stringify({
          beforeImage: beforeData.url,
          afterImage: afterData.url,
        }),
      });

      if (!saveSettingsRes.ok) {
        throw new Error("Failed to save homepage slider settings.");
      }

      alert(
        "Homepage Split Slider assets updated successfully! Refresh your site to view changes."
      );

      setHeroForm({
        beforeImage: null,
        afterImage: null,
      });

      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      alert("Asset change error: " + err.message);
    } finally {
      setUpdatingHero(false);
    }
  };

  const advanceQuoteStatus = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === "Submitted" ? "In Progress" : "Completed";

    const secureToken = localStorage.getItem("prism_token");

    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secureToken}`,
        },
        body: JSON.stringify({
          id,
          nextStatus,
        }),
      });

      if (res.ok) {
        fetchAdminJobs();
      } else {
        console.error("Failed to update order status:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrderRow = async (orderId) => {
    const doubleCheck = window.confirm(
      `Permanently delete order ${orderId}?`
    );

    if (!doubleCheck) return;

    const secureToken = localStorage.getItem("prism_token");

    try {
      const res = await fetch(
        `/api/orders?id=${encodeURIComponent(orderId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${secureToken}`,
          },
        }
      );

      if (res.ok) {
        fetchAdminJobs();
      } else {
        console.error("Failed to delete order:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/60 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <span className="font-bold text-neutral-950 text-base">
            PRISM
            <span className="font-light text-neutral-400">CONTROL</span>
          </span>

          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-left transition-colors ${activeTab === "overview"
                  ? "bg-neutral-50 text-neutral-950"
                  : "text-neutral-500"
                }`}
            >
              <BarChart3 className="h-4 w-4" />
              Order Overview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("manage-hero")}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-left transition-colors ${activeTab === "manage-hero"
                  ? "bg-neutral-50 text-neutral-950"
                  : "text-neutral-500"
                }`}
            >
              <Home className="h-4 w-4" />
              Edit Homepage Hero
            </button>
          </nav>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-2.5 text-sm font-medium text-neutral-500"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </aside>

      <main className="flex-grow p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-neutral-950">
              Operations Console
            </h1>

            <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="text-center py-12 text-sm text-neutral-400 flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Synchronizing data...
                  </div>
                ) : (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-neutral-50 text-neutral-400 border-b text-xs font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3.5">Reference ID</th>
                        <th className="px-6 py-3.5">Client Identity</th>
                        <th className="px-6 py-3.5">
                          Service Specifications
                        </th>
                        <th className="px-6 py-3.5">Volume Count</th>

                        {/* NEW: Order Date and Time */}
                        <th className="px-6 py-3.5 whitespace-nowrap">
                          Order Date
                        </th>
                        <th className="px-6 py-3.5 whitespace-nowrap">
                          Order Time
                        </th>

                        <th className="px-6 py-3.5">System Status</th>
                        <th className="px-6 py-3.5 text-right">
                          Workflow Tool
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-100 font-medium">
                      {quotes.map((quote) => (
                        <tr
                          key={quote.id}
                          className="hover:bg-neutral-50/40 transition-colors"
                        >
                          <td className="px-6 py-4 font-mono font-bold text-neutral-900">
                            <div className="flex flex-col space-y-1">
                              <span className="text-neutral-950">
                                {quote.id}
                              </span>

                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {quote.downloadUrls?.map((url, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => setPreviewImage(url)}
                                    className="inline-flex items-center text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 cursor-pointer"
                                  >
                                    Img {index + 1}
                                    <ExternalLink className="h-2 w-2 ml-0.5" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <p className="text-neutral-950 font-semibold">
                              {quote.name}
                            </p>
                            <p className="text-xs text-neutral-400 font-normal">
                              {quote.email}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-neutral-600">
                            {quote.service}
                          </td>

                          <td className="px-6 py-4 text-neutral-950">
                            {quote.images || 0} Frames
                          </td>

                          {/* NEW: Submission Date */}
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                            {formatOrderDate(quote.createdAt)}
                          </td>

                          {/* NEW: Submission Time */}
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                            {formatOrderTime(quote.createdAt)}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${quote.status === "Submitted"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                                }`}
                            >
                              {quote.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              {quote.status !== "Completed" ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    advanceQuoteStatus(quote.id, quote.status)
                                  }
                                  className="rounded-lg bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                                >
                                  {quote.status === "Submitted"
                                    ? "Assign Retoucher"
                                    : "Mark Dispatched"}
                                </button>
                              ) : (
                                <span className="text-xs font-medium text-neutral-400 italic">
                                  Delivered Clean
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() => handleDeleteOrderRow(quote.id)}
                                className="rounded-lg border border-neutral-200 text-neutral-400 hover:text-red-600 hover:bg-red-50 p-1.5 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {quotes.length === 0 && (
                        <tr>
                          <td
                            colSpan={8}
                            className="px-6 py-12 text-center text-sm text-neutral-400"
                          >
                            No orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* THE HOMEPAGE HERO MEDIA UPLOAD PANEL */}
        {activeTab === "manage-hero" && (
          <div className="max-w-2xl bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-950">
                Update Homepage Split Hero Slider
              </h1>
              <p className="text-xs text-neutral-500">
                Upload fresh before/after original photo pairs directly to
                Cloudinary to rotate your live main website header visual asset.
              </p>
            </div>

            <form
              onSubmit={handleUpdateHomepageHero}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 border border-dashed border-neutral-200 p-4 rounded-xl text-center">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 cursor-pointer">
                    <Upload className="mx-auto h-4 w-4 text-neutral-400 mb-1" />
                    New Slider Left (Before)

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          beforeImage: e.target.files
                            ? e.target.files[0]
                            : null,
                        })
                      }
                    />
                  </label>

                  {heroForm.beforeImage && (
                    <p className="text-[10px] text-green-600 font-semibold truncate mt-1">
                      ✓ {heroForm.beforeImage.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 border border-dashed border-neutral-200 p-4 rounded-xl text-center">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 cursor-pointer">
                    <Upload className="mx-auto h-4 w-4 text-neutral-400 mb-1" />
                    New Slider Right (After)

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setHeroForm({
                          ...heroForm,
                          afterImage: e.target.files
                            ? e.target.files[0]
                            : null,
                        })
                      }
                    />
                  </label>

                  {heroForm.afterImage && (
                    <p className="text-[10px] text-green-600 font-semibold truncate mt-1">
                      ✓ {heroForm.afterImage.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingHero}
                className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
              >
                {updatingHero ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Stream-Pushing Visuals...
                  </span>
                ) : (
                  <>Deploy New Homepage Slider</>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* LIGHTBOX PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-3 shadow-2xl flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between border-b pb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Studio Review Monitor
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={previewImage}
                  download="prism_asset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Asset
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="rounded-lg border text-neutral-500 p-1.5 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[75vh] object-contain rounded-xl border bg-neutral-50"
            />
          </div>
        </div>
      )}
    </div>
  );
}
