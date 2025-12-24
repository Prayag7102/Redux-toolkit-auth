import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refresh = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refresh.data?.accessToken) {
      localStorage.setItem("accessToken", refresh.data.accessToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("accessToken");
      api.dispatch(clearUser());
    }
  }

  return result;
};