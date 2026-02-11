// import React, {useCallback, useRef, useState} from 'react';
// import {
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {colors} from '../../../utils/Colors';
// import AppBackground from '../../../components/AppBackground';
// import FastImage from 'react-native-fast-image';
// import {appIcons, appImages} from '../../../assets';
// import {family, size, vh, vw} from '../../../utils';
// import CustomText from '../../../components/CustomText';
// import styles from '../MyCart/styles';
// import CustomButton from '../../../components/CustomButton';
// import NavService from '../../../helpers/NavService';
// import BottomSheet from '../../../components/BottomSheet';
// import {useDispatch, useSelector} from 'react-redux';
// import {LOG} from '../../../utils/helperFunction';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withDelay,
//   interpolate,
//   FadeInDown,
// } from 'react-native-reanimated';
// import {
//   useAddMutation,
//   useAddUsingPointsMutation,
// } from '../../../Api/orderApiSlice';
// import {
//   executeApiRequest,
//   executeApiRequestForQueryParams,
// } from '../../../Api/methods/method';
// import ActivityLoader from '../../../components/ActivityLoader';
// import {clearCart} from '../../../redux/slices/cartSlice';

// import {
//   useCreateIntentMutation,
//   useSaveOrderPaymentMutation,
//   useSavePaymentMutation,
// } from '../../../Api/paymentApiSlice';
// import {colors2} from '../../../theme/colors2';
// import {CardField, useStripe} from '@stripe/stripe-react-native';
// import {useFocusEffect} from '@react-navigation/native';
// const {width, height} = Dimensions.get('screen');

// const Checkout = ({route}) => {
//   const userDetails = useSelector(state => state?.auth?.user || {});
//   const [add, {isLoading}] = useAddMutation();
//   const [isScreenReady, setIsScreenReady] = useState(false);
//   const [showCardField, setShowCardField] = useState(false);
//   const containerHeight = useSharedValue(0);
//   const [addUsingPoints, {isLoading: pointLoading}] =
//     useAddUsingPointsMutation();
//   LOG('userDetails: ', userDetails);
//   const [loading, setLoading] = useState(false);
//   const {confirmPayment} = useStripe();

//   const [createIntent] = useCreateIntentMutation();

//   const [saveOrderPayment] = useSaveOrderPaymentMutation();

//   useFocusEffect(
//     useCallback(() => {
//       // On screen focus (each time you open checkout)
//       setShowCardField(false);
//       setLoading(false);
//       setIsScreenReady(true);
//       containerHeight.value = 120;

//       return () => {
//         // Cleanup when leaving the screen
//         setShowCardField(false);
//         setLoading(false);
//         setIsScreenReady(false);
//         containerHeight.value = 120;
//       };
//     }, []),
//   );

//   const dispatch = useDispatch();
//   const {
//     dishItem,
//     totalAmount,
//     subTotal,
//     selectedVariation,
//     quantity,
//     specialInstructions,
//     id,
//     cartItems,
//   } = route.params;
//   // console.log(dishItem?.price);
//   console.log('totalAmount: ', totalAmount);
//   console.log('Sub: ', subTotal);
//   console.log('cartItems: ', cartItems);

//   const animatedContainerStyle = useAnimatedStyle(() => ({
//     height: withTiming(showCardField ? containerHeight.value : 120, {
//       duration: 400,
//     }),
//   }));
//   //   console.log('quantity: ', quantity);
//   //   console.log('specialInstructions: ', specialInstructions);
//   // console.log('idcheckout: ', id);

//   const bottomSheetRef = useRef();
//   //   const item = {
//   //     image: appImages?.dishBG2,
//   //     type: 'Pizza Margherita',
//   //     description: 'Extra Olives',
//   //   };
//   const orderSummaryData = [
//     {label: 'Subtotal', amount: parseFloat(subTotal)},
//     {label: 'Standard Delivery', amount: 5.12},
//     {label: 'VAT', amount: 5.2},
//   ];

//   const payload = {
//     personName: userDetails?.fullName || '',
//     deliveryAddress: {
//       type: 'Point',
//       address: userDetails?.location?.address || '',
//       coordinates: userDetails?.location?.coordinates || [],
//     },
//     products: cartItems.map(item => {
//       const {dishItem, selectedVariation, quantity, specialInstructions} = item;

