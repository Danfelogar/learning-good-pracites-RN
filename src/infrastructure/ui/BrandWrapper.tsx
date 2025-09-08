import { StyleSheet, View } from "react-native";
import { JSX, ReactNode } from "react";
import Feather from "@expo/vector-icons/Feather";

import { AppImages } from "../../shared/constants/sourceImgs";
import { StandardWrapper } from "./StandardWrapper";
import { CustomImage } from "./CustomImage";
import {
  heightFullScreen,
  widthFullScreen,
} from "../../shared/utils/phoneDimensions";
import { useCharacters } from "../../features/ListCharacters/hooks/useCharacters";
export const BrandWrapper = ({
  children,
  isDetails = false,
}: {
  children: ReactNode;
  isDetails?: boolean;
}): JSX.Element => {
  const { container, header, logoImg, loadingImg, loadingWrapper } = styles;

  const {
    //states
    isLoading,
    //methods
    //functions
    clearFiltersAndGetData,
  } = useCharacters({});

  return (
    <StandardWrapper>
      <View style={{ ...container }}>
        <View
          style={{
            ...header,
            justifyContent: isDetails ? "flex-start" : "space-between",
          }}
        >
          <CustomImage src={AppImages.logo} isLocalUrl style={{ ...logoImg }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              display: isDetails ? "none" : "flex",
            }}
          >
            <Feather
              name="trash-2"
              onPress={clearFiltersAndGetData}
              style={{ marginRight: widthFullScreen * 0.025 }}
              size={widthFullScreen * 0.065}
              color="#0000008A"
            />

            <Feather
              name="menu"
              size={widthFullScreen * 0.065}
              color="#0000008A"
            />
          </View>
        </View>
        {children}
      </View>
      <View
        style={{
          ...loadingWrapper,
          display: isLoading ? "flex" : "none",
        }}
      >
        <CustomImage
          isLocalUrl
          src={AppImages.loading}
          style={{
            ...loadingImg,
          }}
        />
      </View>
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: widthFullScreen,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: widthFullScreen * (0.025 * 2),
    paddingVertical: widthFullScreen * (0.025 / 2),
    backgroundColor: "#fff",
    //card shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logoImg: {
    width: widthFullScreen * 0.14,
    height: widthFullScreen * 0.14,
    resizeMode: "contain",
  },
  footer: {
    width: widthFullScreen,
  },
  loadingWrapper: {
    position: "absolute",
    width: widthFullScreen,
    height: heightFullScreen,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImg: {
    width: widthFullScreen * 0.7,
  },
});
