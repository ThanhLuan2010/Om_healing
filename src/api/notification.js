import {createApi} from '@reduxjs/toolkit/query/react';
import {getState} from '@store/configStore';
import {setIsLoading} from '@store/slices/common';
import {baseQuery} from './baseQuery';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  endpoints: builder => ({
    getNotificationList: builder.query({
      query: ({page}) => {
        return {
          url: 'notification',
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

    getNotificationListLoadMore: builder.query({
      query: args => {
        const {page} = args;
        return {
          url: 'notification',
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
          const lastQueryKey = `getNotificationListLoadMore(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('notificationApi').queries[lastQueryKey]?.data;

          const newListNotification = {
            ...response.data,
            data: [...lastCacheEntry?.data.concat(response.data.data)],
          };

          return newListNotification;
        }
        return response.data;
      },
    }),

    getNotificationDetail: builder.query({
      query: ({notificationId}) => {
        return {
          url: 'notification/detail/' + notificationId,
          params: {
            id: notificationId,
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
  useGetNotificationListQuery,
  useGetNotificationDetailQuery,
  useGetNotificationListLoadMoreQuery,
} = notificationApi;
