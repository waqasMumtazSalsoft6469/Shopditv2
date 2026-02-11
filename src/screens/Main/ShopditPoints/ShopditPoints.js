import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import {appImages} from '../../../assets';
import FastImage from 'react-native-fast-image';
import {family, size, vh, vw} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import styles from './styles';
import CustomCard from '../../../components/CustomCard';
import {restaurants, shopditVouchers} from '../../../utils/dummyData';
const {width, height} = Dimensions.get('screen');

const ShopditPoints = ({route}) => {
  const item = route?.params || {};
  const pointData = item?.item;
  console.log('Item: ', item);
  return (
    <AppBackground
      back={true}
      title={'Shopdit points'.toUpperCase()}
      notification>
      <View
        style={{
          // paddingHorizontal: 15,
          marginTop: height * 0.03,

          flex: 1,
          alignItems: 'center',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            padding: 10,
          }}>
          <CustomCard walletCard={true} shopditExpiry item={pointData} />

          {/* <FlatList
            // style={{marginTop: height * 0.01}}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              //   paddingVertical: 20,
              paddingBottom: height * 0.16,
            }}
            showsVerticalScrollIndicator={false}
            data={shopditVouchers}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            renderItem={({item, index}) => (
              <CustomCard
                shopditVoucher={true}
                item={item}
                onPress={() => {
                  //Deal item details
                  //   NavService.navigate('DealItemDetails', {cardItem: item});
                }}
              />
            )}
            numColumns={2}
          /> */}
          <View style={{marginTop: vh * 3, gap: vh * 2}}>
            <CustomText
              text={'More Information: '}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.h5}
              numberOfLines={1}
            />
            <CustomText
              text={`Total Points Earned: ${pointData?.totalPointsEarned} `}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.xxlarge}
              numberOfLines={1}
            />
            <CustomText
              text={`Total Points Claimed: ${pointData?.totalPointsClaimed} `}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.xxlarge}
              numberOfLines={1}
            />
          </View>
        </ScrollView>
      </View>
    </AppBackground>
  );
};

export default ShopditPoints;
