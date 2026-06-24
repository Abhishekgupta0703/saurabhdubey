import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award, Sparkles, MessageCircle, Calendar, Target, TrendingUp, Clock,
  CheckCircle2, ChevronDown, GraduationCap, BookOpen, Brain, Users,
} from "lucide-react";
import tutorImg from "@/assets/tutor.jpg";
import { MathBackdrop } from "@/components/MathBackdrop";
import { WhatsAppFloat, WHATSAPP_URL } from "@/components/WhatsAppFloat";
import { BookingForm } from "@/components/BookingForm";
import { AssessmentModal } from "@/components/AssessmentModal";
import { DemoPopup } from "@/components/DemoPopup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saurabh Dubey – Online Math Tutor for USA Middle & High School" },
      { name: "description", content: "Personalized 1:1 online math tutoring for USA students: Algebra, Geometry, AP Calculus, SAT/ACT prep. 7+ years experience. Book your free demo class." },
      { property: "og:title", content: "Saurabh Dubey – Online Math Tutor" },
      { property: "og:description", content: "1:1 online math tutoring for USA middle & high school students. Concept-based teaching, exam prep, flexible scheduling. Book a free demo." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Saurabh Dubey",
          jobTitle: "Online Math Tutor",
          description: "Online math tutor for USA middle and high school students.",
          knowsAbout: ["Algebra", "Geometry", "Trigonometry", "Calculus", "SAT Math", "ACT Math"],
          contactPoint: { "@type": "ContactPoint", telephone: "+91-75258-71717", contactType: "Customer Service" },
        }),
      },
    ],
  }),
  component: Home,
});

const COURSES = [
  { name: "Algebra I", desc: "Build the foundation: equations, functions, linear systems." },
  { name: "Algebra II", desc: "Polynomials, exponentials, logarithms, and conic sections." },
  { name: "Geometry", desc: "Proofs, transformations, and coordinate geometry mastery." },
  { name: "Trigonometry", desc: "Identities, equations, and real-world applications." },
  { name: "Pre-Calculus", desc: "Bridge to calculus: limits, functions, sequences." },
  { name: "AP Pre-Calculus", desc: "Full AP curriculum with practice and pacing." },
  { name: "AP Calculus AB", desc: "Limits, derivatives, integrals — score 4 or 5." },
  { name: "AP Calculus BC", desc: "Series, parametric, polar — built for top scores." },
  { name: "Linear Algebra", desc: "Vectors, matrices, eigenvalues for college courses." },
  { name: "Multivariable Calculus", desc: "Partial derivatives, multiple integrals, vector fields." },
  { name: "SAT Math Prep", desc: "Strategies, drills, and timed practice for top scores." },
  { name: "ACT Math Prep", desc: "Pacing, shortcuts, and full-length section tests." },
];

const REASONS = [
  { icon: Award, title: "7 Years Experience", desc: "Thousands of hours teaching USA students." },
  { icon: Brain, title: "Concept-Based Teaching", desc: "Build deep understanding, not memorization." },
  { icon: Users, title: "Personalized Classes", desc: "Pace and plan tailored to each student." },
  { icon: Target, title: "Exam Preparation", desc: "AP, SAT, ACT — structured prep that delivers." },
  { icon: MessageCircle, title: "Doubt Solving", desc: "Quick clarifications between sessions." },
  { icon: TrendingUp, title: "Consistent Improvement", desc: "Weekly progress checks and feedback." },
];

const STATS = [
  { value: "7+", label: "Years Teaching" },
  { value: "1000+", label: "Classes Delivered" },
  { value: "USA", label: "Students Worldwide" },
  { value: "24/7", label: "Flexible Timing" },
];

const STEPS = [
  { n: "01", t: "Free Demo", d: "Meet, share goals, see the teaching style." },
  { n: "02", t: "Skill Assessment", d: "Identify strengths and concept gaps." },
  { n: "03", t: "Personalized Plan", d: "A custom roadmap built around your child." },
  { n: "04", t: "Weekly Progress", d: "Continuous practice, feedback, and review." },
];

