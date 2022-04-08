import Animated, {
  FlipInXDown,
  FlipInXUp,
  FlipOutXDown,
  FlipOutXUp,
  Keyframe,
} from "react-native-reanimated";
import React, { useState } from "react";
import { Pressable, Text, View } from "native-base";

export default function FlipCard({ width }) {
  const [show, setShow] = useState(false);
  const [firstFlip, setFirstFlip] = useState(true);
  const keyframe = new Keyframe({
    0: {
      transform: [{ rotate: "0deg" }],
    },
    25: {
      transform: [{ rotate: "10deg" }],
    },
    50: {
      transform: [{ rotate: "0deg" }],
    },
    75: {
      transform: [{ rotate: "-10deg" }],
    },
    100: {
      transform: [{ rotate: "0deg" }],
    },
  }).duration(400);
  const frontEntering = !firstFlip ? FlipInXDown.duration(500) : keyframe;
  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
      setFirstFlip(false);
    }, 3000);
  }, []);
  return (
    <View width={width} p={2}>
      {show && (
        <Animated.View
          entering={FlipInXUp}
          exiting={FlipOutXUp}
          style={{
            width: "100%",
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              height: "100%",
              width: "100%",
            }}
            flex={1}
            alignItems="center"
            justifyContent="center"
            onPress={() => {
              setShow(!show);
            }}
            bg={"amber.500"}
            disabled={firstFlip}
          >
            <Text color={"white"} fontSize="6xl">
              ?
            </Text>
          </Pressable>
        </Animated.View>
      )}

      {!show && (
        <Animated.View
          entering={frontEntering}
          exiting={FlipOutXDown}
          style={{
            width: "100%",
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              height: "100%",
              width: "100%",
            }}
            onPress={() => {
              setShow(!show);
            }}
            bg={"amber.700"}
            disabled={firstFlip}
          >
            <Text>Front</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}
