import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const rewardsApi = createApi({
  reducerPath: reducers.path.rewards,
  baseQuery,
  endpoints: builder => ({
    fetchPointsByUser: builder.query({
      query: () => {
        return {
          url: endpoints.rewards.fetchPointsByUser.url,
          method: endpoints.rewards.fetchPointsByUser.method,
        };
      },
      transformResponse: response => response,
    }),
    fetchShopditPointsByUser: builder.query({
      query: () => {
        return {
          url: endpoints.rewards.fetchShopditPointsByUser.url,
          method: endpoints.rewards.fetchShopditPointsByUser.method,
        };
      },
      transformResponse: response => response,
    }),
    fetchUserRewards: builder.query({
      query: () => {
        return {
          url: endpoints.rewards.fetchUserRewards.url,
          method: endpoints.rewards.fetchUserRewards.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchUserOwnedRewards: builder.query({
      query: () => {
        return {
          url: endpoints.rewards.fetchUserOwnedRewards.url,
          method: endpoints.rewards.fetchUserOwnedRewards.method,
        };
      },
      transformResponse: response => response?.data,
    }),

    buyReward: builder.mutation({
      query: id => {
        LOG('id-vehicle', id);
        return {
          url: `${endpoints.rewards.buyReward.url}/${id?.id}`,
          method: endpoints.rewards.buyReward.method,
        };
      },
    }),
    generateQR: builder.mutation({
      query: id => {
        LOG('qr reward id: ', id);
        const userRewardId = id?.id;
        return {
          url: endpoints.rewards.generateQR.url,
          method: endpoints.rewards.generateQR.method,
          params: {userRewardId: userRewardId},
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useFetchPointsByUserQuery,
  useFetchShopditPointsByUserQuery,
  useFetchUserRewardsQuery,
  useBuyRewardMutation,
  useFetchUserOwnedRewardsQuery,
  useGenerateQRMutation,
} = rewardsApi;