//       const productEntry = {
//         product: dishItem?._id,
//         businessProfile: dishItem?.businessProfile,
//         name: dishItem?.productName || '',
//         ...(specialInstructions ? {specialInstructions} : {}),
//         ...(selectedVariation
//           ? {selectedVariation: {...selectedVariation, quantity: quantity}}
//           : {}),
//       };

//       if (selectedVariation) {
//         return {
//           ...productEntry,
//           variations: [
//             {
//               name: selectedVariation?.name,
//               price: selectedVariation?.price?.toString(),
//               quantity: quantity?.toString(),
//             },
//           ],
//         };
//       } else {
//         return {
//           ...productEntry,
//           basePrice: dishItem?.price?.toString(),
//           quantity: quantity?.toString(),
//         };
//       }
//     }),
//   };

//   LOG('PAYLOAD: ', payload);

//   const handleSubmitOrder = async option => {
//     if (option === 'normal') {
//       LOG('Proceed with normal order:', payload);
//       const response = await executeApiRequest({
//         apiCallFunction: add,
//         body: payload,
//         toast: true,
//         timeout: 30000,
//       });
//       LOG('RESPONSE: ', response);
//       if (response) {
//         bottomSheetRef?.current?.open();
//       }
//     } else if (option === 'shopdit') {
//       const response = await executeApiRequestForQueryParams({
//         apiCallFunction: addUsingPoints,
//         body: payload,
//         // params: {id},
//         toast: true,
//         timeout: 30000,
//       });
//       LOG('RESPONSE: ', response);
//       if (response) {
//         bottomSheetRef?.current?.open();
//       }
//       LOG('Proceed with Shopdit points:', payload);
//     }
//   };

//   const handlePay = async () => {
//     try {
//       setLoading(true);

//       // 1) Create Payment Intent
//       const intentResp = await executeApiRequest({
//         apiCallFunction: createIntent,
//         body: {amount: totalAmount, currency: 'usd'},
//         toast: false,
//         timeout: 30000,
//       });

//       LOG('Intent:', intentResp);

//       const {clientSecret} = intentResp?.data || {};
//       if (!clientSecret) {
//         throw new Error('Payment intent failed — missing clientSecret');
//       }

//       // 2) Confirm Payment with Stripe (use only clientSecret)
//       const {error, paymentIntent} = await confirmPayment(clientSecret, {
//         paymentMethodType: 'Card',
//       });

//       LOG('stripe confirm result:', {error, paymentIntent});

//       if (error) {
//         throw new Error(error.message);
//       }

