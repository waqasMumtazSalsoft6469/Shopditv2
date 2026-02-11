import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/Colors'
import CustomText from './CustomText'
import { family } from '../utils'

const CircularIcon = ({ size, src, onPress, backgroundColor, image, text , color, disabled= false}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onPress}
            style={[styles?.container, {
                width: size,
                height: size,
                backgroundColor : backgroundColor ? backgroundColor : colors?.white
            }]}>
            {image ?
                <Image
                    source={src}
                    style={{
                        width: '35%',
                        height: '35%',
                        resizeMode: 'contain',
                    }}
                />
                :
                <CustomText
                    text={text}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h3}
                    color={color}
                    numberOfLines={1}
                    style={{ textTransform: 'uppercase' }}
                />

            }

        </TouchableOpacity>
    )
}

export default CircularIcon

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: colors?.white,
        borderWidth: 1,
        borderColor: '#D9D9D9'
    }
})