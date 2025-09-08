export interface SettingsState {
  //state
  language: string;
  isOpenModalFilters: boolean;
  //action
  changeLanguage: (lang: string) => void;
  changeModalFiltersState: () => void;
}

export interface SettingsWithoutActions
  extends Omit<SettingsState, "changeLanguage" | "changeModalFiltersState"> {}
