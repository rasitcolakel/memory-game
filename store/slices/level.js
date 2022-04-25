import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cards: [],
  animations: {
    firstFlip: true,
  },
};

const slice = createSlice({
  name: "level",
  initialState: initialState,
  reducers: {
    initializeLevel: (state) => {
      state = {
        ...initialState,
      };
    },
    setCards: (state, action) => {
      state.cards = action.payload.cards;
    },
    resetCards: (state) => {
      state.cards = [];
    },
    closeAllCards: (state) => {
      if (state.cards.length === 0) return;
      let cards = state.cards.map((card) => {
        return { ...card, show: false };
      });
      state.cards = [...cards];
    },

    selectCard(state, action) {
      let index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      state.cards[index].isSelected = true;
    },
    resetAnimations: (state) => {
      state.animations = initialState.animations;
    },
    setFirstFlip: (state, action) => {
      console.log("setFirstFlip called");
      state.animations.firstFlip = action.payload.firstFlip;
    },
  },
});

export const levelReducer = slice.reducer;
export const levelActions = slice.actions;
