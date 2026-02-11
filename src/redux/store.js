import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
// import {authApi} from '../Api/authApiSlice';
// import {resetApi} from '../Api/resetPassApiSlice';
import {reduxStorage} from './storage';
import {rootReducer} from './rootReducer';
import {authApi} from '../Api/authApiSlice';
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
import {reviewApi} from '../Api/reviewApiSlice';
import {feedbackApi} from '../Api/feedbackApiSlice';
import {paymentApi} from '../Api/paymentApiSlice';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  // whitelist: ['auth'], // Only persist specific reducers
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      authApi.middleware,
      resetApi.middleware,
      profileApi.middleware,
      jobApi.middleware,
      eventApi.middleware,
      couponApi.middleware,
      // subscriptionApi.middleware,
      businessprofileApi.middleware,
      orderApi.middleware,
      rewardsApi.middleware,
      adsApi.middleware,
      locationApi.middleware,
      notificationsApi.middleware,
      reviewApi.middleware,
      feedbackApi.middleware,
      paymentApi.middleware,
    ),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
