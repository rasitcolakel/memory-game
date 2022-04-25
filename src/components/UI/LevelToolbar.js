import { View, Text } from "react-native";
import React from "react";
import { HStack, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { levelActions } from "../../../store/slices/level";

export default function LevelToolbar() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log("rendered agia");
  return (
    <HStack alignItems="center">
      <TouchableOpacity
        onPress={() => {
          dispatch(levelActions.initializeLevel());
          navigation.goBack();
        }}
      >
        <Icon name="chevron-back" size="10" color="white" as={Ionicons} />
      </TouchableOpacity>

      <Text>LevelToolbar</Text>
    </HStack>
  );
}
