import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "opportunities",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com/",
  }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "opportunities/search",
    }),
    getJobById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),
    getBookmark: builder.query({
      query: () => "bookmarks",
    }),
    createBookmark: builder.mutation({
      query: (id) => ({ url: `bookmarks/${id}`, method: "POST" }),
    }),
    deleteBookmark: builder.mutation({
      query: (id) => ({ url: `bookmarks/${id}` }),
      method: "DELETE",
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = api;
