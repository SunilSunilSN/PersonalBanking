import React from "react";

export function Avatar({ src, alt, size = "md" }) {
  const sizeClass = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-16 h-16" : "w-10 h-10";
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sizeClass}`}
    />
  );
}