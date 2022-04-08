import { createSlice } from "@reduxjs/toolkit";
import * as ScreenOrientation from "expo-screen-orientation";

let initialState = {
  orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
  loading: false,
  toast: {
    visible: true,
    title: null,
    status: null,
    description: null,
  },
};

const slice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setOrientation(state, action) {
      state.orientation =
        action.payload.orientation !== 4 ? "PORTRAIT" : "LANDSCAPE";
    },
    setLoading(state, action) {
      state.loading = action.payload.loading;
    },
    showToast(state, action) {
      state.toast = { ...action.payload.toast };
    },
    closeToast(state) {
      state.toast = { ...initialState.toast };
    },
  },
});

export const uiReducer = slice.reducer;
export const uiActions = slice.actions;
