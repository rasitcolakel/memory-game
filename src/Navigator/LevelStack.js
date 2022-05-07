import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Home from "../components/screens/Home";
import Level from "../components/screens/Level";
export default function LevelStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Level"
        component={Level}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
