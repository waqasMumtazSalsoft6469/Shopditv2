import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import Coupon from '../../../components/Coupon';
import {couponData} from '../../../utils/dummyData';
import {
  useFetchMyFavoriteCouponsQuery,
  useRemoveFavouriteCouponMutation,
} from '../../../Api/couponApiSlice';
import {LOG} from '../../../utils/helperFunction';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import BottomSheet from '../../../components/BottomSheet';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import {executeApiRequest} from '../../../Api/methods/method';
import {removeFavoriteCouponId} from '../../../redux/slices/authSlice';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('screen');
const MyCoupon = () => {
  const bottomSheetRef = useRef();
  const selectedCouponRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {data, isLoading, error, refetch} = useFetchMyFavoriteCouponsQuery();
  LOG('Data: ', data);
  const [removeFavouriteCoupon] = useRemoveFavouriteCouponMutation();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const handleDelete = async () => {
    const couponToRemove = selectedCouponRef.current;
    LOG('IDss: ', couponToRemove);
    if (!couponToRemove) {
      Alert?.alert('Unable to Remove');
      bottomSheetRef?.current?.close();
      return;
    }

    const response = await executeApiRequest({
      apiCallFunction: removeFavouriteCoupon,
      params: {
        id: couponToRemove,
      },
      toast: true,
      timeout: 30000,
    });

    LOG('Delete Success:', response);
    if (response) {
      dispatch(removeFavoriteCouponId(couponToRemove));
      bottomSheetRef.current.close();
      selectedCouponRef.current = null;
      refetch();
    }
  };
  return (
    <AppBackground
      back={true}
      title={'MY favorite COUPONS'.toUpperCase()}
      notification>
      {data?.length > 0 ? (
        <>
          <PullToRefreshFlatList
            refetch={refetch}
            style={{marginTop: height * 0.04}}
            contentContainerStyle={{
              paddingBottom: width * 0.01,
              paddingTop: 5,
              backgroundColor: colors?.white,
              paddingHorizontal: 15,
            }}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Coupon
                couponItem={item}
                remove={true}
                onRemovePress={() => {
                  selectedCouponRef.current = item?._id;
                  LOG('ITEM: ', item?._id);
                  bottomSheetRef.current.open();
                }}
                onPress={() => {
                  NavService.navigate('MyCouponDetails', {couponDetails: item});
                }}
              />
            )}
          />
          <BottomSheet
            remove={true}
            text={
              'Are you sure you want to remove this coupon from favourites?'
            }
            ref={bottomSheetRef}
            OnNoPress={() => {
              Alert.alert('No Pressed');
              bottomSheetRef.current.close();
            }}
            OnYesPress={handleDelete}
          />
        </>
      ) : (
        <PullToRefreshScrollView
          onRefresh={refetch}
          refreshingColor={colors2?.theme?.secondary}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
          {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
          <EmptyDataComponent
            message={isLoading ? 'Loading! Please Wait.' : 'No Data Available.'}
          />
        </PullToRefreshScrollView>
      )}
    </AppBackground>
  );
};

export default MyCoupon;
