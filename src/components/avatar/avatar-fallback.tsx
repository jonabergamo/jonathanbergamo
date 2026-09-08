import { cn } from "@/lib/utils";

/**
 * Flat SVG portrait in the brand palette. Used when WebGL is unavailable,
 * motion is reduced, or the device is low on resources, and as a small
 * portrait inside the About window.
 */
export function AvatarPortrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      role="img"
      aria-label="Jonathan, illustrated"
      className={cn("block", className)}
    >
      {/* jacket */}
      <path
        d="M30 220 C30 160 60 150 100 150 C140 150 170 160 170 220 Z"
        fill="#003049"
      />
      {/* sweater with stripes */}
      <clipPath id="sweater">
        <path d="M70 220 C70 170 80 155 100 152 C120 155 130 170 130 220 Z" />
      </clipPath>
      <g clipPath="url(#sweater)">
        <rect x="60" y="150" width="80" height="80" fill="#fdf0d5" />
        {[158, 174, 190, 206].map((y) => (
          <rect key={y} x="60" y={y} width="80" height="7" fill="#003049" />
        ))}
      </g>
      {/* neck */}
      <rect x="88" y="128" width="24" height="30" rx="8" fill="#f2c9a6" />
      {/* head */}
      <ellipse cx="100" cy="92" rx="46" ry="50" fill="#f2c9a6" />
      {/* hair */}
      <path
        d="M52 86 C50 40 80 30 100 32 C124 30 152 42 148 88 C140 72 130 66 118 70 C110 60 96 58 84 66 C72 62 60 70 52 86 Z"
        fill="#2a1f2e"
      />
      <path d="M60 78 C66 60 78 56 90 62 C84 70 78 78 74 88 Z" fill="#2a1f2e" />
      <path
        d="M140 78 C134 60 122 56 110 62 C116 70 122 78 126 88 Z"
        fill="#2a1f2e"
      />
      {/* ears + earring */}
      <circle cx="54" cy="96" r="7" fill="#f2c9a6" />
      <circle cx="146" cy="96" r="7" fill="#f2c9a6" />
      <circle
        cx="53"
        cy="105"
        r="3"
        fill="none"
        stroke="#fdf0d5"
        strokeWidth="2"
      />
      {/* glasses */}
      <circle
        cx="82"
        cy="98"
        r="15"
        fill="#669bbc"
        fillOpacity="0.25"
        stroke="#003049"
        strokeWidth="2.5"
      />
      <circle
        cx="118"
        cy="98"
        r="15"
        fill="#669bbc"
        fillOpacity="0.25"
        stroke="#003049"
        strokeWidth="2.5"
      />
      <path d="M97 98 L103 98" stroke="#003049" strokeWidth="2.5" />
      {/* eyes */}
      <circle cx="82" cy="99" r="3" fill="#003049" />
      <circle cx="118" cy="99" r="3" fill="#003049" />
      {/* stubble */}
      <path
        d="M78 122 C86 134 114 134 122 122 C116 128 84 128 78 122 Z"
        fill="#2a1f2e"
        fillOpacity="0.5"
      />
      {/* smile */}
      <path
        d="M90 118 Q100 126 110 118"
        fill="none"
        stroke="#780000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* blush */}
      <circle cx="70" cy="110" r="5" fill="#c1121f" fillOpacity="0.18" />
      <circle cx="130" cy="110" r="5" fill="#c1121f" fillOpacity="0.18" />
    </svg>
  );
}

export function AvatarFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex h-full w-full items-end justify-center", className)}
    >
      <AvatarPortrait className="h-[85%] w-auto max-w-full" />
    </div>
  );
}
