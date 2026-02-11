import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {appIcons, appImages} from '../assets';
import {family, size, vh, vw} from '../utils';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import FastImage from 'react-native-fast-image';
import Shadows from '../helpers/Shadows';
import {formatDateYear, getImageUrl, LOG} from '../utils/helperFunction';
import ActivityLoader from './ActivityLoader';
import CustomIcon from './CustomIcon';
import {HEIGHT} from '../theme/units';

const Coupon = ({
  onPress,
  couponItem,
  heart,
  likable,
  onHeartPress,
  noPadding,
  disabled,
  isFavorite,
  loading,
  remove,
  onRemovePress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {paddingHorizontal: noPadding ? 0 : 10}]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}>
      <View style={{position: 'relative'}}>
        <CustomIcon
          src={getImageUrl(couponItem?.image)}
          disabled={true}
          customIconWrapper={[styles.eventImg, {height: HEIGHT * 0.22}]}
          resizeMode={'cover'}
          customIconStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        {couponItem?.isCampaign === true && (
          <View
            style={{
              position: 'absolute',
              top: -vh * 1.2,
              left: vw * 3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: vw * 7,
              height: vh * 12,
              // backgroundColor: 'yellow',
            }}>
            <FastImage
              source={appIcons?.campaignBanner}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>
        )}

        {heart && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onHeartPress(couponItem?._id)}
            style={{
              position: 'absolute',
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: colors?.white,
              zIndex: 999,
              top: 10,
              right: vw * 3,
              ...Shadows?.shadow5,
            }}>
            {loading ? (
              <ActivityLoader size={'small'} />
            ) : likable ? (
              <Image
                source={appIcons?.heart}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  tintColor: colors?.iconColor,
                }}
              />
            ) : (
              <Image
                source={appIcons?.heart}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  tintColor: isFavorite
                    ? colors?.iconColor
                    : colors?.placeholderText,
                }}
              />
            )}
          </TouchableOpacity>
        )}

        {remove && (
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={onRemovePress}
            style={{
              position: 'absolute',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: colors?.white,
              zIndex: 999,
              top: vh * 1,
              right: vw * 3,
              // ...Shadows?.shadow5,
            }}>
            <FastImage
              source={appIcons?.remove}
              resizeMode="contain"
              tintColor={'red'}
              style={{
                width: 22,
                height: 22,
              }}
            />
          </TouchableOpacity>
        )}

        <View
          style={[
            styles?.couponItems,
            {
              height:
                couponItem?.isCampaign === true ? HEIGHT * 0.11 : HEIGHT * 0.11,
            },
          ]}>
          {couponItem?.businessProfile?.image && (
            <View style={styles?.iconContainer}>
              <FastImage
                source={getImageUrl(couponItem?.businessProfile?.image)}
                resizeMode="cover"
                style={{
                  width: '95%',
                  
                  height: '95%',
                  borderRadius: 10,
                  // ...Shadows?.shadow5,
                }}
                defaultSource={appImages?.placeholder}
              />
            </View>
          )}
          <View style={{width: '73%'}}>
            {/* {couponItem?.isCampaign === true && (
              <CustomText
                text={`This Coupon is now part of a Campaign!!`}
                numberOfLines={1}
                font={family?.Questrial_Regular}
                size={size?.medium}
                color={colors?.secondary}
              />
            )} */}
            {couponItem?.businessProfile?.businessName && (
              <CustomText
                text={couponItem?.businessProfile?.businessName}
                font={family?.Gilroy_SemiBold}
                size={size?.xxlarge}
                color={colors?.headingText}
              />
            )}
            <CustomText
              text={`${couponItem?.couponName}`}
              font={family?.Gilroy_Regular}
              size={size?.xxlarge}
              color={colors?.headingText}
              numberOfLines={2}
            />
            {couponItem?.isCampaign === true && (
              <CustomText
                text={`Start Date: ${formatDateYear(couponItem?.startDate)}`}
                numberOfLines={1}
                font={family?.Questrial_Regular}
                size={size?.medium}
                color={colors?.secondary}
              />
            )}
            <CustomText
              text={`Expiry Date: ${formatDateYear(couponItem?.endDate)}`}
              numberOfLines={1}
              font={family?.Questrial_Regular}
              size={size?.medium}
              color={colors?.secondary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors?.white,
  },
  container: {
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    width: '30%',
    height: '50%',
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    width: '63%',
    gap: 3,
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '70%',
    height: '65%',
    gap: 10,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: '24%',
    height: '95%',
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  couponItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    // gap: 5,
  },
  eventImg: {
    height: HEIGHT * 0.215,
    width: '100%',
  },
});
