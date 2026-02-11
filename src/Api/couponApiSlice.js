import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiConfig';
import { endpoints, reducers } from './configs';
import { LOG } from '../utils/helperFunction';

export const couponApi = createApi({
  reducerPath: reducers.path.coupon,
  baseQuery,
  endpoints: builder => ({
    fetchAllCoupons: builder.query({
      query: ({ latitude, longitude }) => {
        const hasCoordinates = latitude && longitude;

        LOG('params: ', hasCoordinates ? { latitude, longitude } : {});

        return {
          url: endpoints.coupon.fetchAllCoupons.url,
          method: endpoints.coupon.fetchAllCoupons.method,
          // params: hasCoordinates ? {latitude, longitude} : {},
          params: {},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchMyFavoriteCoupons: builder.query({
      query: () => {
        return {
          url: endpoints.coupon.fetchMyFavoriteCoupons.url,
          method: endpoints.coupon.fetchMyFavoriteCoupons.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
    removeFavouriteCoupon: builder.mutation({
      query: id => {
        LOG('idasdas', id);
        return {
          url: `${endpoints.coupon.removeFavouriteCoupon.url}/${id?.id}`,
          method: endpoints.coupon.removeFavouriteCoupon.method,
        };
      },
      transformResponse: response => response?.data,
    }),

    addFavoriteCoupon: builder.mutation({
      query: ({ id }) => {
        LOG('iasdasd: ', id);
        return {
          url: `${endpoints.coupon.addFavoriteCoupon.url}/${id}`,
          method: endpoints.coupon.addFavoriteCoupon.method,
        };
      },
      transformResponse: response => response?.data,
    }),
     generateQR: builder.mutation({
      query: id => {
        LOG('qr coupon id: ', id);
        const couponId = id?.id;
        return {
          url: endpoints.coupon.generateQR.url,
          method: endpoints.coupon.generateQR.method,
          params: {couponId: couponId},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchCouponByBusiness: builder.query({
      query: ({ businessProfileId }) => {
        LOG('params: ', businessProfileId);
        return {
          url: endpoints.coupon.fetchCouponByBusiness.url,
          method: endpoints.coupon.fetchCouponByBusiness.method,
          params: { businessProfileId },
        };
      },
      transformResponse: response => response?.data ?? response,
    }),
  }),
});

export const {
  useFetchAllCouponsQuery,
  useFetchMyFavoriteCouponsQuery,
  useRemoveFavouriteCouponMutation,
  useFetchCouponByBusinessQuery,
  useGenerateQRMutation,
  useAddFavoriteCouponMutation,
} = couponApi;
