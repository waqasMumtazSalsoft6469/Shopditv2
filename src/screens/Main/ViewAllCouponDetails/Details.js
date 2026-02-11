import React from 'react';
import { Dimensions, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import { appIcons, appImages } from '../../../assets';
import CustomText from '../../../components/CustomText';
import { family, size } from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import { couponData, restaurantGallery, restaurantTiming } from '../../../utils/dummyData';
import CustomIcon from '../../../components/CustomIcon';
import FastImage from 'react-native-fast-image';
import Coupon from '../../../components/Coupon';
import NavService from '../../../helpers/NavService';
import CustomButton from '../../../components/CustomButton';

const { width, height } = Dimensions.get('screen');
const Details = ({ route }) => {
    const { couponDetail } = route.params;

    const renderGalleryItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <FastImage
                source={item?.image}
                style={styles.image}
                resizeMode='cover'
            />
        </View>
    );
    return (
        <AppBackground
            back
            titleColor={colors?.white}
            title={'RESTAURANT DETAILS'}
            notification
            couponDetails={true}
            marginHorizontal={true}>
            <CustomContainer bgImage={appImages?.viewCouponBG} customItemStyles={{ marginTop: -height * 0.045,}}  >
                <View style={styles?.titleSection}>
                    <CustomText
                        text={couponDetail?.title}
                        font={family?.Gilroy_SemiBold}
                        size={size?.h1}
                        color={colors?.headingText}
                        numberOfLines={1}
                    />
                    <CustomText
                        text={couponDetail?.type}
                        numberOfLines={1}
                        font={family?.Questrial_Regular}
                        size={size?.xxlarge}
                        color={colors?.iconColor}
                    />
                    <View style={[styles?.hr, { width: '100%' }]} />
                    <View>
                        <CustomText
                            text={"EXPIRY DATE"}
                            font={family?.Gilroy_SemiBold}
                            size={size?.h6}
                            color={colors?.headingText}
                            numberOfLines={1}
                        />
                        <View style={styles?.workItems}>
                            <CustomIcon
                                size={size?.h6}
                                src={appIcons?.calendar}
                            />

                            <CustomText
                                text={couponDetail?.expiry}
                                numberOfLines={1}
                                font={family?.Questrial_Regular}
                                size={size?.xlarge}
                                color={colors?.placeholderText}
                            />
                        </View>
                    </View>
                    <View style={[styles?.hr, { width: '100%' }]} />
                    <View>
                        <CustomText
                            style={{ textAlign: 'justify', marginTop: -1, lineHeight: height * 0.03 }}
                            text={couponDetail?.description}
                            size={size?.large}
                            font={family?.Questrial_Regular}
                            color={colors?.placeholderText}
                        />
                    </View>
                    <View style={{ marginTop: height * 0.05 }}>
                        <CustomButton
                            gradientColorArr={[colors.secondary, colors.secondary]}
                            title={'ADD TO MY COUPONS'}
                            customWidth={width - 55}
                            buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                            textStyle={{ fontSize: size.large }}
                            onPress={() => {
                                Alert.alert('Added to My Coupons')
                                NavService?.goBack()
                            }}
                        />
                    </View>
                </View>
            </CustomContainer>
        </AppBackground >
    );
}

export default Details;

const styles = StyleSheet.create({
    titleSection: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 10,
        gap: 3,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    item: {
        marginVertical: 5,
    },
    hr: {
        borderTopWidth: 1,
        borderColor: colors?.lightGrayLine,
        marginTop: 15,
        marginBottom: 15,
        width: '90%',
        alignSelf: 'center',
    },
    workItems: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    imageContainer: {
        width: width / 3 - 23,
        height: width / 3 - 23,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 5,
    },
    galleryRow: {
        justifyContent: 'space-between',
    },
    galleryList: {
        marginTop: height * 0.015,
    },
});