const TESTIMONIALS = [
  { name: "Jennifer M.", role: "Parent of 10th grader", course: "Algebra II", quote: "My daughter went from a C+ to an A in one semester. Saurabh explains concepts so clearly that she actually enjoys math now." },
  { name: "David R.", role: "Parent of 12th grader", course: "AP Calculus BC", quote: "Scored a 5 on the AP exam. The structured pacing and weekly mock tests made a huge difference." },
  { name: "Priya S.", role: "Parent of 8th grader", course: "Pre-Algebra", quote: "Patient, kind, and incredibly knowledgeable. The personalized plan helped my son catch up and get ahead." },
  { name: "Michael T.", role: "Parent of 11th grader", course: "SAT Math Prep", quote: "Went from 620 to 760 in three months. The strategies are gold." },
];

const FAQS = [
  { q: "Do you teach USA curriculum?", a: "Yes — I specialize in USA middle and high school math (Common Core aligned) including all standard courses from Pre-Algebra through Multivariable Calculus." },
  { q: "Do you teach AP classes?", a: "Absolutely. I teach AP Pre-Calculus, AP Calculus AB, and AP Calculus BC with full curriculum coverage and exam-style practice." },
  { q: "How are classes conducted?", a: "Classes are 1:1 over Zoom with a digital whiteboard. Recordings and notes are shared after each session." },
  { q: "Do you provide homework help?", a: "Yes — students can send doubts on WhatsApp between sessions, and we cover school homework as part of the plan." },
  { q: "Do you teach SAT/ACT?", a: "Yes — dedicated SAT Math and ACT Math prep with strategies, full-length sections, and timed practice." },
];

