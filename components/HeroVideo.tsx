"use client";

import { useState } from 'react';
import ProductionImage from './ProductionImage';

interface HeroVideoProps {
  videoSrc: string;
  fallbackImageSrc: string;
  fallbackImageAlt: string;
}

export default function HeroVideo({ videoSrc, fallbackImageSrc, fallbackImageAlt }: HeroVideoProps) {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (videoError) {
    // Show fallback image if video fails to load
    return (
      <ProductionImage
        src={fallbackImageSrc}
        alt={fallbackImageAlt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    );
  }

  return (
    <video
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={fallbackImageSrc}
      onError={handleVideoError}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
