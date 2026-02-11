import React, {useEffect, useState} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {couponConditions} from '../../../utils/dummyData';
import FastImage from 'react-native-fast-image';
import {formatDateYear, LOG} from '../../../utils/helperFunction';
import {HEIGHT, WIDTH} from '../../../theme/units';
import {executeApiRequest} from '../../../Api/methods/method';
import {useGenerateQRMutation} from '../../../Api/couponApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import Share from 'react-native-share';
const {width, height} = Dimensions.get('screen');

const MyCouponDetails = ({route}) => {
  const {couponDetails} = route.params;
  const [qrCode, setQrCode] = useState(null);
  const [generateQR, {isLoading}] = useGenerateQRMutation();

  useEffect(() => {
    handleGenerateQR();
  }, []);

  const handleGenerateQR = async () => {
    let payload = {
      couponId: couponDetails?._id,
    };
    LOG('PAyload: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: generateQR,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      setQrCode(response); // <-- Set QR code here
    }
  };

  const options = {
    url: 'https://reactnative.dev/docs/share',
    title: 'Share this with a friend!',
    message: `Check out this Coupon: ${couponDetails?.couponName} on Shopdit. Check now!`,
  };
  const shareApp = async () => {
    try {
      const res = await Share.open(options);
      console.log(res);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <AppBackground
      back
      titleColor={colors?.white}
      notification
      share={true}
      onSharePress={() => shareApp()}
      title={'MY COUPON DETAILS'}
      couponDetails={true}
      marginHorizontal={true}>
      <CustomContainer bgImage={appImages?.couponDetailBG}>
        <View style={styles?.titleSection}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              text={couponDetails?.couponName}
              font={family?.Gilroy_SemiBold}
              size={size?.h4}
              color={colors?.headingText}
              style={{width: WIDTH * 0.6, marginBottom: 10}}
            />
            {isLoading ? (
              <ActivityLoader color={colors2?.theme?.secondary} />
            ) : qrCode ? (
              <View style={styles.imageContainer}>
                <FastImage
                  source={{uri: qrCode}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View
                style={[
                  styles.imageContainer,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <CustomText text="QR Generation Failed!" />
              </View>
            )}
          </View>
          <View>
            <View style={{flexDirection: 'row', gap: 3}}>
              <CustomText
                text={'Expiry Date:'}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
              <CustomText
                text={formatDateYear(couponDetails?.endDate)}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 3}}>
              <CustomText
                text={'Redemption Limit:'}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
              <CustomText
                text={couponDetails?.redemptionLimit}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 3}}>
              <CustomText
                text={'Redemption Count:'}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
              <CustomText
                text={couponDetails?.redemptionCount}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
            </View>
            <View style={{marginTop: 15}}>
              <CustomText
                text={couponDetails?.description}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
                style={{lineHeight: height * 0.03, marginTop: 5}}
              />
            </View>
          </View>
        </View>
      </CustomContainer>
    </AppBackground>
  );
};

export default MyCouponDetails;

const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    gap: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
    width: '28%',
    height: HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
