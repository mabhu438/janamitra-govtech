import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/app-state";
import { loadSavedDocs, persistSavedDocs, type TextSize, type ThemeChoice } from "@/lib/janamitra";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — JanaMitra AI" },
      { name: "description", content: "Manage JanaMitra language, appearance, privacy, and accessibility preferences." },
      { property: "og:title", content: "Settings — JanaMitra AI" },
      { property: "og:description", content: "Manage JanaMitra language, appearance, privacy, and accessibility preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { t, lang, setLang } = useI18n();
  const { settings, update } = useSettings();
  const [cleared, setCleared] = useState(false);

  const clearSaved = () => {
    persistSavedDocs([]);
    setCleared(true);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("settings.kicker")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{t("settings.title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("settings.sub")}</p>

      <section className="mt-8 divide-y divide-border/70 border-y border-border/70">
        <PreferenceRow title={t("settings.language")} description={t("settings.languageSub")}>
          <div className="flex gap-2">
            {(["en", "te"] as const).map((value: Lang) => (
              <Button key={value} type="button" variant={lang === value ? "default" : "outline"} className="rounded-lg" aria-pressed={lang === value} onClick={() => setLang(value)}>{value === "en" ? "English" : "తెలుగు"}</Button>
            ))}
          </div>
        </PreferenceRow>

        <PreferenceRow title={t("settings.theme")} description={t("settings.themeSub")}>
          <div className="flex gap-2">
            {(["light", "dark"] as const).map((value: ThemeChoice) => (
              <Button key={value} type="button" variant={settings.theme === value ? "default" : "outline"} className="rounded-lg" aria-pressed={settings.theme === value} onClick={() => update({ theme: value })}>{t(value === "light" ? "settings.theme.light" : "settings.theme.dark")}</Button>
            ))}
          </div>
        </PreferenceRow>

        <PreferenceRow title={t("settings.privacy")} description={t("settings.privacySub")}>
          <label className="flex items-center gap-3 text-sm font-medium text-foreground">
            {t("settings.saveHistory")}
            <input type="checkbox" checked={settings.saveHistory} onChange={(event) => update({ saveHistory: event.target.checked })} className="size-4 accent-primary" />
          </label>
          <div className="mt-3">
            <Button type="button" variant="outline" className="rounded-lg" onClick={clearSaved}><Trash2 aria-hidden />{t("settings.clearData")}</Button>
            {cleared && <p className="mt-2 text-xs font-medium text-sage" role="status">{t("settings.cleared")}</p>}
          </div>
        </PreferenceRow>

        <PreferenceRow title={t("settings.a11y")} description={t("settings.a11ySub")}>
          <label className="block text-sm font-semibold text-foreground">{t("settings.textSize")}
            <select value={settings.textSize} onChange={(event) => update({ textSize: event.target.value as TextSize })} className="mt-1.5 block w-full max-w-xs rounded-lg border border-input bg-card px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring/40">
              <option value="default">{t("settings.text.default")}</option>
              <option value="lg">{t("settings.text.lg")}</option>
              <option value="xl">{t("settings.text.xl")}</option>
            </select>
          </label>
          <ToggleRow label={t("settings.contrast")} checked={settings.contrast} onChange={(contrast) => update({ contrast })} />
          <ToggleRow label={t("settings.motion")} checked={settings.reduceMotion} onChange={(reduceMotion) => update({ reduceMotion })} />
        </PreferenceRow>
      </section>
    </div>
  );
}

function PreferenceRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-start">
      <div><h2 className="font-display text-base font-bold text-foreground">{title}</h2><p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p></div>
      <div className="min-w-52 space-y-3">{children}</div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm font-medium text-foreground">
      {label}<input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-4 accent-primary" />
    </label>
  );
}