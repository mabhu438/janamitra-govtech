import { Leaf } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-auto border-t border-border/70 bg-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Leaf className="size-4 text-sage" aria-hidden />
          {t("brand.name")} · {t("footer.line")}
        </p>
        <p className="max-w-md text-xs text-muted-foreground">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
