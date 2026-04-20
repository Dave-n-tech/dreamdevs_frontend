import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useLoginMutation, useGetAllProductsQuery, useGetProductByIdQuery } = fakeStoreApi;
