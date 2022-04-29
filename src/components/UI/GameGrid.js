import React, { useState, useEffect } from "react";
import { openDatabase } from "../../../store/database";
import { Box, View } from "native-base";
import { FlipCard } from "../UI/FlipCard";
import {
  LightSpeedInLeft,
  LightSpeedInRight,
  StretchInX,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { checkMatch, initializeLevel } from "../../../store/actions/level";

export default function GameGrid({ level }) {
  const dispatch = useDispatch();
  const { cards, animations, choiceOne, choiceTwo } = useSelector(
    (state) => state.level
  );
  const { firstFlip } = animations;
  const [containerLayout, setContainerLayout] = useState(null);
  const [cardSize, setCardSize] = useState(null);
  useEffect(() => {
    dispatch(initializeLevel(level));
  }, []);

  React.useEffect(() => {
    if (choiceOne && choiceTwo) dispatch(checkMatch());
  }, [choiceOne, choiceTwo]);
  React.useEffect(() => {
    if (cards.length === 0 || containerLayout === null) return;
    let height = containerLayout.height / cards.length;
    let width = containerLayout.width / cards[0].length;
    let min = Math.min(height, width);
    if (min > containerLayout.height / 3) {
      min = containerLayout.height / 2.5;
    }
    setCardSize(min - 10);
  }, [containerLayout, cards]);

  return (
    <View
      flex={1}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        setContainerLayout({ x, y, width, height });
      }}
    >
      {cardSize !== null &&
        cards.length &&
        cards?.map((half, key) => (
          <Box
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "space-evenly",
            }}
            key={key}
          >
            {half.map((card) => (
              <FlipCard
                card={card}
                key={card.id}
                firstFlip={firstFlip}
                show={
                  choiceOne?.id === card.id ||
                  choiceTwo?.id === card.id ||
                  firstFlip ||
                  card.matched
                }
                frontEntering={
                  firstFlip
                    ? Math.random() < 0.5
                      ? LightSpeedInRight.duration(1500)
                      : LightSpeedInLeft.duration(1500)
                    : StretchInX
                }
                size={cardSize}
              />
            ))}
          </Box>
        ))}
    </View>
  );
}
