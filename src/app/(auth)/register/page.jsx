// src/app/(auth)/register/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Connects directly to the live backend registration endpoint we tested in Postman
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Automatically send them to login after a brief pause
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Registration failed. Try a different email.");
      }
    } catch (err) {
      setError("Network error connecting to authentication servers.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
        <div className="text-center space-y-3 max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Account Created Successfully!</h1>
          <p className="text-sm text-neutral-500">Routing you to the workspace gateway panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center  bg-white px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#fff] shadow-[0_12px_35px_rgba(0,0,0,0.25)] p-8 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-black">Create Client Profile</h1>
          <p className="text-[16px] text-neutral-800">Register your brand studio to begin outsourcing manual post-production jobs.</p>
        </div>

        {error && (
          <div className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-black">Studio / Business Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#F97316]" />
              <input
                type="text" required placeholder="e.g. Acme Studio"
                className="w-full rounded-lg border border-neutral-800 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-neutral-950 transition-colors"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-black">Business Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#F97316]" />
              <input
                type="email" required placeholder="name@company.com"
                className="w-full rounded-lg border border-neutral-800 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-neutral-950 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-black">Create Security Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#F97316]" />
              <input
                type="password" required placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-800 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-neutral-950 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full rounded-lg bg-neutral-950 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group"
          >
            {loading ? "Registering Profile..." : "Create Free Client Account"}
            {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-neutral-500">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-neutral-950 hover:underline">
              Sign In here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
