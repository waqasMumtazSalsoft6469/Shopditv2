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
import {useFetchBusinessCampaignQuery} from '../../../Api/businessApiSlice';

const {width, height} = Dimensions.get('screen');
const Campaign = () => {
  const isFocused = useIsFocused();
  const {data, isLoading, error, refetch} = useFetchBusinessCampaignQuery();
  LOG('Data: ', data);

  const coupons =
    data && Array.isArray(data)
      ? data.flatMap(campaign => campaign?.couponIds || [])
      : [];

  LOG('Coupons: ', coupons);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <AppBackground back={true} title={'Campaign Coupons'.toUpperCase()}>
      {coupons?.length > 0 ? (
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
          data={coupons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Coupon
              couponItem={item}
              disabled={true}
              // onPress={() => {
              //   NavService.navigate('MyCouponDetails', {couponDetails: item});
              // }}
            />
          )}
        />
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

export default Campaign;
