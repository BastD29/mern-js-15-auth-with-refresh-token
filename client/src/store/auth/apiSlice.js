import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
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
        token: response.token,
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
        token: response.token,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
