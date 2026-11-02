import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, Scale, TrendingDown, TrendingUp } from "lucide-react";

import { compareFees, formatINR, type FeeVerdict } from "@/lib/janamitra";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/feeguard")({
  validateSearch: (search: Record<string, unknown>) => ({
    shown: typeof search.shown === "number" ? search.shown : undefined,
  }),
  head: () => ({
    meta: [
      { title: "FeeGuard — Compare a fee — JanaMitra AI" },
      { name: "description", content: "Compare a fee you were shown with a reference amount you trust." },
      { property: "og:title", content: "FeeGuard — Compare a fee — JanaMitra AI" },
      { property: "og:description", content: "Compare a fee you were shown with a reference amount you trust." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeeGuardPage,
});

function FeeGuardPage() {
  const { t } = useI18n();
  const shown = Route.useSearch().shown;
  const [shownInput, setShownInput] = useState(shown != null ? String(shown) : "");
  const [refInput, setRefInput] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ verdict: FeeVerdict; difference: number; percent: number | null; source: string } | null>(null);

  const compare = () => {
    const a = Number(shownInput);
    const b = Number(refInput);
    if (!shownInput.trim() || !refInput.trim()) {
      setError(t("fee.error.amounts"));
      setResult(null);
      return;
    }
    if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) {
      setError(t("fee.error.invalid"));
      setResult(null);
      return;
    }
    setError(null);
    const r = compareFees(a, b);
    setResult({ ...r, source: source.trim() });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("fee.kicker")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("fee.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("fee.sub")}</p>

      <div className="mt-6 flex items-start gap-2 rounded-xl bg-gold-soft/60 px-4 py-3 text-sm text-foreground/90">
        <Info className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
        {t("fee.warning")}
      </div>

      <div className="mt-6 rounded-3xl border border-border/70 bg-card p-6 shadow-card">
        <label className="block text-sm font-semibold text-foreground">
          {t("fee.amountShown")}
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={shownInput}
            onChange={(e) => setShownInput(e.target.value)}
            placeholder="0.00"
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-foreground">
          {t("fee.amountRef")}
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            placeholder="0.00"
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-foreground">
          {t("fee.refSource")}
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder={t("fee.refSourcePh")}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
          />
        </label>

        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
            <AlertTriangle className="size-4 shrink-0" aria-hidden />
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={compare}
          className="mt-5 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/95"
        >
          <Scale className="size-4" aria-hidden />
          {t("fee.compare")}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>

      {result && (
        <div
          className={cn(
            "mt-5 rounded-3xl border p-6 shadow-card animate-fade",
            result.verdict === "over" ? "border-gold bg-gold-soft/40" : "border-border/70 bg-card",
          )}
          role="status"
        >
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {result.verdict === "over" ? (
              <TrendingUp className="size-4 text-foreground/70" aria-hidden />
            ) : result.verdict === "under" ? (
              <TrendingDown className="size-4 text-sage" aria-hidden />
            ) : (
              <CheckCircle2 className="size-4 text-sage" aria-hidden />
            )}
            {t("fee.result.title")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">
            {result.verdict === "match" ? t("fee.match") : result.verdict === "over" ? t("fee.over") : t("fee.under")}
          </p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/50 sm:grid-cols-3">
            <div className="bg-card px-4 py-3">
              <dt className="text-xs text-muted-foreground">{t("fee.difference")}</dt>
              <dd className="mt-0.5 text-sm font-bold text-foreground">{formatINR(result.difference)}</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="text-xs text-muted-foreground">{t("fee.percent")}</dt>
              <dd className="mt-0.5 text-sm font-bold text-foreground">
                {result.percent == null ? "—" : `${result.percent > 0 ? "+" : ""}${result.percent}%`}
              </dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="text-xs text-muted-foreground">{t("fee.sourceShown")}</dt>
              <dd className="mt-0.5 truncate text-sm font-bold text-foreground">{result.source || "—"}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setShownInput("");
              setRefInput("");
              setSource("");
            }}
            className="mt-4 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {t("fee.again")}
          </button>
        </div>
      )}
    </div>
  );
}
