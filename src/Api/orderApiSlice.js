import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const orderApi = createApi({
  reducerPath: reducers.path.order,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        return {
          url: endpoints.order.add.url,
          method: endpoints.order.add.method,
          body: body,
        };
      },
    }),
    addUsingPoints: builder.mutation({
      query: ({body}) => {
        console.log('body', body);

        return {
          url: endpoints.order.addUsingPoints.url,
          method: endpoints.order.addUsingPoints.method,
          body: body,
        };
      },
    }),
    addUsingShopditPoints: builder.mutation({
      query: ({body}) => {
        console.log('body', body);

        return {
          url: endpoints.order.addUsingShopditPoints.url,
          method: endpoints.order.addUsingShopditPoints.method,
          body: body,
        };
      },
    }),

    fetchMyOrders: builder.query({
      query: () => {
        return {
          // url: `${endpoints.order.fetchMyOrders.url}?page=${page}&limit=${limit}`,
          url: `${endpoints.order.fetchMyOrders.url}`,
          method: endpoints.order.fetchMyOrders.method,
        };
      },
      transformResponse: response => response?.data,
    }),

    // fetchEventById: builder.query({
    //   query: jobId => {
    //     LOG('jobId', jobId);
    //     return {
    //       url: `${endpoints.event.fetchEventById.url}/${jobId}`,
    //       method: endpoints.event.fetchEventById.method || 'GET',
    //     };
    //   },
    //   transformResponse: response => response?.data,
    // }),
  }),
});

export const {
  useAddMutation,
  useFetchMyOrdersQuery,
  useAddUsingPointsMutation,
  useAddUsingShopditPointsMutation,
} = orderApi;
