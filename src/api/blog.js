import {createApi} from '@reduxjs/toolkit/query/react';
import {setIsLoading} from '@store/slices/common';
import {getState} from '@store/configStore';
import {baseQueryBlog} from './baseQuery';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseQueryBlog,
  tagTypes: ['Blog'],

  endpoints: builder => ({
    getCategoryList: builder.query({
      query: () => {
        return {
          url: 'blog-app',
        };
      },
      transformResponse: (response, meta, arg) => {
        return [
          {
            blog_id: 'keyALL',
            blog_slug: 'all',
            blog_name: 'Tất cả',
            components: null,
            blog_status: '1',
          },
        ].concat(response.data);
      },
    }),
    getNewsList: builder.query({
      query: ({page, article_title}) => {
        return {
          url: 'article',
          params: {
            page: page,
            article_title: article_title,
          },
        };
      },

      async onQueryStarted(_, {dispatch, queryFulfilled, getState}) {
        // `onStart` side-effect
        // dispatch(messageCreated('Fetching post...'))
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          // `onSuccess` side-effect
          // dispatch(messageCreated('Post received!'))
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));

          // `onError` side-effect
          // dispatch(messageCreated('Error fetching post!'))
        }
      },
      transformResponse: (response, meta, {page, article_title}) => {
        const {queries} = getState('blogApi');
        if (page > 1) {
          const dataNews =
            queries[
              article_title
                ? `getNewsList({"article_title":${article_title},"page":${
                    page - 1
                  }})`
                : `getNewsList({"article_title":"","page":${page - 1}})`
            ];

          const newDataMap = {
            ...response.data,
            data: dataNews.data.data.concat(response.data.data),
          };
          return newDataMap;
        }

        return response.data;
      },
      providesTags: ['Blog'],
    }),
    getNewsListByCategory: builder.query({
      query: ({page, article_title, slug}) => {
        return {
          url: 'article/blog',
          params: {
            page: page,
            article_title: article_title,
            slug: slug,
          },
        };
      },
      async onQueryStarted({article_title}, {dispatch, queryFulfilled}) {
        // `onStart` side-effect
        // dispatch(messageCreated('Fetching post...'))

        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          // `onSuccess` side-effect
          // dispatch(messageCreated('Post received!'))
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));

          // `onError` side-effect
          // dispatch(messageCreated('Error fetching post!'))
        }
      },

      transformResponse: (response, meta, {page, article_title, slug}) => {
        const {queries} = getState('blogApi');

        if (page > 1) {
          const dataNews =
            queries[
              article_title
                ? `getNewsListByCategory({"article_title":${article_title},"p age":${
                    page - 1
                  },"slug":${slug}})`
                : `getNewsListByCategory({"article_title":"","page":${
                    page - 1
                  },"slug":${slug}})`
            ];

          const newDataMap = {
            ...response.data,
            data: dataNews.data.data.concat(response.data.data),
          };
          return newDataMap;
        }

        return response.data;
      },
      providesTags: ['Blog'],
    }),
    getNewsDetail: builder.query({
      query: ({slug}) => {
        return {
          url: 'article/detail',
          params: {
            slug: slug,
          },
        };
      },
      async onQueryStarted({article_title}, {dispatch, queryFulfilled}) {
        // `onStart` side-effect
        // dispatch(messageCreated('Fetching post...'))

        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          // `onSuccess` side-effect
          // dispatch(messageCreated('Post received!'))
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));

          // `onError` side-effect
          // dispatch(messageCreated('Error fetching post!'))
        }
      },

      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetCategoryListQuery,
  useGetNewsListQuery,
  useLazyGetNewsListQuery,
  useLazyGetNewsListByCategoryQuery,
  useGetNewsDetailQuery,
} = blogApi;
