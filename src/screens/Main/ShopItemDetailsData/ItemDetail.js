import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {
  carGallery,
  couponData,
  restaurantGallery,
  restaurantTiming,
} from '../../../utils/dummyData';
import CustomIcon from '../../../components/CustomIcon';
import FastImage from 'react-native-fast-image';
import Coupon from '../../../components/Coupon';
import NavService from '../../../helpers/NavService';

const {width, height} = Dimensions.get('screen');
const ItemDetail = ({route}) => {
  const {carDetails} = route.params;
  const renderGalleryItem = ({item}) => (
    <View style={styles.imageContainer}>
      <FastImage source={item?.image} style={styles.image} resizeMode="cover" />
    </View>
  );
  return (
    <AppBackground
      back
      titleColor={colors?.white}
      title={'CAR DETAILS'}
      notification
      couponDetails={true}
      marginHorizontal={true}>
      <ScrollView>
        <CustomContainer
          bgImage={appImages?.carDetailBG}
          customItemStyles={{marginTop: -height * 0.05}}>
          <View style={styles?.titleSection}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <CustomText
                text={carDetails?.type}
                font={family?.Gilroy_SemiBold}
                size={size?.h1}
                color={colors?.headingText}
                numberOfLines={2}
                style={{width: '60%'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '30%',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text={'$'}
                  numberOfLines={1}
                  font={family?.Gilroy_Bold}
                  size={size?.large}
                  color={colors?.headingText}
                />
                <CustomText
                  text={carDetails?.rate}
                  numberOfLines={1}
                  font={family?.Gilroy_Bold}
                  size={size?.title}
                  color={colors?.headingText}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: height * 0.02,
                gap: 10,
                marginBottom: height * 0.02,
              }}>
              <View style={styles?.workItems}>
                <CustomIcon
                  size={size?.h1}
                  src={appIcons?.profile}
                  tintColor={colors?.iconColor}
                />
                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={carDetails?.owner}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={styles?.workItems}>
                <CustomIcon
                  size={size?.h1}
                  src={appIcons?.address}
                  tintColor={colors?.iconColor}
                />
                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={carDetails?.location}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={styles?.workItems}>
                <CustomIcon
                  size={size?.h1}
                  src={appIcons?.call}
                  tintColor={colors?.iconColor}
                />
                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={carDetails?.number}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>

            <View style={styles?.horizontalBoxContainer1}>
              {[
                {
                  title: 'Year',
                  img: appIcons.calendar,
                  detail: carDetails?.year,
                  color: '#FED0AB',
                  size: size?.h1,
                  width: width * 0.05,
                },
                {
                  title: 'Condition',
                  img: appIcons.carIconVector,
                  detail: carDetails?.condition,
                  color: '#BAE5F4',
                  size: size?.h1,
                  width: width * 0.1,
                },
                {
                  title: 'Year',
                  img: appIcons.brush,
                  detail: carDetails?.carColor,
                  color: '#BDF4C9',
                  size: size?.h1,
                  width: width * 0.06,
                },
              ].map((item, index) => (
                <View
                  style={[styles?.peachBox, {backgroundColor: item?.color}]}
                  key={index}>
                  <CustomIcon
                    size={item?.size}
                    src={item?.img}
                    resizeMode={'center'}
                    customIconWrapper={{width: item?.width}}
                    tintColor={colors?.headingText}
                  />
                  <CustomText
                    text={item?.title}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <CustomText
                    text={item?.detail}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                </View>
              ))}
            </View>

            <View style={[styles?.hr, {width: '100%'}]} />
            <View>
              <CustomText
                text={'GALLERY'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <FlatList
                data={carGallery}
                scrollEnabled={false}
                renderItem={renderGalleryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                columnWrapperStyle={styles.galleryRow}
                contentContainerStyle={styles.galleryList}
              />
            </View>
            <View style={[styles?.hr, {width: '100%'}]} />
            <View>
              <CustomText
                text={'ABOUT CAR'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <CustomText
                style={{
                  textAlign: 'justify',
                  marginTop: 5,
                  lineHeight: height * 0.03,
                }}
                text={carDetails?.AboutCar}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>
            <View style={[styles?.hr, {width: '100%'}]} />
            <View>
              <View>
                <CustomText
                  text={'TIPS OF CAR'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h6}
                  color={colors?.headingText}
                  numberOfLines={1}
                />
                <View style={{marginTop: height * 0.005}}>
                  {[
                    {title: 'Regular Maintenance'},
                    {title: 'Keep It Clean'},
                    {title: 'Check Fluids'},
                  ].map((item, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        marginTop: height * 0.013,
                      }}
                      key={index}>
                      <CustomIcon
                        size={size?.h1}
                        src={appIcons?.checkmark}
                        resizeMode={'center'}
                      />
                      <CustomText
                        text={item?.title}
                        font={family?.Questrial_Regular}
                        size={size?.xlarge}
                        color={colors?.headingText}
                        numberOfLines={1}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </CustomContainer>
      </ScrollView>
    </AppBackground>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    gap: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  item: {
    marginVertical: 5,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  workItems: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    width: width / 3 - 23,
    height: width / 3 - 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },
  galleryRow: {
    justifyContent: 'space-between',
  },
  galleryList: {
    marginTop: height * 0.015,
  },
  horizontalBoxContainer1: {
    width: '100%',
    height: height * 0.1,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  peachBox: {
    height: '100%',
    width: '30%',
    borderRadius: 15,
    backgroundColor: '#FED0AB',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
});