//       // 3) Save Payment in Backend (use confirmed paymentIntent.id)
//       await executeApiRequest({
//         apiCallFunction: saveOrderPayment,
//         body: {
//           paymentIntentId: paymentIntent?.id, // ✅ Stripe confirmed ID
//           amount: totalAmount,
//           ...payload,
//         },
//         toast: true,
//         timeout: 30000,
//       });
//       setShowCardField(false);
//       containerHeight.value = withTiming(120, {
//         duration: 400,
//       });
//       bottomSheetRef?.current?.open();
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error in payment', err.message || 'Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppBackground back={true} title={'Checkout'.toUpperCase()} notification>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
//         <ScrollView
//           style={{flex: 1}}
//           contentContainerStyle={{flexGrow: 1}}
//           keyboardShouldPersistTaps="handled">
//           <View
//             style={{
//               paddingHorizontal: 20,
//               paddingVertical: 15,
//               marginTop: 10,
//               marginBottom: vh * 17,
//             }}>
//             <View style={{marginTop: vh * 3}}>
//               <CustomText
//                 text={'Delivery Address'}
//                 font={family?.Gilroy_SemiBold}
//                 size={size?.h6}
//                 color={colors?.headingText}
//                 numberOfLines={1}
//                 style={{textTransform: 'uppercase', left: vw * 3}}
//               />
//               <View
//                 style={[
//                   styles?.deliverDetails,
//                   {paddingHorizontal: 3, paddingVertical: 5},
//                 ]}>
//                 <FastImage
//                   source={appIcons?.map}
//                   resizeMode="contain"
//                   style={{height: '100%', width: '20%'}}
//                 />
//                 <View style={{width: '70%'}}>
//                   <CustomText
//                     text={userDetails?.location?.address}
//                     font={family?.Questrial_Regular}
//                     size={size?.h6}
//                     color={colors?.placeholderText}
//                     numberOfLines={2}
//                     style={{lineHeight: vh * 2.5}}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={{marginTop: vh * 3}}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   paddingHorizontal: 10,
//                   alignItems: 'center',
//                 }}>
//                 <CustomText
//                   text={'PAYMENT METHOD'}
//                   font={family?.Gilroy_SemiBold}
//                   size={size?.h6}
//                   color={colors?.headingText}
//                   numberOfLines={1}
//                   style={{textTransform: 'uppercase'}}
//                 />
//                 <TouchableOpacity
//                   activeOpacity={0.5}
//                   onPress={() => {
//                     NavService?.navigate('Payment', {
//                       dishItem: dishItem,
//                       totalAmount: totalAmount,
//                     });
//                   }}>
//                   <CustomText
//                     text={'Change'}
//                     font={family?.Gilroy_SemiBold}
//                     size={size?.xxlarge}
//                     color={'#0B7FC3'}
//                     numberOfLines={1}
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View
//                 style={[
//                   styles?.deliverDetails,
//                   {paddingHorizontal: 3, paddingVertical: 5},
//                 ]}>
//                 <View
//                   style={{
//                     width: '75%',
//                     height: '100%',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     gap: 6,
//                   }}>
//                   <View style={{width: '30%', height: '100%'}}>
//                     <FastImage
//                       source={appIcons?.mastercard}
//                       resizeMode="contain"
//                       style={{height: '100%', width: '100%'}}
//                     />
//                   </View>

//                   <View>
//                     <CustomText
//                       text={'Mastercard'}
//                       font={family?.Questrial_Regular}
//                       size={size?.h6}
//                       color={colors?.placeholderText}
//                     />
//                     <CustomText
//                       text={'************* 5120'}
//                       font={family?.Questrial_Regular}
//                       size={size?.xxlarge}
//                       color={colors?.placeholderText}
//                     />
//                   </View>
//                 </View>
//                 <CustomText
//                   text={`$${totalAmount.toFixed(2)}`}
//                   font={family?.Gilroy_Bold}
//                   size={size?.h5}
//                   color={colors?.secondary}
//                   numberOfLines={1}
//                   style={{textTransform: 'uppercase', right: 20}}
//                 />
//               </View>
//             </View>

//             <View
//               style={{
//                 alignSelf: 'flex-start',
//                 marginTop: vh * 3,
//                 width: '100%',
//               }}>
//               <CustomText
//                 text={'Order Summary'}
//                 font={family?.Gilroy_SemiBold}
//                 size={size?.h6}
//                 color={colors?.headingText}
//                 numberOfLines={1}
//                 style={{textTransform: 'uppercase'}}
//               />
//               <CustomText
//                 text={dishItem?.extra}
//                 font={family?.Questrial_Regular}
//                 size={size?.medium}
//                 color={colors?.placeholderText}
//               />
//               <View style={[styles?.hr, {width: '100%'}]} />
//               <View style={{marginTop: 10}}>
//                 {orderSummaryData.map((item, index) => (
//                   <View key={index} style={styles?.summaryItem}>
//                     <CustomText
//                       text={item.label}
//                       font={family?.Questrial_Regular}
//                       size={size?.xxlarge}
//                       color={colors?.headingText}
//                       numberOfLines={1}
//                     />
//                     <CustomText
//                       text={`$ ${item.amount.toFixed(2)}`}
//                       font={family?.Questrial_Regular}
//                       size={size?.xxlarge}
//                       color={colors?.headingText}
//                       numberOfLines={1}
//                     />
//                   </View>
//                 ))}
//               </View>
//             </View>
//             <View style={[styles?.hr, {width: '100%'}]} />
//           </View>
//         </ScrollView>

