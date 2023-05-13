import {createApi} from '@reduxjs/toolkit/query/react';
import {setIsLoading} from '@store/slices/common';
import {baseQuery} from './baseQuery';

export const infoApi = createApi({
  reducerPath: 'infoApi',
  baseQuery: baseQuery,
  tagTypes: ['Info'],
  endpoints: builder => ({
    getInfoList: builder.query({
      query: () => {
        return {
          url: 'info',
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

    setInformation: builder.mutation({
      query: ({body}) => ({
        url: 'user/profile/contract-information',
        method: 'POST',
        body: body,
      }),
    }),

    getInformation: builder.query({
      query: () => {
        return {
          url: 'user/profile/contract-information',
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
    changePassword: builder.mutation({
      query: ({body}) => ({
        url: 'user/profile/change-password',
        method: 'POST',
        body: body,
      }),
    }),

    getBank: builder.query({
      query: () => {
        return {
          url: 'list-bank',
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

    getUserBank: builder.query({
      query: () => {
        return {
          url: 'user/bank-user/info',
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
    addBank: builder.mutation({
      query: ({body}) => ({
        url: 'user/bank-user/update',
        method: 'POST',
        body: body,
      }),
    }),
    getListAccountKYC: builder.query({
      query: () => {
        return {
          url: 'user/profile/kyc',
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
    accountKYC: builder.mutation({
      query: ({body}) => ({
        url: 'user/profile/kyc',
        method: 'POST',
        postFormData: body,
      }),
    }),
    /// bảo mật 2 lớp
    getAuthentication: builder.query({
      query: () => {
        return {
          url: 'user/profile/auth',
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
    factorAuthentication: builder.mutation({
      query: ({body}) => ({
        url: 'user/profile/auth',
        method: 'POST',
        body: body,
      }),
    }),

    // thông tin cá nhân
    getContract: builder.query({
      query: () => {
        return {
          url: 'user/profile/contract-information',
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

    contractInformation: builder.mutation({
      query: ({body}) => ({
        url: 'user/profile/contract-information',
        method: 'POST',
        body: body,
      }),
    }),

    // thành viên
    getMemberList: builder.query({
      query: ({body}) => {
        return {
          url: 'user/member/list?page=' + body.page + '&user_id=' + body.id,
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

    getLinkRef: builder.query({
      query: () => {
        return {
          url: 'web/link-ref',
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
    getMemberTree: builder.query({
      query: () => {
        return {
          url: 'user/member/tree',
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
    getMemberAjax: builder.query({
      query: () => {
        return {
          url: 'user/member/ajax-sale-user',
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
    /// lịch sử giao dịch
    getHistory: builder.query({
      query: ({body}) => {
        return {
          url: 'user/history-withdraw-profit?page=' + body.page,
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

    getHistoryWallet: builder.query({
      query: ({body}) => {
        return {
          url:
            'user/history?type=wallet' +
            '&datefrom=' +
            body.datefrom +
            '&dateto=' +
            body.dateto +
            '&page=' +
            body.page,
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
    // hỗ trợ

    getTicket: builder.query({
      query: () => {
        return {
          url: 'ticket',
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

    getTicketDetail: builder.query({
      query: ({body}) => {
        return {
          url: 'ticket/get-ticket-detail/' + body.id,
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

    getSubject: builder.query({
      query: () => {
        return {
          url: 'ticket/subject',
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
    setTicket: builder.mutation({
      query: ({body}) => ({
        url: 'ticket/post-ticket',
        method: 'POST',
        body: body,
      }),
    }),
    /// đại lý

    getAjax: builder.query({
      query: id => {
        return {
          url: 'user/member/ajax-sale-user?user_id=' + id,
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
        return response;
      },
    }),

    getAgency: builder.query({
      query: id => {
        return {
          url: 'user/member/agency-statictical',
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
        return response;
      },
    }),

    getMemberListStatictica: builder.query({
      query: ({body}) => {
        return {
          url:
            'user/member/list?page=' +
            body.page +
            '&user_id=' +
            body.id +
            '&User_Parent=' +
            body.parent +
            '&user_email=' +
            body.email,
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
  useSetInformationMutation,
  useGetUserBankQuery,
  useChangePasswordMutation,
  // ngân hàng
  useAddBankMutation,
  useGetBankQuery,
  useLazyGetUserBankQuery,
  // thông tin
  useGetInfoListQuery,
  useLazyGetInfoListQuery,
  // xác thực
  useGetListAccountKYCQuery,
  useAccountKYCMutation,
  // bảo mật 2 lớp
  useGetAuthenticationQuery,
  useLazyGetAuthenticationQuery,

  useFactorAuthenticationMutation,
  // thông tin hợp đồng
  useLazyGetContractQuery,
  useContractInformationMutation,
  useGetContractQuery,
  // thanh viên
  useGetLinkRefQuery,
  useLazyGetMemberAjaxQuery,
  useLazyGetMemberListQuery,
  useGetMemberListQuery,
  useLazyGetMemberTreeQuery,
  // lịch sử
  useGetHistoryQuery,
  useGetHistoryWalletQuery,
  useLazyGetHistoryQuery,
  useLazyGetHistoryWalletQuery,

  // hỗ trợ
  useGetTicketQuery,
  useLazyGetTicketQuery,
  useGetTicketDetailQuery,
  useLazyGetTicketDetailQuery,
  useGetSubjectQuery,
  useSetTicketMutation,
  // đại lý
  // useLazyGetAjaxQuery,
  useGetAgencyQuery,
  useGetStaticticalQuery,
  useLazyGetAjaxQuery,
  useLazyGetMemberListStaticticaQuery,
} = infoApi;
