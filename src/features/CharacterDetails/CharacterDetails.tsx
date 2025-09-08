import { ScrollView, StyleSheet, Text, View } from "react-native";

import { StandardWrapper } from "../../infrastructure/ui/StandardWrapper";
import { StackScreenProps } from "@react-navigation/stack";
import { CharacterNavigationParamList } from "../../infrastructure/navigation/CharacterNavigation";
import {
  heightFullScreen,
  widthFullScreen,
} from "../../shared/utils/phoneDimensions";
import { useSingleCharacter } from "./hooks/useSingleCharacter";
import { BrandWrapper } from "../../infrastructure/ui/BrandWrapper";
import { ButtonGeneric } from "../../infrastructure/ui/ButtonGeneric";
import { Feather } from "@expo/vector-icons";
import { CustomImage } from "../../infrastructure/ui/CustomImage";
import { Footer } from "../../infrastructure/ui/Footer";
import InfoDetail from "./ui/InfoDetail";
import { useTranslation } from "react-i18next";

interface Props
  extends StackScreenProps<CharacterNavigationParamList, "CharacterDetails"> {}

export const CharacterDetails = ({ route, navigation }: Props) => {
  const { characterId } = route.params;

  const {
    container,
    textGoBack,
    btnGoBack,
    wrapperGoBack,
    circleMainImg,
    textName,
    textDescription,
  } = styles;

  const {
    //state
    singleCharacter,
    episodesByCharacter,
    //methods
    //functions
    resetSingleCharacter,
  } = useSingleCharacter({ id: characterId });
  const { t } = useTranslation("characterDetails");

  return (
    <BrandWrapper isDetails>
      {singleCharacter && (
        <View style={{ ...container }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <View style={{ paddingHorizontal: widthFullScreen * (0.025 * 2) }}>
              <ButtonGeneric
                buttonStyle={btnGoBack}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.goBack();
                  resetSingleCharacter();
                }}
                firstIcon={
                  <Feather
                    name="arrow-left"
                    size={widthFullScreen * 0.06}
                    color={"#000000"}
                  />
                }
                textContent={
                  <View style={{ ...wrapperGoBack }}>
                    <Text style={{ ...textGoBack }}>{t("btnGoBack")}</Text>
                  </View>
                }
              />
              <CustomImage
                src={singleCharacter?.imageFront ?? ""}
                style={{ ...circleMainImg }}
              />

              <Text style={{ ...textName }}>{singleCharacter.nameFront}</Text>
              <Text style={{ ...textDescription }}>{t("information")}</Text>
              <InfoDetail
                title={t("gender")}
                subTitle={singleCharacter?.genderFront}
              />
              <InfoDetail
                title={t("status")}
                subTitle={singleCharacter?.statusFront}
              />
              <InfoDetail
                title={t("specie")}
                subTitle={singleCharacter?.speciesFront}
              />
              <InfoDetail
                title={t("origin")}
                subTitle={singleCharacter?.originFront.nameFront}
              />
              <InfoDetail
                title={t("type")}
                subTitle={
                  singleCharacter?.typeFront === ""
                    ? t("unknown")
                    : singleCharacter?.typeFront
                }
              />
              <InfoDetail
                title={t("location")}
                subTitle={singleCharacter?.locationFront.nameFront}
              />
              <Text style={{ ...textDescription }}>{t("episodes")}</Text>
              {(episodesByCharacter?.length ?? 0) > 0 &&
                episodesByCharacter!.map((episode) => (
                  <InfoDetail
                    key={episode.idFront}
                    title={episode.nameFront}
                    subTitle={episode.episodeFront}
                    secondSubTitle={episode.air_dateFront}
                  />
                ))}
            </View>
            <Footer />
          </ScrollView>
        </View>
      )}
    </BrandWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: widthFullScreen * (0.025 * 2),

    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  btnGoBack: {
    width: widthFullScreen * 0.35,
    height: heightFullScreen * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperGoBack: {
    flex: 1,
  },
  textGoBack: {
    fontWeight: "700",
    fontSize: 18,
    marginLeft: widthFullScreen * 0.02,
    textTransform: "uppercase",
  },
  circleMainImg: {
    marginVertical: widthFullScreen * 0.03,
    marginHorizontal: "auto",
    width: widthFullScreen * 0.5,
    height: widthFullScreen * 0.5,
    borderRadius: (widthFullScreen * 0.5) / 2,
    borderColor: "#F2F2F7",
    borderWidth: 5,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    color: "#081F32",
    fontWeight: "500",
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0,
    marginTop: widthFullScreen * 0.03,
    marginHorizontal: "auto",
  },
  textDescription: {
    color: "#8E8E93",
    fontWeight: "500",
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlignVertical: "center",
    marginTop: widthFullScreen * 0.08,
    marginBottom: widthFullScreen * 0.06,
    includeFontPadding: false,
  },
});