//         {/* <View style={[styles?.secondContainerStyles, animatedContainerStyle]}>
//         <View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <View
//               style={{gap: vw * 3, flexDirection: 'row', alignItems: 'center'}}>
//               <CustomText
//                 text={'Total'}
//                 font={family?.Gilroy_SemiBold}
//                 size={size?.h1}
//                 color={colors?.placeholderText}
//                 numberOfLines={1}
//               />
//               <CustomText
//                 text={'(incl. fee & tax)'}
//                 font={family?.Questrial_Regular}
//                 size={size?.h6}
//                 color={colors?.placeholderText}
//                 numberOfLines={1}
//               />
//             </View>
//             <CustomText
//               text={`$${totalAmount.toFixed(2)}`}
//               font={family?.Gilroy_SemiBold}
//               size={size?.h1}
//               color={colors?.placeholderText}
//               numberOfLines={1}
//             />
//           </View>
//           <View style={{marginTop: vh * 2}}>
//             {isLoading || pointLoading ? (
//               <ActivityLoader color={colors?.secondary} />
//             ) : (
//               <CustomButton
//                 gradientColorArr={[colors.secondary, colors.secondary]}
//                 title={'Place order'.toUpperCase()}
//                 customWidth={width - 150}
//                 customHeight={50}
//                 buttonStyle={{alignSelf: 'center', borderRadius: 50}}
//                 textStyle={{fontSize: size.large}}
//                 onPress={() => {
//                   Alert.alert(
//                     'Choose Payment Method',
//                     'Do you wish to add order normally or use points?',
//                     [
//                       {
//                         text: 'Normal',
//                         onPress: () => handleSubmitOrder('normal'),
//                       },
//                       {
//                         text: 'Points',
//                         onPress: () => handleSubmitOrder('shopdit'),
//                       },
//                       {
//                         text: 'Cancel',
//                         style: 'cancel',
//                       },
//                     ],
//                     {cancelable: true},
//                   );
//                 }}
//               />
//             )}
//           </View>
//         </View>
//       </View> */}

//         <Animated.View
//           style={[styles.secondContainerStyles, animatedContainerStyle]}>
//           <View>
//             {/* Total Row */}
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <View
//                 style={{
//                   gap: vw * 3,
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//                 <CustomText
//                   text={'Total'}
//                   font={family?.Gilroy_SemiBold}
//                   size={size?.h1}
//                   color={colors?.placeholderText}
//                 />
//                 <CustomText
//                   text={'(incl. fee & tax)'}
//                   font={family?.Questrial_Regular}
//                   size={size?.h6}
//                   color={colors?.placeholderText}
//                 />
//               </View>
//               <CustomText
//                 text={`$${totalAmount.toFixed(2)}`}
//                 font={family?.Gilroy_SemiBold}
//                 size={size?.h1}
//                 color={colors?.placeholderText}
//               />
//             </View>

