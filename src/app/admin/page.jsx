
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Layers,
  LogOut,
  PlusCircle,
  Upload,
  RefreshCw,
  FileText,
  Save,
} from "lucide-react";

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Custom quote requests
  const [customQuotes, setCustomQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteSaving, setQuoteSaving] = useState(false);

  const [quoteResponseForm, setQuoteResponseForm] = useState({
    quotedPrice: "",
    estimatedDelivery: "",
    adminFeedback: "",
    status: "Pending",
  });

  const [contentForm, setContentForm] = useState({
    title: "",
    category: "Retouching",
    beforeImage: null,
    afterImage: null,
  });

  const [uploading, setUploading] = useState(false);

  // Load orders using the prism_session_token cookie.
  const fetchAdminJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load orders.");
      }

      setQuotes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Could not connect to the orders API.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAdminQuoteRequests = useCallback(async () => {
    setQuoteLoading(true);
    setError("");

    try {
      const res = await fetch("/api/quotes", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load quote requests.");
      }

      setCustomQuotes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Could not load quote requests.");
    } finally {
      setQuoteLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAdminJobs();
    fetchAdminQuoteRequests();
  }, [fetchAdminJobs, fetchAdminQuoteRequests]);

  const openQuoteRequest = (quote) => {
    setSelectedQuote(quote);

    setQuoteResponseForm({
      quotedPrice: quote.quotedPrice ?? "",
      estimatedDelivery: quote.estimatedDelivery || "",
      adminFeedback: quote.adminFeedback || "",
      status: quote.status || "Pending",
    });

    setError("");
    setSuccess("");
  };

  const saveQuoteResponse = async (e) => {
    e.preventDefault();

    if (!selectedQuote?._id) {
      setError("Please select a quote request.");
      return;
    }

    setQuoteSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/quotes", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedQuote._id,
          quotedPrice:
            quoteResponseForm.quotedPrice === ""
              ? null
              : Number(quoteResponseForm.quotedPrice),
          estimatedDelivery: quoteResponseForm.estimatedDelivery,
          adminFeedback: quoteResponseForm.adminFeedback,
          status: quoteResponseForm.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save quote response.");
      }

      setCustomQuotes((previous) =>
        previous.map((quote) =>
          quote._id === data.data._id ? data.data : quote
        )
      );

      setSelectedQuote(data.data);
      setSuccess("Quote response saved successfully.");
    } catch (err) {
      setError(err.message || "Could not save quote response.");
    } finally {
      setQuoteSaving(false);
    }
  };

  // Update an order's status.
  const advanceQuoteStatus = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === "Submitted" ? "In Progress" : "Completed";

    setUpdatingId(id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, nextStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update order status.");
      }

      if (!data.data) {
        throw new Error("The API did not return the updated order.");
      }

      setQuotes((previous) =>
        previous.map((quote) =>
          quote.id === id ? data.data : quote
        )
      );

      setSuccess(`Order ${id} updated to ${nextStatus}.`);
    } catch (err) {
      setError(err.message || "Could not update order.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Convert an image file to Base64 for the portfolio API.
  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read image."));
      reader.readAsDataURL(file);
    });

  // Upload a before/after portfolio pair.
  const handleUploadContent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!contentForm.title.trim()) {
      setError("Please enter a project title.");
      return;
    }

    if (!contentForm.beforeImage || !contentForm.afterImage) {
      setError("Please select both before and after images.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (
      !allowedTypes.includes(contentForm.beforeImage.type) ||
      !allowedTypes.includes(contentForm.afterImage.type)
    ) {
      setError("Use JPG, PNG, or WebP images.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (
      contentForm.beforeImage.size > maxSize ||
      contentForm.afterImage.size > maxSize
    ) {
      setError("Each image must be 5 MB or smaller.");
      return;
    }

    setUploading(true);

    try {
      const [beforeImageBase64, afterImageBase64] = await Promise.all([
        convertFileToBase64(contentForm.beforeImage),
        convertFileToBase64(contentForm.afterImage),
      ]);

      const res = await fetch("/api/portfolio", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: contentForm.title.trim(),
          category: contentForm.category,
          beforeImageBase64,
          afterImageBase64,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Portfolio upload failed.");
      }

      setSuccess("Portfolio project uploaded successfully.");

      setContentForm({
        title: "",
        category: "Retouching",
        beforeImage: null,
        afterImage: null,
      });

      // Reset the native file inputs.
      e.target.reset();
    } catch (err) {
      setError(err.message || "Could not upload portfolio project.");
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    // Replace this URL with your actual logout endpoint.
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!res.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100/60 md:flex-row">
      {/* Sidebar */}
      <aside className="flex w-full shrink-0 flex-col justify-between border-b border-neutral-200/80 bg-white p-5 md:w-64 md:border-b-0 md:border-r md:p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-neutral-950">
              PRISM
              <span className="font-light text-neutral-400">CONTROL</span>
            </span>

            <span className="rounded bg-neutral-950 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Admin
            </span>
          </div>

          <nav className="flex gap-2 md:flex-col">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === "overview"
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
            >
              <BarChart3 className="h-4 w-4" />
              Order Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("quote-requests")}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === "quote-requests"
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
            >
              <FileText className="h-4 w-4" />
              <span>Quote Requests</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manage-content")}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === "manage-content"
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950"
                }`}
            >
              <Layers className="h-4 w-4" />
              Manage Portfolio
            </button>
          </nav>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-6 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-950"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </aside>

      {/* Main workspace */}
      <main className="mx-auto w-full max-w-7xl flex-grow space-y-8 p-4 sm:p-8 lg:p-10">
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {activeTab === "overview" && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Operations Console
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Manage client orders and production progress.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchAdminJobs}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-neutral-500">
                  Total Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-neutral-950">
                  {loading ? "..." : quotes.length}
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  All orders in the system
                </p>
              </div>
            </div>


            <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm">
              {loading ? (
                <p className="py-12 text-center text-sm text-neutral-500">
                  Loading orders...
                </p>
              ) : quotes.length === 0 ? (
                <p className="py-12 text-center text-sm text-neutral-500">
                  No orders found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                        <th className="whitespace-nowrap px-5 py-4">Reference ID</th>
                        <th className="whitespace-nowrap px-5 py-4">Client</th>
                        <th className="whitespace-nowrap px-5 py-4">Service</th>
                        <th className="whitespace-nowrap px-5 py-4">Images</th>
                        <th className="whitespace-nowrap px-5 py-4">Status</th>
                        <th className="whitespace-nowrap px-5 py-4 text-right">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-100">
                      {quotes.map((quote) => (
                        <tr key={quote._id || quote.id} className="hover:bg-neutral-50/60">
                          <td className="whitespace-nowrap px-5 py-4 font-mono font-bold text-neutral-900">
                            {quote.id}
                          </td>

                          <td className="px-5 py-4">
                            <p className="font-semibold text-neutral-900">
                              {quote.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {quote.email}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-neutral-600">
                            {quote.service}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            {quote.images}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
                              {quote.status}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-right">
                            {quote.status !== "Completed" ? (
                              <button
                                type="button"
                                disabled={updatingId === quote.id}
                                onClick={() =>
                                  advanceQuoteStatus(quote.id, quote.status)
                                }
                                className="rounded-lg bg-neutral-950 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {updatingId === quote.id
                                  ? "Updating..."
                                  : quote.status === "Submitted"
                                    ? "Assign Retoucher"
                                    : "Mark Completed"}
                              </button>
                            ) : (
                              <span className="text-xs text-neutral-400">
                                Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        
        {activeTab === "quote-requests" && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Quote Requests
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Review client requirements and provide custom pricing.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchAdminQuoteRequests}
                disabled={quoteLoading}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${quoteLoading ? "animate-spin" : ""}`}
                />
                Refresh Quotes
              </button>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-neutral-500">
                Total Quote Requests
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-950">
                {quoteLoading ? "..." : customQuotes.length}
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
              {quoteLoading ? (
                <p className="py-12 text-center text-sm text-neutral-500">
                  Loading quote requests...
                </p>
              ) : customQuotes.length === 0 ? (
                <p className="py-12 text-center text-sm text-neutral-500">
                  No quote requests found.
                </p>
              ) : (
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                      <th className="px-5 py-4">Client</th>
                      <th className="px-5 py-4">Service</th>
                      <th className="px-5 py-4">Images</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-100">
                    {customQuotes.map((quote) => (
                      <tr key={quote._id} className="hover:bg-neutral-50/60">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-neutral-900">
                            {quote.fullName}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {quote.email}
                          </p>
                        </td>

                        <td className="px-5 py-4">{quote.service}</td>
                        <td className="px-5 py-4">{quote.imageCount}</td>

                        <td className="px-5 py-4">
                          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
                            {quote.status || "Pending"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-neutral-500">
                          {quote.createdAt
                            ? new Date(quote.createdAt).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => openQuoteRequest(quote)}
                            className="rounded-lg bg-neutral-950 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
                          >
                            Review Request
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {selectedQuote && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-950">
                      Client Requirements
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Full details submitted by the client.
                    </p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-neutral-500">Full Name</p>
                      <p className="mt-1 font-semibold">{selectedQuote.fullName}</p>
                    </div>

                    <div>
                      <p className="text-neutral-500">Business Email</p>
                      <a
                        href={`mailto:${selectedQuote.email}`}
                        className="mt-1 inline-block text-blue-700 hover:underline"
                      >
                        {selectedQuote.email}
                      </a>
                    </div>

                    <div>
                      <p className="text-neutral-500">Required Service</p>
                      <p className="mt-1 font-semibold">{selectedQuote.service}</p>
                    </div>

                    <div>
                      <p className="text-neutral-500">Estimated Image Count</p>
                      <p className="mt-1 font-semibold">{selectedQuote.imageCount}</p>
                    </div>

                    <div>
                      <p className="text-neutral-500">Instructions & Specifications</p>
                      <p className="mt-2 whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 leading-6 text-neutral-700">
                        {selectedQuote.instructions || "No additional instructions provided."}
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={saveQuoteResponse}
                  className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div>
                    <h2 className="text-lg font-bold text-neutral-950">
                      Admin Response
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Set the price and delivery estimate, then write your feedback.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quote-price" className="text-sm font-medium">
                      Quoted Price
                    </label>
                    <input
                      id="quote-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={quoteResponseForm.quotedPrice}
                      onChange={(e) =>
                        setQuoteResponseForm((prev) => ({
                          ...prev,
                          quotedPrice: e.target.value,
                        }))
                      }
                      placeholder="Enter price"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quote-delivery" className="text-sm font-medium">
                      Estimated Delivery
                    </label>
                    <input
                      id="quote-delivery"
                      type="text"
                      maxLength={200}
                      value={quoteResponseForm.estimatedDelivery}
                      onChange={(e) =>
                        setQuoteResponseForm((prev) => ({
                          ...prev,
                          estimatedDelivery: e.target.value,
                        }))
                      }
                      placeholder="e.g. 3–5 business days"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quote-status" className="text-sm font-medium">
                      Status
                    </label>
                    <select
                      id="quote-status"
                      value={quoteResponseForm.status}
                      onChange={(e) =>
                        setQuoteResponseForm((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quote-feedback" className="text-sm font-medium">
                      Feedback / Message to Client
                    </label>
                    <textarea
                      id="quote-feedback"
                      rows={5}
                      maxLength={5000}
                      value={quoteResponseForm.adminFeedback}
                      onChange={(e) =>
                        setQuoteResponseForm((prev) => ({
                          ...prev,
                          adminFeedback: e.target.value,
                        }))
                      }
                      placeholder="Explain the quote, editing requirements, or any questions for the client..."
                      className="w-full resize-y rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={quoteSaving}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {quoteSaving ? "Saving Response..." : "Save Quote Response"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedQuote(null)}
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Close Request
                  </button>
                </form>
              </div>
            )}
          </section>
        )}
        

        {activeTab === "manage-content" && (
          <section className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-950">
                Add Portfolio Project
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Upload before-and-after images for your portfolio.
              </p>
            </div>

            <form onSubmit={handleUploadContent} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="project-title" className="text-sm font-medium">
                  Project title
                </label>
                <input
                  id="project-title"
                  type="text"
                  required
                  maxLength={150}
                  placeholder="Diamond Ring Retouching"
                  value={contentForm.title}
                  onChange={(e) =>
                    setContentForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="project-category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="project-category"
                  value={contentForm.category}
                  onChange={(e) =>
                    setContentForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
                >
                  <option value="Retouching">Retouching</option>
                  <option value="Clipping Path">Clipping Path</option>
                  <option value="Image Masking">Image Masking</option>
                  <option value="Background Removal">Background Removal</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="before-image" className="text-sm font-medium">
                    Before image
                  </label>
                  <input
                    id="before-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required
                    onChange={(e) =>
                      setContentForm((prev) => ({
                        ...prev,
                        beforeImage: e.target.files?.[0] || null,
                      }))
                    }
                    className="block w-full text-xs text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:font-medium"
                  />
                  {contentForm.beforeImage && (
                    <p className="truncate text-xs text-green-700">
                      {contentForm.beforeImage.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="after-image" className="text-sm font-medium">
                    After image
                  </label>
                  <input
                    id="after-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required
                    onChange={(e) =>
                      setContentForm((prev) => ({
                        ...prev,
                        afterImage: e.target.files?.[0] || null,
                      }))
                    }
                    className="block w-full text-xs text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:font-medium"
                  />
                  {contentForm.afterImage && (
                    <p className="truncate text-xs text-green-700">
                      {contentForm.afterImage.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Portfolio Project
                    <PlusCircle className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

