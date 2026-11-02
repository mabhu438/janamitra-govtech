import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { applySettings, DEFAULT_SETTINGS, loadSettings, persistSettings, type Settings } from "./janamitra";
import { I18nProvider, type Lang } from "./i18n";

type SettingsContextValue = {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  hydrated: boolean;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    if (hydrated) persistSettings(settings);
  }, [settings, hydrated]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const setLang = useCallback((lang: Lang) => update({ lang }), [update]);

  const value = useMemo(() => ({ settings, update, hydrated }), [settings, update, hydrated]);

  return (
    <SettingsContext.Provider value={value}>
      <I18nProvider lang={settings.lang} setLang={setLang}>
        {children}
      </I18nProvider>
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside AppProviders");
  return ctx;
}