function Home() {
  const [assessOpen, setAssessOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WhatsAppFloat />
      <DemoPopup />
      <AssessmentModal open={assessOpen} onClose={() => setAssessOpen(false)} />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display font-bold">SD</div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-foreground">Saurabh Dubey</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Online Math Tutor</div>
            </div>
          </a>
          <nav className="hidden md:flex gap-7 text-sm text-muted-foreground">
            <a href="#courses" className="hover:text-foreground">Courses</a>
            <a href="#why" className="hover:text-foreground">Why Me</a>
            <a href="#how" className="hover:text-foreground">How It Works</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <a href="#book" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-light transition">
            Book Free Demo
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 math-grid-bg opacity-60" aria-hidden />
        <MathBackdrop />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Trusted by USA Families
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.05] text-foreground">
              Helping Middle & High School Students <span className="text-gradient-gold">Excel in Math</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Personalized online math classes for USA students with concept clarity, problem solving and exam confidence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-elegant hover:bg-primary-light transition">
                <Calendar className="h-4 w-4" /> Book Free Demo
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 font-semibold text-foreground hover:bg-accent transition">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            {/* Lead magnet */}
            <button
              onClick={() => setAssessOpen(true)}
              className="mt-6 group inline-flex items-center gap-3 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent px-4 py-3 text-left hover:border-gold/60 transition"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold/20 text-gold">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Free Math Assessment (5 questions)</div>
                <div className="text-xs text-muted-foreground">Find your child's level in 2 minutes →</div>
              </div>
            </button>
          </div>

          {/* Tutor card */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 to-gold/15 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl bg-card border border-border shadow-elegant overflow-hidden">
              <img
                src={tutorImg}
                alt="Saurabh Dubey, online math tutor"
                width={896}
                height={1152}
                className="w-full h-[420px] object-cover object-top"
              />
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground shadow-gold">
                <Award className="h-3.5 w-3.5" /> 7+ Years
              </div>
              <div className="p-5">
                <div className="font-display text-xl font-semibold text-foreground">Saurabh Dubey</div>
                <div className="text-sm text-muted-foreground">Math Educator · USA Curriculum Specialist</div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: "⭐", t: "Personalized" },
                    { icon: "💡", t: "Concept-Based" },
                    { icon: "🕒", t: "Flexible" },
                  ].map((c) => (
                    <div key={c.t} className="rounded-xl bg-muted/60 px-2 py-3 text-center">
                      <div className="text-xl">{c.icon}</div>
                      <div className="mt-1 text-[11px] font-semibold text-foreground">{c.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="relative py-20 md:py-28 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 math-dot-bg opacity-40" aria-hidden />
        <MathBackdrop className="opacity-70" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Courses" title="Subjects I Teach" sub="Full coverage from middle school to advanced high school and AP." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.map((c) => (
              <div key={c.name} className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/50 hover:shadow-elegant transition-all">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{c.name}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
                <a href="#book" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light">
                  Schedule Demo <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="relative py-20 md:py-28 overflow-hidden">
        <MathBackdrop className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Why Choose Me" title="A teaching style parents trust" sub="Built around how students actually learn — and how exams actually test." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-elegant transition">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-gold">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="animate-count-pulse rounded-2xl gradient-hero p-6 text-center text-primary-foreground shadow-elegant">
                <div className="font-display text-4xl md:text-5xl font-bold text-gold">{s.value}</div>
                <div className="mt-1 text-sm font-medium opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="relative py-20 md:py-28 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 math-grid-bg opacity-50" aria-hidden />
        <MathBackdrop className="opacity-70" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="How Classes Work" title="A simple, structured path to results" />
          <div className="mt-12 grid md:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative rounded-2xl bg-card border border-border p-6">
                <div className="font-display text-5xl font-bold text-gold/30">{s.n}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                {i < STEPS.length - 1 && (
                  <div aria-hidden className="hidden md:block absolute top-1/2 -right-3 h-px w-6 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <MathBackdrop className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Parents & Students" title="What families are saying" />
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-card border border-border p-7 shadow-elegant">
                <div className="text-3xl text-gold leading-none">"</div>
                <blockquote className="mt-2 text-foreground leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.course}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="relative py-20 md:py-28 gradient-hero text-primary-foreground overflow-hidden">
        <MathBackdrop className="opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            <Calendar className="h-3.5 w-3.5" /> Free Demo Class
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">Book your free demo today</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">
            Tell me about your student. I'll personally reach out on WhatsApp to schedule a time that works.
          </p>
        </div>
        <div className="relative mx-auto mt-10 max-w-2xl px-4">
          <div className="rounded-3xl bg-card text-card-foreground p-6 md:p-10 shadow-elegant border border-border">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20 md:py-28 overflow-hidden">
        <MathBackdrop className="opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-foreground">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <div className="px-6 pb-5 text-muted-foreground">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-gold-foreground font-display font-bold">SD</div>
              <div>
                <div className="font-display font-semibold">Saurabh Dubey</div>
                <div className="text-xs uppercase tracking-wider opacity-80">Online Math Tutor</div>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-85 max-w-xs">
              Helping USA middle & high school students master math with personalized, concept-based teaching.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold">Contact</div>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              <li>WhatsApp: <a href={WHATSAPP_URL} className="underline-offset-4 hover:underline">+91 75258 71717</a></li>
              <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-gold" /> Free Demo Available</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold">Links</div>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              <li><a href="#book" className="hover:underline underline-offset-4">Book Free Demo</a></li>
              <li><a href="#courses" className="hover:underline underline-offset-4">Courses</a></li>
              <li><a href="#faq" className="hover:underline underline-offset-4">FAQ</a></li>
              <li><a href="#privacy" className="hover:underline underline-offset-4">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs opacity-75">
            <div>© {new Date().getFullYear()} Saurabh Dubey · Online Math Tutor</div>
            <div className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> Built for USA students</div>
          </div>
        </div>
      </footer>

      {/* Analytics placeholder — replace with your script */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" /> */}
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
        <Clock className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
