"use client";

import { usePreferences } from "@/components/providers/PreferencesProvider";
import type { TranslationKey } from "@/lib/i18n";

export default function Text({
  id,
  values,
}: {
  id: TranslationKey;
  values?: Record<string, string | number>;
}) {
  const { t } = usePreferences();
  let translated = t(id);
  for (const [key, value] of Object.entries(values ?? {})) {
    translated = translated.replaceAll(`{${key}}`, String(value));
  }
  return <>{translated}</>;
}
