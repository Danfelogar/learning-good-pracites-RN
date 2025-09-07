import { ReactNode } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  KeyboardTypeOptions,
} from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface CustomInputGeneric<T extends FieldValues> {
  borderColor?: string;
  inputStyle?: StyleProp<any>;
  keyboardType?: KeyboardTypeOptions;
  firstIcon?: ReactNode;
  placeholder: string;
  placeholderTextColor: string;
  autoCorrect: boolean;
  isSecretText?: boolean;
  inputColor: string;
  lastIcon?: ReactNode;
  multiline?: boolean;
  multilineStyle?: StyleProp<any>;
  heightMultiline?: number;
  onChangeCallback?: (value: any) => void;

  //control
  name: string;
  control: Control<T, any>;
}

export function InputGeneric<T extends FieldValues>({
  keyboardType,
  borderColor,
  firstIcon,
  placeholder,
  placeholderTextColor,
  autoCorrect,
  isSecretText,
  inputColor,
  inputStyle,
  lastIcon,
  multiline = false,
  multilineStyle,
  heightMultiline,
  onChangeCallback,
  name,
  control,
}: CustomInputGeneric<T>) {
  const { WrapperStandard, contentInput, contentInputGeneric, helperText } =
    styles;
  return (
    <Controller
      shouldUnregister
      control={control}
      name={name as Path<T>}
      render={({ field: { onChange, value = "" }, formState: { errors } }) => {
        return (
          <View
            style={[WrapperStandard, multilineStyle ? multilineStyle : null]}
          >
            <View
              testID="view-component"
              style={{
                ...contentInputGeneric,
                borderColor: borderColor ? borderColor : "transparent",
                height: heightMultiline ? heightMultiline : "auto",
                ...(inputStyle ? inputStyle : {}),
              }}
            >
              {firstIcon && firstIcon}
              <TextInput
                testID="input-component"
                style={{
                  ...contentInput,
                  color: inputColor,
                  maxWidth:
                    firstIcon && lastIcon
                      ? "85%"
                      : firstIcon || lastIcon
                      ? "92%"
                      : "100%",
                }}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                autoCorrect={autoCorrect}
                secureTextEntry={isSecretText || false}
                keyboardType={keyboardType || "default"}
                onChangeText={(text) => {
                  onChange(text);
                  onChangeCallback && onChangeCallback(text);
                }}
                value={value}
                multiline={multiline}
              />
              {lastIcon && lastIcon}
            </View>
            {!!errors[name] && (
              <Text testID="error-msm" style={{ ...helperText }}>
                {errors[name]?.message as string}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  WrapperStandard: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: 'orange',
  },
  contentInputGeneric: {
    display: "flex",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentInput: {
    display: "flex",
    fontSize: 16.5,
    fontWeight: "400",
    flexGrow: 1,
    height: "100%",
    padding: 10,
  },
  helperText: {
    fontSize: 15.2,
    paddingLeft: 10,
    color: "#ff6464",
  },
});
