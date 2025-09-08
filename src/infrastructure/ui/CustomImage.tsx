import { FC, useState } from "react";
import { Image, ImageSourcePropType, ImageProps } from "react-native";
import { AppImages } from "../../shared/constants/sourceImgs";

interface CustomImageProps extends Omit<ImageProps, "source"> {
  src: keyof typeof AppImages | string;
  isLocalUrl?: boolean;
  defaultErrorImage?: string;
}

export const CustomImage: FC<CustomImageProps> = ({
  src,
  isLocalUrl = false,
  defaultErrorImage = AppImages.loading,
  style,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  const getImageSource = (): ImageSourcePropType => {
    if (hasError) {
      return defaultErrorImage;
    }

    if (isLocalUrl) {
      return (src as ImageSourcePropType) || AppImages.loading;
    }

    // Properly format remote URI
    return typeof src === "string" ? { uri: src } : defaultErrorImage;
  };

  return (
    <Image
      resizeMethod="none"
      onLoad={() => setHasError(false)}
      source={getImageSource()}
      onError={handleError}
      style={[style]}
      {...props}
    />
  );
};
