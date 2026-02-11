import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  Dimensions,
  FlatList,
  InteractionManager,
  PermissionsAndroid,
  View,
} from 'react-native';
import { colors } from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import Coupon from '../../../components/Coupon';
import { SearchInput } from '../../../components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddFavoriteCouponMutation,
  useFetchAllCouponsQuery,
  useFetchMyFavoriteCouponsQuery,
  useRemoveFavouriteCouponMutation,
} from '../../../Api/couponApiSlice';
import { vh } from '../../../utils';

import { handleGetCurrentLocation, LOG } from '../../../utils/helperFunction';
import { executeApiRequest } from '../../../Api/methods/method';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { googleapikey } from '../../../utils/constants';
import { setCurrentLocation } from '../../../redux/slices/authSlice';
import BottomSheet from '../../../components/BottomSheet';
import { useAddMutation } from '../../../Api/locationApiSlice';
import { clearCart } from '../../../redux/slices/cartSlice';
import PaginatedList from '../../../Api/Pagination/List';
import { incrementNotificationCount } from '../../../redux/actions/notificationsActions';
import { notificationsApi } from '../../../Api/notificationsApiSlice';
import { io } from 'socket.io-client';
import { getSocket } from '../../../utils/Services/socketService';
import { showToast } from '../../../utils/toast';
import {
  check,
  request,
  openSettings,
  RESULTS,
  PERMISSIONS,

} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('screen');
const Home = () => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef();
  const isFocused = useIsFocused();
  const token = useSelector(state => state?.auth?.token);

  const ref = useRef(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [add, { isLoading: addresLoading }] = useAddMutation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const alertShown = useRef(false);
  const currentLocation = useSelector(state => state.auth.currentLocation);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      socket.on('notification', data => {
        console.log('New Notification:', data);
        dispatch(incrementNotificationCount());
        dispatch(notificationsApi.util.invalidateTags(['Notifications']));
      });
    }
  }, [dispatch]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener(
  //     'change',
  //     async nextAppState => {
  //       if (
  //         appState.current.match(/inactive|background/) &&
  //         nextAppState === 'active'
  //       ) {
  //         try {
  //           const { latitude, longitude } = await handleGetCurrentLocation();

  //           // Agar nayi location aur purani location different hai tabhi update karo
  //           const oldLat = currentLocation?.coordinates?.[1];
  //           const oldLng = currentLocation?.coordinates?.[0];

  //           if (
  //             !oldLat ||
  //             !oldLng ||
  //             Math.abs(oldLat - latitude) > 0.0045 || // ~500m threshold
  //             Math.abs(oldLng - longitude) > 0.0045
  //           ) {
  //             const res = await fetch(
  //               `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleapikey}`,
  //             );
  //             const json = await res.json();
  //             const address = json?.results?.[0]?.formatted_address || '';

  //             dispatch(
  //               setCurrentLocation({
  //                 coordinates: [longitude, latitude],
  //                 type: 'Point',
  //                 address,
  //               }),
  //             );
  //             dispatch(clearCart());
  //           }
  //         } catch (err) {
  //           console.log('Location error:', err.message);
  //           Alert.alert('Error', err.message);
  //         }
  //       }
  //       appState.current = nextAppState;
  //     },
  //   );

  //   return () => subscription.remove();
  // }, [currentLocation, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (!currentLocation) {
        handleUseCurrentLocation();
      }
    }, [currentLocation]),
  );


  const handleUseCurrentLocation = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const status = await check(permission);

      if (status === RESULTS.GRANTED) {
        getUserLocation();
        return;
      }

      if (status === RESULTS.BLOCKED) {
        showPermissionsAlertWithDelay();
        return;
      }

      const newStatus = await request(permission);

      if (newStatus === RESULTS.GRANTED) {
        getUserLocation();
        return;
      }

      if (newStatus === RESULTS.DENIED || newStatus === RESULTS.BLOCKED) {
        showPermissionsAlertWithDelay();
      }
    } catch (err) {
      console.log('Permission error:', err);
      showRetryAlert('Something went wrong checking location permission.');
    }
  };

  const showPermissionsAlertWithDelay = () => {
    if (alertShown.current) return;
    alertShown.current = true;

    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        Alert.alert(
          'Location Permission',
          'Location is turned off for this app. Please enable it in Settings to show nearby deals.',
          [
            {
              text: 'Open Settings',
              onPress: () => {
                alertShown.current = false;
                openSettings();
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => (alertShown.current = false),
            },
          ],
          { cancelable: true },
        );
      }, 500);
    });
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleapikey}`
          );
          const json = await res.json();
          const address = json?.results?.[0]?.formatted_address || '';

          dispatch(
            setCurrentLocation({
              coordinates: [longitude, latitude],
              type: 'Point',
              address,
            })
          );

          dispatch(clearCart());
          showToast('Location fetched successfully');
        } catch (err) {
          showRetryAlert('Could not fetch address. Try again?');
        }
      },
      error => {
        console.warn('Geolocation error:', error);

        if (error.code === 1) {
          showPermissionAlert();
        } else if (error.code === 2 || error.code === 3) {
          // Position unavailable or timeout
          console.log('Location not ready yet, retrying...');
          setTimeout(getUserLocation, 2000); // retry after 2 seconds automatically
        } else {
          showRetryAlert('Unable to get your location. Try again?');
        }
      },
      {
        enableHighAccuracy: true, // 🔥 important
        timeout: 20000,           // 🔥 20 sec timeout
        maximumAge: 60000,        // 🔥 allow 1 min old cached location
      }
    );
  };


  const showPermissionAlert = () => {
    Alert.alert(
      'Location Permission',
      'Please enable location access from settings.',
      [{ text: 'Open Settings', onPress: () => openSettings() }],
      { cancelable: false },
    );
  };

  const showRetryAlert = message => {
    Alert.alert(
      'Location Error',
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Retry', onPress: () => getUserLocation() },
      ],
      { cancelable: true },
    );
  };




  const [longitude, latitude] = currentLocation?.coordinates || [];
  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    // latitude,
    // longitude,
  });
  console.log('payloadpayloadpayload', payload);

  const [favoriteCouponIds, setFavoriteCouponIds] = useState([]);
  const {
    data: favoriteCouponData,
    isLoading: CouponLoading,
    refetch: couponRefetch,
  } = useFetchMyFavoriteCouponsQuery();

  useFocusEffect(
    useCallback(() => {
      couponRefetch();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const ids = Array.isArray(favoriteCouponData)
        ? favoriteCouponData.map(item => item._id)
        : [];
      setFavoriteCouponIds(ids);
    }, [favoriteCouponData]),
  );

  // LOG('setFavoriteCouponIds: ', favoriteCouponIds);

  const [addFavoriteCoupon, { isLoading: addLoading }] =
    useAddFavoriteCouponMutation();
  const [removeFavouriteCoupon, { isLoading: removeLoading }] =
    useRemoveFavouriteCouponMutation();

  const [loadingCouponId, setLoadingCouponId] = useState(null);

  const handleHeartPress = async id => {
    const isAlreadyFavorite = favoriteCouponIds.includes(id);
    const apiCall = isAlreadyFavorite
      ? removeFavouriteCoupon
      : addFavoriteCoupon;

    try {
      setLoadingCouponId(id); // Start loading for this ID only

      const response = await executeApiRequest({
        apiCallFunction: apiCall,
        params: { id },
        toastMessage: isAlreadyFavorite
          ? 'Coupon removed from favorites'
          : 'Coupon added to favorites',
        timeout: 30000,
      });

      if (response) {
        if (isAlreadyFavorite) {
          setFavoriteCouponIds(prevIds =>
            prevIds.filter(itemId => itemId !== id),
          );
        } else {
          setFavoriteCouponIds(prevIds => [...prevIds, id]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCouponId(null); // Stop loading
    }
  };

  const handleLocationSubmit = async location => {
    const payload = {
      location: { ...location },
    };
    // LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      setIsAddingNewAddress(false);
      bottomSheetRef.current?.refetchUser();
      dispatch(clearCart());
    }
  };

  return (
    <>
      <AppBackground
        menu={true}
        title={'FEATURED DEALS...'}
        notification
        onLocationPress={() => {
          if (!token) {
            showToast('You need to be logged in to add a new location.');
            return
          }
          bottomSheetRef.current.open();
          bottomSheetRef.current?.refetchUser();
        }}
        textStyle={{ width: '60%', alignItems: 'center' }}
        location={
          currentLocation?.address
            ? currentLocation?.address
            : 'Fetching Loaction...'
        }>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
            marginTop: 10,
            flex: 1,
          }}>
          <SearchInput
            placeholder={'Search for Coupons....'}
            value={searchText}
            onChangeText={setSearchText}
          />
          <PaginatedList
            ref={ref}
            fetchData={useFetchAllCouponsQuery}
            scrollEnabled={true}
            // payload={{longitude, latitude}}
            payload={payload}
            renderItem={({ item }) => (
              <Coupon
                heart={true}
                couponItem={item}

                loading={loadingCouponId === item._id}
                isFavorite={favoriteCouponIds.includes(item?._id)}
                onHeartPress={handleHeartPress}
                onPress={() => {
                  if (
                    item?.isCampaign === true &&
                    new Date(item?.startDate) > new Date()
                  ) {
                    showToast('This campaign has not started yet.');
                    return;
                  }
                  NavService.navigate('CouponDetails', { couponDetails: item });
                }}
              />
            )}
            keyExtractor={item => item._id}
            id="coupons"
            preferredKey="preferredCoupons"
            fallbackKey="fallbackCoupons"
            searchText={searchText}
            searchFields={['couponName']}
            contentContainerStyle={{
              paddingBottom: height * 0.15,
              backgroundColor: colors?.white,
              paddingTop: vh * 1,
              gap: vh * 1,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </AppBackground>
      <BottomSheet
        location
        ref={bottomSheetRef}
        OnYesPress={() => {

          bottomSheetRef.current.close()
        }}
        onClose={() => bottomSheetRef.current?.close()}
        onNewLocationSubmit={handleLocationSubmit}
        isAddingNewAddress={isAddingNewAddress}
        setIsAddingNewAddress={setIsAddingNewAddress}
        loader={addresLoading}
      />
    </>
  );
};

export default Home;
