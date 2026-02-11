import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const jobApi = createApi({
  reducerPath: reducers.path.job,
  baseQuery,
  endpoints: builder => ({
    upload: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.job.upload.url,
          method: endpoints.job.upload.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchNearbyJobs: builder.query({
      query: ({latitude, longitude}) => {
        const hasCoordinates = latitude && longitude;
        LOG('params: ', hasCoordinates ? {latitude, longitude} : {});
        return {
          url: endpoints.job.fetchNearbyJobs.url,
          method: endpoints.job.fetchNearbyJobs.method,
          params: hasCoordinates ? {latitude, longitude} : {},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchJobById: builder.query({
      query: jobId => {
        LOG('jobId', jobId);
        return {
          url: `${endpoints.job.fetchJobById.url}/${jobId}`,
          method: endpoints.job.fetchJobById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useUploadMutation,
  useFetchNearbyJobsQuery,
  useFetchJobByIdQuery,
} = jobApi;
