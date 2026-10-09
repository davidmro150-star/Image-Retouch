// src/app/(public)/contact/page.jsx
"use client";
import { useState } from "react";
import { Mail, Phone, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    // Temporary frontend state bridge until we mount database schemas in Step 12
    setSent(true);
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Block */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Connect With Our Studio</h1>
          <p className="mt-3 text-sm text-neutral-500">
            Have questions about production bandwidth or custom enterprise pricing frameworks? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-5xl mx-auto">

          {/* Column 1 & 2: Dynamic Contact Form Panel */}
          <div className="lg:col-span-2 border border-neutral-200/80 rounded-2xl p-6 sm:p-10 shadow-sm bg-white">
            {sent ? (
              <div className="text-center py-12 space-y-3">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 text-neutral-950">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-950">Message Relayed Safely</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Your general inquiry has been delivered directly to our support desk manager. Check your inbox for updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Your Identity</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors"
                    placeholder="e.g. Alex Mercer"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Mailing Endpoint</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors"
                    placeholder="alex@studio.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Message Context</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-neutral-950 transition-colors resize-none"
                    placeholder="Detail your requirements here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Direct Message
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Corporate Metadata Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 space-y-4">
              <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">Studio Desks</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-neutral-400">Production Queries</p>
                    <p className="text-sm font-semibold text-neutral-950">production@prismstudio.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-neutral-400">Direct Telephone</p>
                    <p className="text-sm font-semibold text-neutral-950">+1 (555) 901-2384</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-neutral-400">Desk Timings</p>
                    <p className="text-sm font-semibold text-neutral-950">Mon - Sat: 24 Hours Active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-100 bg-neutral-950 text-white p-6 space-y-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold pt-1">Immediate Live Chat?</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Connect with our active retouchers on shift right now via WhatsApp link for faster asset coordination.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
