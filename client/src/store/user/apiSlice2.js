import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { logout } from "../auth/slice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result:", result);
  console.log("args:", args);
  console.log("api:", api);
  console.log("extraOptions:", extraOptions);

  if (result?.error?.status === 401) {
    // console.log("refresh token:", localStorage.getItem("refreshToken"));
    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshToken",
        method: "POST",
        body: { token: localStorage.getItem("refreshToken") },
      },
      api,
      extraOptions
    );

    console.log("refreshResult:", refreshResult);

    if (refreshResult?.data) {
      localStorage.setItem("accessToken", refreshResult.data.accessToken);
      localStorage.setItem("refreshToken", refreshResult.data.refreshToken);
      result = await baseQuery(args, api, extraOptions);
      console.log("result:", result);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      api.dispatch(logout()); // to use in case you are not in a component (reminder: hooks are usable only in components)
    }
  }

  return result;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    getMe: builder.query({
      query: () => "users/me",
    }),
  }),
});

export const { useGetUsersQuery, useGetMeQuery } = userApi;
