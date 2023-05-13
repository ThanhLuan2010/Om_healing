import {createApi} from '@reduxjs/toolkit/query/react';
import {getState} from '@store/configStore';
import {setIsLoading} from '@store/slices/common';
import {baseQuery} from './baseQuery';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getInfoDashboard: builder.query({
      query: () => {
        return {
          url: 'user/dashboard',
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

    getInvestedProjects: builder.query({
      query: ({page}) => {
        return {
          url: 'user/project/investment',
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

    getInvestedProjectsLoadMore: builder.query({
      query: args => {
        const {page} = args;
        return {
          url: 'user/project/investment',
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
          const lastQueryKey = `getInvestedProjectsLoadMore(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('dashboardApi').queries[lastQueryKey]?.data?.list;

          const newListInvestedProject = {
            ...response.data,
            list: {
              ...response.data?.list,
              data: lastCacheEntry?.data.concat(response.data?.list?.data),
            },
          };

          return newListInvestedProject;
        }
        return response.data;
      },
    }),

    getProjectDetail: builder.query({
      query: ({slug}) => {
        return {
          url: 'project/detail/' + slug,
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

    getListProjectInvestment: builder.query({
      query: () => {
        return {
          url: 'user/project/investment-get-id',
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

    getSaleReportsChart: builder.query({
      query: ({project, date_type}) => {
        return {
          url: 'user/data-chart',
          params: {
            project: project,
            date_type: date_type,
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

    getNewProjects: builder.query({
      query: ({page}) => {
        return {
          url: 'web/list-project-news',
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

    getNewProjectsLoadMore: builder.query({
      query: args => {
        const {page} = args;
        return {
          url: 'web/list-project-news',
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
          const lastQueryKey = `getNewProjectsLoadMore(${lastQueryKeyParams})`;
          const lastCacheEntry =
            getState('dashboardApi').queries[lastQueryKey]?.data?.list;

          const newListProjects = {
            ...response.data,
            list: {
              ...response.data?.list,
              data: lastCacheEntry?.data.concat(response.data?.list?.data),
            },
          };

          return newListProjects;
        }
        return response.data;
      },
    }),
  }),
});

export const {
  useGetInfoDashboardQuery,
  useGetSaleReportsChartQuery,
  useGetInvestedProjectsQuery,
  useGetNewProjectsQuery,
  useGetProjectDetailQuery,
  useGetListProjectInvestmentQuery,
  useGetNewProjectsLoadMoreQuery,
  useGetInvestedProjectsLoadMoreQuery,
  useLazyGetInfoDashboardQuery,
} = dashboardApi;
