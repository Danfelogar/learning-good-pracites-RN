import { useTranslation } from "react-i18next";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";

import { StandardWrapper } from "../../infrastructure/ui/StandardWrapper";
import {
  heightFullScreen,
  widthFullScreen,
} from "../../shared/utils/phoneDimensions";
import { InputSelect } from "../../infrastructure/ui/input/SelectorGeneric";
import { useSettings } from "./hooks/useSettings";
import { ButtonGeneric } from "../../infrastructure/ui/ButtonGeneric";
import { useCryptoTest } from "./hooks/useCryptoTest";

export const Settings = () => {
  const { t } = useTranslation("settings");

  const {
    container,
    titleScreen,
    optionsContainer,
    titleSubTopic,
    btnFilter,
    textFilter,
  } = styles;

  const {
    //state
    //methods
    control,
    //actions
  } = useSettings();

  const {
    //state
    cryptoTestResult,
    //methods
    //actions
    tryToCryptoData,
  } = useCryptoTest();

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
        <View style={{ ...optionsContainer, marginTop: 30 }}>
          <View style={titleSubTopic}>
            <Text>{t("subtitleCrypto")}</Text>
            <FontAwesome name="lock" size={24} color="black" />
          </View>
          <ButtonGeneric
            buttonStyle={btnFilter}
            activeOpacity={0.9}
            onPress={tryToCryptoData}
            firstIcon={
              <FontAwesome5
                name="key"
                size={widthFullScreen * 0.06}
                color={"#000000"}
              />
            }
            textContent={
              <View style={container}>
                <Text style={textFilter}>{t("labelCrypto")}</Text>
              </View>
            }
          />
          <Text style={{ fontFamily: "monospace", marginTop: 15 }}>
            {JSON.stringify(cryptoTestResult, null, 2)}
          </Text>
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
  btnFilter: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    width: widthFullScreen * 0.9,
    height: heightFullScreen * 0.065,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthFullScreen * 0.06,
    //card shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  textFilter: {
    color: "#2196F3",
    fontWeight: "600",
    fontSize: 15.6,
    lineHeight: 16,
    letterSpacing: 1.25,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
