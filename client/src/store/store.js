import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./auth/apiSlice2";
import { userApi } from "./user/apiSlice2";

import authReducer from "./auth/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware),
});

export { store };
