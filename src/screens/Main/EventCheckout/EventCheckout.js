import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomCard from '../../../components/CustomCard';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';
import CustomText from '../../../components/CustomText';
import styles from './styles';
import BottomSheet from '../../../components/BottomSheet';
import NavService from '../../../helpers/NavService';
import {LOG} from '../../../utils/helperFunction';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {executeApiRequest} from '../../../Api/methods/method';
import {useBookMutation} from '../../../Api/EventsApiSlice';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import {
  useCreateIntentMutation,
  useSavePaymentMutation,
} from '../../../Api/paymentApiSlice';

const {width, height} = Dimensions.get('screen');

const EventCheckout = ({route}) => {
  const [book, {isLoading}] = useBookMutation();
  const {eventDetails, payload} = route.params;
  //   LOG('EventDetails params: ', route.params);
  //   LOG('EventDetailsasdas', eventDetails);
  LOG('payload', payload);

  const {confirmPayment} = useStripe();

  const [createIntent] = useCreateIntentMutation();
  const [savePayment] = useSavePaymentMutation();
  const [loading, setLoading] = useState(false);

  const totalAmount =
    eventDetails?.ticketPrice && payload?.participants
      ? parseFloat(eventDetails.ticketPrice) * Number(payload.participants)
      : 0;

  LOG('total Amount: ', totalAmount);

  // const handleBook = async () => {
  //   const response = await executeApiRequest({
  //     apiCallFunction: book,
  //     body: payload,
  //     toast: true,
  //     timeout: 30000,
  //   });
  //   LOG('Event Book: ', response);
  //   NavService?.navigate('Events');
  //   // NavService.navigate('EventCheckout', { participants: values.participants, eventDetail });
  // };

  // const handlePay = async () => {
  //   try {
  //     setLoading(true);

  //     // 1) Create Payment Intent
  //     const intentResp = await executeApiRequest({
  //       apiCallFunction: createIntent,
  //       body: {amount: totalAmount, currency: 'usd'},
  //       toast: true,
  //       timeout: 30000,
  //     });

  //     LOG('Intent:', intentResp);

  //     // intentResp ke andar `data` hai
  //     const {clientSecret, paymentIntentId} = intentResp?.data || {};

  //     if (!clientSecret || !paymentIntentId) {
  //       throw new Error('Payment intent failed — missing clientSecret or ID');
  //     }

  //     // 2) Confirm Payment with Stripe
  //     const confirmResult = await confirmPayment(clientSecret, {
  //       paymentMethodType: 'Card',
  //     });

  //     LOG('stripe confirm result: ', confirmResult);

  //     if (confirmResult.error) {
  //       throw new Error(confirmResult.error.message);
  //     }

  //     // 3) Save Payment in Backend
  //     await executeApiRequest({
  //       apiCallFunction: savePayment,
  //       body: {
  //         paymentIntentId,
  //         amount: totalAmount,
  //         type: 'Event',
  //         eventId: eventDetails?._id,
  //         ...payload,
  //       },
  //       toast: true,
  //       timeout: 30000,
  //     });

  //     NavService.navigate('Events');
  //   } catch (err) {
  //     console.error(err);
  //     Alert.alert('Error in payment', err.message || 'Payment failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePay = async () => {
    try {
      setLoading(true);

      // 1) Create Payment Intent
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

      // 2) Confirm Payment with Stripe (use only clientSecret)
      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      LOG('stripe confirm result:', {error, paymentIntent});

      if (error) {
        throw new Error(error.message);
      }

      // 3) Save Payment in Backend (use confirmed paymentIntent.id)
      await executeApiRequest({
        apiCallFunction: savePayment,
        body: {
          paymentIntentId: paymentIntent?.id, // ✅ Stripe confirmed ID
          amount: totalAmount,
          type: 'Event',
          eventId: eventDetails?._id,
          ...payload,
        },
        toast: true,
        timeout: 30000,
      });

      NavService.navigate('Events');
    } catch (err) {
      console.error(err);
      Alert.alert('Error in payment', err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBackground
      back={true}
      title={'CHECKOUT'}
      notification
      marginHorizontal={true}>
      <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
        <CustomCard
          eventCardCheckout={true}
          participants={payload?.participants}
          totalAmount={
            eventDetails?.ticketPrice && payload?.participants
              ? `${(
                  parseFloat(eventDetails.ticketPrice) *
                  Number(payload.participants)
                ).toFixed(2)}`
              : 'N/A'
          }
          item={eventDetails}
          disabled={true}
        />
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.paymentdetail}>
          <CustomText
            text={'Card Details'}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          <CustomText text="*" color={colors?.red} size={size?.h5} />
        </View>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.cardStyle}
          style={styles.cardField}
        />
      </View>
      <View style={styles?.bottomContainer}>
        <View style={{marginTop: height * 0.04}}>
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
        </View>
      </View>
      {/* <BottomSheet
        payment={true}
        title={'PAY NOW'}
        ref={bottomSheetRef}
        onlinePress={() => {
          NavService.navigate('HomeStack');
          Alert.alert('Online Payment');
        }}
        walletPress={() => {
          NavService.navigate('HomeStack');
          Alert.alert('Wallet Payment');
        }}
      /> */}
    </AppBackground>
  );
};

export default EventCheckout;
