import { create } from "zustand";
import { SettingsState, SettingsWithoutActions } from "./settings";
import i18n from "../../../config/i18n/i18n";

const INITIAL_SETTINGS_STATE: SettingsWithoutActions = {
  language: "en",
  isOpenModalFilters: false,
};

export const useSettingsState = create<SettingsState>((set) => ({
  ...INITIAL_SETTINGS_STATE,
  //actions
  changeLanguage: (lang: string) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
  changeModalFiltersState: () => {
    set((state) => ({ isOpenModalFilters: !state.isOpenModalFilters }));
  },
}));
