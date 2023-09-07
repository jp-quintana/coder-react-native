import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { realtime_database_url } from '../db/config';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: realtime_database_url }),
  endpoints: (builder) => ({
    // getCategories: builder.query({
    //   query: () => `categories.json`,
    // }),
    getProducts: builder.query({
      query: () => `products.json`,
    }),
    // getProductsByCategory: builder.query({
    //   query: (category) =>
    //     `products.json?orderBy="category"&equalTo="${category}"`,
    //   transformResponse: (response) => {
    //     const productsTransformed = Object.values(response);
    //     return productsTransformed;
    //   },
    // }),
    // getProductById: builder.query({
    //   query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
    //   transformResponse: (response) => {
    //     const productTransformed = Object.values(response).pop();
    //     return productTransformed;
    //   },
    // }),
    getOrdersByUser: builder.query({
      query: (user) =>
        `orders.json?orderBy="user"&equalTo="${user}"&orderBy="createdAt"`,
      transformResponse: (response) => {
        const ordersTransformed = Object.entries(response).map(
          ([orderId, orderData]) => ({
            id: orderId,
            ...orderData,
          })
        );
        return ordersTransformed;
      },
    }),
    postCart: builder.mutation({
      query: (order) => ({
        url: `orders.json`,
        method: `POST`,
        body: order,
      }),
    }),
    // update in future
    getFavorites: builder.query({
      query: (localId, date) => `favorites/${localId}.json`,
      transformResponse: (response) => {
        return response?.favorites;
      },
    }),
    postFavorites: builder.mutation({
      query: ({ favorites, localId }) => ({
        url: `favorites/${localId}.json`,
        method: 'PUT',
        body: {
          favorites,
        },
      }),
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: 'PUT',
        body: {
          image: image,
        },
      }),
    }),
    getUserLocation: builder.query({
      query: (localId) => `locations/${localId}.json`,
    }),
    postUserLocation: builder.mutation({
      query: ({ location, localId }) => ({
        url: `locations/${localId}.json`,
        method: 'PUT',
        body: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
        },
      }),
    }),
  }),
});

export const {
  // useGetCategoriesQuery,
  useGetProductsQuery,
  // useGetProductsByCategoryQuery,
  // useGetProductByIdQuery,
  useGetOrdersByUserQuery,
  usePostCartMutation,
  useGetFavoritesQuery,
  usePostFavoritesMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useGetUserLocationQuery,
  usePostUserLocationMutation,
} = shopApi;
