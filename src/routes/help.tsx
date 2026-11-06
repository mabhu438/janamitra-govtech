import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check, Clipboard, Download, FileCheck2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildGrievanceDraft } from "@/lib/janamitra";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help and grievance draft — JanaMitra AI" },
      { name: "description", content: "Prepare a grievance letter draft from facts you provide, with an evidence checklist." },
      { property: "og:title", content: "Help and grievance draft — JanaMitra AI" },
      { property: "og:description", content: "Prepare a grievance letter draft from facts you provide, with an evidence checklist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const { t } = useI18n();
  const [department, setDepartment] = useState("");
  const [facts, setFacts] = useState("");
  const [docRef, setDocRef] = useState("");
  const [consent, setConsent] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const createDraft = () => {
    if (!department.trim()) { setError(t("help.error.dept")); return; }
    if (!facts.trim()) { setError(t("help.error.facts")); return; }
    if (docRef.trim() && !consent) { setError(t("help.error.consent")); return; }
    setDraft(buildGrievanceDraft({ department, facts, docRef: consent ? docRef : undefined }));
    setError("");
    setCopied(false);
  };

  const copyDraft = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setError(t("help.alert"));
    }
  };

  const downloadDraft = () => {
    if (!draft) return;
    const file = new Blob([draft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "janamitra-grievance-draft.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("help.kicker")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{t("help.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("help.sub")}</p>
      <div className="mt-6 flex items-start gap-2 rounded-lg bg-gold-soft/60 px-4 py-3 text-sm text-foreground/90">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />{t("help.alert")}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <label className="block text-sm font-semibold text-foreground">{t("help.dept")}
            <input value={department} onChange={(event) => setDepartment(event.target.value)} placeholder={t("help.deptPh")} className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring/40" />
          </label>
          <label className="mt-4 block text-sm font-semibold text-foreground">{t("help.facts")}
            <textarea value={facts} onChange={(event) => setFacts(event.target.value)} rows={5} placeholder={t("help.factsPh")} className="mt-1.5 w-full resize-y rounded-lg border border-input bg-card px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring/40" />
          </label>
          <label className="mt-4 block text-sm font-semibold text-foreground">{t("help.docRef")}
            <input value={docRef} onChange={(event) => setDocRef(event.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring/40" />
          </label>
          <label className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 size-4 accent-primary" />
            <span>{t("help.consent")}</span>
          </label>
          {error && <p className="mt-3 text-sm font-medium text-destructive" role="alert">{error}</p>}
          {copied && <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-sage" role="status"><Check className="size-4" aria-hidden />{t("help.copied")}</p>}
          <Button type="button" onClick={createDraft} className="mt-5 rounded-lg"><FileCheck2 aria-hidden />{t("help.create")}</Button>
        </section>

        <aside className="border-t border-border/70 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="font-display text-lg font-bold text-foreground">{t("help.checklistTitle")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("help.checklistSub")}</p>
          <ul className="mt-4 space-y-3">
            {["help.checklist.1", "help.checklist.2", "help.checklist.3", "help.checklist.4"].map((key) => (
              <li key={key} className="flex items-start gap-2 text-sm text-foreground/90"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sage-soft text-sage"><Check className="size-3.5" aria-hidden /></span>{t(key as "help.checklist.1" | "help.checklist.2" | "help.checklist.3" | "help.checklist.4")}</li>
            ))}
          </ul>
        </aside>
      </div>

      {draft && (
        <section className="mt-10 border-t border-border/70 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-foreground">{t("help.previewTitle")}</h2>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="rounded-lg" onClick={() => void copyDraft()}><Clipboard aria-hidden />{t("help.copy")}</Button>
              <Button type="button" variant="outline" className="rounded-lg" onClick={downloadDraft}><Download aria-hidden />{t("help.download")}</Button>
            </div>
          </div>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg border border-border/70 bg-card p-5 font-sans text-sm leading-relaxed text-foreground">{draft}</pre>
        </section>
      )}
    </div>
  );
}