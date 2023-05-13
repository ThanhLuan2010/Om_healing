import {createApi} from '@reduxjs/toolkit/query/react';
import {getState} from '@store/configStore';
import {setIsLoading} from '@store/slices/common';
import {baseQueryBlog} from './baseQuery';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryBlog,
  tagTypes: ['Event'],

  endpoints: builder => ({
    getEventList: builder.query({
      query: ({page}) => {
        return {
          url: 'event',
          params: {
            page: page,
          },
        };
      },
      async onQueryStarted({_}, {dispatch, queryFulfilled}) {
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));
        }
      },

      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),

    getEventListLoadMore: builder.query({
      query: args => {
        const {page} = args;
        return {
          url: 'event',
          params: {
            page,
          },
        };
      },
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));
        }
      },
      transformResponse: (response, meta, arg) => {
        if (arg?.page && arg?.page > 1) {
          const lastQueryKeyParams = JSON.stringify({
            page: arg.page - 1,
          });
          const lastQueryKey = `getEventListLoadMore(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('eventApi').queries[lastQueryKey]?.data;

          const newEventList = {
            ...response.data,
            data: [...lastCacheEntry?.data.concat(response.data.data)],
          };

          return newEventList;
        }

        return response.data;
      },
    }),

    getNewsList: builder.query({
      query: ({page}) => {
        return {
          url: 'article',
          params: {
            page: page,
          },
        };
      },
      async onQueryStarted({_}, {dispatch, queryFulfilled}) {
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));
        }
      },

      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),

    getNewsListLoadMore: builder.query({
      query: args => {
        const {page} = args;
        return {
          url: 'article',
          params: {
            page,
          },
        };
      },
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));
        }
      },
      transformResponse: (response, meta, arg) => {
        if (arg?.page && arg?.page > 1) {
          const lastQueryKeyParams = JSON.stringify({
            page: arg.page - 1,
          });
          const lastQueryKey = `getNewsListLoadMore(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('eventApi').queries[lastQueryKey]?.data;

          const newListNews = {
            ...response.data,
            data: [...lastCacheEntry?.data.concat(response.data.data)],
          };

          return newListNews;
        }
        return response.data;
      },
    }),

    getEventDetail: builder.query({
      query: ({page, slug}) => {
        return {
          url: 'event/detail',
          params: {
            slug: slug,
            page: page,
          },
        };
      },
      async onQueryStarted({_}, {dispatch, queryFulfilled}) {
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));
        }
      },

      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetEventListQuery,
  useGetEventDetailQuery,
  useGetNewsListQuery,
  useGetEventListLoadMoreQuery,
  useGetNewsListLoadMoreQuery,
} = eventApi;
