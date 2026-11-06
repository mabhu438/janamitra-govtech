import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Languages, LockKeyhole, ScanLine, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/guest")({
  head: () => ({
    meta: [
      { title: "Guest mode — JanaMitra AI" },
      { name: "description", content: "Use JanaMitra in guest mode with device-local preferences and saved documents." },
      { property: "og:title", content: "Guest mode — JanaMitra AI" },
      { property: "og:description", content: "Use JanaMitra in guest mode with device-local preferences and saved documents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuestPage,
});

function GuestPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("nav.guest")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{t("nav.guest")} mode</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("settings.sub")}</p>

      <div className="mt-8 grid gap-6 border-y border-border/70 py-6 sm:grid-cols-3">
        <div className="flex items-start gap-3"><LockKeyhole className="mt-0.5 size-5 shrink-0 text-sage" aria-hidden /><div><h2 className="font-display text-sm font-bold text-foreground">{t("docs.privateNote")}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t("settings.privacySub")}</p></div></div>
        <div className="flex items-start gap-3"><Languages className="mt-0.5 size-5 shrink-0 text-sage" aria-hidden /><div><h2 className="font-display text-sm font-bold text-foreground">{t("settings.language")}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t("settings.languageSub")}</p></div></div>
        <div className="flex items-start gap-3"><FileText className="mt-0.5 size-5 shrink-0 text-sage" aria-hidden /><div><h2 className="font-display text-sm font-bold text-foreground">{t("docs.title")}</h2><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t("docs.note")}</p></div></div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="rounded-lg"><Link to="/scan"><ScanLine aria-hidden />{t("nav.scan")}</Link></Button>
        <Button asChild variant="outline" className="rounded-lg"><Link to="/documents"><FileText aria-hidden />{t("nav.documents")}</Link></Button>
        <Button asChild variant="outline" className="rounded-lg"><Link to="/settings"><Settings2 aria-hidden />{t("nav.settings")}</Link></Button>
      </div>
    </div>
  );
}