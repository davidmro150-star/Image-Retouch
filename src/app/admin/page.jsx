// src/app/admin/page.jsx
"use client";
import { useState } from "react";
import Link from "next/navigation";
import {
  BarChart3,
  FileText,
  Layers,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

// Sandbox Mock Data Store to handle views without active MongoDB connections
const initialQuotesMock = [
  { id: "Q-9081", name: "Elena Rostova", email: "elena@luxeapparel.com", service: "Image Retouching", volume: 140, status: "Submitted" },
  { id: "Q-9082", name: "Marcus Vance", email: "m.vance@nexusgoods.com", service: "Clipping Path", volume: 450, status: "In Progress" },
  { id: "Q-9083", name: "Sarah Jenkins", email: "s.jenkins@studio.io", service: "Image Masking", volume: 85, status: "Completed" }
];

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState(initialQuotesMock);

  // Update logic to simulate live status updates in the system
  const advanceQuoteStatus = (id, currentStatus) => {
    setQuotes(quotes.map(q => {
      if (q.id === id) {
        const nextStatus = currentStatus === "Submitted" ? "In Progress" : "Completed";
        return { ...q, status: nextStatus };
      }
      return q;
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-100/60 flex flex-col md:flex-row">

      {/* 1. SIDEBAR CONTAINER NAVIGATION CONTROL */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-neutral-200/80 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-neutral-950 text-base">PRISM<span className="font-light text-neutral-400">CONTROL</span></span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-950 text-white uppercase tracking-wide">Admin</span>
          </div>

          <nav className="space-y-1">
            <div className="flex items-center gap-2.5 rounded-lg bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-950">
              <BarChart3 className="h-4 w-4" /> Overview
            </div>
            <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors cursor-not-allowed opacity-60">
              <Layers className="h-4 w-4" /> Portfolio Assets
            </div>
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-100">
          <a href="/login" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </a>
        </div>
      </aside>

      {/* 2. CORE WORKSPACE OPERATION WRAPPER */}
      <main className="flex-grow p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">

        {/* Header Brief */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Operations Console</h1>
            <p className="text-xs text-neutral-500">Monitor active manual post-production quotes and updates.</p>
          </div>
        </div>

        {/* Dynamic Metric Display Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-neutral-200/60 p-5 space-y-2 shadow-sm">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Queue Intake</p>
            <p className="text-2xl font-bold text-neutral-950">{quotes.filter(q => q.status === "Submitted").length} Orders</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200/60 p-5 space-y-2 shadow-sm">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">On Retoucher Shift</p>
            <p className="text-2xl font-bold text-neutral-950">{quotes.filter(q => q.status === "In Progress").length} Jobs</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200/60 p-5 space-y-2 shadow-sm">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Dispatched Assets</p>
            <p className="text-2xl font-bold text-neutral-950">{quotes.filter(q => q.status === "Completed").length} Done</p>
          </div>
        </div>

        {/* Dynamic Table Management Block */}
        <div className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
            <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Active Project Inquiries</h3>
          </div>

          <div className="overflow-x-auto">
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
                    <td className="px-6 py-4 font-mono font-bold text-neutral-900">{quote.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-neutral-950 font-semibold">{quote.name}</p>
                      <p className="text-xs text-neutral-400 font-normal">{quote.email}</p>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{quote.service}</td>
                    <td className="px-6 py-4 text-neutral-950">{quote.volume} Frames</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${quote.status === "Submitted" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          quote.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            "bg-green-50 text-green-700 border-green-200"
                        }`}>
                        {quote.status === "Submitted" && <AlertCircle className="h-3 w-3" />}
                        {quote.status === "In Progress" && <Clock className="h-3 w-3" />}
                        {quote.status === "Completed" && <CheckCircle className="h-3 w-3" />}
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {quote.status !== "Completed" ? (
                        <button
                          onClick={() => advanceQuoteStatus(quote.id, quote.status)}
                          className="rounded-lg bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                          {quote.status === "Submitted" ? "Assign Retoucher" : "Mark Dispatched"}
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-neutral-400 italic">Delivered Clean</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
