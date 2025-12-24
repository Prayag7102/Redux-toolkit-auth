// src/features/auth/authApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser, clearUser } from "./authSlice";
import { baseQueryWithReauth } from "../../app/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(setUser(data.user));
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        localStorage.removeItem("accessToken");
        dispatch(clearUser());
      },
    }),

    me: builder.query({
      query: () => "/auth/me",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch {
          dispatch(clearUser());
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
