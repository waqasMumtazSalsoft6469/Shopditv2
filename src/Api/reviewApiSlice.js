import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const reviewApi = createApi({
  reducerPath: reducers.path.review,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.review.add.url,
          method: endpoints.review.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
  }),
});

export const {useAddMutation} = reviewApi;
