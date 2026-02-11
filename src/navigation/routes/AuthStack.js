import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Auth/Login/Login';
import SignUp from '../../screens/Auth/Signup/SignUp';
import ForgetPassword from '../../screens/Auth/ForgetPassword/ForgetPassword';
import OTPInput from '../../screens/Auth/OTPInput/OTPInput';
import ChangePassword from '../../screens/Auth/ChangePassword/ChangePassword';
import AuthPreference from '../../screens/Auth/Preferences/AuthPreference';
import AuthPreferencesTwo from '../../screens/Auth/Preferences/AuthPreferencesTwo';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'login'}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        animationEnabled: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="preferences" component={AuthPreference} />
      <Stack.Screen name="preferencesTwo" component={AuthPreferencesTwo} />
      <Stack.Screen name="forget" component={ForgetPassword} />
      <Stack.Screen name="otp" component={OTPInput} />
      <Stack.Screen name="change" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
