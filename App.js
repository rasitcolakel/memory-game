import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/screens/Auth/Login";
import Home from "./components/screens/Home";
import SignUp from "./components/screens/Auth/SignUp";
import { LinearGradient } from "expo-linear-gradient";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./store";

LogBox.ignoreLogs([
  "NativeBase:",
  "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
]);

// Define the stack navigator
const Stack = createNativeStackNavigator();

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

// extend the theme
export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#F9CABF",
      100: "#F7BBAC",
      200: "#F39D87",
      300: "#EF7E62",
      400: "#EC603D",
      500: "#E84118",
      600: "#B63212",
      700: "#83240D",
      800: "#501608",
      900: "#1D0803",
    },
  },
});
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider config={config} theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
