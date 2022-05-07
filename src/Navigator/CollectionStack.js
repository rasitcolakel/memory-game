import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Collections from "../components/screens/Collections";
const Stack = createNativeStackNavigator();

export default function CollectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Collections"
        component={Collections}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
