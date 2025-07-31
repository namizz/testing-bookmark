import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "opportunities",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "opportunities/search",
    }),
    getJobById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = api;
