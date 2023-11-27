import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguageSupported =
  | "en"
  | "es"
  | "de"
  | "fr"
  | "hi"
  | "mr"
  | "fa"
  | "pa"
  | "ru"
  | "sa"
  | "ml"
  | "la"
  | "ko"
  | "ja"
  | "gu";

export const LanguageSupportedMap: Record<LanguageSupported, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
  hi: "Hindi",
  mr: "Marathi",
  fa: "Persian",
  pa: "Punjabi",
  ru: "Russian",
  sa: "Sanskrit",
  ml: "Malayalam",
  la: "Latin",
  ko: "Korean ",
  ja: "Japanese",
  gu: "Gujarati",
};

const LANGUAGES_IN_FREE = 2;

interface LanguageState {
  language: LanguageSupported;
  setLanguage: (language: LanguageSupported) => void;
  getLanguage: (isPro: boolean) => LanguageSupported[];
  getNotsupportedLanguages: (isPro: boolean) => LanguageSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "en",
  setLanguage: (language: LanguageSupported) => set({ language }),
  getLanguage: (isPro: boolean) => {
    if (isPro) return Object.keys(LanguageSupportedMap) as LanguageSupported[];
    return Object.keys(LanguageSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE
    ) as LanguageSupported[];
  },
  getNotsupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguageSupportedMap).slice(
      LANGUAGES_IN_FREE
    ) as LanguageSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
