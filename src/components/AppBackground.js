import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, Alert, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../utils/Colors';
import { appIcons } from '../assets';
import { family, size, vh, vw } from '../utils';
import NavService from '../helpers/NavService';
import CustomText from './CustomText';
import FastImage from 'react-native-fast-image';
import CustomIcon from './CustomIcon';
import RatingView from './RatingView/Index';
import RatingWidget from './RatingWidget/Index';
import Shadows from '../helpers/Shadows';
import { useSelector } from 'react-redux';
import { LOG } from '../utils/helperFunction';
import { showToast } from '../utils/toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('screen');

function AppBackground(
  {
    children,
    title,
    back = false,
    share = false,
    onSharePress,
    menu = false,
    nav = '',
    rightIcon = appIcons.notification,
    marginHorizontal = true,
    childrenContainerStyle = {},
    notification = false,
    cart = false,
    titleColor,
    titleSize,
    iconColor,
    filter,
    add,
    AddPress,
    tint,
    header,
    headerCustomStyles,
    isMapScreen = false,
    filterPress,
    description,
    couponDetails = false,
    location = false,
    onLocationPress,
    textStyle,
    // restaurantItems,
    onBack = null,
    editIcon = false,
    isAlone = false,
    jobEditPress,
    item,
  },
  props,
) {
  const cartItems = useSelector(state => state.cart.items);
  const token = useSelector(state => state?.auth?.token);
  const insets = useSafeAreaInsets();

  // const cartCount = cartItems?.length || 0;
  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0);
  const notificationCount = useSelector(state => state.notifications.count);

  // LOG('NOTIF COUNT: ', notificationCount);
  const displayCount =
    notificationCount > 999
      ? '999+'
      : notificationCount > 99
        ? '99+'
        : `${notificationCount}`;
  // LOG('CartItems: ', cartItems);

  return (
    <View style={{ flex: 1, backgroundColor: colors?.white }}>
      {/* {!header && ( */}
      {isMapScreen && (
        <View
          style={{
            backgroundColor: colors?.white,
            height: Platform.OS === 'ios' ? insets.top : getStatusBarHeight(),
          }}
        />
      )}
      <View
        style={[
          {
            marginTop: Platform.OS === 'ios' ? insets.top * 1 : getStatusBarHeight() * 0.7,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: description ? 17 : 0,
            zIndex: 999,
            position: couponDetails ? 'absolute' : 'relative',
            // top:0
          },
          headerCustomStyles,
        ]}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              nav.length
                ? NavService.navigate(nav)
                : back
                  ? onBack != null
                    ? onBack()
                    : NavService.goBack()
                  : onBack != null
                    ? onBack()
                    : NavService.openDrawer();
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              // backgroundColor: emenu ? colors.primary : 'transparent',
              borderRadius: menu ? 10 : 0,
              left: 20,
              width: 45,
              height: 45,
              justifyContent: 'center',
              // ...Shadows.shadow3,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: colors.black,
                }}
                tintColor={titleColor ? titleColor : colors.black}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: tint ? tint : colors.black,
                }}
              />
            )}
          </TouchableOpacity>

          <View style={textStyle}>
            <Text
              style={{
                color: titleColor ? titleColor : colors.black,
                fontFamily: family?.Gilroy_SemiBold,
                fontSize: titleSize ? titleSize : size?.h6,
              }}>
              {title}
            </Text>
            {location && (
              <TouchableOpacity
                onPress={onLocationPress}
                style={{
                  padding: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: vw * 2,
                }}>
                <Text
                  style={{
                    color: titleColor ? titleColor : colors.black,
                    fontFamily: family?.Gilroy_SemiBold,
                    fontSize: titleSize ? titleSize : size?.small,
                  }}>
                  {location}
                </Text>

                <Image
                  source={appIcons?.bottomArrow}
                  style={{
                    width: vw * 2.5,
                    height: vw * 2.5,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          {filter && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={filterPress}
              style={{
                position: 'absolute',
                right: 65,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.filter}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {add && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={AddPress}
              style={{
                position: 'absolute',
                right: 65,
                padding: 13.5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.add}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {editIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={jobEditPress}
              style={{
                position: 'absolute',
                right: isAlone ? 20 : 70,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.jobEdit}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {cart && (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (!token) {
                    showToast('Please log in to continue');
                    return;
                  }
                  NavService?.navigate('MyCart');
                }}
                style={{
                  position: 'absolute',
                  right: 65,
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: '#DFDFDF',
                }}>
                <Image
                  source={appIcons?.cart}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain',
                  }}
                />
                {cartCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -vw * 1.2,
                      right: 0,
                      minWidth: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 4,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: size?.xxsmall,
                        fontWeight: '600',
                        fontFamily: family?.Questrial_Regular,
                      }}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </>
          )}

          {share && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onSharePress}
              style={{
                position: 'absolute',
                right: vw * 16,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.share}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: '#2F2E43',
                }}
              />
            </TouchableOpacity>
          )}
          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (!token) {
                  showToast('Please log in to continue');
                  return;
                }
                NavService.navigate('Notifications');

              }}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: iconColor,
                }}
              />
              {notificationCount > 0 && (
                <View
                  style={{
                    backgroundColor: colors.red,
                    paddingHorizontal: 1,
                    paddingVertical: 3,
                    borderRadius: 50,
                    position: 'absolute',
                    top: -10,
                    right: -2,
                    minWidth: vw * 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    text={displayCount}
                    size={size.xxsmall}
                    color={colors.white}
                    font={family.Questrial_Regular}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        </>
      </View>
      {description && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <Text
            style={{
              paddingHorizontal: '12%',
              color: titleColor ? titleColor : colors.placeholderText,
              fontFamily: family?.Questrial_Regular,
              fontSize: titleSize ? titleSize : size?.xxlarge,
              textAlign: 'center',
            }}>
            {description}
          </Text>
        </View>
      )}

      {/* {
    restaurantItems &&
    <View style={{
      alignSelf: 'center',
      position: 'absolute',
      top: height * 0.07,
      zIndex: 1,
      padding: 10,
      width: '100%',
      height: '45%',

    }}>

      <View style={{ width: '36%', height: '36%', borderRadius: 10, alignItems: 'center', alignSelf: 'center', }}>
        <FastImage
          source={appIcons?.restaurantLogo}
          resizeMode='cover'
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: vh * 1, }}>

        <CustomText
          text={'KITCHEN CAFE & RESTRO'}
          font={family?.Gilroy_SemiBold}
          size={size?.h1}
          color={colors?.headingText}
          numberOfLines={1}
          style={{ textTransform: 'uppercase' }}
        />
        <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center', }}>
          <RatingWidget initialRating={5} disabled={true} starSize={20} starGap={vw * 3} />

          <CustomText
            text={'4.9 ( 1400+ Ratings)'}
            font={family?.Questrial_Regular}
            size={size?.large}
            color={colors?.placeholderText}
            numberOfLines={1}
            underline
          />
        </View>
      </View>
      <View style={{

        width: '70%',
        backgroundColor: 'white',
        height: '20%',
        marginTop: vh * 2,
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        gap: 12,
        alignSelf: 'center',
        paddingHorizontal: 20,
        ...Shadows?.shadow3

      }}>
        <View style={{ width: vw * 12, height: vw * 12 }}>
          <FastImage
            source={appIcons?.delivery}
            resizeMode='contain'
            style={{ width: '100%', height: '100%' }}
          />

        </View>
        <CustomText
          text={'Delivery 20-35 min'}
          font={family?.Questrial_Regular}
          size={size?.large}
          color={colors?.placeholderText}
          numberOfLines={1}

        />
      </View>
    </View>
  } */}
      <View
        style={[
          {
            flex: 1,
            marginHorizontal: !marginHorizontal ? 20 : 0,
            marginBottom: 10,
            overflow: 'visible',
          },
          childrenContainerStyle,
        ]}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;
