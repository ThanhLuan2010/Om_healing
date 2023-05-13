import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: "login",
        method: "POST",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: ({ body }) => ({
        url: "register",
        method: "POST",
        body: body,
      }),
    }),
    getUserInfo: builder.mutation({
      query: () => ({
        url: "me",
        params: {},
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useGetUserInfoQuery } =
  userApi;
