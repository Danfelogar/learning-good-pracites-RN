import { useForm } from "react-hook-form";
import { useSettingsState } from "../../../infrastructure/storage/settings/settingsStore";
import { use, useEffect } from "react";

export const useSettings = () => {
  const {
    //state
    language,
    //actions
    changeLanguage,
  } = useSettingsState();

  const { control, watch } = useForm({
    defaultValues: {
      language: language,
    },
  });

  const watchedLanguage = watch("language");

  useEffect(() => {
    changeLanguage(watchedLanguage);
  }, [watchedLanguage]);

  return {
    //state
    language,
    //methods
    control,
    //actions
  };
};
