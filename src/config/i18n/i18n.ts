import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import en from "./locales/en.json";
import es from "./locales/es.json";

const supportedLanguages = ["en", "es"];

const resources = {
  en: {
    tabMainNavigation: en.tabMainNavigation,
    listCharacters: en.listCharacters,
    settings: en.settings,
    gender: en.gender,
    species: en.species,
    status: en.status,
    modalFilters: en.modalFilters,
    characterDetails: en.characterDetails,
  },
  es: {
    tabMainNavigation: es.tabMainNavigation,
    listCharacters: es.listCharacters,
    settings: es.settings,
    gender: es.gender,
    species: es.species,
    status: es.status,
    modalFilters: es.modalFilters,
    characterDetails: es.characterDetails,
  },
};

const locale = getLocales()[0].languageCode || "en";
const bestTag = supportedLanguages.includes(locale) ? locale : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: bestTag,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
