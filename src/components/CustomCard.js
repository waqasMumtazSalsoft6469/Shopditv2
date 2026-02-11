import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/Colors';
import CustomIcon from './CustomIcon';
import {family, size, vh, vw} from '../utils';
import CustomText from './CustomText';
import Shadows from '../helpers/Shadows';
import FastImage from 'react-native-fast-image';
import {appIcons, appImages} from '../assets';
import CircularIcon from './CircularIcon';
import NavService from '../helpers/NavService';
import {withDecay} from 'react-native-reanimated';
import CustomButton from './CustomButton';
import {
  capitalizeWords,
  formatDateShort,
  getImageUrl,
  LOG,
} from '../utils/helperFunction';
import CustomFastImage from './CustomFastImage';
import {HEIGHT, WIDTH} from '../theme/units';

const {width, height} = Dimensions.get('screen');

const CustomCard = ({
  dealCard = false,
  onPress,
  disabled = false,
  product = false,
  shopMyCart = false,
  orderCardList = false,
  restaurantProduct = false,
  item,
  index,
  myCoupon = false,
  eventCard = false,
  cartCard = false,
  rewardCard = false,
  userRewardCard = false,
  shopCard = false,
  eventCardCheckout = false,
  jobCard = false,
  couponCard = false,
  myAdsCard = false,
  shopItemCard = false,
  myAdsDetailsCard = false,
  heart = false,
  walletCard = false,
  shopditVoucher = false,
  shopditExpiry = false,
  FlippCard = false,
  shadowCard = false,
  handleTrashPress,
  onAddPress,
  noPadding,
  participants,
  totalAmount,
  quantity,
  totalPrice,
  setQuantity,
  onRemovePress,
  onRewardPress,
  onLoading,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  // const [quantity, setQuantity] = useState(1);

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  const handleIncrease = () => {
    if (!disabled && setQuantity) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (!disabled && setQuantity) {
      if (quantity <= 1) {
        // Trash condition met
        NavService.goBack();
      } else {
        setQuantity(quantity - 1);
      }
    }
  };

  const CATEGORY_STYLES = {
    Discount: {
      bg: '#C0FBE4',
      text: '#16714D',
    },
    'Free Item': {
      bg: '#FBE2C0',
      text: '#A65F00',
    },
    'Gift Card': {
      bg: '#C0FBE4',
      text: '#16714D',
    },
  };

  const defaultStyle = {
    bg: 'yellow',
    text: colors.headingText,
  };

  const categoryStyle = CATEGORY_STYLES[item?.category] || defaultStyle;

  return (
    <TouchableOpacity
      style={[
        !product && styles.container,
        {paddingHorizontal: noPadding ? 0 : 10},
        shopMyCart && {backgroundColor: 'transparent'},
        (shopMyCart || orderCardList) && {backgroundColor: 'transparent'},
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}>
      {dealCard && (
        <View style={styles.bookingContainer}>
          <View style={styles.ratingContainer}>
            <CustomText
              text={item?.typeName.toUpperCase()}
              color={colors?.white}
              font={family.Gilroy_Medium}
              size={size.h6}
            />
          </View>
          <CustomIcon
            src={appImages?.restaurant}
            customIconWrapper={styles.bookingImg}
            resizeMode={'cover'}
            customIconStyle={{borderRadius: 10}}
            disabled={true}
            activeOpacity={1}
          />
        </View>
      )}

      {restaurantProduct && (
        <View
          style={[
            styles.restarantCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
            shadowCard && {...Shadows?.shadow5},
          ]}>
          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={true}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                bottom: 70,
                right: 10,
                borderWidth: 1,
                borderColor: '#D9D9D9',
              }}>
              <Image
                source={appIcons?.add}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          <View style={styles?.productImageBg}>
            <FastImage
              style={[
                styles?.restaurantImg,
                shadowCard && {
                  borderRadius: 0,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}
              source={getImageUrl(item?.image)}
              resizeMode="cover"
              defaultSource={appImages?.placeholder}
            />
          </View>
          <View style={{padding: 10, gap: 3}}>
            <CustomText
              text={item?.productName}
              color={colors.headingText}
              font={family?.Gilroy_SemiBold}
              size={size?.large}
              numberOfLines={1}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {item?.price ? (
                <CustomText
                  text={`$ ${item?.price}`}
                  color={colors.secondary}
                  font={family.Gilroy_Bold}
                  size={size?.large}
                  numberOfLines={1}
                />
              ) : (
                <CustomText
                  text={`$ ${item?.variations[0]?.price}`}
                  color={colors.secondary}
                  font={family.Gilroy_Bold}
                  size={size?.large}
                  numberOfLines={1}
                />
              )}

              {item?.original !== undefined && (
                <CustomText
                  text={`$ ${item?.original}`}
                  color={colors.lightText}
                  font={family.Gilroy_Medium}
                  size={size?.large}
                  numberOfLines={1}
                  style={{textDecorationLine: 'line-through'}}
                />
              )}
            </View>
          </View>
        </View>
      )}
      {product && (
        <View
          style={[
            styles.productCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
          ]}>
          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.productImageBg}>
            <FastImage
              style={styles?.productImg}
              source={getImageUrl(item?.image)}
              defaultSource={appImages?.placeholder}
              resizeMode="cover"
            />
          </View>
          <View style={{padding: 10}}>
            <CustomText
              text={item?.businessName}
              color={colors.headingText}
              font={family.Gilroy_Medium}
              size={size?.medium}
              numberOfLines={1}
            />
          </View>
        </View>
      )}
      {shopCard && (
        <View
          style={[
            styles.productCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
          ]}>
          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.productImageBg}>
            <FastImage
              style={styles?.productImg}
              source={getImageUrl(item?.image)}
              defaultSource={appImages?.placeholder}
              resizeMode="cover"
            />
          </View>
          <View style={{padding: 10}}>
            <CustomText
              text={item?.name}
              color={colors.headingText}
              font={family.Gilroy_Medium}
              size={size?.medium}
              numberOfLines={1}
            />
          </View>
        </View>
      )}
      {shopditVoucher && (
        <View
          style={[
            styles.productCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
          ]}>
          <View style={styles?.VoucherImageBg}>
            <FastImage
              style={styles?.VoucherImg}
              source={item?.image}
              resizeMode="cover"
            />
            <View style={{padding: 10}}>
              <CustomText
                text={item?.discount}
                color={colors.headingText}
                font={family.Gilroy_Medium}
                size={size?.medium}
                numberOfLines={1}
              />
              <CustomText
                text={item?.points}
                color={colors.secondary}
                font={family.Gilroy_Medium}
                size={size?.small}
                numberOfLines={1}
                style={{marginTop: vh * 0.3}}
              />
              <View style={{marginTop: vh * 2.2, marginBottom: vh * 1}}>
                <CustomButton
                  gradientColorArr={[colors?.white, colors.white]}
                  title={'REDEEM'}
                  customWidth={'100%'}
                  customHeight={43}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  // onPress={OnNoPress}
                  textStyle={{
                    fontSize: size?.xxlarge,
                    color: colors?.secondary,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{padding: 11}} />
        </View>
      )}

      {eventCard && (
        <View style={styles.bookingContainer}>
          <View style={styles.dateContainer}>
            <CustomText
              // text={formatDateShort(item?.date)}
              text={formatDateShort(item?.date)}
              color={colors?.white}
              font={family?.Gilroy_Bold}
              size={size.xxlarge}
              style={{textAlign: 'center'}}
            />
          </View>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={styles.eventImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View style={styles?.eventItems}>
            <View>
              <CustomText
                text={item?.eventName}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h6}
                numberOfLines={1}
              />
              <CustomText
                text={item?.location?.address}
                color={colors.secondary}
                font={family?.Gilroy_Medium}
                size={size.large}
                numberOfLines={2}
                style={{width: vw * 50}}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <CustomText
                text={'$'}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.xlarge}
                numberOfLines={1}
              />
              <CustomText
                text={item?.ticketPrice}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.h2}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}

      {cartCard && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={[styles.eventImg, {height: height * 0.31}]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}

          <View style={[styles?.couponItems, {paddingHorizontal: 20}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <CustomText
                  text={item?.productName}
                  color={colors.headingText}
                  font={family?.Gilroy_Medium}
                  size={size.h4}
                  numberOfLines={1}
                />
                {item?.selectedVariation && (
                  <CustomText
                    text={item?.selectedVariation?.name}
                    color={colors?.placeholderText}
                    font={family?.Questrial_Regular}
                    size={size.large}
                    numberOfLines={2}
                  />
                )}
                {item?.specialInstructions && (
                  <CustomText
                    text={`Instructions: ${item?.specialInstructions}`}
                    color={colors?.placeholderText}
                    font={family?.Questrial_Regular}
                    size={size.medium}
                    numberOfLines={2}
                  />
                )}
              </View>
              <View>
                <CustomText
                  text={`$${totalPrice}`}
                  font={family?.Gilroy_Bold}
                  size={size?.h1}
                  color={colors?.secondary}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase'}}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: width * 0.03,
                marginTop: 5,
              }}>
              {/* <CircularIcon
                size={width * 0.1}
                image={true}
                src={quantity === 1 ? appIcons?.trash : appIcons?.minus}
                backgroundColor={quantity === 1 ? '#EB2344' : colors?.white}
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  } else if (quantity === 1) {
                    NavService?.goBack();
                  }
                }}
              />
              <CustomText
                text={String(quantity)}
                font={family?.Gilroy_SemiBold}
                size={size?.h3}
                color={colors?.headingText}
                numberOfLines={1}
                style={{textTransform: 'uppercase'}}
              />
              <CircularIcon
                size={width * 0.1}
                image={true}
                src={appIcons?.add}
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
              /> */}

              {quantity > 1 ? (
                <TouchableOpacity
                  onPress={handleDecrease}
                  disabled={disabled}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.lightgray,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={appIcons.minus}
                    style={{tintColor: colors.red, width: '50%', height: '10%'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleTrashPress}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.red,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={appIcons.trash}
                    style={{width: 16, height: 16, tintColor: colors.white}}
                  />
                </TouchableOpacity>
              )}
              <CustomText
                text={quantity.toString()}
                font={family.Gilroy_SemiBold}
                size={size.large}
                color={colors.black}
                style={{marginHorizontal: 12}}
              />

              <TouchableOpacity
                onPress={handleIncrease}
                disabled={disabled}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: colors.lightgray,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={appIcons.add}
                  style={{width: 12, height: 12, tintColor: colors.black}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {FlippCard && (
        <View style={[styles.bookingContainer]}>
          <View style={styles?.flippImageContainer}>
            <CustomIcon
              src={item?.image}
              disabled={true}
              customIconWrapper={[
                styles?.image,
                {width: '100%', height: '100%'},
              ]}
              resizeMode={'cover'}
              customIconStyle={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </View>

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                right: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View
            style={[
              styles?.couponItems,
              {width: '100%', flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={{width: vw * 13, height: vw * 13, borderRadius: 50}}>
              <FastImage
                source={item?.icon}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <View>
              <CustomText
                text={item?.title}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h4}
                numberOfLines={1}
              />
              <CustomText
                text={item?.deadline}
                color={colors?.placeholderText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={2}
              />
            </View>
          </View>
        </View>
      )}
      {couponCard && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={item?.image}
            disabled={true}
            customIconWrapper={[styles.eventImg, {height: height * 0.22}]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.couponItems}>
            <CustomText
              text={item?.type?.toUpperCase()}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.h4}
              numberOfLines={1}
            />
            <CustomText
              text={item?.description}
              color={colors?.placeholderText}
              font={family?.Questrial_Regular}
              size={size.large}
              numberOfLines={2}
            />
          </View>
        </View>
      )}
      {shopItemCard && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={[
              styles.eventImg,
              {height: height * 0.232, ...Shadows?.shadow5},
            ]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.couponItems}>
            <CustomText
              text={item?.title}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.h4}
              numberOfLines={1}
            />
            <CustomText
              text={item?.description}
              color={colors?.placeholderText}
              font={family?.Questrial_Regular}
              size={size.large}
              numberOfLines={2}
            />
          </View>
        </View>
      )}
      {myAdsCard && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={
              item?.category === "MEN'S FASHION"
                ? appImages?.marketplace1
                : item?.category === 'MOBILE'
                ? appImages?.marketplace2
                : item?.category === 'AUTOMOBILE'
                ? appImages?.car1
                : item?.category === 'HOME GARDEN'
                ? appImages?.marketplace4
                : item?.category === 'GROCERY'
                ? appImages?.grocery
                : item?.category === 'FITNESS MACHINES'
                ? appImages?.marketplace5
                : item?.category === 'KIDS & TOYS'
                ? appImages?.marketplace6
                : item?.category === 'COMPUTER & LAPTOPS'
                ? appImages?.marketplace7
                : item?.category === "WOMEN'S FASHION"
                ? appImages?.marketplace8
                : item?.category === 'BOOKS & HOBBIES'
                ? appImages?.marketplace9
                : item?.category === 'BUSINESS EQUIPMENT'
                ? appImages?.marketplace10
                : undefined
            }
            disabled={true}
            customIconWrapper={[styles.eventImg, {height: height * 0.232}]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.couponItems}>
            <CustomText
              text={item?.category?.toUpperCase()}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.h6}
              numberOfLines={1}
            />
            {/* <CustomText
              text={`Ads related to ${capitalizeWords(item?.category)}`}
              color={colors?.placeholderText}
              font={family?.Questrial_Regular}
              size={size.large}
              numberOfLines={2}
            /> */}
          </View>
        </View>
      )}
      {myAdsDetailsCard && (
        <View style={styles.bookingContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onRemovePress}
            style={{
              padding: 5,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'white',
              zIndex: 999,
              right: 5,
              top: 5,
              ...Shadows?.shadow5,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: 'red',
              }}
            />
          </TouchableOpacity>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={[styles.eventImg, {height: height * 0.232}]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
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
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.couponItems}>
            <CustomText
              text={item?.title}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.h6}
              numberOfLines={1}
            />
            <CustomText
              text={item?.description}
              color={colors?.placeholderText}
              font={family?.Questrial_Regular}
              size={size.large}
              numberOfLines={2}
            />
          </View>
        </View>
      )}
      {walletCard && (
        <View style={styles.wallerContainer}>
          {shopditExpiry ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 30,
                gap: 10,
              }}>
              <CustomText
                text={item?.availablePoints}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.xhuge}
                numberOfLines={1}
              />
              <CustomText
                text={'AVAILABLE POINTS'}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.xxlarge}
                numberOfLines={1}
              />
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                paddingVertical: 30,
                gap: 10,
              }}>
              <CustomText
                text={'AVAILABLE BALANCE'}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.xxlarge}
                numberOfLines={1}
              />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <CustomText
                  text={'$'}
                  color={colors.headingText}
                  font={family?.Gilroy_Bold}
                  size={size.h1}
                  numberOfLines={1}
                  style={{marginTop: 3}}
                />
                <CustomText
                  text={'590.00'}
                  color={colors.headingText}
                  font={family?.Gilroy_Bold}
                  size={size.xxhuge}
                  numberOfLines={1}
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles?.walletItems}
            disabled={shopditExpiry ? true : false}>
            <CustomText
              text={
                shopditExpiry
                  ? 'Receive 10 points for every $1000 you spend.'
                  : '+ ADD MONEY'
              }
              color={colors.white}
              font={family?.Gilroy_Medium}
              size={size.xxlarge}
              numberOfLines={2}
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>
        </View>
      )}
      {jobCard && (
        <View style={styles.jobContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              gap: height * 0.01,
            }}>
            <View
              style={{
                width: width * 0.12,
                height: height * 0.055,
                borderRadius: 100,
                backgroundColor: 'red',
                overflow: 'hidden',
              }}>
              <CustomFastImage
                uri={getImageUrl(item?.image)}
                style={styles.image}
                resizeMode={'cover'}
              />
            </View>
            <View style={{gap: height * 0.001}}>
              <CustomText
                text={item?.business?.fullName}
                color={colors?.lightBlueText}
                font={family?.Questrial_Regular}
                size={size.medium}
                numberOfLines={3}
              />
              <CustomText
                text={item?.subCategory}
                color={colors.headingText}
                font={family?.Gilroy_SemiBold}
                size={size.xxxlarge}
                numberOfLines={1}
              />
            </View>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleHeartPress}
            style={{
              padding: 15,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: !isFavorite ? 'transparent' : colors?.iconColor,
              zIndex: 999,
              right: 5,
              top: 5,
            }}>
            {myCoupon ? (
              <Image
                source={appIcons?.heart}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                  tintColor: colors?.iconColor,
                }}
              />
            ) : (
              <Image
                source={appIcons?.heart}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                  tintColor: !isFavorite
                    ? colors?.placeholderText
                    : colors?.white,
                }}
              />
            )}
          </TouchableOpacity> */}
          <View style={[styles?.hr, {width: '95%'}]} />
          <View style={styles?.jobItems}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles?.jobDetailContainer}>
                <CustomText
                  color={colors?.headingText}
                  // text={item?.jobLevel}
                  text={item?.jobType}
                  size={size?.small}
                  style={{width: WIDTH * 0.17, textAlign: 'center'}}
                />
              </View>
              <View style={styles?.jobDetailContainer}>
                <CustomText
                  color={colors?.headingText}
                  // text={item?.location?.address}
                  text={item?.category}
                  size={size?.small}
                  style={{width: WIDTH * 0.17, textAlign: 'center'}}
                  numberOfLines={1}
                />
              </View>
              <View style={styles?.jobDetailContainer}>
                <CustomText
                  color={colors?.headingText}
                  text={`$${item?.salary}/month`}
                  // text={item?.jobTime}
                  size={size?.small}
                  style={{width: WIDTH * 0.17, textAlign: 'center'}}
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 5, marginBottom: height * 0.02}}>
            <CustomText
              color={colors?.headingText}
              text={item?.description}
              size={size?.medium}
              style={{marginTop: -1, lineHeight: height * 0.03}}
            />
          </View>
        </View>
      )}
      {eventCardCheckout && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={styles.eventImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View style={styles?.eventItems}>
            <View>
              <CustomText
                text={item?.eventName}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h6}
                numberOfLines={1}
              />
              {/* <CustomText
                text={item?.company}
                color={colors?.lightBlueText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={3}
              /> */}
              <CustomText
                text={`No. of Tickets: ${participants}`}
                color={colors?.headingText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={3}
              />
              <CustomText
                text={`Ticket Price: $${item?.ticketPrice}`}
                color={colors?.headingText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={3}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <CustomText
                text={'$'}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.xlarge}
                numberOfLines={1}
              />
              <CustomText
                text={totalAmount}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.h2}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}

      {rewardCard && (
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            borderRadius: 10,
            alignSelf: 'center',
            overflow: 'hidden',
            paddingBottom: 10,
          }}>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={styles.rewardImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
          <View style={{position: 'absolute', right: 20, top: 10}}>
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'Buy Now'}
              customWidth={vh * 12}
              customHeight={vh * 4}
              buttonStyle={{alignSelf: 'center', borderRadius: 50}}
              textStyle={{fontSize: size.small}}
              onPress={() => onRewardPress?.(item)}
              loadingState={onLoading}
            />
          </View>

          <View style={[styles?.eventItems, {width: '100%'}]}>
            <View style={styles.profileRow}>
              <FastImage
                source={getImageUrl(item?.businessProfile?.image)}
                resizeMode="cover"
                style={{
                  borderRadius: 10,
                  width: '25%',
                  height: '100%',
                  // ...Shadows?.shadow5,
                }}
                defaultSource={appImages?.placeholder}
              />
              <View style={{width: '92%'}}>
                <CustomText
                  text={item?.businessProfile?.businessName}
                  font={family.Gilroy_Medium}
                  size={size.small}
                  color={colors.headingText}
                  numberOfLines={1}
                />
                <CustomText
                  text={item?.title}
                  color={colors.headingText}
                  font={family?.Gilroy_Medium}
                  size={size.h6}
                  numberOfLines={1}
                />
                <CustomText
                  text={item?.description}
                  color={'#62748E'}
                  font={family?.Questrial_Regular}
                  size={size.medium}
                  numberOfLines={3}
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: categoryStyle.bg,
                padding: 5,
                borderRadius: 10,
                position: 'absolute',
                right: 10,
                top: 5,
              }}>
              <CustomText
                text={item?.category}
                color={categoryStyle.text}
                font={family?.Gilroy_Medium}
                size={size.xsmall}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}
      {userRewardCard && (
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            borderRadius: 10,
            alignSelf: 'center',
            overflow: 'hidden',
            paddingBottom: 10,
          }}>
          <CustomIcon
            src={getImageUrl(item?.reward?.image)}
            disabled={true}
            customIconWrapper={styles.rewardImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
          <View style={[styles?.eventItems, {width: '100%'}]}>
            <View style={styles.profileRow}>
              <FastImage
                source={getImageUrl(item?.reward?.businessProfileId?.image)}
                resizeMode="cover"
                style={{
                  borderRadius: 10,
                  width: '25%',
                  height: '100%',
                  // ...Shadows?.shadow5,
                }}
                defaultSource={appImages?.placeholder}
              />
              <View style={{width: '92%'}}>
                <CustomText
                  text={item?.reward?.businessProfileId?.businessName}
                  font={family.Gilroy_Medium}
                  size={size.small}
                  color={colors.headingText}
                  numberOfLines={1}
                />
                <CustomText
                  text={item?.reward?.title}
                  color={colors.headingText}
                  font={family?.Gilroy_Medium}
                  size={size.h6}
                  numberOfLines={1}
                />
                <CustomText
                  text={item?.reward?.description}
                  color={'#62748E'}
                  font={family?.Questrial_Regular}
                  size={size.medium}
                  numberOfLines={3}
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: categoryStyle.bg,
                padding: 5,
                borderRadius: 10,
                position: 'absolute',
                right: 10,
                top: 5,
              }}>
              <CustomText
                text={item?.reward?.category}
                color={categoryStyle.text}
                font={family?.Gilroy_Medium}
                size={size.xsmall}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    width: width * 0.7,
    height: HEIGHT * 0.08,
  },

  profileImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  rewardImg: {
    width: '100%',
    height: vh * 20,
  },
  container: {
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
    // backgroundColor: 'yellow'
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  bookingContainer: {
    // gap: 8,
  },
  wallerContainer: {
    borderWidth: 1,
    borderColor: colors?.secondary,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  jobContainer: {
    borderRadius: 10,
    backgroundColor: colors?.white,
    ...Shadows.shadow5,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  jobItems: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  jobDetailContainer: {
    paddingHorizontal: 13,
    backgroundColor: colors.lightGrayLine,
    borderRadius: 50,
    ...Shadows?.shadow1,
    marginRight: width * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.04,
  },
  eventItems: {
    flexDirection: 'row',
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  couponItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    gap: 5,
  },
  walletItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.secondary,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 10,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: colors.iconColor,
    borderRadius: 50,

    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    gap: -2,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    zIndex: 999,
    paddingVertical: 5,
  },
  bookingImg: {
    height: height * 0.155,
    width: width - 58,
    // ...Shadows?.shadow0
  },
  eventImg: {
    height: height * 0.215,
    width: '100%',
  },
  flippImageContainer: {
    width: '100%',
    height: height * 0.232,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows?.shadow5,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  restarantCard: {
    backgroundColor: colors?.white,
    width: width / 2.46,
    borderRadius: 10,
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: colors?.white,
    width: width / 2.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows?.shadow5,
  },
  productImageBg: {
    width: '100%',
    height: width / 2,
    borderRadius: 10,
  },
  VoucherImageBg: {
    width: '100%',
    height: width / 2,
    borderRadius: 10,
  },
  VoucherImg: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  restaurantImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  rightItem: {
    marginTop: 6,
    marginBottom: -6,
  },
  leftItem: {
    marginBottom: 6,
    marginTop: -6,
  },
});
