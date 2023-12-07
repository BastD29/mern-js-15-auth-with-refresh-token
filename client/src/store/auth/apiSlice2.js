import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => ({
        user: response,
        // token: response.token,
        token: response.accessToken,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => ({
        user: response,
        // token: response.token,
        token: response.accessToken,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refreshToken",
        method: "POST",
        body: { token: refreshToken },
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshTokenMutation } =
  authApi;
