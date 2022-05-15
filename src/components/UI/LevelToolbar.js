import React from "react";
import { Text, HStack, Icon, Progress } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { levelActions } from "../../../store/slices/level";
import {
  completeLevel,
  replayGame,
  stopGame,
} from "../../../store/actions/level";
import { runOnJS } from "react-native-reanimated";

export default function LevelToolbar({ restartGame }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { gameRules, stopped } = useSelector((state) => state.level);
  const percentage =
    gameRules.remaining !== null
      ? (gameRules.remaining / gameRules.seconds) * 100
      : 100;

  React.useEffect(() => {
    levelCheck();
  }, [gameRules.remaining]);

  const levelCheck = () => {
    if (gameRules.remaining === 0) {
      dispatch(completeLevel());
      dispatch(
        levelActions.setRemaining({
          remaining: null,
        })
      );
    }
  };
  return (
    <HStack alignItems="center">
      <TouchableOpacity
        onPress={() => {
          dispatch(levelActions.initializeLevel());
          runOnJS(navigation.goBack());
        }}
      >
        <Icon name="chevron-back" size="10" color="white" as={Ionicons} />
      </TouchableOpacity>
      <HStack flex={1} alignItems="center" px={2}>
        {gameRules?.type !== "collection" && (
          <>
            <Progress
              size="2xl"
              value={percentage}
              _filledTrack={{
                bg: percentage < 30 ? "yellow.500" : "lime.500",
              }}
              flex={1}
            />
            <Text color="white" fontSize="2xl" px={2}>
              {gameRules.remaining || "  "}
            </Text>
          </>
        )}
      </HStack>
      <TouchableOpacity
        disabled={gameRules.remaining === null}
        onPress={() => dispatch(stopped ? replayGame() : stopGame())}
        style={{
          marginHorizontal: 5,
        }}
      >
        <Icon
          name={stopped ? "play" : "stop"}
          size="10"
          color="white"
          as={Ionicons}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={restartGame}
        disabled={gameRules.remaining === null}
        style={{
          marginHorizontal: 5,
        }}
      >
        <Icon name="refresh" size="10" color="white" as={Ionicons} />
      </TouchableOpacity>
    </HStack>
  );
}
