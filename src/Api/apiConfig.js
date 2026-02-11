import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {checkNetworkConnectivity} from '../utils/helperFunction';
import {baseUrl} from './configs';

const PUBLIC_ENDPOINTS = [
  'product/getBusinessProducts',
  'coupon/getBusinessCoupons',
];

const isPublicEndpoint = args => {
  const url = typeof args === 'string' ? args : args?.url;
  return url && PUBLIC_ENDPOINTS.some(ep => url.includes(ep));
};

// Create custom baseQuery for network connectivity proper error handling.
const baseQuery = async (args, api, extraOptions) => {
  const isConnected = await checkNetworkConnectivity();

  if (!isConnected) {
    return {
      error: {
        status: 'NO_INTERNET',
        data: {message: 'No internet connection'},
      },
    };
  }

  const url = typeof args === 'string' ? args : args?.url;
  const method = typeof args === 'object' ? args?.method ?? 'GET' : 'GET';
  const params = typeof args === 'object' ? args?.params : undefined;
  const body = typeof args === 'object' ? args?.body : undefined;
  const fullUrl = url ? (url.startsWith('http') ? url : `${baseUrl}/${url.replace(/^\//, '')}`) : baseUrl;

  console.log('[API]', {
    endpoint: fullUrl,
    method,
    params: params ?? null,
    body: body ?? null,
  });

  if (isPublicEndpoint(args)) {
    const publicQuery = fetchBaseQuery({baseUrl});
    return await publicQuery(args, api, extraOptions);
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return await rawBaseQuery(args, api, extraOptions);
};

export {baseQuery};
