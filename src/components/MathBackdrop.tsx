// Subtle floating math symbols backdrop. Pure decoration.
const SYMBOLS = ["∑", "π", "∫", "√", "Δ", "∞", "θ", "ƒ", "≈", "α", "x²", "÷"];

export function MathBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
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
    </div>
  );
}
