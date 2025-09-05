import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

import { CharacterNavigation } from "./CharacterNavigation";
import { DocCharacter } from "../../features/DocCharacter/DocCharacter";
import { StyleSheet, View } from "react-native";
import { isIOS } from "../../shared/utils/isIOS";
import { heightFullScreen } from "../../shared/utils/phoneDimensions";

export type TabMainNavigationParamList = {
  NavCharacter: undefined;
  DocCharacter: undefined;
};

const Tab = createBottomTabNavigator<TabMainNavigationParamList>();

export const TabMainNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="NavCharacter"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: isIOS() ? heightFullScreen * 0.09 : heightFullScreen * 0.07,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name="NavCharacter"
          options={{
            tabBarLabel: "Characters",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="users" size={size} color={color} />
            ),
          }}
          component={CharacterNavigation}
        />
        <Tab.Screen
          name="DocCharacter"
          options={{
            tabBarLabel: "Documentación",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="documents" size={size} color={color} />
            ),
          }}
          component={DocCharacter}
        />
      </Tab.Navigator>
    </View>
  );
};