//             {/* Button or Card Field Section */}
//             <View style={{marginTop: vh * 2}}>
//               {!showCardField ? (
//                 <CustomButton
//                   gradientColorArr={[colors.secondary, colors.secondary]}
//                   title={'Place order'.toUpperCase()}
//                   customWidth={width - 150}
//                   customHeight={50}
//                   buttonStyle={{alignSelf: 'center', borderRadius: 50}}
//                   textStyle={{fontSize: size.large}}
//                   onPress={() => {
//                     Alert.alert(
//                       'Choose Payment Method',
//                       'Do you wish to add order normally or use points?',
//                       [
//                         {
//                           text: 'Normal',
//                           onPress: () => {
//                             setShowCardField(true);
//                             containerHeight.value = withTiming(350, {
//                               duration: 400,
//                             });
//                           },
//                         },
//                         {
//                           text: 'Points',
//                           onPress: () => handleSubmitOrder('shopdit'),
//                         },
//                         {text: 'Cancel', style: 'cancel'},
//                       ],
//                     );
//                   }}
//                 />
//               ) : (
//                 // Animate and make this part scrollable
//                 <Animated.View entering={FadeInDown.duration(400)}>
//                   <ScrollView
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={
//                       {
//                         // marginTop: vh * 2,
//                         // marginBottom: vh * 3,
//                         // paddingBottom: vh * 1,
//                       }
//                     }>
//                     <View style={styles.cardDetails}>
//                       <View style={styles.paymentdetail}>
//                         <CustomText
//                           text={'Card Details'}
//                           font={family?.Gilroy_Medium}
//                           size={size?.large}
//                         />
//                         <CustomText
//                           text="*"
//                           color={colors?.red}
//                           size={size?.h5}
//                         />
//                       </View>

//                       {isScreenReady && showCardField && (
//                         <CardField
//                           postalCodeEnabled={false}
//                           placeholders={{number: '4242 4242 4242 4242'}}
//                           cardStyle={styles.cardStyle}
//                           style={styles.cardField}
//                         />
//                       )}
//                     </View>
//                     {loading ? (
//                       <ActivityLoader color={colors2.theme.secondary} />
//                     ) : (
//                       <CustomButton
//                         gradientColorArr={[colors.secondary, colors.secondary]}
//                         title={'Pay Now'}
//                         customWidth={width - 55}
//                         buttonStyle={{alignSelf: 'center', borderRadius: 50}}
//                         textStyle={{fontSize: size.large}}
//                         onPress={handlePay}
//                       />
//                     )}
//                     <TouchableOpacity
//                       activeOpacity={0.6}
//                       style={{padding: vh * 1, alignSelf: 'center'}}
//                       onPress={() => {
//                         setShowCardField(false);
//                         containerHeight.value = withTiming(120, {
//                           duration: 400,
//                         });
//                       }}>
//                       <CustomText
//                         text={'Go Back'}
//                         font={family?.Gilroy_SemiBold}
//                         size={size?.medium}
//                         color={colors?.secondary}
//                       />
//                     </TouchableOpacity>
//                   </ScrollView>
//                 </Animated.View>
//               )}
//             </View>
//           </View>
//         </Animated.View>

//         <BottomSheet
//           successfull={true}
//           text={'SYSTEM MESSAGE'}
//           description={'Your order has been placed successfully!'}
//           ref={bottomSheetRef}
//           OnYesPress={() => {
//             bottomSheetRef.current.close();
//             dispatch(clearCart());
//             setTimeout(() => {
//               NavService?.navigateToStack('DealStack', 'Deals');
//             }, 650);
//           }}
//         />
//       </KeyboardAvoidingView>
//     </AppBackground>
//   );
// };

// export default Checkout;

import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import FastImage from 'react-native-fast-image';
import {appIcons, appImages} from '../../../assets';
import {family, size, vh, vw} from '../../../utils';
import CustomText from '../../../components/CustomText';
import styles from '../MyCart/styles';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import BottomSheet from '../../../components/BottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {LOG} from '../../../utils/helperFunction';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
  cancelAnimation, // FIXED: Import for explicit cancel.
} from 'react-native-reanimated';
import {
  useAddMutation,
  useAddUsingPointsMutation,
  useAddUsingShopditPointsMutation,
} from '../../../Api/orderApiSlice';
import {
  executeApiRequest,
  executeApiRequestForQueryParams,
} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {clearCart} from '../../../redux/slices/cartSlice';

