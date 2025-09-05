import { createStackNavigator } from "@react-navigation/stack";

import { ListCharacters } from "../../features/ListCharacters/ListCharacters";
import { CharacterDetails } from "../../features/CharacterDetails/CharacterDetails";

export type CharacterNavigationParamList = {
  ListCharacters: undefined;
  CharacterDetails: { characterId: string };
};

const Stack = createStackNavigator<CharacterNavigationParamList>();

export const CharacterNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListCharacters"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListCharacters" component={ListCharacters} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
    </Stack.Navigator>
  );
};
