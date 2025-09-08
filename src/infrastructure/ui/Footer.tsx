import { StyleSheet, Text, View } from "react-native";
import { widthFullScreen } from "../../shared/utils/phoneDimensions";

export const Footer = () => {
  const { footer, footerTitle } = styles;
  return (
    <View style={{ ...footer }}>
      <Text style={{ ...footerTitle }}>Rick and Morty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: widthFullScreen,
    flexDirection: "row",
    height: widthFullScreen * 0.14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthFullScreen * (0.025 * 2),
    paddingVertical: widthFullScreen * (0.025 / 2),
    backgroundColor: "#fff",
    //card shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  footerTitle: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "center",
  },
});
