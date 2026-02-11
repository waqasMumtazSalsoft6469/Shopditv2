// export const baseUrl = 'https://nonperceptively-epistolic-itzel.ngrok-free.dev/api/';
export const baseUrl = 'https://react.customdev.solutions:3011/api';
// export const baseUrl = 'https://2be2-110-93-244-176.ngrok-free.app/api';
// export const imageServer =
//   'https://2be2-110-93-244-176.ngrok-free.app/Uploads/';
export const imageServer = 'https://react.customdev.solutions:3011/Uploads/';

export const endpoints = {
  auth: {
    login: {
      url: 'user/login',
      method: 'POST',
    },
    register: {
      url: 'user/signup',
      method: 'POST',
    },
    fetchUserById: {
      url: 'user/getUser',
      method: 'GET',
    },
  },

  feedback: {
    contactUs: {
      url: 'feedback/addFeedback',
      method: 'POST',
    },
  },
  location: {
    add: {
      url: 'user/addLocation',
      method: 'PUT',
    },
    setActive: {
      url: 'user/setActiveLocation',
      method: 'PUT',
    },
  },
  profile: {
    update: {
      url: 'user/editProfile',
      method: 'PUT',
    },
    updatePreferences: {
      url: 'user/updatePreferences',
      method: 'PUT',
    },
  },
  job: {
    upload: {
      url: 'application/createApplication',
      method: 'POST',
    },
    fetchNearbyJobs: {
      url: 'jobs/getPreferredJobs',
      method: 'GET',
    },
    fetchJobById: {
      url: 'jobs/getJob',
      method: 'GET',
    },
  },
  review: {
    add: {
      url: 'review/addReview',
      method: 'POST',
    },
  },
  ads: {
    add: {
      url: 'ad/addAdvertise',
      method: 'POST',
    },
    updateAd: {
      url: 'ad/updateAd',
      method: 'PUT',
    },
    addCarAd: {
      url: 'car/addCar',
      method: 'POST',
    },
    updateCarAd: {
      url: 'car/updateCar',
      method: 'PUT',
    },
    fetchNearbyAds: {
      url: 'ad/getNearbyAds',
      method: 'GET',
    },
    fetchNearbyCars: {
      url: 'car/getNearbyCars',
      method: 'GET',
    },
    fetchAdById: {
      url: 'ad/getAdById',
      method: 'GET',
    },
    fetchMyAds: {
      url: 'ad/getMyAds',
      method: 'GET',
    },
    fetchMyCars: {
      url: 'car/getMyCars',
      method: 'GET',
    },
    deleteAd: {
      url: 'ad/deleteAd',
      method: 'DELETE',
    },
    deleteCar: {
      url: 'car/deleteCar',
      method: 'DELETE',
    },
  },

  event: {
    book: {
      url: 'booking/bookEventTickets',
      method: 'POST',
    },
    fetchAllEvents: {
      url: 'event/getPreferredEvents',
      method: 'GET',
    },
    fetchMyBookings: {
      url: 'booking/getMyBookings',
      method: 'GET',
    },
    fetchEventById: {
      url: 'event/getEvent',
      method: 'GET',
    },
  },
  order: {
    add: {
      url: 'order/addOrder',
      method: 'POST',
    },
    addUsingPoints: {
      url: 'order/OrderUsingPoints',
      method: 'POST',
    },
    addUsingShopditPoints: {
      url: 'order/OrderUsingShopditPoints',
      method: 'POST',
    },

    fetchMyOrders: {
      url: 'order/getMyOrders',
      method: 'GET',
    },
  },
  subscription: {
    buy: {
      url: 'subscription/buySubscription',
      method: 'POST',
    },
    fetchPlanByUser: {
      url: 'plan/getPlans',
      method: 'GET',
    },
    fetchPlanByUserID: {
      url: 'subscription/fetchActiveSubscription',
      method: 'GET',
    },
  },
  rewards: {
    fetchPointsByUser: {
      url: 'businessPoints/getMyBusinessPoints',
      method: 'GET',
    },
    fetchShopditPointsByUser: {
      url: 'shopditPoints/myPoints',
      method: 'GET',
    },
    fetchUserRewards: {
      url: 'rewards/getUserRewards',
      method: 'GET',
    },
    fetchUserOwnedRewards: {
      url: 'rewards/getOwnedRewards',
      method: 'GET',
    },
    buyReward: {
      url: 'rewards/buyReward',
      method: 'POST',
    },
    generateQR: {
      url: 'rewards/generateRewardQRCode',
      method: 'POST',
    },
  },
  notifications: {
    fetchNotifications: {
      url: 'notification/getUserNotifications',
      method: 'GET',
    },
    setNotificationAsRead: {
      url: 'notification/toggleNotification',
      method: 'PUT',
    },
  },
  businessProfile: {
    fetchBusinessType: {
      url: 'businessType/getBusinessTypes',
      method: 'GET',
    },
    fetchMyBusinessProfiles: {
      url: 'businessProfile/getMyBusiensses',
      method: 'GET',
    },
    fetchNearbyBusinesses: {
      url: 'businessProfile/fetchNearbyBusinesses',
      method: 'GET',
    },
    fetchBusinessProduct: {
      url: 'product/getBusinessProducts',
      method: 'GET',
    },
    fetchBusinessCampaign: {
      url: 'campaigns/getEligibleCampaigns',
      method: 'GET',
    },
  },
  coupon: {
    addFavoriteCoupon: {
      url: 'coupon/addToFavorites',
      method: 'POST',
    },
    generateQR: {
      url: 'coupon/generateCouponQR',
      method: 'POST',
    },

    fetchAllCoupons: {
      url: 'coupon/getPreferredCoupons',
      method: 'GET',
    },
    fetchMyFavoriteCoupons: {
      url: 'coupon/favoriteCoupons',
      method: 'GET',
    },
    removeFavouriteCoupon: {
      url: 'coupon/removeFromFavorites',
      method: 'PUT',
    },
    fetchCouponByBusiness: {
      url: 'coupon/getBusinessCoupons',
      method: 'GET',
    },
  },
  payment: {
    fetchPublicKey: {
      url: 'payment/config',
      method: 'GET',
    },
    createIntent: {
      url: 'payment/create-payment-intent',
      method: 'POST',
    },
    savePayment: {
      url: 'payment/saveBookingPayment',
      method: 'POST',
    },
    saveOrderPayment: {
      url: 'payment/saveOrderPayment',
      method: 'POST',
    },
  },
};

export const reducers = {
  path: {
    auth: 'authApi',
    profile: 'profileApi',
    job: 'JobApi',
    review: 'ReviewApi',
    ads: 'AdsApi',
    coupon: 'CouponApi',
    event: 'EventApi',
    subscription: 'SubscriptionApi',
    businessProfile: 'BusinessProfileApi',
    order: 'OrderApi',
    rewards: 'RewardsApi',
    notifications: 'NotificationsApi',
    location: 'LocationApi',
    feedback: 'FeedbackApi',
    payment: 'PaymentApi',
  },
};
