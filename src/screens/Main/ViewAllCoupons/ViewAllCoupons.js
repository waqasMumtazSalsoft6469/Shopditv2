import React from 'react';
import {
  Dimensions,
  FlatList,
  View,
} from 'react-native';
import { colors } from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import { AllCouponData} from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';

const { width, height } = Dimensions.get('screen');
const ViewAllCoupons = () => {

  return (
    <AppBackground
      back={true}
      title={'COUPONS'}
      notification
      marginHorizontal={false}
    >
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: height * 0.13, backgroundColor: colors?.white, paddingTop: height * 0.025 }}
          showsVerticalScrollIndicator={false}
          data={AllCouponData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 15}} />}
          renderItem={({ item }) => (
            <CustomCard
              couponCard={true}
              item={item}
              heart={true}
              onPress={() => {
                 NavService.navigate('ViewCouponDetail', { couponDetail: item })
              }}
            />
          )}
        />
      </View>
    </AppBackground>
  )
}

export default ViewAllCoupons; 
