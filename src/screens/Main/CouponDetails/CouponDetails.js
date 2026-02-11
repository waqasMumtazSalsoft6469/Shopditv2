import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size, vh} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {formatDateYear, LOG} from '../../../utils/helperFunction';
import FastImage from 'react-native-fast-image';
import {HEIGHT, WIDTH} from '../../../theme/units';
import {useGenerateQRMutation} from '../../../Api/couponApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import Share from 'react-native-share';

const {width, height} = Dimensions.get('screen');

const CouponDetails = ({route}) => {
  const {couponDetails} = route.params;
  LOG('COUPON DETAILS: ', couponDetails);
  const [qrCode, setQrCode] = useState(null);
  const [isQrEnlarged, setIsQrEnlarged] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [generateQR] = useGenerateQRMutation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    handleGenerateQR();
  }, []);

   const handleGenerateQR = async () => {
     const response = await executeApiRequest({
       apiCallFunction: generateQR,
       params: {id: couponDetails?._id},
       toast: true,
       timeout: 30000,
     });
     LOG('RESPOSNE QR: ', response);
     if (response) {
       setQrCode(response); // <-- Set QR code here
     }
   };

  const toggleQrSize = () => {
    setIsQrEnlarged(!isQrEnlarged);
    Animated.timing(scaleAnim, {
      toValue: isQrEnlarged ? 1 : 1.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
      title={'COUPON DETAILS'}
      notification
      couponDetails={true}
      share={true}
      onSharePress={() => shareApp()}
      marginHorizontal={true}>
      <CustomContainer bgImage={appImages?.couponDetailBG}>
        <View style={styles.titleSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'relative',
            }}>
            <CustomText
              text={couponDetails?.couponName}
              font={family?.Gilroy_SemiBold}
              size={size?.h4}
              color={colors?.headingText}
              style={{width: WIDTH * 0.6}}
            />
            <View style={{position: 'absolute', right: 0, top: 0}}>
              {isQrLoading ? (
                <ActivityLoader color={colors2?.theme?.secondary} />
              ) : qrCode ? (
                <TouchableOpacity
                  onPress={toggleQrSize}
                  style={styles.imageContainer}>
                  <FastImage
                    source={{uri: qrCode, priority: FastImage.priority.high}}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                    // onLoad={() => LOG('QR Code Loaded Successfully')}
                    // onError={error => LOG('QR Code Load Error: ', error)}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.imageContainer,
                    {alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <CustomText
                    text={`QR Generation Failed!${'\n'}Coupon Has Expired`}
                    size={size.normal}
                    color={colors.red}
                  />
                </View>
              )}
            </View>
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

        <Modal
          visible={isQrEnlarged}
          transparent={true}
          animationType="fade"
          onRequestClose={toggleQrSize}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              onPress={toggleQrSize}
              style={styles.modalContent}>
              {qrCode ? (
                <FastImage
                  source={{uri: qrCode, priority: FastImage.priority.high}}
                  style={styles.enlargedImage}
                  resizeMode={FastImage.resizeMode.contain}
                  onLoad={() => LOG('Enlarged QR Code Loaded Successfully')}
                  onError={error => LOG('Enlarged QR Code Load Error: ', error)}
                />
              ) : (
                <CustomText
                  text="QR Code Unavailable"
                  size={size.large}
                  color={colors.red}
                />
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      </CustomContainer>
    </AppBackground>
  );
};

export default CouponDetails;

const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    gap: vh * 2,
  },
  imageContainer: {
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
    width: WIDTH * 0.27,
    height: HEIGHT * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    height: '80%',
    width: '80%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  enlargedImage: {
    width: WIDTH * 0.5,
    height: WIDTH * 0.5,
  },
});

// import React, {useEffect, useState, useRef} from 'react';
// import {
//   Dimensions,
//   View,
//   StyleSheet,
//   Animated,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import {colors} from '../../../utils/Colors';
// import AppBackground from '../../../components/AppBackground';
// import {appImages} from '../../../assets';
// import CustomText from '../../../components/CustomText';
// import {family, size, vh} from '../../../utils';
// import CustomContainer from '../../../components/CustomContainer';
// import {formatDateYear, LOG} from '../../../utils/helperFunction';
// import FastImage from 'react-native-fast-image';
// import {HEIGHT, WIDTH} from '../../../theme/units';
// import {useGenerateQRMutation} from '../../../Api/couponApiSlice';
// import {executeApiRequest} from '../../../Api/methods/method';
// import ActivityLoader from '../../../components/ActivityLoader';
// import {colors2} from '../../../theme/colors2';
// import Share from 'react-native-share';

// const {width, height} = Dimensions.get('screen');

// const CouponDetails = ({route}) => {
//   const {couponDetails} = route.params;
//   LOG('COUPON DETAILS: ', couponDetails);
//   const [qrCode, setQrCode] = useState(null);
//   const [isQrEnlarged, setIsQrEnlarged] = useState(false);
//   const [isQrLoading, setIsQrLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [generateQR, {isLoading}] = useGenerateQRMutation();
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     handleGenerateQR();
//   }, []);

//   const handleGenerateQR = async () => {
//     setIsQrLoading(true);
//     setErrorMessage(null);
//     setQrCode(null); // Reset qrCode to avoid stale data
//     let payload = {
//       couponId: couponDetails?._id,
//     };
//     LOG('Payload: ', payload);
//     try {
//       const response = await executeApiRequest({
//         apiCallFunction: generateQR,
//         body: payload,
//         toast: true,
//         timeout: 30000,
//       });
//       LOG('QR Code Raw Response: ', JSON.stringify(response, null, 2));

