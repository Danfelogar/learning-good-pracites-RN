import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthFullScreen } from "../../../shared/utils/phoneDimensions";

interface Props {
  title: string;
  subTitle: string;
  secondSubTitle?: string;
}

const InfoDetail: FC<Props> = ({ subTitle, title, secondSubTitle }) => {
  const { container, firstText, secondText, thirdText, line } = styles;
  return (
    <View style={{ ...container }}>
      <Text style={{ ...firstText }} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={{ ...secondText }} numberOfLines={1} ellipsizeMode="tail">
        {subTitle}
      </Text>
      {secondSubTitle && (
        <Text style={{ ...thirdText }} numberOfLines={1} ellipsizeMode="tail">
          {secondSubTitle}
        </Text>
      )}
      <View
        style={{
          ...line,
        }}
      />
    </View>
  );
};

export default InfoDetail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: widthFullScreen * 0.025,
  },
  firstText: {
    color: "#081F32",
    fontWeight: "700",
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: widthFullScreen * 0.008,
  },
  secondText: {
    color: "#6E798C",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginBottom: widthFullScreen * 0.009,
  },
  thirdText: {
    color: "#8E8E93",
    fontWeight: "500",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  line: {
    marginTop: widthFullScreen * 0.03,
    marginBottom: widthFullScreen * 0.05,
    width: "95%",
    height: 1,
    backgroundColor: "#F2F2F7",
  },
});
