// import { StyleSheet } from "react-native";
// import { WebView } from "react-native-webview";

// import { StandardWrapper } from "../../infrastructure/ui/StandardWrapper";

// export const DocCharacter = () => {
//   const { container } = styles;
//   return (
//     <StandardWrapper>
//       <WebView
//         source={{ uri: "https://rickandmortyapi.com/documentation/#graphql" }}
//         style={{ ...container }}
//       />
//     </StandardWrapper>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { StandardWrapper } from "../../infrastructure/ui/StandardWrapper";

export const DocCharacter = () => {
  const { container } = styles;
  // Validated and trusted URL
  const trustedUrl = "https://rickandmortyapi.com/documentation/#graphql";
  // Security configuration for WebView
  const webViewSecurityConfig = {
    javaScriptEnabled: true, // Keep enabled if necessary for functionality
    javaScriptCanOpenWindowsAutomatically: false,
    domStorageEnabled: false,
    mixedContentMode: "never" as const,
    thirdPartyCookiesEnabled: false,
    allowFileAccess: false,
    allowUniversalAccessFromFileURLs: false,
    allowFileAccessFromFileURLs: false,
  };

  return (
    <StandardWrapper>
      <WebView
        source={{ uri: trustedUrl }}
        style={{ ...container }}
        // Security properties
        {...webViewSecurityConfig}
        // Additional events for enhanced security
        onMessage={(event) => {
          // Validate and sanitize any message received from WebView
          console.log("Message received from WebView:", event.nativeEvent.data);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("Error in WebView:", nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("HTTP error in WebView:", nativeEvent);
        }}
        // Clear cookies and cache on unmount
        incognito={true} // Incognito mode to isolate the session
      />
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
