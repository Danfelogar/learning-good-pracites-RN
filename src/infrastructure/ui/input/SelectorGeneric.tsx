import { ReactNode, use, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Animated,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import {
  heightFullScreen,
  widthFullScreen,
} from "../../../shared/utils/phoneDimensions";
import { isIOS } from "../../../shared/utils/isIOS";

export interface InputSelectProps<T extends FieldValues> {
  borderColor?: string;
  inputStyle?: StyleProp<ViewStyle>;
  containerOptionsStyle?: StyleProp<ViewStyle>;
  firstIcon?: ReactNode;
  placeholderTextColor?: string;

  inputValueStyle?: StyleProp<TextStyle>;
  inputColor?: string;

  typeSelector?: "single" | "multiple";
  iconCheckSize?: number;
  iconCheckColor?: string;
  iconCheck?: ReactNode;
  textOptionStyle?: StyleProp<TextStyle>;

  placeHolder: string;
  items: Array<{ label: string; value: string }>;
  onChangeCallback?: (value: any) => void;
  //control
  name: string;
  control: Control<T, any>;
}

export const InputSelect = <T extends FieldValues>({
  placeHolder,
  typeSelector = "single",
  items,
  borderColor,
  inputStyle,
  containerOptionsStyle,
  firstIcon,
  placeholderTextColor,
  inputValueStyle,
  inputColor,
  onChangeCallback,
  name,
  control,
  iconCheckSize,
  iconCheckColor,
  iconCheck,
  textOptionStyle,
}: InputSelectProps<T>) => {
  const {
    backgroundSafety,
    container,
    wrapperInput,
    contentSelectorGeneric,
    textValues,
    containerOptions,
    containerSingleOption,
    textOption,
  } = styles;

  const maxWidth = firstIcon ? "92%" : "100%";

  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const arrowIconRotate = useRef(new Animated.Value(0)).current;
  const selectedOptionOpacity = useRef(new Animated.Value(0)).current;
  const selectedOptionY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpenSelector) {
      Animated.parallel([
        Animated.timing(arrowIconRotate, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(selectedOptionOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(selectedOptionY, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(arrowIconRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(selectedOptionOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(selectedOptionY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isOpenSelector]);

  const animationArrowIconStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        rotate: arrowIconRotate.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "90deg"],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const animationSelectedOptionsStyle: StyleProp<ViewStyle> = {
    opacity: selectedOptionOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        translateY: selectedOptionY.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <Controller
      shouldUnregister
      control={control}
      name={name as Path<T>}
      render={({
        field: { onChange, value = typeSelector === "multiple" ? [] : "" },
      }) => {
        const handlePress = (itemValue: string) => {
          if (typeSelector === "multiple") {
            const newValue = Array.isArray(value)
              ? (value as string[]).includes(itemValue)
                ? (value as string[]).filter((v) => v !== itemValue)
                : [...(value as string[]), itemValue]
              : [itemValue];

            if (onChangeCallback) onChangeCallback(newValue);
            onChange(newValue);
          } else {
            if (onChangeCallback) onChangeCallback(itemValue);
            onChange(itemValue);
          }
          setIsOpenSelector(!isOpenSelector);
        };

        const renderValue = () => {
          if (typeSelector === "single") {
            if (!value) return placeHolder;
            return items.find((i) => i.value === value)?.label || value;
          }

          if (Array.isArray(value) && value.length > 0) {
            return `[${value
              .map((v) => items.find((i) => i.value === v)?.label || v)
              .join(", ")}]`;
          }

          return placeHolder;
        };

        const textColor =
          !value || (Array.isArray(value) && value.length === 0)
            ? placeholderTextColor
            : inputColor;

        return (
          <>
            {isOpenSelector && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setIsOpenSelector(false);
                }}
                style={backgroundSafety}
              />
            )}
            <View style={container}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsOpenSelector(!isOpenSelector)}
                style={[
                  wrapperInput,
                  inputStyle,
                  { borderColor: borderColor || "gray" },
                ]}
              >
                <View style={contentSelectorGeneric}>
                  {firstIcon && firstIcon}
                  {typeSelector === "multiple" ? (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ maxWidth }}
                    >
                      <Text
                        style={[
                          textValues,
                          textColor ? { color: textColor } : {},
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="clip"
                      >
                        {renderValue()}
                      </Text>
                    </ScrollView>
                  ) : (
                    <Text
                      style={[
                        textValues,
                        textColor ? { color: textColor } : {},
                        value && !(Array.isArray(value) && value.length === 0)
                          ? inputValueStyle
                          : {},
                        { maxWidth },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {renderValue()}
                    </Text>
                  )}
                  <Animated.View style={animationArrowIconStyle}>
                    <AntDesign name="right" size={14} color="black" />
                  </Animated.View>
                </View>
              </TouchableOpacity>
              <Animated.ScrollView
                style={[
                  containerOptions,
                  containerOptionsStyle,
                  animationSelectedOptionsStyle,
                ]}
              >
                {items.map((item) => {
                  const isSelected =
                    typeSelector === "multiple"
                      ? (value as string[]).includes(item.value)
                      : (value as string) === item.value;
                  return (
                    <TouchableOpacity
                      style={[
                        containerSingleOption,
                        {
                          backgroundColor: isSelected
                            ? "#f5f3f4"
                            : "transparent",
                          borderColor: borderColor || "gray",
                          borderWidth: isSelected ? 0.25 : 0,
                        },
                      ]}
                      key={item.value}
                      onPress={() => handlePress(item.value)}
                    >
                      <Text style={[textOption, textOptionStyle]}>
                        {item.label}
                      </Text>
                      {typeSelector === "multiple" && isSelected && (
                        <>
                          {iconCheck ? (
                            iconCheck
                          ) : (
                            <EvilIcons
                              name="check"
                              size={iconCheckSize || 24}
                              color={iconCheckColor || "black"}
                            />
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </Animated.ScrollView>
            </View>
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  backgroundSafety: {
    position: "absolute",
    top: -heightFullScreen * 0.5,
    left: -widthFullScreen * 0.5,
    width: widthFullScreen * 2,
    height: heightFullScreen * 2,
    zIndex: 1,
  },
  container: {
    width: "100%",
    flexDirection: "column",
  },
  wrapperInput: {
    zIndex: 2,
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "transparent",
  },
  contentSelectorGeneric: {
    flexDirection: "row",
    width: "100%",
    height: heightFullScreen * 0.03,
    alignItems: "center",
  },
  containerOptions: {
    zIndex: 2,
    maxHeight: heightFullScreen * 0.3,
    overflow: "hidden",
    borderWidth: 0.3,
    borderColor: "gray",
  },
  containerSingleOption: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  textOption: {
    fontSize: 17,
    fontWeight: "400",
  },
  textValues: {
    flexGrow: 1,
    height: "100%",
    color: "gray",
    paddingTop: isIOS() ? 4.5 : 0,
    fontSize: 16.5,
    maxWidth: "85%",
    fontWeight: "400",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  helperText: {
    fontSize: 15.2,
    paddingLeft: 10,
    color: "#ff6464",
  },
});
