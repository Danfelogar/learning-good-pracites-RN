import { useTranslation } from "react-i18next";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, View } from "react-native";

import { StandardWrapper } from "../../infrastructure/ui/StandardWrapper";
import { widthFullScreen } from "../../shared/utils/phoneDimensions";
import { InputSelect } from "../../infrastructure/ui/input/SelectorGeneric";
import { useSettings } from "./hooks/useSettings";

export const Settings = () => {
  const { t } = useTranslation("settings");

  const { container, titleScreen, optionsContainer, titleSubTopic } = styles;

  const {
    //state
    language,
    //methods
    control,
    //actions
  } = useSettings();

  return (
    <StandardWrapper>
      <View style={container}>
        <Text style={titleScreen}>{t("title")}</Text>
        <View style={optionsContainer}>
          <View style={titleSubTopic}>
            <Text>{t("subtitleLang")}</Text>
            <FontAwesome name="language" size={24} color="black" />
          </View>
          <InputSelect
            control={control}
            name="language"
            placeHolder={t("labelLang")}
            items={[
              { label: "English", value: "en" },
              { label: "Español", value: "es" },
            ]}
          />
        </View>
      </View>
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: widthFullScreen * 0.05,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  titleScreen: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "column",
  },
  titleSubTopic: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },
  subTopic: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
});
