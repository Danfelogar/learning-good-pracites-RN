import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client/react";

//i18n init
import "./src/config/i18n/i18n";
import { TabMainNavigation } from "./src/infrastructure/navigation/TabMainNavigation";
import { rickAndMortyClient } from "./src/infrastructure/http/graphQL/rickAndMortyClient";
import { PortalProvider } from "./src/infrastructure/ui/PortalProvider";

export default function App() {
  return (
    <ApolloProvider client={rickAndMortyClient}>
      <PortalProvider>
        <NavigationContainer>
          <TabMainNavigation />
        </NavigationContainer>
      </PortalProvider>
    </ApolloProvider>
  );
}
