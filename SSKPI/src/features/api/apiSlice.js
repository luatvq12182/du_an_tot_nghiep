import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_URL_API } from "constants/app";

export const apiSlice = createApi({
	reducerPath: "api",

	baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_URL_API }),

	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "/candidate",
		}),
	}),
});

export const { useGetPostsQuery } = apiSlice;
