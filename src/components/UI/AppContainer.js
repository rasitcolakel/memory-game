import React, { useEffect } from "react";
import { Box, Spinner } from "native-base";
import {
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
export default function AppContainer({ children, keyboardAvoiding = false }) {
  const { loading } = useSelector((state) => state.ui);

  function KeyboardAvoiding({ children }) {
    if (keyboardAvoiding) {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    }
    return children;
  }
  return (
    <>
      <StatusBar style="light" translucent={true} />
      <KeyboardAvoiding>
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
          {loading && (
            <Box
              bg="black"
              flex="1"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                opacity: 0.1,
              }}
              justifyContent="center"
            >
              <Spinner color="white" size="lg" />
            </Box>
          )}
        </Box>
      </KeyboardAvoiding>
    </>
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
