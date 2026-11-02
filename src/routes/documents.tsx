import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileText, Info, Search, Trash2 } from "lucide-react";

import {
  SAMPLE_DOCS,
  docsFilterLabelKey,
  loadSavedDocs,
  persistSavedDocs,
  setPendingScan,
  type SavedDoc,
} from "@/lib/janamitra";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "My documents — JanaMitra AI" },
      { name: "description", content: "Browse fictional sample documents and files saved on this device." },
      { property: "og:title", content: "My documents — JanaMitra AI" },
      { property: "og:description", content: "Browse fictional sample documents and files saved on this device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocumentsPage,
});

const FILTERS = ["all", "bills", "schemes", "notices", "uploads"] as const;

function DocumentsPage() {
  const { t, pick } = useI18n();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [query, setQuery] = useState("");
  const [savedDocs, setSavedDocs] = useState<SavedDoc[]>([]);
  const [ready, setReady] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setSavedDocs(loadSavedDocs());
    setReady(true);
  }, []);

  const matchesFilter = (kind: "bill" | "scheme" | "notice" | "upload") => {
    if (filter === "all") return true;
    if (filter === "uploads") return kind === "upload";
    if (kind === "upload") return false;
    return (
      (filter === "bills" && kind === "bill") ||
      (filter === "schemes" && kind === "scheme") ||
      (filter === "notices" && kind === "notice")
    );
  };

  const q = query.trim().toLowerCase();

  const demoRows = SAMPLE_DOCS.filter((d) => matchesFilter(d.kind)).filter(
    (d) =>
      !q ||
      pick(d.title).toLowerCase().includes(q) ||
      pick(d.dept).toLowerCase().includes(q) ||
      d.refNo.toLowerCase().includes(q),
  );

  const uploadRows = savedDocs.filter((d) => matchesFilter("upload")).filter(
    (d) => !q || d.title.toLowerCase().includes(q) || d.fileName.toLowerCase().includes(q),
  );

  const empty = ready && demoRows.length === 0 && uploadRows.length === 0;

  const openSample = (id: string) => {
    setPendingScan({ type: "sample", id });
    void navigate({ to: "/scan" });
  };

  const deleteSaved = (id: string) => {
    const next = savedDocs.filter((d) => d.id !== id);
    setSavedDocs(next);
    persistSavedDocs(next);
    setDeleted(true);
    window.setTimeout(() => setDeleted(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("docs.kicker")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t("docs.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("docs.note")}</p>

      <div className="mt-6 flex items-start gap-2 rounded-xl bg-sage-soft/50 px-4 py-3 text-sm text-foreground/90">
        <Info className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
        {t("docs.privateNote")}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("docs.searchPh")}
            className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter documents">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              filter === f ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {t(docsFilterLabelKey(f))}
          </button>
        ))}
      </div>

      {deleted && <p className="mt-4 text-xs font-medium text-sage">{t("docs.deleted")}</p>}

      <div className="mt-5 space-y-3">
        {demoRows.map((doc) => (
          <div
            key={doc.id}
            className="card-lift flex flex-wrap items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-card"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sage-soft text-forest">
              <FileText className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-gold-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground">
                  {t("docs.badge.demo")}
                </span>
                <span className="font-display text-base font-bold text-foreground">{pick(doc.title)}</span>
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {pick(doc.dept)} · {doc.refNo}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openSample(doc.id)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {t("docs.view")}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        ))}

        {uploadRows.map((doc) => (
          <div
            key={doc.id}
            className="card-lift flex flex-wrap items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-card"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-foreground">
              <FileText className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground">
                  {t("docs.badge.local")}
                </span>
                <span className="font-display text-base font-bold text-foreground">{doc.title}</span>
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {doc.fileName} · {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              type="button"
              onClick={() => deleteSaved(doc.id)}
              aria-label={t("docs.delete")}
              className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>

      {empty && (
        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-8 text-center shadow-card animate-fade">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Search className="size-6" aria-hidden />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-foreground">{t("docs.empty.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("docs.empty.desc")}</p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/scan" })}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/95"
          >
            {t("docs.empty.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      )}

      <p className="mt-8 text-xs text-muted-foreground">{t("docs.footnote")}</p>
    </div>
  );
}
