import { useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Check,
  FileText,
  Headphones,
  Lock,
  ReceiptText,
  ScanLine,
  Sparkles,
  Upload,
} from "lucide-react";

import { ACCEPTED_MIMES, MAX_FILE_MB, SAMPLE_DOCS, setPendingScan } from "@/lib/janamitra";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JanaMitra AI — Government documents, made simple" },
      {
        name: "description",
        content:
          "Scan a government document, understand what matters in Telugu and English, compare fees and see the next steps in plain language.",
      },
      { property: "og:title", content: "JanaMitra AI — Government documents, made simple" },
      {
        property: "og:description",
        content:
          "Scan a government document, understand what matters in Telugu and English, compare fees and see the next steps in plain language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Features />
      <Steps />
      <Disclaimer />
    </>
  );
}

/* ------------------------------ Hero ------------------------------ */

function Hero() {
  const { t, pick, lang } = useI18n();

  return (
    <section className="hero-texture">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-16">
        <div className="animate-rise">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/80">
            <span className="size-2 rounded-full bg-gold" aria-hidden />
            {t("hero.kicker")}
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            {t("hero.title1")} {t("hero.title2")}
            <span className="block text-sage">{t("hero.title3")}</span>
          </h1>
          <p className="mt-4 font-display text-xl font-bold text-foreground/90">
            {lang === "en" ? "ప్రభుత్వ పత్రాలను సులభంగా అర్థం చేసుకోండి." : "Government documents, made simple."}
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{t("hero.body")}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {(["hero.point1", "hero.point2"] as const).map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Check className="size-4 text-sage" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <GetStartedCard />
      </div>
    </section>
  );
}

function GetStartedCard() {
  const { t, pick } = useI18n();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    if (!ACCEPTED_MIMES.includes(f.type)) {
      setError(t("card.fileType"));
      setFile(null);
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setError(t("card.fileTooBig"));
      setFile(null);
      return;
    }
    setError(null);
    setFile({ name: f.name, size: f.size });
    setPendingScan({ type: "upload", fileName: f.name, size: f.size, mime: f.type });
  };

  const trySample = (id: string) => {
    setPendingScan({ type: "sample", id });
    void navigate({ to: "/scan" });
  };

  return (
    <div className="animate-rise rounded-3xl border border-border/70 bg-card p-5 shadow-lift sm:p-6 lg:animate-float lg:[animation-delay:0.4s]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("card.kicker")}</p>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <Lock className="size-3.5 text-sage" aria-hidden />
          {t("card.private")}
        </p>
      </div>

      <h2 className="mt-3 font-display text-xl font-bold text-foreground">{t("card.title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("card.sub")}</p>

      <div
        className={cn(
          "mt-4 rounded-2xl border-2 border-dashed bg-secondary/40 p-5 text-center transition-colors",
          dragging ? "border-sage bg-sage-soft/60" : "border-border",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-card text-sage shadow-card">
          <Upload className="size-5" aria-hidden />
        </span>
        <p className="mt-3 text-sm font-semibold text-foreground">{pick({ en: t("card.dropEn"), te: t("card.dropTe") })}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/95"
          >
            <FileText className="size-4" aria-hidden />
            {t("card.pickFile")}
          </button>
          <button
            type="button"
            onClick={() => cameraInput.current?.click()}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Camera className="size-4" aria-hidden />
            {t("card.takePhoto")}
          </button>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">{t("card.formats")}</p>
        <p className="text-[11px] text-muted-foreground">{t("card.dropHere")}</p>

        <input
          ref={fileInput}
          type="file"
          className="hidden"
          accept={ACCEPTED_MIMES.join(",")}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <input
          ref={cameraInput}
          type="file"
          className="hidden"
          accept={ACCEPTED_MIMES.join(",")}
          capture="environment"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={!file}
        onClick={() => void navigate({ to: "/scan" })}
        className={cn(
          "mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors",
          file
            ? "bg-primary text-primary-foreground shadow-soft hover:bg-primary/95"
            : "cursor-not-allowed bg-sage/50 text-primary-foreground/70",
        )}
      >
        {t("card.continue")}
        <ArrowRight className="size-4" aria-hidden />
      </button>
      {file && (
        <p className="mt-2 truncate text-center text-xs text-muted-foreground">
          {t("card.selected")} {file.name}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("card.orSample")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <ul className="mt-2 divide-y divide-border/70">
        {SAMPLE_DOCS.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              onClick={() => trySample(doc.id)}
              className="group flex w-full items-center justify-between gap-3 py-3 text-left"
            >
              <span className="text-sm font-semibold text-foreground">{pick(doc.title)}</span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-sage" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <Sparkles className="size-3.5 text-gold" aria-hidden />
        {t("card.demoNote")}
      </p>
    </div>
  );
}

/* ---------------------------- Features ---------------------------- */

const FEATURES = [
  { icon: FileText, tKey: "features.1.t", dKey: "features.1.d", tone: "sage" },
  { icon: Headphones, tKey: "features.2.t", dKey: "features.2.d", tone: "gold" },
  { icon: ReceiptText, tKey: "features.3.t", dKey: "features.3.d", tone: "sage" },
  { icon: CalendarDays, tKey: "features.4.t", dKey: "features.4.d", tone: "gold" },
] as const;

function Features() {
  const { t } = useI18n();
  return (
    <section className="bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("features.kicker")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("features.title")}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground lg:pb-1 lg:text-right">{t("features.sub")}</p>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.tKey} className="card-lift bg-card p-6">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl",
                  f.tone === "sage" ? "bg-sage-soft text-forest" : "bg-gold-soft text-foreground",
                )}
              >
                <f.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">{t(f.tKey)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(f.dKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Steps ------------------------------ */

const STEPS = [
  { icon: Camera, tKey: "steps.1.t", dKey: "steps.1.d" },
  { icon: FileText, tKey: "steps.2.t", dKey: "steps.2.d" },
  { icon: ArrowRight, tKey: "steps.3.t", dKey: "steps.3.d" },
] as const;

function Steps() {
  const { t } = useI18n();
  return (
    <section className="bg-sage-soft/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("steps.kicker")}</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("steps.title")}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.tKey} className="border-l-2 border-primary/15 pl-5 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-5">
              <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-foreground">{t(s.tKey)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(s.dKey)}</p>
              <s.icon className="mt-4 size-5 text-sage" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Disclaimer() {
  const { t } = useI18n();
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-start gap-3 rounded-r-xl border-l-4 border-gold bg-gold-soft/60 px-5 py-4">
          <Lock className="mt-0.5 size-4 shrink-0 text-foreground/70" aria-hidden />
          <p className="text-sm text-foreground/90">
            <span className="font-bold">Independent assistance · </span>
            {t("disclaimer.text")}
          </p>
        </div>
      </div>
    </section>
  );
}