import {
  useCreateIntentMutation,
  useSaveOrderPaymentMutation,
  useSavePaymentMutation,
} from '../../../Api/paymentApiSlice';
import {colors2} from '../../../theme/colors2';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const Checkout = ({route}) => {
  const userDetails = useSelector(state => state?.auth?.user || {});
  const [add, {isLoading}] = useAddMutation();
  const [isScreenReady, setIsScreenReady] = useState(false);
  const [showCardField, setShowCardField] = useState(false);
  const animatedHeight = useSharedValue(120); // Initial closed height.
  const [addUsingPoints, {isLoading: pointLoading}] =
    useAddUsingPointsMutation();
  const [addUsingShopditPoints, {isLoading: shopditPointLoading}] =
    useAddUsingShopditPointsMutation();
  LOG('userDetails: ', userDetails);
  const [loading, setLoading] = useState(false);
  const {confirmPayment} = useStripe();

  const [createIntent] = useCreateIntentMutation();

  const [saveOrderPayment] = useSaveOrderPaymentMutation();

  useFocusEffect(
    useCallback(() => {
      LOG('=== CHECKOUT FOCUS: Resetting states ==='); // FIXED: Log for debug.
      setShowCardField(false);
      setLoading(false);
      setIsScreenReady(true);
      // FIXED: Explicitly cancel any stale animation before reset.
      cancelAnimation(animatedHeight);
      animatedHeight.value = 120;

      return () => {
        LOG('=== CHECKOUT BLUR: Cleaning up ==='); // FIXED: Log for debug.
        setShowCardField(false);
        setLoading(false);
        setIsScreenReady(false);
        // FIXED: Cancel and reset on unmount/focus loss.
        cancelAnimation(animatedHeight);
        animatedHeight.value = 120;
      };
    }, []),
  );

  const dispatch = useDispatch();
  const {
    dishItem,
    totalAmount,
    subTotal,
    selectedVariation,
    quantity,
    specialInstructions,
    id,
    cartItems,
  } = route.params;
  console.log('totalAmount: ', totalAmount);
  console.log('Sub: ', subTotal);
  console.log('cartItems: ', cartItems);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  const bottomSheetRef = useRef();
  const orderSummaryData = [
    {label: 'Subtotal', amount: parseFloat(subTotal)},
    {label: 'Standard Delivery', amount: 5.12},
    {label: 'VAT', amount: 5.2},
  ];

  const payload = {
    personName: userDetails?.fullName || '',
    deliveryAddress: {
      type: 'Point',
      address: userDetails?.location?.address || '',
      coordinates: userDetails?.location?.coordinates || [],
    },
    products: cartItems.map(item => {
      const {dishItem, selectedVariation, quantity, specialInstructions} = item;

      const productEntry = {
        product: dishItem?._id,
        businessProfile: dishItem?.businessProfile,
        name: dishItem?.productName || '',
        ...(specialInstructions ? {specialInstructions} : {}),
        ...(selectedVariation
          ? {selectedVariation: {...selectedVariation, quantity: quantity}}
          : {}),
      };

      if (selectedVariation) {
        return {
          ...productEntry,
          variations: [
            {
              name: selectedVariation?.name,
              price: selectedVariation?.price?.toString(),
              quantity: quantity?.toString(),
            },
          ],
        };
      } else {
        return {
          ...productEntry,
          basePrice: dishItem?.price?.toString(),
          quantity: quantity?.toString(),
        };
      }
    }),
  };

  LOG('PAYLOAD: ', payload);

  const handleSubmitOrder = async option => {
    if (option === 'normal') {
      LOG('Proceed with normal order:', payload);
      const response = await executeApiRequest({
        apiCallFunction: add,
        body: payload,
        toast: true,
        timeout: 30000,
      });
      LOG('RESPONSE: ', response);
      if (response) {
        bottomSheetRef?.current?.open();
      }
    } else if (option === 'business') {
      const response = await executeApiRequestForQueryParams({
        apiCallFunction: addUsingPoints,
        body: payload,
        // params: {id},
        toast: true,
        timeout: 30000,
      });
      LOG('RESPONSE: ', response);
      if (response) {
        bottomSheetRef?.current?.open();
      }
      LOG('Proceed with Business points:', payload);
    } else if (option === 'shopdit') {
      const response = await executeApiRequestForQueryParams({
        apiCallFunction: addUsingShopditPoints,
        body: payload,
        // params: {id},
        toast: true,
        timeout: 30000,
      });
      LOG('RESPONSE: ', response);
      if (response) {
        bottomSheetRef?.current?.open();
      }
      LOG('Proceed with Shopdit points:', payload);
    }
  };

  const handlePay = async () => {
    LOG('=== Starting payment flow ==='); // FIXED: Log for debug.
    try {
      setLoading(true);

      const intentResp = await executeApiRequest({
        apiCallFunction: createIntent,
        body: {amount: totalAmount, currency: 'usd'},
        toast: false,
        timeout: 30000,
      });

      LOG('Intent:', intentResp);

      const {clientSecret} = intentResp?.data || {};
      if (!clientSecret) {
        throw new Error('Payment intent failed — missing clientSecret');
      }

      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      LOG('stripe confirm result:', {error, paymentIntent});

      if (error) {
        throw new Error(error.message);
      }

      await executeApiRequest({
        apiCallFunction: saveOrderPayment,
        body: {
          paymentIntentId: paymentIntent?.id,
          amount: totalAmount,
          ...payload,
        },
        toast: true,
        timeout: 30000,
      });
      // FIXED: Cancel anim before close (safety).
      cancelAnimation(animatedHeight);
      setShowCardField(false);
      animatedHeight.value = withTiming(120, {duration: 400});
      LOG('=== Payment success: Closing card field ===');
      bottomSheetRef?.current?.open();
    } catch (err) {
      console.error('Payment error:', err); // FIXED: Better log.
      Alert.alert('Error in payment', err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Helper to open card field with delay (prevents remount crash).
  const openCardField = useCallback(() => {
    LOG('=== Opening card field (with delay) ===');
    setTimeout(() => {
      setShowCardField(true);
      cancelAnimation(animatedHeight); // Cancel before new anim.
      animatedHeight.value = withTiming(350, {duration: 400});
    }, 100); // Short delay for Stripe stability.
  }, [animatedHeight]);

  return (
    <AppBackground back={true} title={'Checkout'.toUpperCase()} notification>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginTop: 10,
              marginBottom: vh * 17,
            }}>
            <View style={{marginTop: vh * 3}}>
              <CustomText
                text={'Delivery Address'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
                style={{textTransform: 'uppercase', left: vw * 3}}
              />
              <View
                style={[
                  styles?.deliverDetails,
                  {paddingHorizontal: 3, paddingVertical: 5},
                ]}>
                <FastImage
                  source={appIcons?.map}
                  resizeMode="contain"
                  style={{height: '100%', width: '20%'}}
                />
                <View style={{width: '70%'}}>
                  <CustomText
                    text={userDetails?.location?.address}
                    font={family?.Questrial_Regular}
                    size={size?.h6}
                    color={colors?.placeholderText}
                    numberOfLines={2}
                    style={{lineHeight: vh * 2.5}}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: vh * 3}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}>
                <CustomText
                  text={'PAYMENT METHOD'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h6}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase'}}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    NavService?.navigate('Payment', {
                      dishItem: dishItem,
                      totalAmount: totalAmount,
                    });
                  }}>
                  <CustomText
                    text={'Change'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.xxlarge}
                    color={'#0B7FC3'}
                    numberOfLines={1}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles?.deliverDetails,
                  {paddingHorizontal: 3, paddingVertical: 5},
                ]}>
                <View
                  style={{
                    width: '75%',
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                  <View style={{width: '30%', height: '100%'}}>
                    <FastImage
                      source={appIcons?.mastercard}
                      resizeMode="contain"
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>

                  <View>
                    <CustomText
                      text={'Mastercard'}
                      font={family?.Questrial_Regular}
                      size={size?.h6}
                      color={colors?.placeholderText}
                    />
                    <CustomText
                      text={'************* 5120'}
                      font={family?.Questrial_Regular}
                      size={size?.xxlarge}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <CustomText
                  text={`$${totalAmount.toFixed(2)}`}
                  font={family?.Gilroy_Bold}
                  size={size?.h5}
                  color={colors?.secondary}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase', right: 20}}
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: vh * 3,
                width: '100%',
              }}>
              <CustomText
                text={'Order Summary'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
                style={{textTransform: 'uppercase'}}
              />
              <CustomText
                text={dishItem?.extra}
                font={family?.Questrial_Regular}
                size={size?.medium}
                color={colors?.placeholderText}
              />
              <View style={[styles?.hr, {width: '100%'}]} />
              <View style={{marginTop: 10}}>
                {orderSummaryData.map((item, index) => (
                  <View key={index} style={styles?.summaryItem}>
                    <CustomText
                      text={item.label}
                      font={family?.Questrial_Regular}
                      size={size?.xxlarge}
                      color={colors?.headingText}
                      numberOfLines={1}
                    />
                    <CustomText
                      text={`$ ${item.amount.toFixed(2)}`}
                      font={family?.Questrial_Regular}
                      size={size?.xxlarge}
                      color={colors?.headingText}
                      numberOfLines={1}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={[styles?.hr, {width: '100%'}]} />
          </View>
        </ScrollView>

        <Animated.View
          style={[styles.secondContainerStyles, animatedContainerStyle]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  gap: vw * 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomText
                  text={'Total'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h1}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={'(incl. fee & tax)'}
                  font={family?.Questrial_Regular}
                  size={size?.h6}
                  color={colors?.placeholderText}
                />
              </View>
              <CustomText
                text={`$${totalAmount.toFixed(2)}`}
                font={family?.Gilroy_SemiBold}
                size={size?.h1}
                color={colors?.placeholderText}
              />
            </View>

            <View style={{marginTop: vh * 2}}>
              {!showCardField ? (
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'Place order'.toUpperCase()}
                  customWidth={width - 150}
                  customHeight={50}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={() => {
                    // Alert.alert(
                    //   'Choose Payment Method',
                    //   'Do you wish to add order normally or use points?',
                    //   [
                    //     {
                    //       text: 'Normal',
                    //       onPress: () => {
                    //         LOG('=== Normal pressed: Triggering openCardField ==='); // FIXED: Log.
                    //         openCardField(); // FIXED: Use delayed helper.
                    //       },
                    //     },
                    //     {
                    //       text: 'Business Points',
                    //       onPress: () => handleSubmitOrder('shopdit'),
                    //     },
                    //     {
                    //       text: 'Shopdit Points',
                    //       onPress: () => handleSubmitOrder('shopdit'),
                    //     },
                    //     {text: 'Cancel', style: 'cancel'},
                    //   ],
                    // );

                    Alert.alert(
                      'Choose Payment Method',
                      'Do you wish to add order normally or use points?',
                      [
                        {text: 'Normal', onPress: openCardField},
                        {
                          text: 'Use Points',
                          onPress: () => {
                            Alert.alert(
                              'Select Points Type',
                              'Choose which points to use:',
                              [
                                {
                                  text: 'Business Points',
                                  onPress: () => handleSubmitOrder('business'),
                                },
                                {
                                  text: 'Shopdit Points',
                                  onPress: () => handleSubmitOrder('shopdit'),
                                },
                                {text: 'Cancel', style: 'cancel'},
                              ],
                            );
                          },
                        },
                        {text: 'Cancel', style: 'cancel'},
                      ],
                    );
                  }}
                />
              ) : (
                // FIXED: Removed entering={FadeInDown.duration(400)} to prevent mount crash.
                <Animated.View>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}>
                    <View style={styles.cardDetails}>
                      <View style={styles.paymentdetail}>
                        <CustomText
                          text={'Card Details'}
                          font={family?.Gilroy_Medium}
                          size={size?.large}
                        />
                        <CustomText
                          text="*"
                          color={colors?.red}
                          size={size?.h5}
                        />
                      </View>

                      {isScreenReady && showCardField && (
                        <CardField
                          postalCodeEnabled={false}
                          placeholders={{number: '4242 4242 4242 4242'}}
                          cardStyle={styles.cardStyle}
                          style={styles.cardField}
                        />
                      )}
                    </View>
                    {loading ? (
                      <ActivityLoader color={colors2.theme.secondary} />
                    ) : (
                      <CustomButton
                        gradientColorArr={[colors.secondary, colors.secondary]}
                        title={'Pay Now'}
                        customWidth={width - 55}
                        buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                        textStyle={{fontSize: size.large}}
                        onPress={handlePay}
                      />
                    )}
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={{padding: vh * 1, alignSelf: 'center'}}
                      onPress={() => {
                        LOG('=== Go Back pressed: Closing ==='); // FIXED: Log.
                        cancelAnimation(animatedHeight);
                        setShowCardField(false);
                        animatedHeight.value = withTiming(120, {
                          duration: 400,
                        });
                      }}>
                      <CustomText
                        text={'Go Back'}
                        font={family?.Gilroy_SemiBold}
                        size={size?.medium}
                        color={colors?.secondary}
                      />
                    </TouchableOpacity>
                  </ScrollView>
                </Animated.View>
              )}
            </View>
          </View>
        </Animated.View>

        <BottomSheet
          successfull={true}
          text={'SYSTEM MESSAGE'}
          description={'Your order has been placed successfully!'}
          ref={bottomSheetRef}
          OnYesPress={() => {
            bottomSheetRef.current.close();
            dispatch(clearCart());
            setTimeout(() => {
              NavService?.navigateToStack('DealStack', 'Deals');
            }, 650);
          }}
        />
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

export default Checkout;
