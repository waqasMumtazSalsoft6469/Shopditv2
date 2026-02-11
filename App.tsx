import {
  KeyboardAvoidingView,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainNavigation from './src/navigation/MainNavigation';
import { colors } from './src/utils/Colors';
import Toast from 'react-native-toast-message';
// import SplashScreen from 'react-native-splash-screen';
import { size, vh } from './src/utils';
import CustomText from './src/components/CustomText';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { LOG } from './src/utils/helperFunction';
import { useFetchPublicKeyQuery } from './src/Api/paymentApiSlice';

const App = () => {

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  const toastConfig = {
    success: internalState => (
      <View style={[styles.toastContainer, styles.success]}>
        <CustomText
          numberOfLines={2}
          style={styles.toastText}
          text={internalState.text1}
        />
      </View>
    ),
    error: internalState => (
      <View style={[styles.toastContainer, styles.error]}>
        <CustomText
          numberOfLines={1}
          style={styles.toastText}
          text={internalState.text1}
        />
      </View>
    ),
  };

  const statusHeight = StatusBar.currentHeight + 1;
  console.log('statusHeight', statusHeight);
  
  const AppContent = () => {
    console.log('AppContent rendering...');
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="black"
          barStyle="dark-content"
        />
        <KeyboardAvoidingView
          style={[styles.container, styles.containerWhiteBackground]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}
        >
          <MainNavigation />
          <Toast topOffset={70} config={toastConfig} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  // Component that uses Redux hook - must be inside Provider
  const StripeWrapper = () => {
    console.log('StripeWrapper rendering...');
    try {
      const { data, error, isLoading } = useFetchPublicKeyQuery();
      LOG('Public DATAasdasdsa: ', data?.data?.publishableKey);
      console.log('Stripe data loaded:', !!data, 'Error:', !!error);
      
      // Don't block rendering if Stripe key is loading
      return (
        <StripeProvider publishableKey={data?.data?.publishableKey || ''}>
          <AppContent />
        </StripeProvider>
      );
    } catch (err) {
      console.error('StripeWrapper error:', err);
      // Still render the app even if Stripe fails
      return (
        <StripeProvider publishableKey={''}>
          <AppContent />
        </StripeProvider>
      );
    }
  };

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeWrapper />
      </PersistGate>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerWhiteBackground: {
    backgroundColor: colors.white,
  },
  toastContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingHorizontal: 20,
    padding: 10,
    borderWidth: 0.4,
    borderColor: colors?.secondary,
    borderRadius: 100,
    borderStyle: 'solid',
    marginTop: Platform?.OS === 'android' ? -vh * 5 : 0,
  },
  toastText: {
    color: 'white',
    fontSize: size?.medium,
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#000000',
  },
  error: {
    backgroundColor: '#000000',
  },
});

export default App;
