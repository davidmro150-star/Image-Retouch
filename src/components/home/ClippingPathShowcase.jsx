// src/components/home/ClippingPathShowcase.jsx
"use client";
import Container from "@/components/common/Container";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider"; 

import { Scissors, ArrowRight, CheckCircle2 } from "lucide-react";


const clippingPathProjects = [

  {
    id: "jewelry-static-demo",
    category: "Luxury Jewelry",
    title: "Gold Diamond Ring Refinement",
    description:
      "Manual pen-tool background isolation, gold band surface scratch removal, and gemstone color enhancement.",

    beforeImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=85",

    afterImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=95"
  },
  {
    id: "shoe-static-demo",
    category: "E-Commerce Footwear",
    title: "Sneaker Edge Isolation Workflow",
    description:
      "Pixel-perfect clipping path to cleanly cut the shoe away from studio backdrops and casting noise.",

    beforeImage: "/images/sneaker-before.jpg",
    afterImage: "/images/sneaker-after.jpg",
  },
  {
    id: "portrait-static-demo",
    category: "Commercial Retouching",
    title: "Studio Headshot Micro-Retouching",
    description:
      "Professional retouching that preserves natural skin texture while improving the overall appearance.",
    beforeImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&auto=format&fit=crop&q=85",
    afterImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&auto=format&fit=crop&q=95"
  }
];



export default function ClippingPathShowcase() {
  return (
    <section className=" text-white py-20 border-b border-neutral-900">
      <Container>

        {/* Section Header Copy */}
        <div className="max-w-3xl mb-16 space-y-4 bg-[#F5F3FF]">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#123B40] border border-purple-500/20 px-3 py-1 text-xs text-white font-medium">
            <Scissors className="h-3.5 w-3.5" /> Premium Production Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#000]">
            Professional Image Clipping Path Services
          </h2>
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
            We utilize the industry-standard **Photoshop Pen Tool** to cleanly separate products from cluttered backgrounds. Increase your customer engagement and skyrocket digital sales with crisp visuals.
          </p>
        </div>

        {/* Dynamic Project Grid Loops */}
        <div className="space-y-24 bg-[#F5F3FF]">
          {clippingPathProjects.map((project, index) => (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
            >

              {/* Text Information Column (Alternates Sides Automatically) */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                <span className="text-xs font-bold uppercase tracking-widest text-[#000]">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-[#000]">
                  {project.title}
                </h3>
                <p className="text-[#000] text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Selling Points Sub-fragment */}
                <ul className="space-y-2.5 text-xs text-[#000] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> 100% Manual Pen Tool Execution (No AI artifacts)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> Crisp, clean vector anchor paths
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> Delivered with natural shadows or alpha channels
                  </li>
                </ul>
              </div>

              
              {/* Before & After Interactive Slider */}
              <div className="w-full rounded-xl">
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                />
              </div>
            

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
