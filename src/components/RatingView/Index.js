import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { family, size, vh, vw } from '../../utils'
import { appIcons } from '../../assets'
import CustomText from '../CustomText'
import { colors } from '../../utils/Colors'

const { width, height } = Dimensions.get('screen');
const RatingView = ({rating, style}) => {
    const maxRating = rating > 5.0 ? 5.0: rating;
    let starColor = '#FFF500'
    if(maxRating<=2.0){
        starColor=colors.Asterisk;
    }else{
        starColor='#FFF500';
    }
    return (
            <View style={[styles.container, style]}>
                <View style={{ width: width*0.03, height: width*0.03, alignItems: 'center' }}>
                <Image source={appIcons?.star} resizeMode='contain' style={{width: '100%', height: '100%'}} /> 
                </View>
                <CustomText text={maxRating} size={size?.large} font={family?.Gilroy_Medium} color={colors?.white} />
            </View>
    )
}

export default RatingView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: vh * 3,
        borderRadius: vh * 0.8,
        width: vw * 15,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        gap: vw*2
    },
})