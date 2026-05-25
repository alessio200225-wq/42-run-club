import React from "react";

interface Logo42Props {
  size?: number;        // hauteur de base en px
  className?: string;
  showGlow?: boolean;
}

export default function Logo42({ size = 200, className = "", showGlow = false }: Logo42Props) {
  const id = "logo42-glow";
  return (
    <svg
      viewBox="0 0 400 340"
      width={size}
      height={size * (340 / 400)}
      className={className}
      aria-label="42 Run Club"
      role="img"
      style={{ overflow: "visible" }}
    >
      {showGlow && (
        <defs>
          <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feFlood floodColor="#E91E8C" floodOpacity="0.55" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* "42" — bold condensed italic */}
      <text
        x="200"
        y="250"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="280"
        fill="white"
        filter={showGlow ? `url(#${id})` : undefined}
        style={{ letterSpacing: "-8px" }}
      >
        42
      </text>

      {/* "RUN CLUB" */}
      <text
        x="200"
        y="330"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
        fontWeight="700"
        fontSize="52"
        fill="white"
        style={{ letterSpacing: "10px" }}
      >
        RUN CLUB
      </text>
    </svg>
  );
}
