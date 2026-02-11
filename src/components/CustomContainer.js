import React from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';
import {appImages} from '../assets';
import {colors} from '../utils/Colors';
import {vw} from '../utils';
import Shadows from '../helpers/Shadows';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const CustomContainer = ({
  children,
  children2,
  bgImage,
  customBgStyles,
  customItemStyles,
  noImage,
  bannerStyle,
  secondContainer = false,
  styleSecond,
  scrollEnabled = true,
  mb = false,
}) => {
  return (
    <>
      {noImage ? (
        <View style={[styles.bannerContainer, bannerStyle]} />
      ) : (
        <View style={styles.bannerContainer}>
          <FastImage
            style={[styles.image, customBgStyles]}
            source={bgImage}
            resizeMode="cover"
            defaultSource={appImages?.placeholder}
          />
        </View>
      )}
      <View style={[styles.itemsContainer, customItemStyles]}>
        {scrollEnabled ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
            showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: mb ? height * 0.12 : 0}}>
              {children}
            </View>
          </ScrollView>
        ) : (
          <View style={{marginBottom: height * 0.13}}>{children}</View>
        )}
        {/* <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: height * 0.13}}>{children}</View>
        </ScrollView> */}
        {secondContainer && (
          <View style={[styles?.secondContainerStyles, styleSecond]}>
            {children2}
          </View>
        )}
      </View>
    </>
  );
};

export default CustomContainer;

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: colors?.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
    flex: 1,
    marginTop: -height * 0.035,
    paddingTop: 10,
  },
  bannerContainer: {
    height: height / 2.25,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: -height * 0.02,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  secondContainerStyles: {
    width: '100%',
    height: height * 0.12,
    backgroundColor: colors?.white,
    ...Shadows?.shadow5,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: vw * 5,
    borderWidth: 1,
    borderColor: '#EFECEC',
  },
});
