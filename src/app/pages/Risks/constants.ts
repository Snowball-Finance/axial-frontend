import { TFunction } from "react-i18next";

import { RiskContent } from "./types";
import { translations } from "locales/i18n";

export const contents = (
  t: TFunction<"translation", undefined>
): RiskContent[] => [
  {
    title: t(translations.RisksPage.RiskContent.Title()),
    description: t(translations.RisksPage.RiskContent.Description()),
  },
  {
    title: t(translations.RisksPage.AuditsContent.Title()),
    description: t(translations.RisksPage.AuditsContent.Description()),
  },
  {
    title: t(translations.RisksPage.AdminKeysContent.Title()),
    description: t(translations.RisksPage.AdminKeysContent.Description()),
  },
  {
    title: t(translations.RisksPage.PermanentLossContent.Title()),
    description: t(translations.RisksPage.PermanentLossContent.Description()),
  },
];
