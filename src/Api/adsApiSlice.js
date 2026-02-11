import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const adsApi = createApi({
  reducerPath: reducers.path.ads,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.ads.add.url,
          method: endpoints.ads.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    updateAd: builder.mutation({
      query: ({id, body}) => {
        LOG('body-vehicle', body);
        return {
          url: `${endpoints.ads.updateAd.url}/${id}`,
          method: endpoints.ads.updateAd.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    addCarAd: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.ads.addCarAd.url,
          method: endpoints.ads.addCarAd.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    updateCarAd: builder.mutation({
      query: ({id, body}) => {
        LOG('body-vehicle', body);
        return {
          url: `${endpoints.ads.updateCarAd.url}/${id}`,
          method: endpoints.ads.updateCarAd.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchNearbyAds: builder.query({
      query: ({latitude, longitude, keyword}) => {
        const params = {};
        if (latitude && longitude) {
          params.latitude = latitude;
          params.longitude = longitude;
        }
        if (keyword) {
          params.keyword = keyword;
        }
        LOG('fetchNearbyAds params:', params);
        return {
          url: endpoints.ads.fetchNearbyAds.url,
          method: endpoints.ads.fetchNearbyAds.method,
          params,
        };
      },
      transformResponse: response => response?.data,
    }),

    fetchNearbyCars: builder.query({
      query: ({latitude, longitude, keyword}) => {
        const params = {};
        if (latitude && longitude) {
          params.latitude = latitude;
          params.longitude = longitude;
        }
        if (keyword) {
          params.keyword = keyword;
        }
        LOG('fetchNearbyCars params:', params);
        return {
          url: endpoints.ads.fetchNearbyCars.url,
          method: endpoints.ads.fetchNearbyCars.method,
          params,
        };
      },
      transformResponse: response => response?.data,
    }),

    fetchAdById: builder.query({
      query: adId => {
        LOG('adId', adId);
        return {
          url: `${endpoints.ads.fetchAdById.url}/${adId}`,
          method: endpoints.ads.fetchAdById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),

    fetchMyAds: builder.query({
      query: () => {
        return {
          url: endpoints.ads.fetchMyAds.url,
          method: endpoints.ads.fetchMyAds.method,
        };
      },
      transformResponse: response => response,
    }),
    fetchMyCars: builder.query({
      query: () => {
        return {
          url: endpoints.ads.fetchMyCars.url,
          method: endpoints.ads.fetchMyCars.method,
        };
      },
      transformResponse: response => response,
    }),
    deleteAd: builder.mutation({
      query: ({id}) => {
        LOG('id: ', id);
        return {
          url: `${endpoints.ads.deleteAd.url}/${id}`,
          method: endpoints.ads.deleteAd.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    deleteCar: builder.mutation({
      query: ({id}) => {
        LOG('id: ', id);
        return {
          url: `${endpoints.ads.deleteCar.url}/${id}`,
          method: endpoints.ads.deleteCar.method,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useUpdateAdMutation,
  useAddCarAdMutation,
  useUpdateCarAdMutation,
  useFetchNearbyAdsQuery,
  useFetchNearbyCarsQuery,
  useFetchAdByIdQuery,
  useFetchMyAdsQuery,
  useFetchMyCarsQuery,
  useDeleteAdMutation,
  useDeleteCarMutation,
} = adsApi;
