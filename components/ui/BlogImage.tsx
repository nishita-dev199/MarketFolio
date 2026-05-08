"use client";

import { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  grayscale?: boolean;
  opacity?: number;
}

export default function BlogImage({ 
  src, 
  alt, 
  className = "", 
  fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23161427'/%3E%3C/svg%3E",
  grayscale = true,
  opacity = 100
}: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Sync state if src prop changes
  if (src !== imgSrc && !hasError) {
    setImgSrc(src);
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${grayscale ? 'grayscale group-hover:grayscale-0' : ''} transition-all duration-700`}
      style={{ 
        opacity: opacity / 100,
        display: 'block' 
      }}
      onError={() => {
        setImgSrc(fallback);
        setHasError(true);
      }}
    />
  );
}
