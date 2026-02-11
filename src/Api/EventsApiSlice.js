import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const eventApi = createApi({
  reducerPath: reducers.path.event,
  baseQuery,
  endpoints: builder => ({
    book: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.event.book.url,
          method: endpoints.event.book.method,
          body: body,
        };
      },
    }),
    fetchAllEvents: builder.query({
      query: ({latitude, longitude}) => {
        const hasCoordinates = latitude && longitude;

        LOG('params: ', hasCoordinates ? {latitude, longitude} : {});

        return {
          url: endpoints.event.fetchAllEvents.url,
          method: endpoints.event.fetchAllEvents.method,
          params: {},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchMyBookings: builder.query({
      query: pageParams => {
        const {page, limit} = pageParams;
        return {
          url: `${endpoints.event.fetchMyBookings.url}?page=${page}&limit=${limit}`,
          method: endpoints.event.fetchMyBookings.method,
        };
      },
      transformResponse: response => response?.data,
      // transformResponse: response => {
      //   return {
      //     docs: response?.data?.docs || [],
      //     hasNextPage: response?.data?.hasNextPage || false,
      //     page: response?.data?.page || 1,
      //     totalPages: response?.data?.totalPages || 1,
      //   };
      // },
    }),

    fetchEventById: builder.query({
      query: jobId => {
        LOG('jobId', jobId);
        return {
          url: `${endpoints.event.fetchEventById.url}/${jobId}`,
          method: endpoints.event.fetchEventById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useBookMutation,
  useFetchAllEventsQuery,
  useFetchEventByIdQuery,
  useFetchMyBookingsQuery,
} = eventApi;
