import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomContainer from '../../../components/CustomContainer';
import AppBackground from '../../../components/AppBackground';
import {appIcons} from '../../../assets';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {family, size, vh} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import FastImage from 'react-native-fast-image';
import NavService from '../../../helpers/NavService';
import {
  useFetchPointsByUserQuery,
  useFetchShopditPointsByUserQuery,
} from '../../../Api/rewardsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const PointsCard = ({title, points, onViewPress, OnCardPress}) => {
  return (
    <View style={{marginTop: vh * 4}}>
      <CustomText
        text={title.toUpperCase()}
        font={family?.Gilroy_SemiBold}
        size={size?.h5}
        color={colors?.headingText}
        numberOfLines={1}
        style={{textTransform: 'uppercase'}}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={OnCardPress}>
        <View style={{width: '20%'}}>
          <FastImage
            source={appIcons?.pointsIcon}
            resizeMode="contain"
            style={styles.iconStyle}
          />
        </View>
        <View style={styles.cardContent}>
          <View>
            {points === null ? (
              <ActivityLoader color={colors?.secondary} size={'small'} />
            ) : (
              <CustomText
                text={points}
                font={family?.Gilroy_Bold}
                size={size?.xtitle}
                color={colors?.headingText}
                numberOfLines={1}
              />
            )}
            <CustomText
              text={'AVAILABLE POINTS'}
              font={family?.Gilroy_Medium}
              size={size?.large}
              color={colors?.headingText}
              numberOfLines={1}
              style={{textTransform: 'uppercase'}}
            />
          </View>
          <TouchableOpacity
            onPress={onViewPress}
            style={{paddingVertical: 10}}
            disabled>
            <CustomText
              text={'View Points'.toUpperCase()}
              font={family?.Gilroy_SemiBold}
              size={size?.medium}
              color={colors?.secondary}
              underline
              numberOfLines={1}
              style={{textTransform: 'uppercase'}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Wallet = () => {
  const {data, isLoading, refetch} = useFetchPointsByUserQuery();
  const {
    data: shopditPointsData,
    isLoading: shopditPointsLoading,
    refetch: shopditPointsRefetch,
  } = useFetchShopditPointsByUserQuery();

  LOG('SHOPDIT POINTS: ', shopditPointsData);
  const businessPointsData = data?.data?.docs || [];
  const availableShopditPoints = shopditPointsData?.data?.availablePoints;

  const totalBusinessPoints = businessPointsData.reduce((acc, curr) => {
    return acc + (curr?.points || 0);
  }, 0);

  return (
    <AppBackground
      back={true}
      notification
      couponDetails={true}
      tint={'white'}
      title={'WALLET'}
      titleColor={'white'}
      // iconColor={'white'}
    >
      <CustomContainer noImage={true} bannerStyle={styles.bannerStyle}>
        <PullToRefreshScrollView
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            refetch();
            shopditPointsRefetch();
          }}>
          <View style={{padding: 20}}>
            <PointsCard
              title={'Business Points'}
              // points={totalBusinessPoints?.toString()}
              points={isLoading ? null : totalBusinessPoints}
              // onViewPress={() => NavService?.navigate('PointsHistory')}
              OnCardPress={() =>
                NavService?.navigate('businessPoints', {
                  item: businessPointsData,
                })
              }
            />
            <PointsCard
              title={'Shopdit Points'}
              points={shopditPointsLoading ? null : availableShopditPoints}
              // onViewPress={() => NavService?.navigate('PointsHistory')}
              OnCardPress={() =>
                NavService?.navigate('shopditPoints', {
                  item: shopditPointsData?.data,
                })
              }
            />
          </View>
        </PullToRefreshScrollView>
      </CustomContainer>
    </AppBackground>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  bannerStyle: {
    backgroundColor: colors?.primary,
    height: height / 3.6,
    // marginTop: -height * 0.01,
    width: '100%',
  },
  cardContainer: {
    backgroundColor: 'white',
    width: '100%',
    ...Shadows?.shadow5,
    height: height * 0.11,
    borderRadius: 5,
    padding: 10,
    marginTop: vh * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-start',
  },
  cardContent: {
    flexDirection: 'row',
    width: '70%',

    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vh * 6,
    right: vh * 3,
  },
});
