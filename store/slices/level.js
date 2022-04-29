import { createSlice } from "@reduxjs/toolkit";
var _ = require("lodash");

let initialState = {
  cards: [],
  stopped: false,
  animations: {
    firstFlip: true,
  },
  choiceOne: null,
  choiceTwo: null,
  turns: 0,
  gameRules: {
    for1Stars: 0,
    for2Stars: 0,
    for3Stars: 0,
    seconds: 100,
    remaining: null,
  },
};

const slice = createSlice({
  name: "level",
  initialState: initialState,
  reducers: {
    initializeLevel: (state) => {
      state = _.cloneDeep(initialState);
      state.gameRules = _.cloneDeep(initialState.gameRules);
      state.stopped = false;
    },
    setCards: (state, action) => {
      state.cards = action.payload.cards;
    },
    resetCards: (state) => {
      state.cards = [];
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
      state.animations.firstFlip = action.payload.firstFlip;
    },
    setChoiceOne: (state, action) => {
      state.choiceOne = action.payload.choiceOne;
    },
    setChoiceTwo: (state, action) => {
      state.choiceTwo = action.payload.choiceTwo;
    },
    increaseTurns: (state) => {
      state.turns += 1;
    },
    setCardVisibility: (state, action) => {
      state.cards = [
        ...state.cards.map((half) =>
          half.map((card) =>
            card.id === action.payload.id ? { ...card, matched: true } : card
          )
        ),
      ];
    },
    setGameRules: (state, action) => {
      state.gameRules = action.payload.gameRules;
    },
    setRemaining: (state, action) => {
      state.gameRules.remaining = action.payload.remaining;
    },
    decrementRemaining: (state) => {
      if (state.gameRules.remaining > 0) state.gameRules.remaining -= 1;
    },
    setStopped: (state, action) => {
      state.stopped = action.payload.stopped;
    },
  },
});

export const levelReducer = slice.reducer;
export const levelActions = slice.actions;
