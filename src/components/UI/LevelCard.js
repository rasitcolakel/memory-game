import { Text, Box, Icon, HStack, Pressable } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LevelCard({ level }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.push("Level", {
          level: level,
        })
      }
    >
      <Box
        borderWidth="4"
        borderRadius="3xl"
        borderColor="amber.400"
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
          <Icon name="star" size="6" color="amber.400" as={AntDesign} />
          <Icon name="star" size="8" color="amber.400" as={AntDesign} />
          <Icon name="star" size="6" color="amber.400" as={AntDesign} />
        </HStack>
        <Text color="amber.400" fontSize="40" fontWeight="extrabold">
          {level.number}
        </Text>
      </Box>
    </Pressable>
  );
}
