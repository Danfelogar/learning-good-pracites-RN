import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client/react";

//i18n
import "./src/config/i18n/i18n";
import { TabMainNavigation } from "./src/infrastructure/navigation/TabMainNavigation";
import { rickAndMortyClient } from "./src/infrastructure/http/graphQL/rickAndMortyClient";

export default function App() {
  return (
    <ApolloProvider client={rickAndMortyClient}>
      <NavigationContainer>
        <TabMainNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}
