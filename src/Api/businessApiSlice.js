import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const businessprofileApi = createApi({
  reducerPath: reducers.path.businessProfile,
  baseQuery,
  endpoints: builder => ({
    fetchBusinessType: builder.query({
      query: () => {
        return {
          url: endpoints.businessProfile.fetchBusinessType.url,
          method: endpoints.businessProfile.fetchBusinessType.method,
        };
      },
      transformResponse: response => {
        console.log('✅ Parsed response:', response);
        return response?.data;
      },
      
    }),

    fetchNearbyBusinesses: builder.query({
      query: ({latitude, longitude, typeName}) => {
        const hasCoordinates = latitude && longitude;

        const params = {
          ...(hasCoordinates && {latitude, longitude}),
          ...(typeName && {typeName}),
        };

        LOG('params:', params);

        return {
          url: endpoints.businessProfile.fetchNearbyBusinesses.url,
          method: endpoints.businessProfile.fetchNearbyBusinesses.method,
          params,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchBusinessProduct: builder.query({
      query: ({businessProfileId}) => {
        LOG('params: ', businessProfileId);
        console.log('businessProfileId', businessProfileId);
        return {
          url: endpoints.businessProfile.fetchBusinessProduct.url,
          method: endpoints.businessProfile.fetchBusinessProduct.method,
          params: {businessProfileId},
        };
      },
      transformResponse: response => {
        const out = response?.data ?? response;
        LOG('fetchBusinessProduct raw:', response);
        return out;
      },
    }),
    fetchBusinessCampaign: builder.query({
      query: () => {
        return {
          url: endpoints.businessProfile.fetchBusinessCampaign.url,
          method: endpoints.businessProfile.fetchBusinessCampaign.method,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useFetchBusinessTypeQuery,
  useFetchNearbyBusinessesQuery,
  useFetchBusinessProductQuery,
  useFetchBusinessCampaignQuery,
} = businessprofileApi;
