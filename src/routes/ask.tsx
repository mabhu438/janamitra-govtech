import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SAMPLE_DOCS, answerFromDoc, type SampleDoc } from "@/lib/janamitra";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ask")({
  validateSearch: (search: Record<string, unknown>) => ({
    doc: typeof search.doc === "string" ? search.doc : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Ask JanaMitra — JanaMitra AI" },
      { name: "description", content: "Ask questions about a sample document and see answers grounded in its text." },
      { property: "og:title", content: "Ask JanaMitra — JanaMitra AI" },
      { property: "og:description", content: "Ask questions about a sample document and see answers grounded in its text." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AskPage,
});

type Exchange = { question: string; answer: string; grounded: boolean };

function AskPage() {
  const { t, pick, lang } = useI18n();
  const initialDoc = Route.useSearch().doc;
  const [docId, setDocId] = useState(initialDoc && SAMPLE_DOCS.some((doc) => doc.id === initialDoc) ? initialDoc : SAMPLE_DOCS[0]?.id ?? "");
  const [question, setQuestion] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [error, setError] = useState(false);
  const doc = SAMPLE_DOCS.find((item) => item.id === docId);

  useEffect(() => {
    if (initialDoc && SAMPLE_DOCS.some((item) => item.id === initialDoc)) setDocId(initialDoc);
  }, [initialDoc]);

  const ask = (value: string) => {
    const cleanQuestion = value.trim();
    if (!doc || !cleanQuestion) {
      setError(true);
      return;
    }
    const outcome = answerFromDoc(doc, cleanQuestion, lang);
    setExchanges((current) => [
      ...current,
      {
        question: cleanQuestion,
        answer: outcome.grounded ? outcome.answer : t("ask.fallback"),
        grounded: outcome.grounded,
      },
    ]);
    setQuestion("");
    setError(false);
  };

  const suggestedQuestions = (sample: SampleDoc) =>
    sample.facts.slice(0, 3).map((fact) =>
      lang === "te"
        ? `${pick(fact.label)} వివరాలు ఏమిటి?`
        : `What does the document say about ${pick(fact.label).toLowerCase()}?`,
    );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("ask.kicker")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{t("ask.title")}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("ask.sub")}</p>

      <div className="mt-6 flex items-start gap-2 rounded-lg bg-sage-soft/50 px-4 py-3 text-sm text-foreground/90">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
        {t("ask.note")}
      </div>

      <label className="mt-6 block max-w-xl text-sm font-semibold text-foreground">
        {t("ask.docLabel")}
        <select
          value={docId}
          onChange={(event) => {
            setDocId(event.target.value);
            setExchanges([]);
          }}
          className="mt-1.5 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-ring/40"
        >
          {SAMPLE_DOCS.map((sample) => (
            <option key={sample.id} value={sample.id}>{pick(sample.title)}</option>
          ))}
        </select>
      </label>

      {doc && (
        <div className="mt-6 border-y border-border/70 py-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{t("ask.suggested")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedQuestions(doc).map((suggestion) => (
              <Button key={suggestion} type="button" variant="outline" className="h-auto whitespace-normal rounded-lg px-3 py-2 text-left text-xs" onClick={() => ask(suggestion)}>
                {suggestion}<ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 space-y-3" aria-live="polite">
        {exchanges.length === 0 ? (
          <div className="py-8 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-full bg-secondary text-primary"><MessageCircle className="size-5" aria-hidden /></span>
            <h2 className="mt-3 font-display text-lg font-bold text-foreground">{t("ask.empty.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("ask.empty.desc")}</p>
          </div>
        ) : exchanges.map((exchange, index) => (
          <div key={`${index}-${exchange.question}`} className="grid gap-3 border-b border-border/70 py-4 sm:grid-cols-[minmax(9rem,0.35fr)_1fr]">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("ask.you")}<span className="mt-1 block text-sm font-semibold normal-case tracking-normal text-foreground">{exchange.question}</span></p>
            <div className={cn("rounded-lg px-4 py-3 text-sm leading-relaxed", exchange.grounded ? "bg-sage-soft/50 text-foreground" : "bg-gold-soft/50 text-foreground")}>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                {exchange.grounded && <ShieldCheck className="size-3.5 text-sage" aria-hidden />}{t(exchange.grounded ? "ask.grounded" : "ask.assistant")}
              </p>
              {exchange.answer}
            </div>
          </div>
        ))}
      </div>

      <form className="mt-4" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
        <label htmlFor="question" className="mb-1.5 block text-sm font-semibold text-foreground">{t("ask.label")}</label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <textarea id="question" value={question} maxLength={500} onChange={(event) => { setQuestion(event.target.value); setError(false); }} placeholder={t("ask.placeholder")} rows={3} className="min-h-24 flex-1 resize-y rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40" />
          <Button type="submit" className="h-11 rounded-lg px-5"><MessageCircle aria-hidden />{t("ask.send")}</Button>
        </div>
        {error && <p className="mt-2 text-xs font-medium text-destructive" role="alert">{t("ask.placeholder")}</p>}
      </form>

      {exchanges.length > 0 && (
        <Button type="button" variant="ghost" className="mt-3 rounded-lg" onClick={() => setExchanges([])}><RotateCcw aria-hidden />{t("ask.clear")}</Button>
      )}
    </div>
  );
}