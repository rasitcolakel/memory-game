import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Collection from "../components/screens/Collection";
import Collections from "../components/screens/Collections";
import Profile from "../components/screens/Profile";
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
