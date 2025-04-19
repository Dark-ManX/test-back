import { apiPath } from "@/configs/apiPath";
import { BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const memesApi = createApi({
  reducerPath: "memesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["memes"],
  endpoints: (build) => ({
    getMemes: build.query({
      query: () => ({
        url: apiPath.memes.getAll,
      }),
    }),
  }),
});

export const { useGetMemesQuery } = memesApi;
