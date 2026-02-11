import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { appIcons, appImages } from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomContainer from '../../../components/CustomContainer';
import { colors } from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import { family, size } from '../../../utils';
import styles from './styles';
import CustomIcon from '../../../components/CustomIcon';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import Share from 'react-native-share';
import {
  formatDateYear,
  formattedTime,
  getImageUrl,
  LOG,
} from '../../../utils/helperFunction';
import { useSelector } from 'react-redux';
import { showToast } from '../../../utils/toast';

const { width, height } = Dimensions.get('screen');

const EventsDetail = ({ route }) => {
  const { eventDetails } = route.params;
  LOG('eventDEAITL: ', eventDetails);
  const token = useSelector(state => state?.auth?.token);


  const options = {
    url: 'https://reactnative.dev/docs/share',
    title: 'Share this with a friend!',
    message: `Check out ${eventDetails?.eventName} on Shopdit from ${eventDetails?.business?.fullName} . Check now!`,
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
      title={'EVENT DETAILS'}
      notification
      share={true}
      onSharePress={() => shareApp()}
      couponDetails={true}
      marginHorizontal={true}>
      <ScrollView>
        <CustomContainer
          bgImage={getImageUrl(eventDetails?.image)}
          mb={true}
          customItemStyles={{ marginTop: -height * 0.055 }}>
          <View style={styles?.titleSection}>
            <View style={styles?.eventItems}>
              <View style={{ gap: 3 }}>
                <CustomText
                  text={eventDetails?.eventName}
                  color={colors.headingText}
                  font={family?.Gilroy_SemiBold}
                  size={size.h4}
                  numberOfLines={1}
                />
                <CustomText
                  text={`Held by: ${eventDetails?.business?.fullName}`}
                  color={colors?.lightBlueText}
                  font={family?.Questrial_Regular}
                  size={size.large}
                  numberOfLines={3}
                />
                {/* <TouchableOpacity
                  style={{marginTop: 10, alignSelf: 'center'}}
                  activeOpacity={0.3}
                  onPress={() => shareApp()}>
                  <CustomText
                    text={'Share Restaurant'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                    color={colors?.placeholderText}
                    numberOfLines={1}
                    underline
                  />
                </TouchableOpacity> */}
              </View>
              <View
                style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                <CustomText
                  text={'$'}
                  color={colors.headingText}
                  font={family?.Gilroy_Bold}
                  size={size.xlarge}
                  numberOfLines={1}
                />
                <CustomText
                  text={eventDetails?.ticketPrice}
                  color={colors.headingText}
                  font={family?.Gilroy_Bold}
                  size={size.h2}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />
            <View>
              <CustomText
                text={'TIMING'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View style={styles?.workItems}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <CustomIcon size={size?.h6} src={appIcons?.calendar} />
                  <CustomText
                    style={{ textAlign: 'justify', marginTop: -1 }}
                    text={formatDateYear(eventDetails?.date)}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <CustomIcon size={size?.h5} src={appIcons?.timing} />
                  <CustomText
                    style={{ textAlign: 'justify', marginTop: -1 }}
                    text={formattedTime(eventDetails?.time)}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </View>
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />
            <View>
              <CustomText
                text={'DESCRIPTION'}
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
                text={eventDetails?.description}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>
            <View style={[styles?.hr, { width: '100%' }]} />
            <View>
              <CustomText
                text={'ADDRESS'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View style={styles?.workItems}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <CustomIcon size={size?.h6} src={appIcons?.address} />
                  <CustomText
                    style={{ textAlign: 'justify', marginTop: -1 }}
                    text={eventDetails?.location.address}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              </View>
            </View>
            <View
              style={{ marginTop: height * 0.03, marginBottom: height * 0.005 }}>
              <CustomButton
                gradientColorArr={[colors.secondary, colors.secondary]}
                title={'GET A TICKET'}
                customWidth={width - 55}
                buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                textStyle={{ fontSize: size.large }}
                onPress={() => {
                  if (!token) {
                    showToast('Please log in to continue');
                    return;
                  }
                  NavService?.navigate('EventBookTicket', {
                    eventDetails: eventDetails,
                  });
                }}
              />
            </View>
          </View>
        </CustomContainer>
      </ScrollView>
    </AppBackground>
  );
};

export default EventsDetail;
