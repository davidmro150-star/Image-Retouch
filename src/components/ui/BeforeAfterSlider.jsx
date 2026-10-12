
"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;

    const nextPosition = ((clientX - rect.left) / rect.width) * 100;

    setPosition(Math.max(0, Math.min(100, nextPosition)));
  };

  const startDrag = (event) => {
    event.preventDefault();
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const moveDrag = (event) => {
    if (!dragging.current) return;
    updatePosition(event.clientX);
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 select-none"
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      style={{ touchAction: "pan-y", cursor: "ew-resize" }}
    >
      {/* AFTER: Full background image */}
      <Image
        src={afterImage}
        alt="After editing"
        fill
        unoptimized
        draggable={false}
        className="pointer-events-none object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* BEFORE: Revealed only on the left side */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt="Before editing"
          fill
          unoptimized
          draggable={false}
          className="pointer-events-none object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-1 bg-white"
        style={{
          left: `${ position }% `,
          transform: "translateX(-50%)",
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-lg text-white shadow-lg">
          ↔
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded bg-black/70 px-3 py-1 text-xs font-bold text-white">
        BEFORE
      </span>

      <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded bg-black/70 px-3 py-1 text-xs font-bold text-white">
        AFTER
      </span>
    </div>
  );
}
