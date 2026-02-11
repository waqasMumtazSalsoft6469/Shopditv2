import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const paymentApi = createApi({
  reducerPath: reducers.path.payment,
  baseQuery,
  endpoints: builder => ({
    fetchPublicKey: builder.query({
      query: () => {
        return {
          url: endpoints.payment.fetchPublicKey.url,
          method: endpoints.payment.fetchPublicKey.method,
        };
      },
      transformResponse: response => response,
    }),

    createIntent: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.payment.createIntent.url,
          method: endpoints.payment.createIntent.method,
          body: body,
        };
      },
    }),
    savePayment: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.payment.savePayment.url,
          method: endpoints.payment.savePayment.method,
          body: body,
        };
      },
    }),
    saveOrderPayment: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.payment.saveOrderPayment.url,
          method: endpoints.payment.saveOrderPayment.method,
          body: body,
        };
      },
    }),
  }),
});

export const {
  useCreateIntentMutation,
  useSavePaymentMutation,
  useSaveOrderPaymentMutation,
  useFetchPublicKeyQuery,
} = paymentApi;
