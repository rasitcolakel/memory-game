import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

let initialState = {
  token: null,
  user: null,
  isLogged: null,
  pushToken: null,
  changePassword: {
    visible: false,
  },
  editProfile: {
    visible: false,
  },
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = jwt_decode(action.payload.token);
      state.isLogged = true;
    },
    setIsLogged(state, action) {
      state.isLogged = action.payload.isLogged;
    },
    signOut(state) {
      state.user = null;
      state.isLogged = false;
      state.token = null;
    },
    setPushToken(state, action) {
      state.pushToken = action.payload.pushToken;
    },
    setUserDetails(state, action) {
      state.user = {
        ...state.user,
        userDetails: { ...action.payload.userDetails },
      };
    },
    resetChangePasswordState(state) {
      state.changePassword = {
        ...initialState.changePassword,
      };
    },
    setChangePasswordState(state, action) {
      state.changePassword = {
        ...state.changePassword,
        ...action.payload,
      };
    },
    resetEditProfileState(state) {
      state.editProfile = {
        ...initialState.editProfile,
      };
    },
    setEditProfileState(state, action) {
      state.editProfile = {
        ...state.editProfile,
        ...action.payload,
      };
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
