"use client";

import Image from "next/image";
import { useState } from "react";

interface FlipCardProps {
  frontImage: string;
  backImage: string;
  alt: string;
  size?: number;
}

export function FlipCard({ frontImage, backImage, alt, size = 192 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flip-card-container"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="flip-card-front">
          <Image
            src={frontImage}
            alt={alt}
            width={size}
            height={size}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back">
          <Image
            src={backImage}
            alt={`${alt} - animated`}
            width={size}
            height={size}
            className="w-full h-full object-contain scale-150"
            unoptimized
          />
        </div>
      </div>

      <style jsx>{`
        .flip-card-container {
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        }
      `}</style>
    </div>
  );
}
