import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { heightFullScreen } from "../../shared/utils/phoneDimensions";
import { isIOS } from "../../shared/utils/isIOS";
import { CharacterNavigation } from "./CharacterNavigation";
import { DocCharacter } from "../../features/DocCharacter/DocCharacter";
import { Settings } from "../../features/Settings/Settings";
import { useTranslation } from "react-i18next";

export type TabMainNavigationParamList = {
  NavCharacter: undefined;
  DocCharacter: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabMainNavigationParamList>();

export const TabMainNavigation = () => {
  const { t } = useTranslation("tabMainNavigation");
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
            tabBarLabel: t("listCharacters"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="users" size={size} color={color} />
            ),
          }}
          component={CharacterNavigation}
        />
        <Tab.Screen
          name="DocCharacter"
          options={{
            tabBarLabel: t("documentation"),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="documents" size={size} color={color} />
            ),
          }}
          component={DocCharacter}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarLabel: t("settings"),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="gears" size={size} color={color} />
            ),
          }}
          component={Settings}
        />
      </Tab.Navigator>
    </View>
  );
};
