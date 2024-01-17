import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "/api",
    baseUrl: "https://auth-api-nigx.onrender.com/api",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      // transformResponse: (response) => ({
      //   user: response,
      //   token: response.accessToken,
      // }),
      transformResponse: (response) => {
        console.log("Response from server: ", response);

        return {
          user: response,
          token: response ? response.accessToken : null,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      // transformResponse: (response) => ({
      //   user: response,
      //   token: response.accessToken,
      // }),
      transformResponse: (response) => {
        console.log("Response from server: ", response);

        return {
          user: response,
          token: response ? response.accessToken : null,
        };
      },
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
