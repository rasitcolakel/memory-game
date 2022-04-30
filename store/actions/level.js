import { authActions } from "../slices/auth";
import { uiActions } from "../slices/ui";
import store from "../index";
import { getImageFromCache, getRandomImages } from "../database/images";
import { openDatabase } from "../database";
import { levelActions } from "../slices/level";
import { Audio } from "expo-av";
import * as  _ from "lodash";
import {
  createCompletedLevels
} from "../../src/graphql/mutations";
import { API } from "aws-amplify";
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
  if (length < 10) {
    return length / 2;
  } else if (length < 20) {
    return length / 3;
  } else if (length < 30) {
    return length / 4;
  }
  return length / 5;
};
export const initializeLevel = (level) => {
  return async (dispatch) => {
    await dispatch(levelActions.resetTurns());
    await dispatch(levelActions.initializeLevel());
    await dispatch(levelActions.setStopped({ stopped: false }));
    await dispatch(
      levelActions.setFirstFlip({
        firstFlip: true,
      })
    );
    await dispatch(
      levelActions.setGameRules({
        gameRules: {
          for1Stars: level.for1Stars,
          for2Stars: level.for2Stars,
          for3Stars: level.for3Stars,
          seconds: level.seconds,
          remaining: null,
        },
      })
    );

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
    list = makeGridFromCards(list, calculateColumns(list.length));
    await dispatch(
      levelActions.setCards({
        cards: [...list],
      })
    );
    setTimeout(async () => {
      await dispatch(
        levelActions.setFirstFlip({
          firstFlip: false,
        })
      );
      await dispatch(
        levelActions.setRemaining({
          remaining: level.seconds,
        })
      );
      await dispatch(startTimer());
    }, 3000);
  };
};

export const selectCard = (id) => {
  return async (dispatch) => {
    await playTapping();
    const { choiceOne, choiceTwo } = store.getState().level;
    if (choiceOne === null) {
      dispatch(levelActions.setChoiceOne({ choiceOne: id }));
    } else if (choiceTwo === null) {
      dispatch(levelActions.setChoiceTwo({ choiceTwo: id }));
    }
  };
};

export const checkMatch = () => {
  return async (dispatch) => {
    const { choiceOne, choiceTwo } = store.getState().level;
    if (choiceOne !== null && choiceTwo !== null) {
      dispatch(levelActions.increaseTurns());
      if (choiceOne.url === choiceTwo.url) {
        await playSuccess();
        dispatch(levelActions.setCardVisibility({ id: choiceOne.id }));
        dispatch(levelActions.setCardVisibility({ id: choiceTwo.id }));
      } else {
        await playError();
      }
      setTimeout(() => {
        dispatch(levelActions.setChoiceOne({ choiceOne: null }));
        dispatch(levelActions.setChoiceTwo({ choiceTwo: null }));
      }, 1000);
      // dispatch(
      //   uiActions.setSnackbar({
      //     open: true,
      //     message: "You found a match!",
      //     severity: "success",
      //   })
      // );
    }
  };
};

const playTapping = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("./../../assets/tapping.mp3")
  );
  await sound.playAsync();
  unloadSound(sound);
};

const playSuccess = async () => {
  console.log("Loading Sound");
  const { sound } = await Audio.Sound.createAsync(
    require("./../../assets/success.mp3")
  );
  await sound.playAsync();
  unloadSound(sound);
};

export const playError = async () => {
  console.log("Loading Sound");
  const { sound } = await Audio.Sound.createAsync(
    require("./../../assets/error.wav")
  );
  await sound.playAsync();
  unloadSound(sound);
};

export const unloadSound = (sound) => {
  sound.setOnPlaybackStatusUpdate(async (status) => {
    if (status.didJustFinish === true) {
      await sound.unloadAsync();
    }
  });
};

let timer = null;
export const startTimer = () => {
  return async (dispatch) => {
    try {
      clearInterval(timer);
      timer = setInterval(() => {
        dispatch(levelActions.decrementRemaining());
      }, 1000);
    } catch (e) {
      console.log("Error", e);
    }
  };
};
export const stopTimer = () => {
  clearInterval(timer);
};

export const stopGame = () => {
  return async (dispatch) => {
    stopTimer();
    dispatch(levelActions.setStopped({ stopped: true }));
  };
};
export const replayGame = () => {
  return async (dispatch) => {
    await dispatch(startTimer());
    await dispatch(levelActions.setStopped({ stopped: false }));
  };
};

export const completeLevel = (level) => {
  return async (dispatch) => {
    stopTimer();
    await dispatch(levelActions.setStopped({ stopped: true }));
    const { turns, cards } = store.getState().level;
    if (_.isFinite((cards[0].length) / (turns))) {
      let hitRate = (cards[0].length) / (turns) * 100;
      console.log("hitRate", hitRate, turns, cards[0].length);
      console.log("level", level)
      const { user } = store.getState().auth;
      const completeLevelQuery = await API.graphql({
        query: createCompletedLevels,
        variables: { input: { levelID: level.id, userID: user.sub, rate: hitRate } },
      });
      console.log("completeLevelQuery", completeLevelQuery);
    }
  };
}