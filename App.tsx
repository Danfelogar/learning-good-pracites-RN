import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client/react";

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
