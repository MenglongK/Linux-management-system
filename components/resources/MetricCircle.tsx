
export function MetricCircle({
  label,
  percentage,
  total,
  colorStart,
  colorEnd
}: {
  label: string;
  percentage: number;
  total: string;
  colorStart: string;
  colorEnd: string;
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const id = `grad-${label.replace(/\s+/g, '')}`; // Unique ID for gradient

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 1. TOTAL SIZE (ABOVE) */}
      <div className="text-xs font-medium text-green-600 mb-2 uppercase tracking-wider">
        Total: {total}
      </div>

      {/* 2. THE CIRCLE */}
      <div className="relative w-65 h-65">
        {/* SVG Graphic */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Define Gradient */}
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>

          {/* Background Circle (Gray track) */}
          <circle
            cx="60" cy="60" r={radius}
            stroke="#f3f4f6" strokeWidth="10" fill="transparent"
          />

          {/* Progress Circle (Colored) */}
          <circle
            cx="60" cy="60" r={radius}
            stroke={`url(#${id})`}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* 3. INFO INSIDE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700">
          <span className="text-3xl font-bold">{percentage}%</span>
          <span className="text-xs text-gray-500 font-medium uppercase mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
}