//       // Adjust this condition based on your API response structure
//       if (response && (response.qrCode || response.data?.qrCode)) {
//         const qrCodeUrl = response.qrCode || response.data.qrCode;
//         LOG('QR Code URL Set: ', qrCodeUrl);
//         setQrCode(qrCodeUrl);
//       } else {
//         const errorMsg =
//            response?.error || 'Coupon Not Valid';
//         LOG('QR Code Error Message: ', errorMsg);
//         setErrorMessage(errorMsg);
//       }
//     } catch (error) {
//       LOG('QR Code Exception: ', error);
//       setErrorMessage('Failed to generate QR code. Please try again.');
//     } finally {
//       setIsQrLoading(false);
//     }
//   };

//   const toggleQrSize = () => {
//     if (!qrCode) {
//       LOG('Cannot toggle QR: No QR code available');
//       return;
//     }
//     setIsQrEnlarged(!isQrEnlarged);
//     Animated.timing(scaleAnim, {
//       toValue: isQrEnlarged ? 1 : 1.5,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const options = {
//     url: 'https://reactnative.dev/docs/share',
//     title: 'Share this with a friend!',
//     message: `Check out this Coupon: ${couponDetails?.couponName} on Shopdit. Check now!`,
//   };

//   const shareApp = async () => {
//     try {
//       const res = await Share.open(options);
//       console.log(res);
//     } catch (error) {
//       console.log('Share error: ', error);
//     }
//   };

//   return (
//     <AppBackground
//       back
//       titleColor={colors?.white}
//       title={'COUPON DETAILS'}
//       notification
//       couponDetails={true}
//       share={true}
//       onSharePress={() => shareApp()}
//       marginHorizontal={true}>
//       <CustomContainer bgImage={appImages?.couponDetailBG}>
//         <View style={styles.titleSection}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <CustomText
//               text={couponDetails?.couponName}
//               font={family?.Gilroy_SemiBold}
//               size={size?.h4}
//               color={colors?.headingText}
//               style={{width: WIDTH * 0.6}}
//             />

//             {isLoading || isQrLoading ? (
//               <ActivityLoader color={colors2?.theme?.secondary} />
//             ) : qrCode ? (
//               <TouchableOpacity
//                 onPress={toggleQrSize}
//                 style={styles.imageContainer}>
//                 <Animated.View style={{transform: [{scale: scaleAnim}]}}>
//                   <FastImage
//                     source={{uri: qrCode, priority: FastImage.priority.high}}
//                     style={styles.image}
//                     resizeMode={FastImage.resizeMode.contain}
//                     onLoad={() => LOG('QR Code Loaded Successfully')}
//                     onError={error => LOG('QR Code Load Error: ', error)}
//                   />
//                 </Animated.View>
//               </TouchableOpacity>
//             ) : (
//               <View
//                 style={[
//                   styles.imageContainer,
//                   {alignItems: 'center', justifyContent: 'center'},
//                 ]}>
//                 <CustomText
//                   text={errorMessage || 'QR Generation Failed!'}
//                   size={size.normal}
//                   color={colors.red}
//                   style={{textAlign: 'center'}}
//                 />
//               </View>
//             )}
//           </View>
//           <View>
//             <View style={{flexDirection: 'row', gap: 3}}>
//               <CustomText
//                 text={'Expiry Date:'}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//               />
//               <CustomText
//                 text={formatDateYear(couponDetails?.endDate)}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//               />
//             </View>
//             <View style={{flexDirection: 'row', gap: 3}}>
//               <CustomText
//                 text={'Redemption Limit:'}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//               />
//               <CustomText
//                 text={couponDetails?.redemptionLimit}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//               />
//             </View>
//             <View style={{flexDirection: 'row', gap: 3}}>
//               <CustomText
//                 text={'Redemption Count:'}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//               />
//               <CustomText
//                 text={couponDetails?.redemptionCount}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//               />
//             </View>
//             <View style={{marginTop: 15}}>
//               <CustomText
//                 text={couponDetails?.description}
//                 font={family?.Questrial_Regular}
//                 size={size?.xxlarge}
//                 color={colors?.placeholderText}
//                 style={{lineHeight: height * 0.03, marginTop: 5}}
//               />
//             </View>
//           </View>
//         </View>

//         <Modal
//           visible={isQrEnlarged}
//           transparent={true}
//           animationType="fade"
//           onRequestClose={toggleQrSize}>
//           <View style={styles.modalOverlay}>
//             <TouchableOpacity
//               onPress={toggleQrSize}
//               style={styles.modalContent}>
//               {qrCode ? (
//                 <FastImage
//                   source={{uri: qrCode, priority: FastImage.priority.high}}
//                   style={styles.enlargedImage}
//                   resizeMode={FastImage.resizeMode.contain}
//                   onLoad={() => LOG('Enlarged QR Code Loaded Successfully')}
//                   onError={error => LOG('Enlarged QR Code Load Error: ', error)}
//                 />
//               ) : (
//                 <CustomText
//                   text={errorMessage || 'QR Code Unavailable'}
//                   size={size.large}
//                   color={colors.red}
//                   style={{textAlign: 'center'}}
//                 />
//               )}
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </CustomContainer>
//     </AppBackground>
//   );
// };

// export default CouponDetails;

// const styles = StyleSheet.create({
//   titleSection: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     marginTop: 10,
//     gap: vh * 2,
//   },
//   imageContainer: {
//     borderWidth: 1.5,
//     borderColor: '#EEEEEE',
//     width: WIDTH * 0.28,
//     height: HEIGHT * 0.1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//     padding: 5,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   image: {
//     height: '80%',
//     width: '80%',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   enlargedImage: {
//     width: WIDTH * 0.7,
//     height: WIDTH * 0.7,
//   },
// });
