import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://akil-backend.onrender.com/",
  prepareHeaders: async (headers) => {
    const session = await getSession();
    console.log("session", session);
    const accessToken =
      (session &&
        (session as any).user &&
        (session as any).user.data.accessToken) ||
      (session && (session as any).accessToken);
    console.log(accessToken);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "opportunities",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBookmark: builder.query({
      query: () => "/bookmarks",
    }),
    createBookmark: builder.mutation({
      query: (id) => ({ url: `/bookmarks/${id}`, method: "POST" }),
    }),
    deleteBookmark: builder.mutation({
      query: (id) => ({ url: `/bookmarks/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarkQuery,
} = api;
