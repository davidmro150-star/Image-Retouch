// src/app/page.js (or src/app/(public)/page.jsx)
import React from "react";
import Hero from "@/components/home/Hero";
import Container from "@/components/common/Container";
import { Sparkles, Scissors, Layers, ShieldCheck } from "lucide-react";
import ClippingPathShowcase from "@/components/home/ClippingPathShowcase";

const coreServices = [
  { 
    title: "Image Retouching", 
    desc: "Flawless skin texture correction and high-end reflection polishing.", 
    icon: Sparkles 
  },
  { 
    title: "Clipping Path", 
    desc: "Meticulous pen-tool vector paths for razor-sharp product separation.", 
    icon: Scissors 
  },
  { 
    title: "Image Masking", 
    desc: "Advanced alpha channel isolation for complex boundaries like hair and fur.", 
    icon: Layers 
  },
  { 
    title: "Background Removal", 
    desc: "Pure manual multi-layer studio backdrop cleanup without automated distortions.", 
    icon: ShieldCheck 
  }
];

export default function HomePage() {
  return (
    <div className=" text-white min-h-screen selection:bg-white selection:text-neutral-950">
      
      {/* 1. DYNAMIC SPLIT HERO BANNER COMPONENT */}
      <Hero />

      
      <ClippingPathShowcase/>
      {/* 2. LIVE STUDIO CAPABILITIES SECTION */}
      <section className=" bg-[#F5F3FF] py-20 sm:py-28">
        <Container className="bg-[#F5F3FF]">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#000] sm:text-4xl">
              Technical Studio Expertise
            </h2>
            <p className="text-sm text-[#000]">
              Premium manual post-processing workflows built to handle high-volume commercial assets.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.title} 
                  className="rounded-2xl border border-neutral-900 bg-[#fff] p-6 shadow-sm flex flex-col justify-between hover:border-neutral-800 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-neutral-950 shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#000] group-hover:text-[#0F172A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

    </div>
  );
}

