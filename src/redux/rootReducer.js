import {combineReducers} from '@reduxjs/toolkit';
import {authApi} from '../Api/authApiSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import {resetApi} from '../Api/resetPassApiSlice';
import {eventApi} from '../Api/EventsApiSlice';
import {jobApi} from '../Api/jobsApiSlice';
import {profileApi} from '../Api/profileApiSlice';
import {couponApi} from '../Api/couponApiSlice';
import {businessprofileApi} from '../Api/businessApiSlice';
import {orderApi} from '../Api/orderApiSlice';
import {rewardsApi} from '../Api/rewardsApiSlice';
import {adsApi} from '../Api/adsApiSlice';
import {locationApi} from '../Api/locationApiSlice';
import {notificationsApi} from '../Api/notificationsApiSlice';
import notificationsReducer from './slices/notificationsSlice';
import {reviewApi} from '../Api/reviewApiSlice';
import {feedbackApi} from '../Api/feedbackApiSlice';
import {paymentApi} from '../Api/paymentApiSlice';
// import {resetApi} from '../Api/resetPassApiSlice';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  notifications: notificationsReducer,
  [resetApi.reducerPath]: resetApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer,
  // [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [businessprofileApi.reducerPath]: businessprofileApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [rewardsApi.reducerPath]: rewardsApi.reducer,
  [adsApi.reducerPath]: adsApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
});
