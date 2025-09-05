import { NavigationContainer } from "@react-navigation/native";
import { TabMainNavigation } from "./src/infrastructure/navigation/TabMainNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <TabMainNavigation />
    </NavigationContainer>
  );
}
