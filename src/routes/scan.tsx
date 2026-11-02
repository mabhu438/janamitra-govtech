import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileText,
  Loader2,
  Lock,
  MessageCircle,
  ReceiptText,
  Save,
  ScanLine,
  Sparkles,
} from "lucide-react";

import {
  getPendingScan,
  getSampleDoc,
  loadSavedDocs,
  persistSavedDocs,
  type PendingScan,
  type SampleDoc,
} from "@/lib/janamitra";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan a document — JanaMitra AI" },
      { name: "description", content: "Review a scanned document's key facts, dates and next steps in plain language." },
      { property: "og:title", content: "Scan a document — JanaMitra AI" },
      { property: "og:description", content: "Review a scanned document's key facts, dates and next steps in plain language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScanPage,
});

type Status = "loading" | "sample" | "upload" | "empty";

function ScanPage() {
  const { t, pick } = useI18n();
  const [status, setStatus] = useState<Status>("loading");
  const [doc, setDoc] = useState<SampleDoc | null>(null);
  const [upload, setUpload] = useState<Extract<PendingScan, { type: "upload" }> | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const scan = getPendingScan();
    if (!scan) {
      setStatus("empty");
      return;
    }
    setStatus("loading");
    const timer = window.setTimeout(() => {
      if (scan.type === "sample") {
        const d = getSampleDoc(scan.id);
        if (!d) {
          setStatus("empty");
        } else {
          setDoc(d);
          setStatus("sample");
        }
      } else {
        setUpload(scan);
        setStatus("upload");
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const saveDoc = () => {
    if (!doc && !upload) return;
    const entry =
      doc
        ? {
            id: `jm-${Date.now()}`,
            title: pick(doc.title),
            fileName: doc.refNo,
            size: 0,
            mime: "text/plain",
            createdAt: Date.now(),
            note: "sample",
          }
        : {
            id: `jm-${Date.now()}`,
            title: upload!.fileName,
            fileName: upload!.fileName,
            size: upload!.size,
            mime: upload!.mime,
            createdAt: Date.now(),
            note: "upload",
          };
    const docs = loadSavedDocs();
    persistSavedDocs([entry, ...docs]);
    setSaved(true);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("scan.kicker")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("scan.title")}</h1>

      {status === "loading" && (
        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-card" role="status" aria-live="polite">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Loader2 className="size-4 animate-spin text-sage" aria-hidden />
            {t("scan.loading")}
          </p>
          <div className="mt-5 space-y-3">
            {[80, 60, 70, 45].map((w, i) => (
              <div key={i} className="h-4 animate-pulse rounded-full bg-secondary" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      )}

      {status === "sample" && doc && (
        <div className="mt-8 space-y-5 animate-fade">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground">
                {t("card.sample")}
              </span>
              <span className="text-xs text-muted-foreground">{pick(doc.dept)}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">{pick(doc.title)}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("scan.resultSub")} · {doc.refNo}
            </p>

            <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("scan.factsTitle")}</h3>
            <dl className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/50 sm:grid-cols-2">
              {doc.facts.map((fact) => (
                <div key={fact.key} className="bg-card px-4 py-3">
                  <dt className="text-xs text-muted-foreground">{pick(fact.label)}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-foreground">{pick(fact.value)}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("scan.tipsTitle")}</h3>
            <ul className="mt-3 space-y-2">
              {doc.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
                  {pick(tip)}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/ask"
              search={{ doc: doc.id }}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/95"
            >
              <MessageCircle className="size-4" aria-hidden />
              {t("scan.ask")}
            </Link>
            {doc.fee != null && (
              <Link
                to="/feeguard"
                search={{ shown: doc.fee }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <ReceiptText className="size-4" aria-hidden />
                {t("scan.compare")}
              </Link>
            )}
            <button
              type="button"
              onClick={saveDoc}
              disabled={saved}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
                saved ? "cursor-default border-border bg-secondary text-muted-foreground" : "border-border bg-card text-foreground hover:bg-secondary",
              )}
            >
              <Save className="size-4" aria-hidden />
              {saved ? t("scan.saved") : t("scan.save")}
            </button>
          </div>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-gold" aria-hidden />
            {t("card.demoNote")}
          </p>
        </div>
      )}

      {status === "upload" && upload && (
        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-card animate-fade">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage-soft text-forest">
              <FileText className="size-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground">
                {t("scan.reviewBadge")}
              </span>
              <h2 className="mt-2 truncate font-display text-xl font-bold text-foreground">{upload.fileName}</h2>
              <p className="text-xs text-muted-foreground">
                {t("scan.fileInfo")} · {Math.max(1, Math.round(upload.size / 1024))} KB
              </p>
            </div>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-sm text-foreground/90">
            <Lock className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
            {t("scan.upload.note")}
          </p>
          <button
            type="button"
            onClick={saveDoc}
            disabled={saved}
            className={cn(
              "mt-5 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              saved ? "cursor-default bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground shadow-soft hover:bg-primary/95",
            )}
          >
            <Save className="size-4" aria-hidden />
            {saved ? t("scan.saved") : t("scan.save")}
          </button>
        </div>
      )}

      {status === "empty" && (
        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-8 text-center shadow-card animate-fade">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-muted-foreground">
            <ScanLine className="size-6" aria-hidden />
          </span>
          <p className="mt-4 text-sm font-semibold text-foreground">{t("scan.missing")}</p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/95"
          >
            {t("scan.pickTitle")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
