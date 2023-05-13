import {createApi} from '@reduxjs/toolkit/query/react';
import {data} from '@screens/Common/Information/data';
import {getState} from '@store/configStore';
import {setIsLoading} from '@store/slices/common';
import {baseQuery} from './baseQuery';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery,
  tagTypes: ['Project', 'Investment'],
  dispatchConditionRejection: true,
  endpoints: builder => ({
    getServiceProduct: builder.query({
      query: () => {
        return {
          url: 'service',
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
        return response.data;
      },
      providesTags: ['Project'],
    }),
    getProjectList: builder.query({
      query: args => {
        const {project_service, key, page, type} = args;
        return {
          url: 'web/list-project-app',
          params: {
            project_service: project_service,
            key: key,
            page,
            type,
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
        return response.data;
      },
    }),
    getProjectListSeeAll: builder.query({
      query: args => {
        const {project_service, key, page, type} = args;
        return {
          url: 'web/list-project-app',
          params: {
            project_service: project_service,
            key: key,
            page,
            type,
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
          // wait for the initial query to resolve before proceeding

          // get key of the last query, the query before the current one
          // "getAllPosts({"limit":5,"page":1})"
          const lastQueryKeyParams = JSON.stringify({
            key: arg.key,
            page: arg.page - 1,
            project_service: arg.project_service,
            type: arg.type,
          });
          const lastQueryKey = `getProjectListSeeAll(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('projectApi').queries[lastQueryKey]?.data?.list;

          const newDataMap = {
            ...response.data,
            list: {
              ...response.data?.list,
              data: lastCacheEntry?.data.concat(response.data?.list?.data),
            },
          };

          return newDataMap;
        }
        return response.data;
      },
    }),
    getProjectFinishedList: builder.query({
      query: args => {
        const {project_service, page, type} = args;
        return {
          url: 'web/list-project-app',
          params: {
            project_service: project_service,
            page,
            type,
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
        return response.data;
      },
    }),
    getProjectFinishedListSeeAll: builder.query({
      query: args => {
        const {project_service, page, type} = args;
        return {
          url: 'web/list-project-app',
          params: {
            project_service: project_service,
            page,
            type,
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
          // wait for the initial query to resolve before proceeding

          // get key of the last query, the query before the current one
          // "getAllPosts({"limit":5,"page":1})"
          const lastQueryKeyParams = JSON.stringify({
            key: arg.key,
            page: arg.page - 1,
            project_service: arg.project_service,
            type: arg.type,
          });
          const lastQueryKey = `getProjectFinishedListSeeAll(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('projectApi').queries[lastQueryKey]?.data?.list;

          const newDataMap = {
            ...response.data,
            list: {
              ...response.data?.list,
              data: lastCacheEntry?.data.concat(response.data?.list?.data),
            },
          };

          return newDataMap;
        }
        return response.data;
      },
    }),
    getProjectDetail: builder.query({
      query: args => {
        const {slug} = args;
        return {
          url: `project/detail/${slug}`,
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
        return response.data;
      },
    }),
    getFinanceReportProject: builder.query({
      query: args => {
        const {project_id} = args;
        return {
          url: `web/finance-report`,
          params: {project_id},
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
        return response.data;
      },
    }),
    getElectronicContractProject: builder.query({
      query: args => {
        const {project_id} = args;
        return {
          url: `electronic-contract`,
          params: {project_id},
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
        return response.data;
      },
    }),
    getListPackage: builder.query({
      query: args => {
        const {project_id} = args;
        return {
          url: `list-package`,
          params: {project_id},
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
        return response.data;
      },
    }),
    postExpectedRevenued: builder.mutation({
      query: ({project_id, amount}) => ({
        url: 'user/investment/expected-revenue',
        method: 'POST',
        body: {project_id, amount},
      }),
    }),
    postInvestmentProject: builder.mutation({
      query: ({project_id, amount, type, payment_type}) => ({
        url: 'user/investment/post',
        method: 'POST',
        body: {project_id, amount, type, payment_type},
      }),
    }),
    getInvestmentPending: builder.query({
      query: args => {
        const {project_id} = args;
        return {
          url: `user/investment/pending/${project_id}`,
        };
      },
      // async onQueryStarted(_, {dispatch, queryFulfilled}) {
      //   dispatch(setIsLoading(true));
      //   try {
      //     console.log({queryFulfilled});
      //     await queryFulfilled;
      //     dispatch(setIsLoading(false));
      //   } catch (err) {
      //     dispatch(setIsLoading(false));
      //   }
      // },
      // invalidatesTags: ['Investment'],
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      invalidatesTags: ['Investment'],
    }),
    getCancelInvestmentPending: builder.query({
      query: args => {
        const {invest} = args;
        return {
          url: `user/investment/cancel/${invest}`,
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
        return response.data;
      },
    }),
    postConfirmPayment: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/investment/confirm-payment',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postConfirmPaymentRevenue: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/investment/confirm-payment-revenue',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postConfirmOnlineContract: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/investment/confirm-contract',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postResentMail: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/investment/resent-mail',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postCompleteConfirmation: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/investment/complete-confirmation',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    // API ĐẦU TƯ THỬ
    getRevenueWalletBalanceTest: builder.query({
      query: () => {
        return {
          url: `test-balance-revenue`,
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
        return response.data;
      },
    }),
    postInvestmentTestProject: builder.mutation({
      query: ({project_id, amount, type, payment_type}) => ({
        url: 'user/test-investment/post',
        method: 'POST',
        body: {project_id, amount, type, payment_type},
      }),
    }),
    getInvestmentTestPending: builder.query({
      query: args => {
        const {project_id} = args;
        return {
          url: `user/test-investment/pending/${project_id}`,
        };
      },
      // async onQueryStarted(_, {dispatch, queryFulfilled}) {
      //   dispatch(setIsLoading(true));
      //   try {
      //     console.log({queryFulfilled});
      //     await queryFulfilled;
      //     dispatch(setIsLoading(false));
      //   } catch (err) {
      //     dispatch(setIsLoading(false));
      //   }
      // },
      // invalidatesTags: ['Investment'],
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      // invalidatesTags: ['Investment'],
    }),
    postConfirmPaymentTest: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/test-investment/confirm-payment',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postConfirmPaymentRevenueTest: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/test-investment/confirm-payment-revenue',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postConfirmOnlineContractTest: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/test-investment/confirm-contract',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postResentMailTest: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/test-investment/resent-mail',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    postCompleteConfirmationTest: builder.mutation({
      query: ({inves_id, project_id}) => ({
        url: 'user/test-investment/complete-confirmation',
        method: 'POST',
        body: {inves_id, project_id},
      }),
    }),
    getCancelInvestmentPendingTest: builder.query({
      query: args => {
        const {invest} = args;
        return {
          url: `user/test-investment/cancel/${invest}`,
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
        return response.data;
      },
    }),
    postExpectedRevenuedTest: builder.mutation({
      query: ({project_id, amount}) => ({
        url: 'user/test-investment/expected-revenue',
        method: 'POST',
        body: {project_id, amount},
      }),
    }),
  }),
});
export const {
  useGetServiceProductQuery,
  useGetProjectListQuery,
  useGetProjectListSeeAllQuery,
  useGetProjectDetailQuery,
  useGetFinanceReportProjectQuery,
  useGetElectronicContractProjectQuery,
  usePostExpectedRevenuedMutation,
  useGetListPackageQuery,
  usePostInvestmentProjectMutation,
  useGetInvestmentPendingQuery,
  useGetCancelInvestmentPendingQuery,
  usePostConfirmPaymentMutation,
  usePostConfirmPaymentRevenueMutation,
  usePostConfirmOnlineContractMutation,
  usePostResentMailMutation,
  usePostCompleteConfirmationMutation,
  useGetProjectFinishedListQuery,
  useGetProjectFinishedListSeeAllQuery,
  useGetRevenueWalletBalanceTestQuery,
  usePostInvestmentTestProjectMutation,
  useGetInvestmentTestPendingQuery,
  usePostConfirmPaymentTestMutation,
  usePostConfirmPaymentRevenueTestMutation,
  usePostConfirmOnlineContractTestMutation,
  usePostResentMailTestMutation,
  usePostCompleteConfirmationTestMutation,
  useGetCancelInvestmentPendingTestQuery,
  usePostExpectedRevenuedTestMutation,
} = projectApi;
