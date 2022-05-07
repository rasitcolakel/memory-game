import React, { useEffect } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Navigator from "./src/Navigator/Navigator";
import { openDatabase } from "./store/database";
import * as Updates from "expo-updates";
import { setStatusBarHidden } from "expo-status-bar";
import {
  createImageTable,
  dropImageTableAndRecreate,
} from "./store/database/images";
import { dropCompletedLevelsTableAndRecreate } from "./store/database/completedLevels";
LogBox.ignoreLogs([
  "NativeBase:",
  "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
]);
const db = openDatabase();
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

Amplify.configure(awsconfig);
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

function App() {
  useEffect(() => {
    setStatusBarHidden(true);
    checkUpdates();
    dropImageTableAndRecreate(db);
    dropCompletedLevelsTableAndRecreate(db);
  }, []);

  // Check the OTA (On the Air) Updates
  const checkUpdates = () => {
    if (!__DEV__) {
      Updates.checkForUpdateAsync().then(({ isAvailable }) => {
        if (!isAvailable) {
        } else {
          Updates.fetchUpdateAsync()
            .then(({ isNew }) => {
              Alert.alert(
                "New Update",
                "Please Update Your App By Clicking Ok",
                [
                  {
                    text: "Cancel",
                    onPress: () => Alert.alert("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Ok",
                    onPress: () => Updates.reloadAsync(),
                  },
                ]
              );
            })
            .catch((e) => {});
        }
      });
    }
  };
  return (
    <Provider store={store}>
      <NativeBaseProvider config={config} theme={theme}>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
