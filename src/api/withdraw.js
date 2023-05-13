import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';

export const withdrawApi = createApi({
  reducerPath: 'widthDrawAPi',
  baseQuery: baseQuery,
  tagTypes: ['Wallet'],
  endpoints: builder => ({
    withdraw: builder.mutation({
      query: ({body}) => ({
        url: 'wallet/withdraw-profit',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});
export const {useWithdrawMutation} = withdrawApi;
