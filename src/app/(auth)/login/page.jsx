// src/app/(auth)/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simulated sandbox routing logic until MongoDB env strings are wired up
    if (email === "admin@prismstudio.com" && password === "admin123") {
      router.push("/admin");
    } else if (email === "client@company.com" && password === "client123") {
      router.push("/client");
    } else {
      setError("Invalid credential mappings. Use admin@prismstudio.com / admin123 for sandbox entry.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50/50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-sm space-y-6">

        {/* Card Headline Identification */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white">
            <Lock className="h-4 w-4" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-950">Workspace Access</h1>
          <p className="text-xs text-neutral-400">Sign in to coordinate retoucher files and manage briefs.</p>
        </div>

        {error && (
          <div className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Mailing Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                required
                className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-neutral-950 transition-colors"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                required
                className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-neutral-950 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group"
          >
            Access Workspace
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Sandbox Access Credentials Guide */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-4 space-y-1.5">
          <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-neutral-950" /> Sandbox Credentials Guide
          </p>
          <p className="text-xs text-neutral-500 font-medium">Admin: <span className="text-neutral-950 font-mono">admin@prismstudio.com</span> / <span className="text-neutral-950 font-mono">admin123</span></p>
          <p className="text-xs text-neutral-500 font-medium">Client: <span className="text-neutral-950 font-mono">client@company.com</span> / <span className="text-neutral-950 font-mono">client123</span></p>
        </div>

      </div>
    </div>
  );
}
