import { cn } from "@/lib/utils";

/**
 * Code-only wave backgrounds for the top band of each card.
 * The artwork is drawn for a wide, short canvas and scaled uniformly
 * (no stretching) with `preserveAspectRatio="slice"`.
 */
const WAVES = {
  deepBlue: (
    <>
      <defs>
        <linearGradient id="wave-deep-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1526" />
          <stop offset="100%" stopColor="#1c3252" />
        </linearGradient>
      </defs>
      <rect width="800" height="160" fill="url(#wave-deep-blue)" />
      <path d="M0 0 C180 70 420 100 800 28 L800 0 Z" fill="#1b3151" opacity=".95" />
      <path d="M0 0 C140 92 400 120 800 58 L800 22 C420 86 160 56 0 0 Z" fill="#223d61" opacity=".85" />
      <path d="M0 12 C90 122 360 142 800 78 L800 108 C380 154 120 122 0 42 Z" fill="#162b48" opacity=".8" />
      <path d="M0 0 C180 70 420 100 800 28" fill="none" stroke="#3c5e8c" strokeWidth="1.2" opacity=".4" />
      <path d="M0 0 C140 92 400 120 800 58" fill="none" stroke="#3c5e8c" strokeWidth="1.2" opacity=".3" />
    </>
  ),

  teal: (
    <>
      <defs>
        <linearGradient id="wave-teal" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#063a35" />
          <stop offset="100%" stopColor="#0d6154" />
        </linearGradient>
      </defs>
      <rect width="800" height="160" fill="url(#wave-teal)" />
      <ellipse cx="400" cy="-120" rx="290" ry="205" fill="#117664" opacity=".9" />
      <path d="M0 38 C240 112 540 116 800 32 L800 0 C540 70 250 66 0 2 Z" fill="#0a4e45" opacity=".75" />
      <path d="M0 78 C260 148 560 148 800 66 L800 104 C560 166 260 166 0 106 Z" fill="#0e5c50" opacity=".6" />
      <path d="M0 38 C240 112 540 116 800 32" fill="none" stroke="#2a9c86" strokeWidth="1.2" opacity=".4" />
      <path d="M0 78 C260 148 560 148 800 66" fill="none" stroke="#2a9c86" strokeWidth="1.2" opacity=".25" />
    </>
  ),

  blue: (
    <>
      <defs>
        <linearGradient id="wave-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e4fb0" />
          <stop offset="100%" stopColor="#3c77d8" />
        </linearGradient>
      </defs>
      <rect width="800" height="160" fill="url(#wave-blue)" />
      <circle cx="660" cy="-90" r="215" fill="#588ee4" opacity=".55" />
      <circle cx="190" cy="235" r="185" fill="#5b90e6" opacity=".55" />
      <path d="M0 138 C180 100 380 92 560 126 C660 146 740 150 800 134 L800 160 L0 160 Z" fill="#2d66c9" opacity=".6" />
      <path d="M0 138 C180 100 380 92 560 126 C660 146 740 150 800 134" fill="none" stroke="#8ab4f0" strokeWidth="1.2" opacity=".35" />
    </>
  ),

  brown: (
    <>
      <defs>
        <linearGradient id="wave-brown" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#5a4038" />
          <stop offset="100%" stopColor="#78594c" />
        </linearGradient>
      </defs>
      <rect width="800" height="160" fill="url(#wave-brown)" />
      {[22, 52, 82, 112, 142].map((y, index) => (
        <path
          key={y}
          d={`M-20 ${y} C150 ${y - 22} 310 ${y + 28} 510 ${y + 6} S750 ${y - 12} 820 ${y + 8}`}
          fill="none"
          stroke="#a48676"
          strokeWidth="1.4"
          opacity={0.18 + index * 0.04}
        />
      ))}
    </>
  ),
};

const WaveBackground = ({ variant, className }) => (
  <svg
    aria-hidden="true"
    className={cn("absolute inset-x-0 top-0 h-full w-full", className)}
    viewBox="0 0 800 160"
    preserveAspectRatio="xMidYMid slice"
  >
    {WAVES[variant]}
  </svg>
);

export default WaveBackground;
