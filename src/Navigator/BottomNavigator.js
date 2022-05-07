import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import CollectionStack from "./CollectionStack";
import LevelStack from "./LevelStack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="LevelStack"
        component={LevelStack}
        options={{
          headerShown: false,
          title: "Levels",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="format-list-numbered"
              color={color}
              size={size}
              as={MaterialIcons}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="CollectionStack"
        component={CollectionStack}
        options={{
          title: "Collections",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="category"
              color={color}
              size={size}
              as={MaterialIcons}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
