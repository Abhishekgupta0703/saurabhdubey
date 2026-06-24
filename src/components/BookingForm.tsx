import { useState } from "react";
import { WHATSAPP_URL } from "./WhatsAppFloat";
import { CheckCircle2, Loader2 } from "lucide-react";

// Replace with the tutor's real address before launch.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/YOUR_EMAIL_HERE";

type FormState = {
  fullName: string;
  role: "Parent" | "Student";
  grade: string;
  email: string;
  whatsapp: string;
  country: string;
  currentCourse: string;
  timezone: string;
  consent: boolean;
};

const initial: FormState = {
  fullName: "",
  role: "Parent",
  grade: "",
  email: "",
  whatsapp: "",
  country: "USA",
  currentCourse: "",
  timezone: "",
  consent: true,
};

const GRADES = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const COURSES = [
  "Pre-Algebra", "Algebra I", "Algebra II", "Geometry", "Trigonometry",
  "Pre-Calculus", "AP Pre-Calculus", "AP Calculus AB", "AP Calculus BC",
  "Linear Algebra", "Multivariable Calculus", "SAT Math Prep", "ACT Math Prep", "Other",
];

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validate = (): string | null => {
    if (!data.fullName.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email.";
    if (!/^[+\d][\d\s().-]{6,}$/.test(data.whatsapp)) return "Please enter a valid WhatsApp number.";
    if (!data.grade) return "Please select a grade.";
    if (!data.currentCourse) return "Please select a math course.";
    if (!data.consent) return "Please agree to be contacted on WhatsApp.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Demo Request — ${data.fullName} (${data.grade})`,
          _template: "table",
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      setTimeout(() => { window.location.href = WHATSAPP_URL; }, 2500);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please WhatsApp us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-card p-10 text-center shadow-elegant border border-border animate-fade-up">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h3 className="mt-4 text-2xl font-semibold text-foreground">Thank you!</h3>
        <p className="mt-2 text-muted-foreground">
          I'll reach out shortly on WhatsApp. Redirecting you now…
        </p>
        <a
          href={WHATSAPP_URL}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-light transition-colors"
        >
          Open WhatsApp now
        </a>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition";
  const labelCls = "block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5";

  return (
    <form onSubmit={submit} className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`} noValidate>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className={labelCls}>Full Name</label>
        <input className={inputCls} value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Jane Smith" required />
      </div>
      <div>
        <label className={labelCls}>I am a</label>
        <select className={inputCls} value={data.role} onChange={(e) => update("role", e.target.value as FormState["role"])}>
          <option>Parent</option>
          <option>Student</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Grade</label>
        <select className={inputCls} value={data.grade} onChange={(e) => update("grade", e.target.value)} required>
          <option value="">Select grade…</option>
          {GRADES.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input type="email" className={inputCls} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" required />
      </div>
      <div>
        <label className={labelCls}>WhatsApp Number <span className="text-destructive">*</span></label>
        <input className={inputCls} value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="+1 555 123 4567" required />
      </div>
      <div>
        <label className={labelCls}>Country</label>
        <input className={inputCls} value={data.country} onChange={(e) => update("country", e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Current Math Course</label>
        <select className={inputCls} value={data.currentCourse} onChange={(e) => update("currentCourse", e.target.value)} required>
          <option value="">Select course…</option>
          {COURSES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className={labelCls}>Preferred Timezone (optional)</label>
        <input className={inputCls} value={data.timezone} onChange={(e) => update("timezone", e.target.value)} placeholder="e.g. EST, PST, CST" />
      </div>
      <label className={`flex items-start gap-2 text-sm text-muted-foreground ${compact ? "" : "md:col-span-2"}`}>
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--primary)]" checked={data.consent} onChange={(e) => update("consent", e.target.checked)} />
        <span>I agree to be contacted on WhatsApp regarding my free demo class.</span>
      </label>
      {error && <p className={`text-sm text-destructive ${compact ? "" : "md:col-span-2"}`}>{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary-light shadow-elegant transition-all disabled:opacity-60 ${compact ? "" : "md:col-span-2"}`}
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Reserve My Free Demo
      </button>
      <p className={`text-xs text-muted-foreground text-center ${compact ? "" : "md:col-span-2"}`}>
        No spam. Your details are used only to schedule your free demo class.
      </p>
    </form>
  );
}
