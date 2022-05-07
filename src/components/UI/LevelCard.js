import { Text, Box, Icon, HStack, Pressable } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LevelCard({ level, isPrevLevelCompleted }) {
  const navigation = useNavigation();
  const isCompleted = isPrevLevelCompleted;
  let color = isCompleted ? "amber.400" : "gray.300";
  return (
    <Pressable
      onPress={() =>
        navigation.push("Level", {
          level: level,
        })
      }
      disabled={!isPrevLevelCompleted}
    >
      <Box
        borderWidth="4"
        borderRadius="3xl"
        borderColor={color}
        bg={{
          linearGradient: {
            colors: ["white", "white"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="4"
        margin="2"
        alignItems="center"
      >
        <HStack alignItems="center">
          <RenderStars level={level} color={color} />
        </HStack>
        <Text color={color} fontSize="40" fontWeight="extrabold">
          {level.number}
        </Text>
      </Box>
    </Pressable>
  );
}

const RenderStars = ({ level, color }) => {
  let isCompleted = level.completed !== null;
  let rate = level?.completed?.rate;
  let stars = {
    star1: isCompleted
      ? rate >= level?.for1Stars
        ? "star"
        : "staro"
      : "staro",
    star2: isCompleted
      ? rate >= level?.for2Stars
        ? "star"
        : "staro"
      : "staro",
    star3: isCompleted
      ? rate >= level?.for3Stars
        ? "star"
        : "staro"
      : "staro",
  };
  return (
    <>
      <Icon name={stars.star1} size="5" color={color} as={AntDesign} />
      <Icon name={stars.star2} size="6" color={color} as={AntDesign} />
      <Icon name={stars.star3} size="7" color={color} as={AntDesign} />
    </>
  );
};
