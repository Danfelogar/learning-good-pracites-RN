import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { Character } from "../../../core/domain/entities/character";
import { CharacterNavigationParamList } from "../../../infrastructure/navigation/CharacterNavigation";
import { widthFullScreen } from "../../../shared/utils/phoneDimensions";
import { CustomImage } from "../../../infrastructure/ui/CustomImage";

type NavigationProp = StackScreenProps<
  CharacterNavigationParamList,
  "CharacterDetails"
>;

const CharacterCard: FC<{ item: Character }> = ({ item }) => {
  const {
    container,
    characterName,
    imgCharacter,
    contentCharacter,
    characterSpecie,
  } = styles;
  const navigation = useNavigation<NavigationProp["navigation"]>();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("CharacterDetails", {
          characterId: item.idFront.toString(),
        })
      }
      style={{ ...container }}
    >
      <CustomImage src={item.imageFront} style={{ ...imgCharacter }} />
      <View
        style={{
          ...contentCharacter,
        }}
      >
        <Text
          style={{ ...characterName }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.nameFront}
        </Text>
        <Text style={{ ...characterSpecie }}>{item.speciesFront}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: widthFullScreen * 0.87,
    height: widthFullScreen * 0.66,
    backgroundColor: "#fff",
    marginBottom: widthFullScreen * 0.055,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    //card shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  imgCharacter: {
    width: "100%",
    height: widthFullScreen * 0.5,
    resizeMode: "stretch",
  },
  contentCharacter: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  characterName: {
    color: "#000000DE",
    fontWeight: "500",
    fontSize: 21,
    lineHeight: 30,
    letterSpacing: 0.15,
    textAlignVertical: "center",
  },
  characterSpecie: {
    color: "#00000099",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});
