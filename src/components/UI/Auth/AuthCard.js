import { View, Text } from "react-native";
import React from "react";
import AppContainer from "../AppContainer";
import { Box, Center, Container, ScrollView } from "native-base";
import { useSelector } from "react-redux";

export default function AuthCard({ children }) {
  const { orientation } = useSelector((state) => state.ui);

  return (
    <AppContainer keyboardAvoiding={false}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          width={orientation === "LANDSCAPE" ? "50%" : "90%"}
          px="5"
          bg="white"
          rounded="2xl"
          py="5"
          my="10"
        >
          {children}
        </Box>
      </ScrollView>
    </AppContainer>
  );
}
