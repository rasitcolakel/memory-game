import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/screens/Home";
import Level from "../components/screens/Level";
const Stack = createNativeStackNavigator();

export default function CollectionStack() {
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
