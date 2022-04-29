import Animated, { StretchOutY } from "react-native-reanimated";
import React from "react";
import { Box, Image, Pressable, Text } from "native-base";
import { useDispatch } from "react-redux";
import { selectCard } from "../../../store/actions/level";

export const FlipCard = ({
  size = 150,
  card,
  firstFlip,
  show,
  frontEntering,
}) => {
  const dispatch = useDispatch();

  const onSelect = () => {
    dispatch(selectCard(card));
  };
  return (
    <Box
      style={{
        height: size,
        width: size,
      }}
    >
      {!show && (
        <Animated.View
          entering={frontEntering}
          exiting={StretchOutY}
          style={{
            width: size,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              height: size,
              width: size,
            }}
            flex={1}
            alignItems="center"
            justifyContent="center"
            onPress={() => {
              onSelect(card);
            }}
            bg={"blue.500"}
            disabled={firstFlip || show}
            borderWidth="4"
            borderRadius="3xl"
            borderColor="amber.400"
          >
            <Text color={"white"} fontSize="6xl">
              ?
            </Text>
          </Pressable>
        </Animated.View>
      )}

      {show && (
        <Animated.View
          entering={frontEntering}
          exiting={StretchOutY}
          style={{
            width: size,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              height: size,
              width: size,
            }}
            onPress={() => {
              onSelect();
            }}
            bg={"blue.700"}
            disabled={firstFlip || show}
            alignItems="center"
            justifyContent="center"
            borderWidth="4"
            borderRadius="3xl"
            borderColor="amber.400"
          >
            <Image
              src={card.file}
              alt={"test"}
              width="90%"
              height={"90%"}
              key={card.id}
            />
          </Pressable>
        </Animated.View>
      )}
    </Box>
  );
};
