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
  cacheAllImages,
  dropImageTableAndRecreate,
  removeDuplicatedImages,
} from "./store/database/images";
import {
  clearCompletedLevels,
  dropCompletedLevelsTableAndRecreate,
} from "./store/database/completedLevels";
import {
  clearCompletedCollections,
  dropCompletedCollectionsTableAndRecreate,
} from "./store/database/completedCollections";
import * as Sentry from "sentry-expo";

LogBox.ignoreLogs([
  "NativeBase:",
  "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).",
  "When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.",
]);

Sentry.init({
  dsn: "https://4ee81bf273804fd192577405a9befa35@o1236693.ingest.sentry.io/6386724",
  enableInExpoDevelopment: true,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

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
    clearCompletedLevels(db);
    cacheAllImages(db);
    removeDuplicatedImages(db);
    dropCompletedCollectionsTableAndRecreate(db);
    clearCompletedCollections(db);
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
