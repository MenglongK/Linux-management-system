// --- METRIC CIRCLE COMPONENT (Glassmorphism & Dark Mode) ---
export function MetricCircle({ 
  label, 
  percentage, 
  total, 
  colorStart, 
  colorEnd,
  icon 
}: { 
  label: string; 
  percentage: number; 
  total: string; 
  colorStart: string; 
  colorEnd: string;
  icon?: React.ReactNode; // Optional icon prop
}) {
  const radius = 55; // Slightly larger for better visibility
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const id = `grad-${label.replace(/\s+/g, '')}`; // Unique ID

  return (
    <div className="flex flex-col items-center group relative">
      
      {/* 1. TOTAL BADGE (Floating Top) */}
      <div className="mb-4 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm flex items-center gap-2 transition-all group-hover:scale-105">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Total
        </span>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
          {total}
        </span>
      </div>

      {/* 2. THE CIRCLE */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 drop-shadow-xl">
        {/* Background Glow (Optional subtle effect) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/0 group-hover:from-white/40 group-hover:to-transparent rounded-full transition-all duration-700 blur-2xl opacity-0 group-hover:opacity-100"></div>

        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
            {/* Soft Glow Filter */}
            <filter id={`shadow-${id}`}>
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={colorEnd} floodOpacity="0.4"/>
            </filter>
          </defs>

          {/* Background Track */}
          <circle 
            cx="70" cy="70" r={radius} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            className="text-slate-100 dark:text-slate-800/50" 
            strokeLinecap="round" 
          />

          {/* Progress Ring */}
          <circle
            cx="70" cy="70" r={radius}
            stroke={`url(#${id})`} 
            strokeWidth="8" 
            fill="transparent"
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            filter={`url(#shadow-${id})`}
          />
        </svg>

        {/* 3. CENTER DATA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Percentage */}
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white drop-shadow-sm">
              {Math.round(percentage)}
            </span>
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500 ml-1">%</span>
          </div>
          
          {/* Label & Icon */}
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {icon}
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}