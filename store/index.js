import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./slices/auth";
import { uiReducer } from "./slices/ui";
const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
