// src/components/home/Hero.jsx
"use client";
import Link from "next/link";
import Container from "@/components/common/Container";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

// 1. Accept dashboardData as a prop from your parent page component
export default function Hero({ dashboardData }) {

  // 2. Define safe fallbacks in case the dashboard is empty or missing data
  const beforeImg = dashboardData?.beforeImage || "/placeholders/default-before.jpg";
  const afterImg = dashboardData?.afterImage || "/placeholders/default-after.jpg";

  return (
    <section className="relative  text-white overflow-hidden py-16 sm:py-24 lg:py-32">

      {/* Background Decorative Ambient Glow Patches */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center bg-[#F5F3FF]">

          {/* LEFT COLUMN: 50% Pitch & Copy Fields */}
          <div className="space-y-6 lg:max-w-xl animate-in fade-in slide-in-from-left-4 duration-300">
         

            <h1 className="text-4xl font-extrabold tracking-tight text-[#000] sm:text-5xl lg:text-6xl leading-[1.1]">
              Flawless Visuals. <br />
              <span className="bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600 bg-clip-text text-[#000]">
                High Volume Speeds.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#000] leading-relaxed max-w-lg">
              Stream raw file frames to our high-throughput processing grid. We deliver vector clippings, skin layer masks, and high-end jewelry retouches free of compression artifacts.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#fff] text-[#000] hover:text-white hover:bg-neutral-800 px-6 py-3.5 text-sm font-bold transition-all cursor-pointer"
              >
                Submit High-Volume Batch <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#fff] text-[#000] hover:text-[#000] hover:bg-[#6366f1] px-6 py-3.5 text-sm font-bold transition-all cursor-pointer"
              >
                Explore Studio Gallery
              </Link>
            </div>

       
          </div>

          {/* RIGHT COLUMN: 50% Interactive Comparison Slider Frame */}
          <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300">
            {/* 3. Pass the dynamic variables here instead of static text */}
            <BeforeAfterSlider
              beforeImage={beforeImg}
              afterImage={afterImg}
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
