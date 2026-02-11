import React, {useRef} from 'react';
import {Alert, Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {AllCouponData, myAdData, type} from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';
import {SearchInput} from '../../../components/CustomTextInput';
import {family, size, vh} from '../../../utils';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';

const {width, height} = Dimensions.get('screen');

// export const carData = [
//   {id: '1', name: 'All'.toUpperCase(), type: 'Cars'},
//   {id: '2', name: 'Cars'.toUpperCase(), type: 'Cars'},
//   {id: '3', name: 'Spareparts'.toUpperCase(), type: 'Cars'},
//   {id: '4', name: 'Accessories'.toUpperCase(), type: 'Cars'},
// ];

// export const mobileData = [
//   {id: '1', name: 'All'.toUpperCase(), type: 'Mobile & Tablets'},
//   {id: '2', name: 'Mobiles'.toUpperCase(), type: 'Mobile & Tablets'},
//   {id: '3', name: 'Tablets'.toUpperCase(), type: 'Mobile & Tablets'},
//   {id: '4', name: 'Accessories'.toUpperCase(), type: 'Mobile & Tablets'},
// ];

// export const menFashionData = [
//   {id: '1', name: 'All'.toUpperCase(), type: 'Mens Fashion'},
//   {id: '2', name: 'T-Shirts'.toUpperCase(), type: 'Mens Fashion'},
//   {id: '3', name: 'Shirts'.toUpperCase(), type: 'Mens Fashion'},
//   {id: '4', name: 'Polos'.toUpperCase(), type: 'Mens Fashion'},
//   {id: '5', name: 'Jeans'.toUpperCase(), type: 'Mens Fashion'},
// ];

const MyAdsItems = ({route}) => {
  const {title, ads} = route?.params;
  console.log('title: ', title);
  console.log('ads: ', ads);

  const handleTypePress = id => {
    //filter as per item name
    // Handle the selection change as needed
  };

  let filteredData = [];
  // if (carDetails?.type === 'Cars') {
  //   filteredData = carData;
  // } else if (carDetails?.type === 'Mobile & Tablets') {
  //   filteredData = mobileData;
  // } else if (carDetails?.type === 'Mens Fashion') {
  //   filteredData = menFashionData;
  // }

  // const filteredAdData = myAdData.filter(
  //   item => item.type === carDetails?.type || carDetails?.type === 'All',
  // );

  return (
    <AppBackground back={true} title={title} notification>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          marginTop: 10,
        }}>
        <SearchInput placeholder={'Search For Cars Here...'} />
        {/* <View style={{width: '100%', alignItems: 'flex-start'}}>
          <HorizontalFlatList
            data={filteredData}
            onItemPress={handleTypePress}
          />
        </View> */}
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            paddingBottom: height * 0.15,
          }}
          showsVerticalScrollIndicator={false}
          data={ads}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          renderItem={({item}) => (
            <CustomCard
              myAdsDetailsCard={true}
              heart={false}
              item={item}
              onPress={() => {
                NavService.navigate('MyAdDetails', {carDetails: item});
              }}
            />
          )}
        />
      </View>
    </AppBackground>
  );
};

export default MyAdsItems;
