import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://teamtaskmanager-production-1362.up.railway.app";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/api",
  }),

  endpoints: (builder) => ({
    
    // ✅ LOGIN API
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ REGISTER API
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ GET USERS
    getUsers: builder.query({
      query: () => "/users",
    }),

  }),
});

// ✅ EXPORT ALL HOOKS
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
} = apiSlice;