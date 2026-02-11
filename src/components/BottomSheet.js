import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
} from 'react-native';
import { useFormik } from 'formik';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SelectList } from 'react-native-dropdown-select-list';
import { appIcons } from '../assets';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import CustomTextInput from './CustomTextInput';
import { colors } from '../utils/Colors';
import { family, size, vh, vw } from '../utils';
import CustomRadioButton from './CustomRadioButton';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { googleapikey } from '../utils/constants';
import { setAuth, setCurrentLocation } from '../redux/slices/authSlice';
import { useFetchUserByIdQuery } from '../Api/authApiSlice';
import ActivityLoader from './ActivityLoader';
import { LOG } from '../utils/helperFunction';
import { showToast } from '../utils/toast';
import NavService from '../helpers/NavService';
import isEqual from 'lodash/isEqual';
import GooglePlaceAutocomplete from './GooglePlace';
import { clearCart } from '../redux/slices/cartSlice';
import { executeApiRequest } from '../Api/methods/method';
import { useSetActiveMutation } from '../Api/locationApiSlice';

const { width, height } = Dimensions.get('screen');

const BottomSheet = forwardRef(
  (
    {
      OnNoPress,
      OnYesPress,
      payment,
      carFilter,
      onlinePress,
      walletPress,
      text,
      description,
      successfull,
      title,
      remove,
      onClose,
      location,
      onNewLocationSubmit,
      loader = false,
      isAddingNewAddress,
      setIsAddingNewAddress,
      ...props
    },
    ref,
  ) => {
    const initialValues = {
      company: '',
      lowest: '',
      highest: '',
      from: '',
      to: '',
      location: '',
    };
    const dispatch = useDispatch();
    const sheetRef = useRef();
    const currentLocation = useSelector(state => state.auth.currentLocation);
    const [loading, setLoading] = useState(false);
    const [selectedNewLocation, setSelectedNewLocation] = useState(null);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);
    const user = useSelector(state => state.auth.user);

    const id = user?._id || null;

    const { data, isLoading: userLoading, refetch } = useFetchUserByIdQuery({ id });

    // LOG('USER API DATA: ', data);
    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.open(),
      close: () => sheetRef.current?.close(),
      refetchUser: () => {
        refetch();
      },
    }));

    const handleUseCurrentLocation = async () => {
      setLoading(true);
      setSelectedLocationIndex(null);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;

          // Optionally fetch address using Google API
          let address = '';
          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleapikey}`,
            );
            const json = await res.json();
            address = json?.results?.[0]?.formatted_address || '';
          } catch (err) {
            console.log('Error fetching address:', err);
          }

          dispatch(
            setCurrentLocation({
              coordinates: [longitude, latitude],
              type: 'Point',
              address,
            }),
          );
          dispatch(clearCart());
          setLoading(false);
          if (onClose) onClose();
        },
        error => {
          console.error(error);
          Alert.alert('Location Error', error.message);
          setLoading(false);
        },
        { timeout: 15000, maximumAge: 10000, enableHighAccuracy: false },
      );
    };

    useEffect(() => {
      if (data && user) {
        const apiLocations = data.locations || [];
        const reduxLocations = user.locations || [];

        if (!isEqual(apiLocations, reduxLocations)) {
          dispatch(setAuth({ user: data })); // 👈 update redux user if locations changed
        }
      }
    }, [data]);

    useEffect(() => {
      if (data?.locations?.length && currentLocation) {
        const matchIndex = data.locations.findIndex(
          item =>
            item.coordinates?.[0] === currentLocation.coordinates?.[0] &&
            item.coordinates?.[1] === currentLocation.coordinates?.[1],
        );
        if (matchIndex !== -1) {
          setSelectedLocationIndex(matchIndex); // ✅ maintain visual state
        }
      }
    }, [data?.locations, currentLocation]);

    const formik = useFormik({
      initialValues,
      onSubmit: values => {
        Alert.alert('Filter Applied');
      },
    });

    const carData = [
      { key: '1', value: 'BMW' },
      { key: '2', value: 'MERCEDES' },
      { key: '3', value: 'AUDI' },
    ];

    const [setActive, { isLoading: setActiveLoading }] = useSetActiveMutation();

    const handleSelectLocation = async (loc, index) => {
      LOG('LOCasas: ', loc);
      const payload = {
        locationId: loc?._id,
      };
      const response = await executeApiRequest({
        apiCallFunction: setActive,
        body: payload,
        toast: true,
        timeout: 30000,
      });
      if (response) {
        setSelectedLocationIndex(index);
        dispatch(setCurrentLocation(loc));
        showToast('Location Selected Successfully');
        dispatch(clearCart());
      }
    };

    return (
      <View>
        <RBSheet
          ref={sheetRef}
          animationType="slide"
          closeOnDragDown={false}
          closeOnPressMask={true}
          closeOnPressBack={true}
          draggable={carFilter ? true : false}
          customStyles={{
            wrapper: {
              backgroundColor: props.backdropColor || 'rgba(0,0,0,0.5)',
            },
            container: {
              backgroundColor: colors?.white,
              borderTopEndRadius: vh * 3,
              borderTopLeftRadius: vh * 3,
              height: carFilter ? '90%' : '38%',
            },
          }}
          {...props}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: remove ? vh * 3 : 0,
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CustomText
                text={!remove ? title : null}
                size={size?.h3}
                font={family?.Gilroy_SemiBold}
              />
            </View>
          </View>

          {payment && (
            <View style={{ marginTop: vh * 1.5, marginBottom: vh * 3 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={'ONLINE'}
                  customWidth={width - 150}
                  buttonStyle={{ alignSelf: 'center', marginTop: height * 0.045 }}
                  onPress={onlinePress}
                  textStyle={{ fontSize: size?.xxlarge }}
                />
                <CustomButton
                  gradientColorArr={[colors?.iconColor, colors.iconColor]}
                  title={'WALLET'}
                  customWidth={width - 150}
                  buttonStyle={{ alignSelf: 'center', marginTop: height * 0.03 }}
                  onPress={walletPress}
                  textStyle={{ fontSize: size?.xxlarge }}
                />
              </View>
            </View>
          )}
          {location && (
            <>
              {!isAddingNewAddress ? (
                <>
                  {/* Show current location button + list of addresses */}
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      marginTop: vh * 2,
                      paddingHorizontal: vh * 3,
                      paddingBottom: vh * 10,
                    }}
                    keyboardShouldPersistTaps={'handled'}>
                    <TouchableOpacity
                      style={{
                        gap: vw * 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        opacity: loading ? 0.6 : 1,
                      }}
                      onPress={handleUseCurrentLocation}>
                      <FastImage
                        source={appIcons?.locationIcon}
                        style={{ width: vh * 2, height: vh * 2 }}
                        resizeMode="contain"
                      />
                      <CustomText
                        text={
                          loading
                            ? 'Fetching Location...'
                            : 'Use My Current Location'
                        }
                        font={family?.Questrial_Regular}
                        size={size?.h6}
                        color={colors?.headingText}
                      />
                    </TouchableOpacity>
                    {loading ||
                      (setActiveLoading && <ActivityLoader size={'small'} />)}

                    <View style={{ marginTop: 10, marginBottom: vh * 2 }}>
                      {(data?.locations || []).map((loc, index) => {
                        const isSelected = selectedLocationIndex === index;
                        // LOG('LOCATIONS: ', loc?._id);

                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: isSelected
                                ? colors.secondary
                                : colors.white,
                              paddingVertical: vh * 1.5,
                              paddingHorizontal: 10,
                              borderRadius: 8,
                            }}>
                            <CustomRadioButton
                              selected={isSelected}
                              onPress={() => handleSelectLocation(loc, index)}
                              label={loc?.address}
                              selectedColor={colors?.white}
                              radioButtonLabelStyle={{
                                flexWrap: 'wrap',
                                width: width * 0.65,
                              }}
                              containerStyle={{
                                width: width * 0.7,
                                marginHorizontal: 0,
                              }}
                            />

                            <TouchableOpacity
                              onPress={() =>
                                NavService?.navigate('editProfile')
                              }
                              style={{ padding: 5 }}>
                              <FastImage
                                source={appIcons?.jobEdit}
                                style={{ width: vh * 2.2, height: vh * 2.2 }}
                                resizeMode="contain"
                                tintColor={
                                  isSelected ? colors?.white : colors?.primary
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => setIsAddingNewAddress(true)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: vh * 2,
                      position: 'absolute',
                      bottom: 0,
                      left: 20,
                      padding: 15,
                      backgroundColor: 'white',
                      width: '100%',
                    }}>
                    <FastImage
                      source={appIcons?.add}
                      style={{ width: vh * 2.2, height: vh * 2.2 }}
                      resizeMode="contain"
                    />
                    <CustomText
                      text={'Add a new address'}
                      font={family?.Questrial_Regular}
                      size={size?.xxlarge}
                      color={colors?.headingText}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <View style={{ paddingVertical: 20 }}>
                    <CustomText
                      text={'NEW ADDRESS'}
                      font={family?.Gilroy_SemiBold}
                      size={size?.h6}
                      color={colors?.headingText}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                    <GooglePlaceAutocomplete
                      fieldName="location"
                      setFieldValue={formik.setFieldValue}
                      values={formik.values}
                      textInputTitle="Enter New Address"
                      staric
                      onSelect={loc => setSelectedNewLocation(loc)}
                      leftIcon={appIcons?.jobLocationIcon}
                      wrapperStyles={[styles.input2]}
                      returnType="object"
                    />
                  </View>
                  <View
                    style={{
                      marginTop: vh * 2,
                      marginBottom: vh * 2,
                      gap: vh * 2,
                      width: width - 150,
                    }}>
                    {loader ? (
                      <ActivityLoader />
                    ) : (
                      <CustomButton
                        gradientColorArr={[colors.secondary, colors.secondary]}
                        title={'Submit Location '}
                        customWidth={width - 150}
                        customHeight={vh * 6}
                        buttonStyle={{ alignSelf: 'center' }}
                        textStyle={{ fontSize: size.large }}
                        onPress={() => {
                          if (selectedNewLocation) {
                            onNewLocationSubmit?.(selectedNewLocation); // 👈 call parent with address
                          } else {
                            Alert.alert('Please select a location');
                          }
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => setIsAddingNewAddress(false)}
                      style={{
                        // padding: 6,
                        backgroundColor: colors?.primary,
                        borderRadius: 50,
                        alignItems: 'center',
                        height: vh * 6,
                        justifyContent: 'center',
                      }}>
                      <CustomText
                        text="← Go Back"
                        font={family?.Questrial_Regular}
                        size={size?.xlarge}
                        color={colors?.white}
                      />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </>
          )}
          {successfull && (
            <View
              style={{
                marginBottom: vh * 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -height * 0.02,
              }}>
              <View
                style={{
                  width: vw * 15,
                  height: vw * 15,
                  padding: 2,
                  borderRadius: 50,
                }}>
                <FastImage
                  source={appIcons?.sheetIcon}
                  style={{ width: '100%', height: '100%', alignSelf: 'center' }}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  width: '67%',
                  marginTop: height * 0.02,
                  gap: height * 0.005,
                  marginBottom: height * 0.03,
                }}>
                <CustomText
                  text={text}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h2}
                  style={{ textAlign: 'center' }}
                  color={colors?.headingText}
                />
                <CustomText
                  text={description}
                  font={family?.Questrial_Regular}
                  size={size?.xxlarge}
                  style={{ textAlign: 'center' }}
                  color={colors?.placeholderText}
                />
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                {/* <CustomButton
                                gradientColorArr={[colors?.white, colors.white]}
                                title={'NO'}
                                customWidth={width - 240}
                                buttonStyle={{ alignSelf: 'center', borderWidth: 1, borderColor: colors?.secondary }}
                                onPress={OnNoPress}
                                textStyle={{ fontSize: size?.xxlarge, color: colors?.secondary }}
                            /> */}
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={'Okay, Thanks'.toUpperCase()}
                  customWidth={width - 180}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  onPress={OnYesPress}
                  textStyle={{ fontSize: size?.xxlarge }}
                />
              </View>
            </View>
          )}

          {carFilter && (
            <ScrollView>
              <View style={{ marginTop: vh * 1.5, marginBottom: vh * 3 }}>
                <View style={styles.field}>
                  <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
                    <CustomText
                      text={'Company'}
                      font={family?.Questrial_Regular}
                      size={size?.large}
                    />
                  </View>
                  <SelectList
                    leftIcon={appIcons?.carCompany}
                    setSelected={value =>
                      formik.setFieldValue('company', value)
                    }
                    search={false}
                    placeholder="Select Car Company"
                    data={carData}
                    save="value"
                    dropdownTextStyles={{ color: colors?.text }}
                    dropdownStyles={{
                      borderWidth: 1,
                      borderColor: colors?.primary,
                    }}
                    boxStyles={[styles?.input]}
                    inputStyles={{
                      color: colors?.placeholderText,
                      fontSize: size?.medium,
                      fontFamily: family?.Questrial_Regular,
                    }}
                  />
                </View>

                <View style={styles.field}>
                  <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
                    <CustomText
                      text={'Select Condition'}
                      font={family?.Questrial_Regular}
                      size={size?.large}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <CustomRadioButton
                      selected={formik.values.company === 'option1'}
                      onPress={() => formik.setFieldValue('company', 'option1')}
                      label="Used Car"
                      colors={colors}
                    />
                    <CustomRadioButton
                      selected={formik.values.company === 'option2'}
                      onPress={() => formik.setFieldValue('company', 'option2')}
                      label="New Car"
                      colors={colors}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Select Year'}
                    onChangeText={formik.handleChange('from')}
                    onBlur={formik.handleBlur('from')}
                    placeholder="From"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.from}
                    leftIcon={appIcons?.calendar}
                    containerStyle={[
                      styles.input,
                      formik.touched.from &&
                      formik.errors.from &&
                      styles.focusedInput,
                    ]}
                  />
                  {formik.errors.from && formik.touched.from && (
                    <Text style={styles.error}>{formik.errors.from}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    onChangeText={formik.handleChange('to')}
                    onBlur={formik.handleBlur('to')}
                    placeholder="To"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.to}
                    leftIcon={appIcons?.calendar}
                    containerStyle={[
                      styles.input,
                      formik.touched.to &&
                      formik.errors.to &&
                      styles.focusedInput,
                    ]}
                  />
                  {formik.errors.to && formik.touched.to && (
                    <Text style={styles.error}>{formik.errors.to}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Car Price'}
                    onChangeText={formik.handleChange('lowest')}
                    onBlur={formik.handleBlur('lowest')}
                    placeholder="Lowest"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.lowest}
                    leftIcon={appIcons?.dollar}
                    containerStyle={[
                      styles.input,
                      formik.touched.lowest &&
                      formik.errors.lowest &&
                      styles.focusedInput,
                    ]}
                  />
                  {formik.errors.lowest && formik.touched.lowest && (
                    <Text style={styles.error}>{formik.errors.lowest}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    onChangeText={formik.handleChange('highest')}
                    onBlur={formik.handleBlur('highest')}
                    placeholder="Highest"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.highest}
                    leftIcon={appIcons?.dollar}
                    containerStyle={[
                      styles.input,
                      formik.touched.highest &&
                      formik.errors.highest &&
                      styles.focusedInput,
                    ]}
                  />
                  {formik.errors.highest && formik.touched.highest && (
                    <Text style={styles.error}>{formik.errors.highest}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Location'}
                    onChangeText={formik.handleChange('location')}
                    onBlur={formik.handleBlur('location')}
                    placeholder="Location"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.location}
                    leftIcon={appIcons?.locationIcon}
                    containerStyle={[
                      styles.input,
                      formik.touched.location &&
                      formik.errors.location &&
                      styles.focusedInput,
                    ]}
                  />
                  {formik.errors.location && formik.touched.location && (
                    <Text style={styles.error}>{formik.errors.location}</Text>
                  )}
                </View>

                <View style={{ alignItems: 'center' }}>
                  <CustomButton
                    gradientColorArr={[colors?.secondary, colors.secondary]}
                    title={'APPLY FILTER'}
                    customWidth={width - 150}
                    buttonStyle={{
                      alignSelf: 'center',
                      marginTop: height * 0.03,
                    }}
                    onPress={formik.handleSubmit}
                    textStyle={{ fontSize: size?.xxlarge }}
                  />

                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.forgotPassContainer}
                    onPress={() => { }}>
                    <Text style={styles.forgotPass}>CLEAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
          {remove && (
            <View
              style={{
                marginBottom: vh * 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -height * 0.02,
              }}>
              <Image
                source={appIcons.warning}
                style={{
                  resizeMode: 'contain',
                  width: vw * 15,
                  height: vh * 8,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  alignSelf: 'center',
                  width: '67%',
                  marginTop: height * 0.01,
                  gap: height * 0.007,
                  marginBottom: height * 0.03,
                }}>
                <CustomText
                  text={text}
                  font={family?.Questrial_Regular}
                  size={size?.h4}
                  style={{ textAlign: 'center' }}
                />
                <CustomText
                  text={'This action cannot be undone!'}
                  font={family?.Questrial_Regular}
                  size={size?.xxlarge}
                  style={{ textAlign: 'center' }}
                  color={colors?.red}
                />
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <CustomButton
                  gradientColorArr={[colors?.white, colors.white]}
                  title={'NO'}
                  customWidth={width - 240}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  onPress={OnNoPress}
                  textStyle={{
                    fontSize: size?.xxlarge,
                    color: colors?.secondary,
                  }}
                />
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={'YES'}
                  customWidth={width - 240}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  onPress={OnYesPress}
                  textStyle={{ fontSize: size?.xxlarge }}
                />
              </View>
            </View>
          )}
        </RBSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  field: {
    padding: 10,
  },
  input2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
    marginBottom: 10,
  },
  focusedInput: {
    borderColor: colors?.iconColor,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: size?.normal,
    fontFamily: family?.Gilroy_SemiBold,
  },
  forgotPass: {
    color: colors?.iconColor,
    fontSize: size?.medium,
    fontFamily: family?.Gilroy_Medium,
    textDecorationLine: 'underline',
  },

  forgotPassContainer: {
    alignItems: 'center',
    width: width * 0.4,
    paddingVertical: 2,
    marginTop: 10,
  },
});

export default BottomSheet;
