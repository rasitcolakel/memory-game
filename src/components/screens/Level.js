import React, { useState, useEffect, useCallback } from "react";
import AppContainer from "../UI/AppContainer";
import {
  getImageFromCache,
  getRandomImages,
} from "../../../store/database/images";
import { openDatabase } from "../../../store/database";
import { Box, Image, View } from "native-base";
import LevelToolbar from "../UI/LevelToolbar";
import { FlipCard } from "../UI/FlipCard";
import {
  LightSpeedInLeft,
  LightSpeedInRight,
  StretchInX,
} from "react-native-reanimated";
const db = openDatabase();

const makeGridFromCards = (cards, columnsPerRow) => {
  const grid = [];
  for (let i = 0; i < cards.length; i++) {
    const row = Math.floor(i / columnsPerRow);
    if (!grid[row]) {
      grid[row] = [];
    }
    grid[row].push(cards[i]);
  }
  return grid;
};

const calculateColumns = (length) => {
  console.log("images ", length);
  if (length < 10) {
    return length / 2;
  } else if (length < 20) {
    return length / 3;
  } else if (length < 30) {
    return length / 4;
  }
  return length / 5;
};

export default function Level({ route, navigation }) {
  const { level } = route.params;

  return (
    <AppContainer>
      <View
        m={2}
        mx={10}
        flex={1}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log("org", { x, y, width, height });
        }}
      >
        <LevelToolbar level={level} />
        <CardContainer level={level} />
      </View>
    </AppContainer>
  );
}

function CardContainer({ level }) {
  const [firstFlip, setFirstFlip] = useState(true);
  const [images, setImages] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [containerLayout, setContainerLayout] = useState(null);
  const [cardSize, setCardSize] = useState(null);
  useEffect(() => {
    shuffle();
  }, []);
  const initialize = () => {
    console.log("initialized", firstFlip);
    if (!firstFlip) {
      return;
    }
    setFirstFlip(true);
    setTimeout(() => {
      setFirstFlip(false);
    }, 4000);
  };
  const shuffle = async () => {
    let randomImages = await getRandomImages(db, level.number);
    let images = await Promise.all(
      randomImages.map(async (image) => {
        let imageData = await getImageFromCache(db, image.url);
        return {
          ...image,
          file: imageData,
          matched: false,
        };
      })
    );
    let list = [
      ...images,
      ...images.map((image) => {
        return { ...image, id: image.id + 100 };
      }),
    ].sort(() => Math.random() - 0.5);

    setImages(makeGridFromCards(list, calculateColumns(list.length)));
    initialize();
  };

  const selectCard = (card) => {
    if (choiceOne === null) {
      setChoiceOne(card);
    } else if (choiceTwo === null) {
      setChoiceTwo(card);
    }
  };

  React.useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.url === choiceTwo.url) {
        setImages(
          images.map((cards) =>
            cards.map((card) => {
              if (card.id === choiceOne.id || card.id === choiceTwo.id) {
                return { ...card, matched: true };
              }
              return card;
            })
          )
        );
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(turns + 1);
        return;
      } else {
        setTimeout(() => {
          setTurns(turns + 1);
          setChoiceOne(null);
          setChoiceTwo(null);
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  React.useEffect(() => {
    console.log("layout", containerLayout);
    if (images.length === 0 || containerLayout === null) return;
    let height = containerLayout.height / images.length;
    let width = containerLayout.width / images[0].length;
    let min = Math.min(height, width);
    if (min > containerLayout.height / 3) {
      min = containerLayout.height / 2.5;
    }

    setCardSize(min - 10);
  }, [containerLayout, images]);
  console.log("cardsize", cardSize);
  return (
    <View
      flex={1}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        setContainerLayout({ x, y, width, height });
      }}
    >
      {cardSize !== null &&
        images?.map((half, key) => (
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
                selectCard={selectCard}
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
//https://stackblitz.com/edit/so-memo-children-cktdn1?file=src/App.js
