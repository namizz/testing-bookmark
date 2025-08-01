import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
export const api = createApi({
  reducerPath: "opportunities",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com/",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user?.data.accessToken;
      console.log("token", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBookmark: builder.query({
      query: () => "bookmarks",
    }),
    createBookmark: builder.mutation({
      query: (id) => ({ url: `bookmarks/${id}`, method: "POST" }),
    }),
    deleteBookmark: builder.mutation({
      query: (id) => ({ url: `bookmarks/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarkQuery,
} = api;
