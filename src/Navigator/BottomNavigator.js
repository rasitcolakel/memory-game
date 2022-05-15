import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import CollectionStack from "./CollectionStack";
import LevelStack from "./LevelStack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "native-base";
import ProfileStack from "./ProfileStack";

const BottomTabs = createBottomTabNavigator();

export default function BottomNavigator() {
  const theme = useTheme();
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.amber[500],
        activeTintColor: theme.colors.amber[500],
      }}
    >
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
              size={size + 10}
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
      <BottomTabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} as={AntDesign} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
