import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  StyleProp,
} from "react-native";
import { ReactNode } from "react";

export interface ButtonGenericProps {
  buttonStyle: StyleProp<any>;
  activeOpacity?: number;
  onPress: (event: GestureResponderEvent) => void;
  firstIcon?: ReactNode;
  textContent?: ReactNode;
  lastIcon?: ReactNode;
  isLoading?: boolean;
  colorSpinierLoading?: string;
}

export function ButtonGeneric({
  buttonStyle,
  activeOpacity,
  onPress,
  firstIcon,
  textContent,
  lastIcon,
  isLoading = false,
  colorSpinierLoading,
}: ButtonGenericProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={activeOpacity || 0.5}
      onPress={onPress}
      style={{ ...buttonStyle }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colorSpinierLoading ? colorSpinierLoading : "#6A5691"}
        />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {firstIcon && firstIcon}
          {textContent && textContent}
          {lastIcon && lastIcon}
        </View>
      )}
    </TouchableOpacity>
  );
}
