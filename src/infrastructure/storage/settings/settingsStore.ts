import { create } from "zustand";
import { SettingsState, SettingsWithoutActions } from "./settings";
import i18n from "../../../config/i18n/i18n";

const INITIAL_SETTINGS_STATE: SettingsWithoutActions = {
  language: "en",
};

export const useSettingsState = create<SettingsState>((set) => ({
  ...INITIAL_SETTINGS_STATE,
  //actions
  changeLanguage: (lang: string) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
}));
