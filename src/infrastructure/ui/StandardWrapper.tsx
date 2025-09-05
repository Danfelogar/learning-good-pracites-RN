import { JSX, ReactNode } from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";

/**
 * StandardWrapper component
 *
 * Provides a wrapper for screens that handles:
 * - Safe area layout to avoid notches and system UI
 * - Status bar color and style that adapts to light or dark mode
 * - Background color switching based on current color scheme
 *
 * @param children - ReactNode elements to render inside the wrapper
 * @returns JSX.Element that wraps children with SafeAreaView and StatusBar
 */
export const StandardWrapper = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? "#0000" : "#FFFF",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={isDarkMode ? "#0000" : "#FFFF"}
        showHideTransition="slide"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      {children}
    </SafeAreaView>
  );
};
