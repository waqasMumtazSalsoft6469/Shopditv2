import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native'; // Added Modal and TouchableOpacity
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import FastImage from 'react-native-fast-image';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {HEIGHT, WIDTH} from '../../../theme/units';
import {executeApiRequest} from '../../../Api/methods/method';

import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {useGenerateQRMutation} from '../../../Api/rewardsApiSlice';
const {width, height} = Dimensions.get('screen');

const MyRewardDetails = ({route}) => {
  const {rewardDetails} = route.params;
  LOG('REWARD DETAILS: ', rewardDetails);
  const [qrCode, setQrCode] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false); // New state for modal
  const [generateQR, {isLoading}] = useGenerateQRMutation();

  useEffect(() => {
    handleGenerateQR();
  }, []);

  const handleGenerateQR = async () => {
    const response = await executeApiRequest({
      apiCallFunction: generateQR,
      params: {id: rewardDetails?._id},
      toast: true,
      timeout: 30000,
    });
    LOG('RESPOSNE QR: ', response);
    if (response) {
      setQrCode(response?.qrCode); // <-- Set QR code here
    }
  };

  return (
    <AppBackground
      back
      titleColor={colors?.white}
      notification
      title={'MY REWARD DETAILS'}
      couponDetails={true}
      marginHorizontal={true}>
      <CustomContainer bgImage={getImageUrl(rewardDetails?.reward?.image)}>
        <View style={styles?.titleSection}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              text={rewardDetails?.reward?.title}
              font={family?.Gilroy_SemiBold}
              size={size?.h4}
              color={colors?.headingText}
              style={{width: WIDTH * 0.6, marginBottom: 10}}
            />
            {isLoading ? (
              <ActivityLoader color={colors2?.theme?.secondary} />
            ) : qrCode ? (
              // Wrapped in TouchableOpacity for tap to enlarge
              <TouchableOpacity
                onPress={() => setShowQRModal(true)}
                style={styles.imageContainer}>
                <FastImage
                  source={{uri: qrCode}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
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
            <View style={{gap: 3, flexDirection: 'row'}}>
              <CustomText
                text={'Points Cost: '}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
              <CustomText
                text={rewardDetails?.reward?.pointsCost}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 3}}>
              <CustomText
                text={'Category:'}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
              <CustomText
                text={rewardDetails?.reward?.category}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
              />
            </View>
            <View style={{marginTop: 15}}>
              <CustomText
                text={rewardDetails?.reward?.description}
                font={family?.Questrial_Regular}
                size={size?.xxlarge}
                color={colors?.placeholderText}
                style={{lineHeight: height * 0.03, marginTop: 5}}
              />
            </View>
          </View>
        </View>
      </CustomContainer>

      {/* New Modal for Enlarged QR */}
      <Modal
        visible={showQRModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQRModal(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            activeOpacity={1}
            onPress={() => setShowQRModal(false)}>
            {/* Empty space to dismiss on tap outside */}
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowQRModal(false)}>
              <CustomText
                text="Close"
                font={family.Gilroy_Medium}
                size={size.medium}
                color={colors.headingText}
              />
            </TouchableOpacity>
            <FastImage
              source={{uri: qrCode}}
              style={styles.enlargedQR}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </AppBackground>
  );
};

export default MyRewardDetails;

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
    // backgroundColor: 'red'
  },
  // New styles for modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    maxWidth: '90%',
    maxHeight: '80%',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  enlargedQR: {
    width: 300, // Enlarged size – adjust as needed
    height: 300,
  },
});
