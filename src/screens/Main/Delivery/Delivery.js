import React, { useState } from 'react';
import { Animated, Dimensions, Easing, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {
    eventData,
    JobData,
    jobType,
    LogData,
    restaurants,
} from '../../../utils/dummyData';
import { SearchInput } from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import { type } from '../../../utils/dummyData';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';
import { family, size, vh } from '../../../utils';
import CustomText from '../../../components/CustomText';
import FastImage from 'react-native-fast-image';
import { appIcons } from '../../../assets';
import CustomToggleButton from '../../../components/CustomToggleButton/CustomToggleButton';
import styles from './styles';
import CustomIcon from '../../../components/CustomIcon';


const { width, height } = Dimensions.get('screen');

const Delivery = () => {
    const [openPackage, setOpenPackage] = useState(null);
    const [selectedTab, setSelectedTab] = useState('Pending');

    const animatedHeights = LogData.map(() => useState(new Animated.Value(0))[0]);
    const animatedRotations = LogData.map(() => useState(new Animated.Value(0))[0]);

    const togglePackage = (index) => {
        // Asghar -->  This closes all packages first
        animatedHeights.forEach((anim, i) => {
            Animated.timing(anim, {
                toValue: 0,
                duration: 400,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
            // Asghar --> This used to reset rotation for my icon
            Animated.timing(animatedRotations[i], {
                toValue: 0,
                duration: 400,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        });
        // Asghar --> closes clicked package if open
        if (openPackage === index) {
            setOpenPackage(null);
        } else {
            // Asghar --> Opens package and rotates my icon
            Animated.timing(animatedHeights[index], {
                toValue: height * 0.21,
                duration: 400,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();

            Animated.timing(animatedRotations[index], {
                toValue: 1,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();

            setOpenPackage(index);
        }
    };

    const filteredPackages = LogData.filter(pkg => pkg.status === selectedTab);
    const rotateIcon = (index) => {
        return animatedRotations[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });
    };

    return (
        <AppBackground back={true} title={'Delivery'.toUpperCase()} notification cart>
            <View style={{ paddingTop: vh*5, paddingHorizontal: 30, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: vh*15}}>
                    <View style={{ alignSelf: 'center', marginBottom: vh*3 }}>
                        <CustomToggleButton
                            tabs={['Pending', 'Delivered', 'Cancelled']}
                            onTabChange={setSelectedTab} />
                    </View>
                    {filteredPackages.map((pkg, index) => (
                        <View key={index} style={[styles.cardContainer, index === 2 ? { marginBottom: height * 0.06 } : { marginBottom: height * 0.02 }]}>
                            {pkg?.status && (
                                <View style={[styles?.statusFlag, {
                                    backgroundColor: pkg?.status === 'Delivered' ? colors?.greenIcon :
                                        pkg?.status === 'Pending' ? colors?.pendingColor :
                                            pkg?.status === 'Cancelled' ? '#FF0000' : 'transparent',
                                }]}>
                                    <CustomText
                                        text={
                                            pkg?.status === 'Delivered' ? pkg?.flagText :
                                                pkg?.status === 'Pending' ? pkg?.flagText :
                                                    pkg?.status === 'Cancelled' ? pkg?.flagText : ''
                                        }
                                        font={family?.Gilroy_SemiBold}
                                        size={size?.small}
                                        color={colors?.white}
                                        style={{ textTransform: 'uppercase' }}
                                    />
                                </View>
                            )}
                            <View style={{ padding: 10, gap: 5, marginTop: 5 }}>
                                <CustomText
                                    text={pkg?.orderId}
                                    font={family?.Gilroy_SemiBold}
                                    size={size?.small}
                                    style={{ alignSelf: 'flex-end', }}
                                    color={colors?.headingText}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, }}>
                                    <View style={styles?.imageContainer}>
                                        <FastImage
                                            source={pkg?.icon}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={{ gap: 2 }}>
                                        <CustomText
                                            text={pkg?.name}
                                            font={family?.Questrial_Regular}
                                            size={size?.xlarge}
                                            color={colors?.lightBlueText}
                                        />
                                        <CustomText
                                            text={`$${pkg.price}`}
                                            font={family?.Gilroy_SemiBold}
                                            size={size?.large}
                                            color={colors?.headingText}
                                        />
                                        <View style={{ flexDirection: 'row', gap: 5, }}>
                                            <CustomText
                                                text={'PICK UP'}
                                                font={family?.Gilroy_SemiBold}
                                                size={size?.medium}
                                                color={colors?.headingText}
                                            />
                                            <CustomText
                                                text={pkg?.pickupTime}
                                                font={family?.Gilroy_Regular}
                                                size={size?.medium}
                                                color={colors?.dullgrey}
                                            />
                                            <CustomText
                                                text={'|'}
                                                font={family?.Gilroy_SemiBold}
                                                size={size?.medium}
                                                color={colors?.headingText}
                                            />
                                            <CustomText
                                                text={'DELIVERY'}
                                                font={family?.Gilroy_SemiBold}
                                                size={size?.medium}
                                                color={colors?.headingText}
                                            />
                                            <CustomText
                                                text={pkg?.deliveryTime}
                                                font={family?.Gilroy_Regular}
                                                size={size?.medium}
                                                color={colors?.dullgrey}
                                            />
                                        </View>
                                    </View>
                                </View>

                                {pkg.status && (
                                    <>
                                        <View style={[styles?.hr, { width: '95%' }]} />
                                        <TouchableOpacity style={styles.touchableButton} onPress={() => togglePackage(index)}>
                                            <Animated.View style={{ transform: [{ rotate: rotateIcon(index) }] }}>
                                                <CustomIcon src={appIcons?.bottomArrow} size={size?.tiny} disabled={true} />
                                            </Animated.View>
                                        </TouchableOpacity>

                                        <Animated.View style={[styles.packageContainer, { height: animatedHeights[index] }]}>
                                            <View style={{ marginTop: height * 0.025, paddingHorizontal: 20 }}>

                                                <View style={{ flexDirection: 'row', gap: width * 0.08 }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <View style={styles?.iconContainer}>
                                                            <FastImage
                                                                source={appIcons?.location1}
                                                                style={{ width: '55%', height: '55%' }}
                                                                resizeMode="contain"
                                                            />
                                                        </View>
                                                        <View style={{ flexDirection: 'column', height: height * 0.06, borderLeftWidth: 1, borderStyle: 'dashed', width: 0, borderColor: '#F55342' }} />
                                                        <View style={styles?.iconContainer}>
                                                            <FastImage
                                                                source={appIcons?.location2}
                                                                style={{ width: '50%', height: '50%' }}
                                                                resizeMode="contain"
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={{ gap: height * 0.065 }}>
                                                        <View style={{ gap: height * 0.0065, marginTop: -10 }}>
                                                            <CustomText text={'PICK UP'} font={family?.Gilroy_Regular} size={size?.h6} color={'#576C7E'} />
                                                            <CustomText
                                                                text={pkg?.pickupLocation}
                                                                font={family?.Gilroy_SemiBold}
                                                                size={size?.xlarge}
                                                                color={colors?.headingText}
                                                            />
                                                        </View>
                                                        <View style={{ gap: height * 0.0065 }}>
                                                            <CustomText text={'DROP OFF'} font={family?.Gilroy_Regular} size={size?.h6} color={'#576C7E'} />
                                                            <CustomText
                                                                text={pkg?.deliveryLocation}
                                                                font={family?.Gilroy_SemiBold}
                                                                size={size?.xlarge}
                                                                color={colors?.headingText}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Animated.View>
                                    </>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </AppBackground>
    );
};

export default Delivery;
