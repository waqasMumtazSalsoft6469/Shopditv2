import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {setAuth} from '../redux/slices/authSlice';
import {LOG} from '../utils/helperFunction';

export const authApi = createApi({
  reducerPath: reducers.path.auth,
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: endpoints.auth.login.url,
        method: endpoints.auth.login.method,
        body: credentials,
      }),
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('dat23a', data?.data?.user);

          // Dispatch the action to store user and token in Redux
          dispatch(setAuth({user: data?.data?.user, token: data?.data?.token}));
        } catch (error) {
          console.log('Login failed', error);
        }
      },
    }),
    register: builder.mutation({
      query: body => ({
        url: endpoints.auth.register.url,
        method: endpoints.auth.register.method,
        body: body,
      }),
    }),

    fetchUserById: builder.query({
      query: id => {
        LOG('id', id);
        return {
          url: `${endpoints.auth.fetchUserById.url}/${id?.id}`,
          method: endpoints.auth.fetchUserById.method,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation, useFetchUserByIdQuery} =
  authApi;
