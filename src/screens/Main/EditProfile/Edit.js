import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomPhoneInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {size, vh, vw} from '../../../utils';
import styles from './styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons, appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import NavService from '../../../helpers/NavService';
import {useSelector} from 'react-redux';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import Profile from '../../../components/ProfileImagePicker/ProfileImagePicker';
import {executeApiRequest} from '../../../Api/methods/method';
import {useUpdateMutation} from '../../../Api/profileApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import CustomText from '../../../components/CustomText';
import parsePhoneNumberFromString from 'libphonenumber-js';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  gender: Yup.string().optional(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // phoneNumber: Yup.string()
  //   .matches(/^\+?[0-9\s]+$/, 'Phone number must contain only digits')
  //   .min(10, 'Phone number must be at least 10 digits')
  //   .max(15, 'Phone number must be at most 15 digits')
  //   .required('Phone number is required')
  //   .test('isValid', 'Phone number is not valid', function (value) {
  //     return value ? true : false;
  //   }),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^\+?[0-9\s-]+$/,
      'Phone number must contain only digits, spaces, or hyphens',
    )
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be at most 15 characters')
    .test(
      'is-valid-phone',
      'Invalid phone number for the selected country',
      value => {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber && phoneNumber.isValid();
        } catch (e) {
          console.error('Phone number validation error:', e.message);
          return false;
        }
      },
    ),

  locations: Yup.array()
    .of(
      Yup.object().shape({
        address: Yup.string().required('Address is required'),
      }),
    )
    .min(1, 'At least one location is required'),
});

const Edit = () => {
  const [update, {isLoading}] = useUpdateMutation();

  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('userDetails: ', userDetails);
  let image = getImageUrl(userDetails?.image);
  const [focusedField, setFocusedField] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleEdit = async values => {
    LOG('PROFILEIMAGEasdas: ', profileImage);
    const cleanLocations = values.locations
      .filter(
        loc =>
          loc?.address &&
          Array.isArray(loc.coordinates) &&
          loc.coordinates.length === 2,
      )
      .map(loc => ({
        address: loc.address,
        coordinates: loc.coordinates,
        type: 'Point',
      }));

    const payload = {
      fullName: values?.full_name,
      email: values?.email,
      gender: values?.gender,
      phoneNumber: values?.phoneNumber,
      image: profileImage || '',
      locations: cleanLocations,
    };
    LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: update,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });

    LOG('Profile Update Success:', response);

    NavService?.navigate('DrawerStack');
  };
  const handleImage = imagePath => {
    setProfileImage(imagePath);
  };
  return (
    <Formik
      initialValues={{
        full_name: userDetails?.fullName || '',
        email: userDetails?.email || '',
        gender: userDetails?.gender || '',
        phoneNumber: userDetails?.phoneNumber || '',
        locations: userDetails?.locations || [],
      }}
      validationSchema={SignupSchema}
      onSubmit={handleEdit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <AppBackground back={true} title={'EDIT PROFILE'} notification>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.04}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={{alignItems: 'center'}}>
                <Profile
                  handleImage={handleImage}
                  isEdit={true}
                  icon={appIcons?.Camera}
                  initialImage={image}
                />
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Full Name'}
                  onFocus={() => setFocusedField('full_name')}
                  onBlur={() => {
                    handleBlur('full_name');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('full_name')}
                  placeholder="Enter Full Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.full_name}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'full_name' && styles.focusedInput,
                  ]}
                />
                {errors.full_name && touched.full_name && (
                  <Text style={styles.error}>{errors.full_name}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  editable={false}
                  labelTitle={'Email Address'}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => {
                    handleBlur('email');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('email')}
                  placeholder="Enter Email Address"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.email}
                  leftIcon={appIcons?.email}
                  containerStyle={[
                    styles.input,
                    focusedField === 'email' && styles.focusedInput,
                  ]}
                />
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomPhoneInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Phone Number'}
                  setValue={val => setFieldValue('phoneNumber', val)}
                  placeholder="Enter Phone Number"
                  placeholderTextColor={colors.placeholderText}
                  valid={valid}
                  showMessage={showMessage}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={values.phoneNumber}
                  containerStyle={[
                    styles.input,
                    focusedField === 'phoneNumber' && styles.focusedInput,
                  ]}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={false}
                  editable={false}
                  labelTitle={'Gender'}
                  onFocus={() => setFocusedField('gender')}
                  onBlur={() => {
                    handleBlur('gender');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('gender')}
                  placeholder="Enter Gender"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.gender}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'gender' && styles.focusedInput,
                  ]}
                />
                {errors.gender && touched.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}
              </View>

              {values.locations.map((loc, index) => (
                <View key={index} style={[styles.field]}>
                  <GooglePlaceAutocomplete
                    fieldName="locations"
                    index={index}
                    textInputTitle={`Location ${index + 1}`}
                    placeholder={'Enter Address'}
                    leftIcon={appIcons?.jobLocationIcon}
                    initialAddress={loc?.address}
                    wrapperStyles={[
                      styles.input2,
                      focusedField === 'location' && styles.focusedInput,
                    ]}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  {/* ✅ Location Address Field Error */}
                  {errors?.locations &&
                    errors.locations[index]?.address &&
                    touched?.locations &&
                    touched.locations[index]?.address && (
                      <Text style={styles.error}>
                        {errors.locations[index].address}
                      </Text>
                    )}
                  {values.locations.length > 1 && (
                    <TouchableOpacity
                      onPress={() => {
                        const updatedLocations = values.locations.filter(
                          (_, i) => i !== index,
                        );
                        setFieldValue('locations', updatedLocations);
                      }}
                      style={{marginTop: 5, alignSelf: 'flex-end'}}>
                      <Text style={{color: 'red'}}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: colors?.primary,
                  alignSelf:
                    values.locations.length > 1 ? 'flex-start' : 'flex-end',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: values.locations.length > 1 ? 0 : vh * 0.5,
                }}
                onPress={() => {
                  const updated = [
                    ...values.locations,
                    {
                      address: '',
                      coordinates: [],
                      type: 'Point',
                    },
                  ];
                  setFieldValue('locations', updated);
                }}>
                <CustomText
                  text={
                    values.locations.length > 1
                      ? '+ Add Another Location'
                      : '+ Add A Location'
                  }
                  style={{color: 'white'}}
                  size={size?.medium}
                />
              </TouchableOpacity>

              <View style={{marginVertical: height * 0.04, gap: vh * 1.5}}>
                {isLoading ? (
                  <ActivityLoader color={colors?.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'UPDATE PROFILE'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}

                <CustomButton
                  gradientColorArr={[colors.iconColor, colors.iconColor]}
                  title={'UPDATE PREFERENCES'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={() => {
                    NavService.navigate('preferences');
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default Edit;
