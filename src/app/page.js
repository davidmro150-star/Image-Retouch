// src/app/(public)/page.jsx
"use client";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Scissors, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight
} from "lucide-react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";


const coreServices = [
  {
    title: "Image Retouching",
    desc: "Flawless skin texture correction, stray hair removal, and jewelry reflection polishing.",
    href: "/services/image-retouching",
    icon: Sparkles
  },
  {
    title: "Clipping Path",
    desc: "Meticulous pen-tool vector paths for crisp product separation and razor-sharp alignments.",
    href: "/services/clipping-path",
    icon: Scissors
  },
  {
    title: "Image Masking",
    desc: "Advanced alpha channel adjustments for complex boundaries like fur and transparent fabrics.",
    href: "/services/image-masking",
    icon: Layers
  },
  {
    title: "Background Removal",
    desc: "Pure manual multi-layer isolation, cleaning away shadows and studio backgrounds.",
    href: "/services/background-removal",
    icon: ShieldCheck
  }
];

const statsMatrix = [
  { value: "24-Hour", label: "Standard Turnaround" },
  { value: "100%", label: "Manual Precision" },
  { value: "15M+", label: "Assets Delivered" },
  { value: "0%", label: "AI Generative Shortcuts" }
];

const stepsMatrix = [
  { step: "01", name: "Upload Secure Assets", desc: "Submit raw frames along with precise editing guidelines." },
  { step: "02", name: "Manual Studio Processing", desc: "Our experienced retouchers execute adjustments by hand." },
  { step: "03", name: "Quality Verification", desc: "A senior editor reviews the output at maximum resolution." },
  { step: "04", name: "Download & Deploy", desc: "Retrieve print-ready files or easily request adjustments." }
];

const testimonials = [
  {
    quote: "Prism Studio completely replaced our reliance on inconsistent automated AI software. Their manual clipping paths are absolutely perfect.",
    author: "Elena Rostova",
    role: "Production Lead, Luxe Apparel Group"
  },
  {
    quote: "The turn-around window is remarkable. We deliver hundreds of raw product images, and they come back flawlessly isolated by the next morning.",
    author: "Marcus Vance",
    role: "E-Commerce Director, Nexus Goods"
  }
];

export default function HomePage() {
  return (
    
    <div className="bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-900 ring-1 ring-inset ring-neutral-200">
          <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900" /> 100% Studio-Grade Human Precision
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl max-w-4xl mx-auto leading-[1.1]">
          Flawless Manual Image Editing <br />
          <span className="text-neutral-500 font-light">Crafted for Global Brands.</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-600 max-w-2xl mx-auto">
          No automated short-cuts. No broken AI edges. We deliver premium clipping paths, masking, and master-level post-production retouching executed entirely by expert eyes.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/quote"
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors flex items-center gap-2 group"
          >
            Get a Free Trial Custom Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/services/image-retouching" className="text-sm font-semibold leading-6 text-neutral-900 hover:text-neutral-600 transition-colors">
            Explore Core Services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 2. LIVE BEFORE/AFTER SLIDER DEMONSTRATION SECTION */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">Precision in Every Single Pixel</h2>
          <p className="text-sm text-neutral-500">Drag the vertical slider to witness the crisp clarity of manual clipping and professional retouching.</p>
        </div>
        
        <BeforeAfterSlider
          beforeImage="https://res.cloudinary.com/res-cloudinary/image/upload/v1/sample.jpg"
          afterImage="https://res.cloudinary.com/res-cloudinary/image/upload/v1/sample.jpg"
          beforeLabel="Raw Camera Frame"
          afterLabel="Studio Retouched Output"
        />
      </section>

      {/* 3. CORE SERVICES MATRIX SECTION */}
      <section className="bg-neutral-50 border-y border-neutral-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Our Technical Expertise</h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600">
              We specialize exclusively in high-volume, premium manual post-processing workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="relative rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-950">{service.title}</h3>
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{service.desc}</p>
                  </div>
                  <Link href={service.href} className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-neutral-950 hover:text-neutral-600 transition-colors pt-2">
                    Learn Details <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STATISTICS & PERFORMANCE TRUST BLOCK */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 md:p-16 grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          {statsMatrix.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-3xl font-bold tracking-tight sm:text-5xl">{stat.value}</p>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS SEQUENTIAL PIPELINE SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-neutral-100">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Seamless Operational Pipeline</h2>
          <p className="mt-4 text-sm text-neutral-500">From high-volume studio shoots to optimized web delivery assets in four structured movements.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stepsMatrix.map((item) => (
            <div key={item.step} className="relative pl-6 border-l-2 border-neutral-200 hover:border-neutral-950 transition-colors">
              <span className="text-4xl font-extrabold text-neutral-200 block tracking-tight mb-2 select-none">{item.step}</span>
              <h3 className="text-base font-semibold text-neutral-950">{item.name}</h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CORPORATE TESTIMONIALS SECTION */}
      <section className="bg-neutral-50 border-t border-neutral-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">Trusted by Production Directors</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stepsMatrix.map((item) => (
              <div key={item.step} className="relative pl-6 border-l-2 border-neutral-200 hover:border-neutral-950 transition-colors">
                <span className="text-4xl font-extrabold text-neutral-200 block tracking-tight mb-2 select-none">{item.step}</span>
                <h3 className="text-base font-semibold text-neutral-950">{item.name}</h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CORPORATE TESTIMONIALS SECTION */}
      <section className="bg-neutral-50 border-t border-neutral-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">Trusted by Production Directors</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-sm flex flex-col justify-between">
                <p className="text-neutral-600 text-sm italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <p className="text-sm font-semibold text-neutral-950">{t.author}</p>
                  <p className="text-xs text-neutral-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GET A QUOTE FINAL ACTION BANNER LINK */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 sm:p-16 max-w-4xl mx-auto shadow-sm space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Ready to Elevate Your Image Assets?</h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Send over your project files. We will review your brief and deliver a custom quote along with a free evaluation image edit.
          </p>
          <div className="pt-4">
            <Link
              href="/quote"
              className="rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-medium text-white shadow-md hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 group"
            >
              Get Started Instantly
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>

  );
}
  

      
