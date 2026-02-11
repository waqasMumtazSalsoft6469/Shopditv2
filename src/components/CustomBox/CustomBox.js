import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {family, size, vh, vw} from '../../utils';
import {colors} from '../../utils/Colors';
import CustomText from '../CustomText';
import styles from './styles';
import Shadows from '../../helpers/Shadows';
import CustomIcon from '../CustomIcon';
import {appIcons} from '../../assets';
import CustomButton from '../CustomButton';
import {
  formatDate,
  formatDateShort,
  formattedTime,
  getImageUrl,
} from '../../utils/helperFunction';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('screen');

const CustomBox = ({
  onPress,
  item,
  resumeBox = false,
  newsletterBox = false,
  ticketBox = false,
  OrderBox = false,
  CustomerBox = false,
  CampaignBox = false,
  onRefundPress,
  onEditPress,
  onViewPress,
  RefundDisabled,
  disabled,
}) => {
  return (
    <View
      style={[
        styles?.contactContainer,
        {
          backgroundColor: 'white',
          ...Shadows?.shadow5,
          justifyContent: 'flex-start',
          padding: 15,
          paddingVertical: 20,
          marginBottom: 10,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
        style={{
          flexDirection: 'row',
          justifyContent: resumeBox ? 'space-between' : 'flex-start',
          alignItems: 'center',
          width: '97%',
        }}>
        {resumeBox && (
          <>
            <View style={{gap: vh * 0.5}}>
              <View style={{flexDirection: 'row', gap: 2}}>
                <CustomText
                  text={'Name: '}
                  size={size?.h6}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={item?.user?.fullName}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 2}}>
                <CustomText
                  text={'Email: '}
                  size={size?.h6}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={item?.user?.email}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 2}}>
                <CustomText
                  text={'Uploaded On: '}
                  size={size?.h6}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={formatDate(item?.createdAt)}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              style={{
                padding: 10,
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.pdfIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </>
        )}
        {newsletterBox && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              style={{
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
                marginRight: vw * 3,
                width: vw * 15,
                height: vw * 15,
              }}>
              <Image
                source={item?.image}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View>
              <CustomText
                text={item?.name}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
              />

              <CustomText
                text={item?.email}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>
          </>
        )}
        {ticketBox && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              style={{
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
                marginRight: vw * 3,
                width: vw * 15,
                height: vw * 15,
              }}>
              <FastImage
                source={getImageUrl(item?.event?.image)}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={{width: width * 0.412}}>
              <CustomText
                text={item?.event?.eventName}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <CustomIcon size={size?.xxlarge} src={appIcons?.timing} />
                <CustomText
                  text={`${formatDateShort(item?.event?.date)}/${formattedTime(
                    item?.event?.time,
                  )}`}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                  numberOfLines={1}
                />
              </View>
              <CustomText
                text={`Total: $${item?.totalAmount}`}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <CustomText
                text={`Payment: ${item?.status}`}
                size={size?.xxlarge}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            <CustomButton
              gradientColorArr={
                item?.status === 'PENDING'
                  ? [colors.secondary, colors.secondary]
                  : [colors.greenIcon, colors.greenIcon]
              }
              title={item?.status === 'PENDING' ? 'Pay Now' : 'Received'}
              //   disabled={RefundDisabled}
              customHeight={30}
              customWidth={width / 5}
              buttonStyle={{borderRadius: 50, alignItems: 'center'}}
              textStyle={{fontSize: size.medium}}
              onPress={onRefundPress}
            />
          </>
        )}

        {OrderBox && (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: width * 0.512, marginLeft: vh * 2}}>
              {/* 🧾 Product Name */}
              <CustomText
                text={item?.name}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={3}
              />

              {/* 🔁 Variations (if any) */}
              {item?.variations?.length > 0 && (
                <View style={{marginTop: 4}}>
                  {item?.variations.map((variation, idx) => (
                    <CustomText
                      key={idx}
                      text={`Variation: ${variation.name} x${variation.quantity}`}
                      size={size?.medium}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  ))}
                </View>
              )}

              {/* 🕒 Order Date */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 6,
                }}>
                <CustomIcon size={size?.xxlarge} src={appIcons?.timing} />
                <CustomText
                  text={formatDate(item?.orderInfo?.createdAt)}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                  numberOfLines={1}
                />
              </View>

              {/* 💰 Subtotal */}
              <CustomText
                text={`Total: $${item?.orderInfo?.subTotal.toFixed(2)}`}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />

              {/* 💳 Payment Status */}
              <CustomText
                text={`Order Status: ${item?.orderInfo?.status}`}
                size={size?.xxlarge}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>

            {/* 📦 Button */}
            {/* <CustomButton
              gradientColorArr={
                item?.orderInfo?.status === 'PENDING'
                  ? [colors.secondary, colors.secondary]
                  : [colors.greenIcon, colors.greenIcon]
              }
              title={
                item?.orderInfo?.status === 'PENDING' ? 'Pay Now' : 'Confirmed'
              }
              customHeight={30}
              customWidth={width / 5}
              buttonStyle={{borderRadius: 50, alignItems: 'center'}}
              textStyle={{fontSize: size.medium}}
              onPress={onRefundPress}
            /> */}
          </View>
        )}

        {CustomerBox && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              disabled={disabled}
              style={{
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
                marginRight: vw * 3,
                width: vw * 15,
                height: vw * 15,
              }}>
              <Image
                source={item?.image}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={{width: width * 0.412}}>
              <CustomText
                text={item?.name}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <CustomIcon size={size?.xxlarge} src={appIcons?.emailIcon} />
                <CustomText
                  text={item?.email}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                  numberOfLines={1}
                />
              </View>
            </View>
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'View'}
              //   disabled={RefundDisabled}
              customHeight={30}
              customWidth={width / 5}
              buttonStyle={{borderRadius: 50, alignItems: 'center'}}
              textStyle={{fontSize: size.medium}}
              onPress={onViewPress}
            />
          </>
        )}
        {CampaignBox && (
          <>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '60%'}}>
                <CustomText
                  text={item?.name}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.headingText}
                  numberOfLines={1}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  left: 10,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onEditPress}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#E8E6EA',
                    borderRadius: 50,
                  }}>
                  <CustomIcon size={size?.xlarge} src={appIcons?.edit} />
                </TouchableOpacity>
                <View
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 25,
                    backgroundColor:
                      item?.status === 'Inactive' ? 'red' : '#1AB394',
                  }}>
                  <CustomText
                    text={item?.status}
                    size={size?.small}
                    font={family?.Questrial_Regular}
                    color={colors?.white}
                    numberOfLines={1}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomBox;
