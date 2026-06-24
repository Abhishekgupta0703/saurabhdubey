// Animated math backdrop: floating symbols + equations that "solve" themselves.

const SYMBOLS = ["∑", "π", "∫", "√", "Δ", "∞", "θ", "ƒ", "≈", "α", "x²", "÷"];

// Each equation cycles through steps via CSS animation.
const EQUATIONS: { steps: string[]; top: string; left: string; delay: string }[] = [
  { steps: ["2x + 6 = 14", "2x = 8", "x = 4"], top: "8%", left: "6%", delay: "0s" },
  { steps: ["x² − 9 = 0", "x² = 9", "x = ±3"], top: "22%", left: "72%", delay: "1.2s" },
  { steps: ["sin²θ + cos²θ", "= 1"], top: "55%", left: "4%", delay: "2.4s" },
  { steps: ["∫ 2x dx", "= x² + C"], top: "70%", left: "68%", delay: "0.6s" },
  { steps: ["d/dx (x³)", "= 3x²"], top: "38%", left: "40%", delay: "1.8s" },
  { steps: ["a² + b² = c²", "3² + 4² = 5²"], top: "85%", left: "30%", delay: "3s" },
];

export function MathBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {SYMBOLS.map((s, i) => (
        <span
          key={`s-${i}`}
          className="float-symbol absolute font-display text-5xl md:text-7xl text-primary/10 select-none"
          style={{
            top: `${(i * 37) % 90}%`,
            left: `${(i * 53) % 92}%`,
            animationDelay: `${(i % 6) * 0.7}s`,
          }}
        >
          {s}
        </span>
      ))}

      {EQUATIONS.map((eq, i) => (
        <div
          key={`eq-${i}`}
          className="equation-card absolute font-display text-sm md:text-base text-primary/40 select-none whitespace-nowrap rounded-lg border border-primary/10 bg-primary/5 px-3 py-1.5 backdrop-blur-[2px]"
          style={{ top: eq.top, left: eq.left, animationDelay: eq.delay }}
        >
          {eq.steps.map((step, j) => (
            <span
              key={j}
              className="equation-step block"
              style={{
                animationDelay: `calc(${eq.delay} + ${j * 2}s)`,
                animationDuration: `${eq.steps.length * 2}s`,
              }}
            >
              {step}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
