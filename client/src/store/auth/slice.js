import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice";

const initialState = {
  user: null, // Holds user data if logged in
  token: null, // Holds the JWT token
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     authApi.endpoints.login.matchFulfilled,
  //     (state, { payload }) => {
  //       state.user = payload.user;
  //       state.token = payload.token;
  //     }
  //   );
  //   builder.addMatcher(
  //     authApi.endpoints.signup.matchFulfilled,
  //     (state, { payload }) => {
  //       state.user = payload.user;
  //       state.token = payload.token;
  //     }
  //   );
  // },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
