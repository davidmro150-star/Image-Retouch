// src/components/ui/BeforeAfterSlider.jsx
"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";


export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "Retouched",
}) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Handle analytical tracking calculations for position adjustment
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    // Constraint boundary safety locks
    if (position < 0) setSliderPosition(0);
    else if (position > 100) setSliderPosition(100);
    else setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Safe global mouse up listener attachment to prevent slider sticking issues
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden select-none bg-neutral-100 border border-neutral-200/60 shadow-md group"
      onMouseDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Target After/Retouched Image Layer Base */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="Retouched processing outcome view"
          fill
          sizes="(max-w-7xl) 100vw, 80vw"
          className="object-cover"
          priority
        />
        <span className="absolute bottom-4 right-4 z-10 rounded-md bg-neutral-950/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm tracking-wide">
          {afterLabel}
        </span>
      </div>

      {/* Target Before/Original Image Overlay Slice Layer */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75 ease-out"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeImage}
          alt="Original unedited asset view"
          fill
          sizes="(max-w-7xl) 100vw, 80vw"
          className="object-cover"
          priority
        />
        <span className="absolute bottom-4 left-4 z-10 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-900 shadow-sm tracking-wide">
          {beforeLabel}
        </span>
      </div>

      {/* Visual Intersecting Handle Line Element */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-ew-resize transition-all duration-75 ease-out"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Interactive Center Hub Button Badge indicator */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-neutral-950 shadow-xl flex items-center justify-center border border-neutral-200 group-hover:scale-110 transition-transform cursor-ew-resize">
          <div className="flex gap-0.5 items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors">
            <span className="text-[10px] font-bold">◀</span>
            <span className="text-[10px] font-bold">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
