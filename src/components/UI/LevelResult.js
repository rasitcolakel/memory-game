import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { AlertDialog, HStack, Icon, IconButton, Text } from "native-base";
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
  if (!levelResult.isOpen) return <></>;
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertDialog.Content
        style={{
          width: "50%",
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
      >
        <AlertDialog.Header
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text fontSize="xl">
            {levelResult?.isCompleted
              ? `${
                  levelResult?.type !== "collection" ? "Level" : "Collection"
                } Completed`
              : `${
                  levelResult?.type !== "collection" ? "Level" : "Collection"
                } Failed`}
          </Text>
          <IconButton
            size="lg"
            p="0"
            _icon={{
              as: Ionicons,
              name: "close",
              color: "amber.500",
            }}
            onPress={() => navigation.goBack()}
          />
        </AlertDialog.Header>
        <AlertDialog.Body>
          <RenderStars
            gameRules={gameRules}
            isCompleted={levelResult?.isCompleted}
            rate={levelResult?.hitRate}
          />
        </AlertDialog.Body>
        {levelResult?.type !== "collection" && (
          <AlertDialog.Footer
            style={{
              justifyContent: levelResult?.isCompleted
                ? "space-between"
                : "center",
            }}
          >
            <IconButton
              size="sm"
              _icon={{
                as: Ionicons,
                name: "refresh",
                color: "amber.500",
              }}
              onPress={() => dispatch(initializeLevel(level))}
            />
            {levelResult?.isCompleted && (
              <IconButton
                size="sm"
                _icon={{
                  as: AntDesign,
                  name: "forward",
                  color: !nextLevel ? "gray.300" : "amber.500",
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
        )}
      </AlertDialog.Content>
    </View>
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
