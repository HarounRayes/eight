'use client';

import React from "react";

type Props = {
  size?: number;
  colors?: string[];
  label?: string;
  className?: string;
  borderWidth?: number;
  delay?: number;
  duration?: number;
};

export default function LoadingAnimation({
  size = 200,
  colors = ["#7c3aed", "#8b5cf6", "#a78bfa"],
  label = "Loading",
  className,
  borderWidth = 2,
  delay = 0.2,
  duration = 1.5,
}: Props) {
  const sizeValue = typeof size === "number" ? `${size}px` : size;
  const borderValue = `${borderWidth}px`;

  return (
    <div
      className={["la-container", className].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      aria-label={label}
      style={{
        ["--size" as any]: sizeValue,
        ["--border" as any]: borderValue,
        ["--delay" as any]: `${delay}s`,
        ["--duration" as any]: `${duration}s`,
      }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="la-circle"
          style={{
            borderColor: color,
            animationDelay: `calc(var(--delay) * ${index})`,
          }}
        />
      ))}

      <style jsx>{`
        .la-container {
          position: relative;
          width: var(--size);
          height: var(--size);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .la-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: var(--border) solid;
          animation: la-pulse var(--duration) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          opacity: 0;
          transform-origin: center;
        }

        @keyframes la-pulse {
          0% {
            transform: scale(0.3);
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}