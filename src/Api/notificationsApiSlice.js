import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const notificationsApi = createApi({
  reducerPath: reducers.path.notifications,
  tagTypes: ['Notifications'],
  baseQuery,
  endpoints: builder => ({
    fetchNotifications: builder.query({
      query: () => {
        return {
          url: endpoints.notifications.fetchNotifications.url,
          method: endpoints.notifications.fetchNotifications.method,
        };
      },
      providesTags: ['Notifications'],
      transformResponse: response => response,
    }),
    setNotificationAsRead: builder.mutation({
      query: id => {
        LOG('idasdasd', id);
        return {
          url: `${endpoints.notifications.setNotificationAsRead.url}/${id?.id}`,
          method: endpoints.notifications.setNotificationAsRead.method,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {useFetchNotificationsQuery, useSetNotificationAsReadMutation} =
  notificationsApi;
