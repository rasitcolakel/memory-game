import { createSlice } from "@reduxjs/toolkit";
import * as ScreenOrientation from "expo-screen-orientation";

let initialState = {
  orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
  loading: false,
};

const slice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setOrientation(state, action) {
      console.log("state.orientation", action.payload.orientation);
      state.orientation =
        action.payload.orientation !== 4 ? "PORTRAIT" : "LANDSCAPE";
    },
    setLoading(state, action) {
      state.loading = action.payload.loading;
    },
  },
});

export const uiReducer = slice.reducer;
export const uiActions = slice.actions;
