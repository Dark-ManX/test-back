import { apiPath } from "@/configs/apiPath";
import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const memesApi = createApi({
  reducerPath: "memesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["memes"],
  endpoints: (build) => ({
    getMemes: build.query({
      query: () => apiPath.memes.getAll,
    }),
    getMeme: build.query({
      query: ({ id }) => ({
        url: apiPath.memes.getOne.replace("{:id}", id),
      }),
    }),
    updateMeme: build.mutation({
      query: ({ id, data }) => ({
        url: apiPath.memes.getOne.replace("{:id}", id),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["memes"],
    }),
  }),
});

export const { useGetMemesQuery, useLazyGetMemeQuery, useUpdateMemeMutation } =
  memesApi;
