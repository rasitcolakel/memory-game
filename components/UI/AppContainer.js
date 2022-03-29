import React, { useEffect } from "react";
import { Box, ZStack, Text, View } from "native-base";
import {
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { uiActions } from "../../store/slices/ui";
export default function AppContainer({ children, keyboardAvoiding = false }) {
  const dispatch = useDispatch();
  ScreenOrientation.unlockAsync();
  const { loading } = useSelector((state) => state.ui);
  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info) => {
      dispatch(
        uiActions.setOrientation({
          orientation: info,
        })
      );
    });
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        dispatch(
          uiActions.setOrientation({
            orientation: evt.orientationInfo.orientation,
          })
        );
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" translucent={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
          bg={{
            linearGradient: {
              colors: [
                "primary.400",
                "primary.600",
                "primary.600",
                "primary.400",
              ],
              start: [0, 0.33, 0.66, 1],
              end: [1, 0.66, 0.33, 0],
              locations: [0, 0.33, 0.66, 1],
            },
          }}
        >
          {children}
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
});
