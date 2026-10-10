// src/app/(auth)/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const rawResponse = await response.text();

      let data;

      try {
        data = rawResponse ? JSON.parse(rawResponse) : {};
      } catch {
        console.error("Invalid login API response:", rawResponse);
        throw new Error(
          `Invalid server response (HTTP ${response.status}). Check the terminal.`
        );
      }

      if (!response.ok || !data.success) {
        setError(
          data.error || `Login failed (HTTP ${response.status}).`
        );
        return;
      }

      if (!data.token || !data.role) {
        throw new Error("Login response is missing session information.");
      }

      localStorage.setItem("prism_token", data.token);
      localStorage.setItem("prism_role", data.role);
      localStorage.setItem("prism_userId", data.userId);
      localStorage.setItem("prism_business", data.businessName || "");

      if (data.role === "admin") {
        router.replace("/admin");
      } else if (data.role === "client") {
        router.replace("/client");
      } else {
        setError("Your account has an unrecognized role.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError(err.message || "Unable to connect to the login service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50/50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white"><Lock className="h-4 w-4" /></div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-950">Workspace Access</h1>
          <p className="text-xs text-neutral-400">Sign in to coordinate retoucher files and manage briefs.</p>
        </div>

        {error && <div className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center">{error}</div>}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Mailing Address</label>
            <input type="email" required className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm focus:border-neutral-950 transition-colors" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">Security Key</label>
            <input type="password" required className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm focus:border-neutral-950 transition-colors" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <>Access Workspace <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
