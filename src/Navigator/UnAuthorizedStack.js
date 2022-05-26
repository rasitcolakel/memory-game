import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Login from "../components/screens/Auth/Login";
import EmailConfirmation from "../components/screens/Auth/EmailConfirmation";
import SignUp from "../components/screens/Auth/SignUp";
import ForgotPassword from "../components/screens/Auth/ForgotPassword";
import ForgotPasswordSubmit from "../components/screens/Auth/ForgotPasswordSubmit";
export default function UnAuthorizedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordSubmit"
        component={ForgotPasswordSubmit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
