import { createSlice } from "@reduxjs/toolkit";
var _ = require("lodash");

const initialState = {
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
  levelResult: {
    isCompleted: false,
    isOpen: false,
    hitRate: 0,
  },
};

const slice = createSlice({
  name: "level",
  initialState: initialState,
  reducers: {
    initializeLevel: (state) => {
      return { ...initialState };
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
    resetTurns: (state) => {
      state.turns = 0;
    },
    setLevelResult: (state, action) => {
      state.levelResult = action.payload.levelResult;
    },
    resetLevelResult: (state) => {
      state.levelResult = initialState.levelResult;
    },
  },
});

export const levelReducer = slice.reducer;
export const levelActions = slice.actions;
