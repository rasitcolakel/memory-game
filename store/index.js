import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./slices/auth";
import { uiReducer } from "./slices/ui";
import { contentsReducer } from "./slices/contents";
import { levelReducer } from "./slices/level";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  contents: contentsReducer,
  level: levelReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
