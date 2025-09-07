export interface SettingsState {
  //state
  language: string;
  //action
  changeLanguage: (lang: string) => void;
}

export interface SettingsWithoutActions
  extends Omit<SettingsState, "changeLanguage"> {}
