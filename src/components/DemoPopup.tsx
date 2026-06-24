import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, X, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "./WhatsAppFloat";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/YOUR_EMAIL_HERE";
const STORAGE_KEY = "sd_demo_popup_shown";
const DELAY_MS = 12000;

export function DemoPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name.");
    if (!/^[+\d][\d\s().-]{6,}$/.test(whatsapp)) return setError("Please enter a valid WhatsApp number.");
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Quick Demo Request — ${name}`,
          _template: "table",
          source: "Auto Popup",
          name,
          whatsapp,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => { window.location.href = WHATSAPP_URL; }, 2200);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please WhatsApp us directly.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-up">
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-border shadow-elegant overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="gradient-hero p-6 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Limited Free Slots
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
            Book your <span className="text-gold">free demo class</span>
          </h3>
          <p className="mt-1 text-sm text-primary-foreground/85">
            Just your name & WhatsApp — I'll personally reach out to schedule.
          </p>
        </div>

        <div className="p-6">
          {status === "success" ? (
            <div className="py-4 text-center animate-fade-up">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
              <h4 className="mt-3 text-lg font-semibold text-foreground">Thank you, {name.split(" ")[0]}!</h4>
              <p className="mt-1 text-sm text-muted-foreground">Opening WhatsApp now…</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3" noValidate>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Your Name</label>
                <input
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                  WhatsApp Number <span className="text-destructive">*</span>
                </label>
                <input
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+1 555 123 4567"
                  inputMode="tel"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-light shadow-elegant transition disabled:opacity-60"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                Book My Free Demo
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Maybe later
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
