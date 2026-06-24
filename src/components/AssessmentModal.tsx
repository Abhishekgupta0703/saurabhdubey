import { useState } from "react";
import { WHATSAPP_URL } from "./WhatsAppFloat";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

type Question = { q: string; options: string[]; answer: number };

const QUESTIONS: Question[] = [
  { q: "Solve for x: 2x + 5 = 17", options: ["4", "6", "8", "12"], answer: 1 },
  { q: "What is the slope of y = 3x − 4?", options: ["−4", "3", "−3", "4"], answer: 1 },
  { q: "Area of a circle with radius 5? (use π ≈ 3.14)", options: ["31.4", "78.5", "15.7", "25"], answer: 1 },
  { q: "Simplify: (x²)(x³)", options: ["x⁵", "x⁶", "x", "2x⁵"], answer: 0 },
  { q: "sin(30°) equals", options: ["1", "√3/2", "1/2", "0"], answer: 2 },
];

export function AssessmentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [name, setName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const reset = () => {
    setStep(0); setAnswers([]); setWhatsapp(""); setName(""); setShowResults(false); setSubmitted(false);
  };

  const close = () => { reset(); onClose(); };

  const pick = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(step + 1); // move to gate
  };

  const score = answers.reduce((s, a, idx) => s + (a === QUESTIONS[idx].answer ? 1 : 0), 0);

  const submitGate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[+\d][\d\s().-]{6,}$/.test(whatsapp)) return;
    setSubmitted(true);
    // Fire-and-forget lead capture
    fetch("https://formsubmit.co/ajax/YOUR_EMAIL_HERE", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Assessment Lead — ${name} (${score}/5)`,
        name, whatsapp, score, answers: answers.join(","),
      }),
    }).catch(() => {});
    setShowResults(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4 animate-fade-up">
      <div className="relative w-full max-w-lg rounded-2xl bg-card p-6 md:p-8 shadow-elegant border border-border">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>

        {!showResults && step < QUESTIONS.length && (
          <>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-4 w-4" /> Free 5-Question Assessment
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Question {step + 1} of {QUESTIONS.length}</h3>
              <span className="text-sm text-muted-foreground">{Math.round(((step) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
            </div>
            <p className="mt-6 text-lg font-medium text-foreground">{QUESTIONS[step].q}</p>
            <div className="mt-4 grid gap-2">
              {QUESTIONS[step].options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-left text-foreground hover:border-primary hover:bg-accent transition-colors"
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}

        {!showResults && step === QUESTIONS.length && (
          <form onSubmit={submitGate}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-4 w-4" /> One last step
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-foreground">See your results</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your WhatsApp and we'll share your score plus a personalized study tip.
            </p>
            <div className="mt-5 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                required
              />
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp Number (e.g. +1 555 123 4567)"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                required
              />
              <button
                type="submit"
                disabled={submitted}
                className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-light shadow-elegant transition-all disabled:opacity-60"
              >
                {submitted ? "Loading…" : "Show My Results"}
              </button>
            </div>
          </form>
        )}

        {showResults && (
          <div className="text-center">
            <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Your Assessment Score
            </div>
            <div className="text-5xl font-display font-bold text-primary">{score}<span className="text-2xl text-muted-foreground">/5</span></div>
            <p className="mt-2 text-muted-foreground">
              {score >= 4 ? "Excellent! You're ready for advanced topics." :
               score >= 2 ? "Solid start — a few concepts can unlock a lot more." :
               "Great that you tried! A guided plan will help you accelerate fast."}
            </p>
            <div className="mt-5 grid gap-2 text-left">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  {answers[i] === q.answer
                    ? <CheckCircle2 className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" />
                    : <XCircle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />}
                  <span className="text-foreground">{q.q} <span className="text-muted-foreground">— Answer: {q.options[q.answer]}</span></span>
                </div>
              ))}
            </div>
            <a
              href={WHATSAPP_URL}
              className="mt-6 inline-flex items-center justify-center w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-light shadow-elegant"
            >
              Discuss My Results on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
