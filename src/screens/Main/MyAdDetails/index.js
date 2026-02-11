import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import CustomIcon from '../../../components/CustomIcon';
import FastImage from 'react-native-fast-image';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import NavService from '../../../helpers/NavService';
import CustomButton from '../../../components/CustomButton';

const {width, height} = Dimensions.get('screen');
const MyAdDetails = ({route}) => {
  const userDetails = useSelector(state => state?.auth?.user || {});

  LOG('params: ', route?.params);
  //   let carDetails;
  const {carDetails, showCall} = route.params || {};
  LOG('ShowCall: ', showCall);
  const renderGalleryItem = ({item}) => (
    <View style={styles.imageContainer}>
      <FastImage
        source={getImageUrl(item)}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  const handleCall = () => {
    if (carDetails?.phoneNumber) {
      const phoneNumber = `tel:${carDetails.phoneNumber}`;
      Linking.openURL(phoneNumber).catch(err =>
        console.warn('Failed to open dialer:', err),
      );
    } else {
      Alert.alert('Phone number not available');
    }
  };

  return (
    <AppBackground
      back
      titleColor={colors?.white}
      title={'AD DETAILS'}
      notification
      editIcon
      jobEditPress={() => {
        NavService?.navigate('editad', {data: carDetails});
      }}
      couponDetails={true}
      marginHorizontal={true}>
      <ScrollView>
        <CustomContainer
          mb={showCall ? true : false}
          bgImage={getImageUrl(carDetails?.image)}
          customItemStyles={{marginTop: -height * 0.05}}>
          <View style={styles?.titleSection}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              {/* <View> */}
              <CustomText
                text={carDetails?.title}
                font={family?.Gilroy_SemiBold}
                size={size?.h1}
                color={colors?.headingText}
                numberOfLines={2}
                style={{width: '60%'}}
              />

              {/* </View> */}
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
                  text={carDetails?.price}
                  numberOfLines={1}
                  font={family?.Gilroy_Bold}
                  size={size?.title}
                  color={colors?.headingText}
                />
              </View>
            </View>
            <CustomText
              text={`Category: ${carDetails?.category}`}
              font={family?.Questrial_Regular}
              size={size?.small}
              color={colors?.iconColor}
              numberOfLines={2}
              style={{width: '60%'}}
            />

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
                  text={
                    showCall
                      ? carDetails?.user?.fullName
                      : userDetails?.fullName
                  }
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
                  text={carDetails?.location?.address}
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
                  text={carDetails?.phoneNumber}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>

            <View style={styles?.horizontalBoxContainer1}>
              {[
                {
                  title:
                    carDetails?.category === 'AUTOMOBILE' ? 'Year' : 'Brand',
                  img:
                    carDetails?.category === 'AUTOMOBILE'
                      ? appIcons?.calendar
                      : appIcons?.brand,
                  detail:
                    carDetails?.category === 'AUTOMOBILE'
                      ? carDetails?.model
                      : carDetails?.brand,
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
                  title: 'Color',
                  img: appIcons.brush,
                  detail: carDetails?.color,
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
                    resizeMode={'contain'}
                    customIconWrapper={{width: item?.width}}
                    tintColor={colors?.headingText}
                    disabled
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
            {/* "make": 
    "transmission": 
    "condition": 
    "bodyType": 
    "color": 
    "features" */}
            {carDetails?.condition && (
              <>
                <View style={[styles?.hr, {width: '100%'}]} />
                <View>
                  <CustomText
                    text={'Condition'}
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
                    text={carDetails?.condition}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </>
            )}
            {carDetails?.make && (
              <>
                <View style={[styles?.hr, {width: '100%'}]} />
                <View>
                  <CustomText
                    text={'Car Make'}
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
                    text={carDetails?.make}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </>
            )}
            {carDetails?.bodyType && (
              <>
                <View style={[styles?.hr, {width: '100%'}]} />
                <View>
                  <CustomText
                    text={'Body Type'}
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
                    text={carDetails?.bodyType}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </>
            )}
            {carDetails?.transmission && (
              <>
                <View style={[styles?.hr, {width: '100%'}]} />
                <View>
                  <CustomText
                    text={'Transmission'}
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
                    text={carDetails?.transmission}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </>
            )}
            <View style={[styles?.hr, {width: '100%'}]} />

            <View>
              <CustomText
                text={'Description'}
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
                text={carDetails?.description}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
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
                data={carDetails?.gallery}
                scrollEnabled={false}
                renderItem={renderGalleryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                columnWrapperStyle={styles.galleryRow}
                contentContainerStyle={styles.galleryList}
              />
            </View>

            {showCall && (
              <View
                style={{marginTop: height * 0.02, marginBottom: height * 0.02}}>
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'Call Seller'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={handleCall}
                />
              </View>
            )}
          </View>
        </CustomContainer>
      </ScrollView>
    </AppBackground>
  );
};

export default MyAdDetails;

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
    // justifyContent: 'space-between',
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
