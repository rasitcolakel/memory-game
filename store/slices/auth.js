import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  authToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.authToken = action.payload.authToken;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
