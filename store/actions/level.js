import { authActions } from "../slices/auth";
import { uiActions } from "../slices/ui";
import store from "../index";
import { getImageFromCache, getRandomImages } from "../database/images";
import { openDatabase } from "../database";
import { levelActions } from "../slices/level";
const db = openDatabase();

export const initializeLevel = (level) => {
  return async (dispatch) => {
    console.log("initializing level");
    await dispatch(levelActions.initializeLevel());
    console.log("level initialized");
    let randomImages = await getRandomImages(db, level.number);
    let images = await Promise.all(
      randomImages.map(async (image) => {
        let imageData = await getImageFromCache(db, image.url);
        return {
          ...image,
          file: imageData,
          show: null,
          isSelected: false,
        };
      })
    );
    let list = [
      ...images,
      ...images.map((image) => {
        return { ...image, id: image.id + 100 };
      }),
    ].sort(() => Math.random() - 0.5);
    // const middleIndex = Math.ceil(list.length / 2);
    // const firstHalf = list.splice(0, middleIndex);
    // const secondHalf = list.splice(-middleIndex);
    await dispatch(
      levelActions.setCards({
        cards: [...list],
      })
    );

    setTimeout(async () => {
      await dispatch(levelActions.closeAllCards());
      await dispatch(
        levelActions.setFirstFlip({
          firstFlip: false,
        })
      );
    }, 3000);
  };
};

export const selectCard = (id) => {
  return async (dispatch) => {
    dispatch(levelActions.selectCard({ id: id }));
  };
};
