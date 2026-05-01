import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

 baseQuery: fetchBaseQuery({
  baseUrl: "https://teamtaskmanager-production-1362.up.railway.app/api",
  credentials: "include",
}),
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => "/users/get-team",
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
} = apiSlice;