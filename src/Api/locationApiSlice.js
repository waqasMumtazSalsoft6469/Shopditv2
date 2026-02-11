import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const locationApi = createApi({
  reducerPath: reducers.path.location,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.location.add.url,
          method: endpoints.location.add.method,
          body: body,
        };
      },
    }),
    setActive: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.location.setActive.url,
          method: endpoints.location.setActive.method,
          body: body,
        };
      },
    }),
  }),
});

export const {useAddMutation, useSetActiveMutation} = locationApi;
