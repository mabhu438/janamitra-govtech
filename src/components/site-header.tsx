import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Languages, Leaf, Menu, ScanLine, X } from "lucide-react";

import { useI18n, type TKey } from "@/lib/i18n";
import { useSettings } from "@/lib/app-state";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { to: string; key: TKey; exact?: boolean }[] = [
  { to: "/", key: "nav.home", exact: true },
  { to: "/documents", key: "nav.documents" },
  { to: "/feeguard", key: "nav.feeguard" },
  { to: "/ask", key: "nav.ask" },
  { to: "/help", key: "nav.help" },
  { to: "/settings", key: "nav.settings" },
];

export function Brand() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={t("brand.name")}>
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        <Leaf className="size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-extrabold tracking-tight text-foreground">
          {t("brand.name")}
          <span className="ml-1 align-super text-[10px] font-bold text-sage">AI</span>
        </span>
        <span className="hidden text-[11px] text-muted-foreground sm:block">{t("brand.tagline")}</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (item: { to: string; exact?: boolean }) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to);

  const navLinks = (onNavigate?: () => void) =>
    NAV_ITEMS.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        onClick={onNavigate}
        className={cn(
          "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
          isActive(item)
            ? "bg-secondary text-primary"
            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
        )}
      >
        {t(item.key)}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Brand />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navLinks()}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary sm:flex"
            aria-label="Switch language"
          >
            <Languages className="size-4 text-sage" aria-hidden />
            {lang === "en" ? "తెలుగు" : "English"}
          </button>

          <Link
            to="/scan"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-px hover:bg-primary/95 sm:flex"
          >
            <ScanLine className="size-4" aria-hidden />
            {t("nav.scan")}
            <ArrowUpRight className="size-3.5 opacity-80" aria-hidden />
          </Link>

          <Link
            to="/guest"
            className={cn(
              "hidden rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors md:block",
              isActive({ to: "/guest" })
                ? "border-gold bg-gold-soft text-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {t("nav.guest")}
          </Link>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks(() => setOpen(false))}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "te" : "en")}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold"
              >
                <Languages className="size-4 text-sage" aria-hidden />
                {lang === "en" ? "తెలుగు" : "English"}
              </button>
              <Link
                to="/scan"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <ScanLine className="size-4" aria-hidden />
                {t("nav.scan")}
              </Link>
              <Link
                to="/guest"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                {t("nav.guest")}
              </Link>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{t("settings.sub")}</p>
            <span className="sr-only">{settings.theme}</span>
          </div>
        </div>
      )}
    </header>
  );
}
