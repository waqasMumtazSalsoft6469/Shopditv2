import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import { colors } from '../../../utils/Colors';
import { family, size } from '../../../utils';
import styles from './styles';
import CustomButton from '../../../components/CustomButton';
import { appIcons } from '../../../assets';
import NavService from '../../../helpers/NavService';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/authSlice';
import { LOG, makeApiCall } from '../../../utils/helperFunction';
import { useLoginMutation } from '../../../Api/authApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Login = () => {

  const [focusedField, setFocusedField] = useState('');
  const dispatch = useDispatch();
  const [deviceId, setDeviceId] = useState('');
  console.log('deviceIddeviceId', deviceId);
  const [login, { isLoading, error }] = useLoginMutation();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getToken();
    }
  }

  const checkDeviceToken = async () => {
    const storedToken = await AsyncStorage.getItem('fcmToken');
    if (storedToken) {
      console.log('Using stored FCM Token: new', storedToken);
      setDeviceId(storedToken);
    } else {
      requestUserPermission();
    }
  };

  async function getToken() {
    const token = await messaging().getToken();
    console.log('FCM Token: Latest New One', token);
    await AsyncStorage.setItem('fcmToken', token);
    setDeviceId(token);
  }

  useEffect(() => {
    checkDeviceToken();
  }, []);

  LOG('DEVICE: ', deviceId);

  // const handleLogin = async values => {
  //   // NavService?.navigate('signup')
  //   const payload = {
  //     email: values?.email,
  //     password: values?.password,
  //     deviceToken: deviceId,
  //     deviceId: Platform.OS,
  //   };
  //   LOG('PAYLAOD: ', payload);

  //   await makeApiCall(login, payload);
  //   NavService?.navigate('DrawerStack')
  // };

  const handleLogin = async values => {
    const payload = {
      email: values.email,
      password: values.password,
      deviceToken: deviceId,
      deviceId: Platform.OS,
    };

    const res = await makeApiCall(login, payload);
    LOG('Res: ', res)

    if (res?.data?.token) {
      setTimeout(() => {
        NavService.reset(0, [
          { name: 'DrawerStack' },
        ]);
      }, 300);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleLogin}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <CustomBackground
          back={true}
          titleText={'SIGN IN'}
          descriptionText={'Enter your credentials to sign in to the platform'}>
          <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
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
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Password'}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => {
                    handleBlur('password');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('password')}
                  placeholder="Enter Password"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.password}
                  rightIcon
                  leftIcon={appIcons?.password}
                  containerStyle={[
                    styles.input,
                    focusedField === 'password' && styles.focusedInput,
                  ]}
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.forgotPassContainer}
                onPress={() => {
                  NavService?.navigate('forget');
                }}>
                <Text style={styles.forgotPass}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={{ marginTop: height * 0.04 }}>
                {isLoading ? (
                  <ActivityLoader color={colors?.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'LOGIN'}
                    customWidth={width - 55}
                    buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                    textStyle={{ fontSize: size.large }}
                    onPress={handleSubmit}
                  />
                )}
              </View>
              {/* <View style={styles.saperatorContainer}>
                <View style={styles.line} />
                <CustomText
                  text={'OR CONTINUE WITH'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.medium}
                  color={colors?.blackShade}
                />
                <View style={styles?.line} />
              </View>
              <View style={{marginTop: height * 0.01}}>
                <CustomButton
                  iconSrc={appIcons?.google}
                  gradientColorArr={[colors.orange, colors.orange]}
                  title={'SIGN IN WITH GOOGLE'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  // onPress={handleSubmit}
                />
              </View>
              <View style={{marginTop: height * 0.015}}>
                <CustomButton
                  iconSrc={appIcons?.facebook}
                  gradientColorArr={[colors.facebookBlue, colors.facebookBlue]}
                  title={'SIGN IN WITH facebook'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  // onPress={handleSubmit}
                />
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: '5%',
                }}>
                <CustomText
                  text={'New To Shopdit?'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.medium}
                  color={colors?.blackShade}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ padding: 3 }}
                  onPress={() => {
                    NavService?.navigate('signup');
                  }}>
                  <CustomText
                    text={'SIGN UP'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.medium}
                    color={colors?.secondary}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </CustomBackground>
      )}
    </Formik>
  );
};

export default Login;
