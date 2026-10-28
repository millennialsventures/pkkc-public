"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

type BlobConfig = {
  positionClass: string;
  colorClass: string;
  yRange: [number, number];
};

const blobConfigs: BlobConfig[] = [
  {
    positionClass: "top-0 left-[-10%] h-72 w-72",
    colorClass: "bg-pkkc-blue",
    yRange: [0, -80],
  },
  {
    positionClass: "top-1/3 right-[-10%] h-96 w-96",
    colorClass: "bg-pkkc-pink",
    yRange: [0, 100],
  },
  {
    positionClass: "bottom-0 left-1/4 h-64 w-64",
    colorClass: "bg-pkkc-orange",
    yRange: [0, -60],
  },
];

function Blob({
  blob,
  scrollYProgress,
  reduced,
}: {
  blob: BlobConfig;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const y = useTransform(scrollYProgress, [0, 1], blob.yRange);
  const baseClass = `absolute rounded-full opacity-20 blur-3xl ${blob.colorClass} ${blob.positionClass}`;

  if (reduced) {
    return <div aria-hidden="true" className={baseClass} />;
  }

  return <motion.div aria-hidden="true" style={{ y }} className={baseClass} />;
}

export function ParallaxBlobs({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      data-testid="parallax-blobs"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {blobConfigs.map((blob, i) => (
        <Blob key={i} blob={blob} scrollYProgress={scrollYProgress} reduced={reduced} />
      ))}
    </div>
  );
}
