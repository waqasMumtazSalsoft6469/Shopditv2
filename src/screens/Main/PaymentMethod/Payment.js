import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppBackground from '../../../components/AppBackground'
import FastImage from 'react-native-fast-image'
import CustomText from '../../../components/CustomText'
import { family, size, vh, vw } from '../../../utils'
import { colors } from '../../../utils/Colors'
import styles from '../MyCart/styles';
import { paymentMethodData } from '../../../utils/dummyData'
import CustomRadioButton from '../../../components/CustomRadioButton'
import NavService from '../../../helpers/NavService'

const Payment = ({route}) => {
    const { dishItem, totalAmount } = route.params;
    console.log('pay',dishItem)
    console.log(totalAmount)
    const [cardType, setCardType] = useState('');
    return (
        <AppBackground
            back={true}
            title={'payment Method'.toUpperCase()}
            notification

        >
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, marginTop: 10 }}>
                <View style={{ gap: vh * 3 }}>
                    {paymentMethodData.map((item) => (
                        <TouchableOpacity activeOpacity={0.9} key={item.id} style={[styles?.deliverDetails, { paddingHorizontal: 3, paddingVertical: 5 }]}
                            onPress={() => {
                                setCardType(item?.type)
                                setTimeout(() => {
                                    if (item?.cardNumber) {
                                        NavService?.navigate('Checkout', {dishItem: dishItem, totalAmount: totalAmount})
                                        setCardType('')
                                    } else {
                                        NavService?.navigate('AddCardDetails',  {dishItem: dishItem, totalAmount: totalAmount})
                                        setCardType('')
                                    }
                                }, 750)
                            }}>
                            <View style={{ width: '75%', height: '100%', flexDirection: 'row', alignItems: 'center', gap: vw * 3 }}>
                                <View style={{ width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                    <FastImage
                                        source={item.icon}
                                        resizeMode='contain'
                                        style={{ height: '80%', width: '80%' }}
                                    />
                                </View>

                                <View>
                                    <CustomText
                                        text={item.type}
                                        font={family?.Questrial_Regular}
                                        size={size?.h6}
                                        color={colors?.placeholderText}
                                    />
                                    {item?.cardNumber &&

                                        <CustomText
                                            text={item.cardNumber}
                                            font={family?.Questrial_Regular}
                                            size={size?.xxlarge}
                                            color={colors?.placeholderText}
                                        />
                                    }
                                </View>
                            </View>
                            <CustomRadioButton
                                disabled={cardType === '' ? false : true}
                                key={item?.id}
                                selected={cardType === item?.type}
                                onPress={() => {
                                    setCardType(item?.type)
                                    setTimeout(() => {
                                        if (item?.cardNumber) {
                                            NavService?.navigate('Checkout', {dishItem: dishItem, totalAmount: totalAmount})
                                            setCardType('')
                                        } else {
                                            NavService?.navigate('AddCardDetails', {dishItem: dishItem, totalAmount: totalAmount})
                                            setCardType('')
                                        }
                                    }, 750)
                                }}
                                // label={size.label}
                                colors={colors}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </AppBackground>
    )
}

export default Payment
