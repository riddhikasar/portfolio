import React from "react";

export default function Arrow({
  size = "1em",
  className,
  style,
  strokeWidth = 1.8,
}: {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}) {
  // Inline SVG arrow (NE direction). Uses currentColor so it inherits text color.
  const resolvedSize = typeof size === "number" ? `${size}px` : size;
  const svgStyle: React.CSSProperties = {
    width: style?.width ?? resolvedSize,
    height: style?.height ?? resolvedSize,
    ...style,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={svgStyle}
      aria-hidden
      focusable={false}
    >
      {/* Shaft */}
      <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="butt" strokeLinejoin="miter" />
      {/* Arrow head: horizontal and vertical caps to form a corner head */}
      <polyline points="8.5,4 20,4 20,15.5" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}
