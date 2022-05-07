import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDialog,
  Button,
  HStack,
  Icon,
  IconButton,
} from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { initializeLevel } from "../../../store/actions/level";
import Animated, {
  Easing,
  Keyframe,
  StretchOutY,
} from "react-native-reanimated";
import { levelActions } from "../../../store/slices/level";
import { useNavigation } from "@react-navigation/native";

export default function LevelResult({ level }) {
  const navigation = useNavigation();
  const cancelRef = React.useRef(null);
  const dispatch = useDispatch();
  const { gameRules, levelResult } = useSelector((state) => state.level);
  const { data } = useSelector((state) => state.contents.levels);
  const findNextLevel = data && data.findIndex((l) => l.id === level.id);
  const nextLevel = data && data[findNextLevel + 1];
  if (levelResult === undefined || !levelResult.isOpen) return <></>;
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={levelResult.isOpen}
      onClose={() => dispatch(levelActions.resetLevelResult())}
    >
      <AlertDialog.Content
        style={{
          width: "60%",
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          {levelResult?.isCompleted ? "Level Completed" : "Level Failed"}
        </AlertDialog.Header>
        <AlertDialog.Body>
          <RenderStars
            gameRules={gameRules}
            isCompleted={levelResult?.isCompleted}
            rate={levelResult?.hitRate}
          />
        </AlertDialog.Body>
        <AlertDialog.Footer
          style={{
            justifyContent: levelResult?.isCompleted
              ? "space-between"
              : "center",
          }}
        >
          <IconButton
            size="lg"
            _icon={{
              as: Ionicons,
              name: "refresh",
              color: "amber.500",
              size: "lg",
            }}
            onPress={() => dispatch(initializeLevel(level))}
          />
          {levelResult?.isCompleted && (
            <IconButton
              size="lg"
              _icon={{
                as: AntDesign,
                name: "forward",
                color: !nextLevel ? "gray.300" : "amber.500",
                size: "lg",
              }}
              disabled={!nextLevel}
              onPress={() => {
                if (nextLevel) {
                  navigation.setParams({ level: nextLevel });
                }
              }}
            />
          )}
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

const RenderStars = ({ gameRules, rate, isCompleted }) => {
  let stars = {
    star1: rate >= gameRules.for1Stars ? "star" : "staro",
    star2: rate >= gameRules.for2Stars ? "star" : "staro",
    star3: rate >= gameRules.for3Stars ? "star" : "staro",
  };

  return (
    <HStack justifyContent="center" alignItems="center">
      <AnimatedStar
        name={stars.star1}
        color={rate >= gameRules.for1Stars ? "amber.500" : "gray.300"}
        index={0}
        size={"60px"}
      />
      <AnimatedStar
        name={stars.star2}
        color={rate >= gameRules.for2Stars ? "amber.500" : "gray.300"}
        index={1}
        size={"70px"}
      />
      <AnimatedStar
        name={stars.star3}
        color={rate >= gameRules.for3Stars ? "amber.500" : "gray.300"}
        index={2}
        size={"80px"}
      />
    </HStack>
  );
};

const AnimatedStar = ({ name, color, index, size }) => {
  const [show, setShow] = useState(false);
  const enteringAnimation = new Keyframe(
    name === "star"
      ? {
          0: {
            transform: [
              {
                scale: 0,
              },
              {
                rotate: "-180deg",
              },
            ],
          },
          100: {
            transform: [
              {
                scale: 1,
              },
              {
                rotate: "0deg",
              },
            ],
          },
        }
      : {
          0: {
            transform: [
              {
                scale: 0,
              },
            ],
          },
          100: {
            transform: [
              {
                scale: 1,
              },
            ],
          },
        }
  )
    .duration(300)
    .delay(index * 300);
  useEffect(() => {
    setShow(false);

    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  return show ? (
    <Animated.View entering={enteringAnimation}>
      <Icon name={name} size={size} color={color} as={AntDesign} />
    </Animated.View>
  ) : (
    <></>
  );
};
