import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../utils/Colors';
import NavService from '../helpers/NavService';
import { appIcons } from '../assets';
import { family, size } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default ({
  children,
  back = true,
  back2 = false,
  title = true,
  titleText,
  onBack = null,
  titleDescription = true,
  descriptionText,
}) => {
  const [isPortrait, setIsPortrait] = useState(
    Dimensions.get('window').height > Dimensions.get('window').width,
  );

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsPortrait(height > width);
    };

    const subscription = Dimensions.addEventListener(
      'change',
      updateOrientation,
    );

    return () => {
      subscription?.remove();
    };
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors?.primary }]}>
      <View
        style={[
          styles.header,
          {
            paddingVertical: isPortrait ? '15%' : '5%',
            paddingHorizontal: '8%',
          },
        ]}>
        {back && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.goBack();
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10,
              left: 25,
            }}>
            <Image source={appIcons.back} style={styles.backImage} />
          </TouchableOpacity>
        )}
        {back2 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.reset(0, [{ name: 'login' }]);
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10,
              left: 25,
            }}>
            <Image source={appIcons.back} style={styles.backImage} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          {title && (
            <View>
              <Text style={styles.headerSignInText}>{titleText}</Text>
            </View>
          )}
          {titleDescription && (
            <View>
              <Text style={styles.headerDescription}>{descriptionText}</Text>
            </View>
          )}
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.childrenContainer}>
        <View style={{ flex: 3 }}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors?.primary,
  },
  backImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  titleContainer: {
    gap: 10,
    top: 30,
  },
  headerSignInText: {
    fontSize: size?.h1,
    color: colors.white,
    fontFamily: family?.Gilroy_SemiBold,
  },
  headerDescription: {
    fontSize: size?.xxlarge,
    color: colors.white,
    fontFamily: family?.Questrial_Regular,
  },
  childrenContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors?.white,
  },
});
