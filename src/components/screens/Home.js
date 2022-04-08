import { Button, View } from "native-base";
import React from "react";
import FlipCard from "../UI/FlipCard";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppContainer from "../UI/AppContainer";
import { signOut } from "../../../store/actions/auth";
export default function Home() {
  const { orientation } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  return (
    <AppContainer>
      <View
        style={{
          height: "100%",
          flex: 1,
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: StatusBar.currentHeight || 0,
        }}
        p="2"
      >
        <Button onPress={() => dispatch(signOut())}>123123</Button>
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />

        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
        <FlipCard
          width={orientation === "LANDSCAPE" ? `${33.3 / 2}%` : "33.3%"}
        />
      </View>
    </AppContainer>
  );
}
