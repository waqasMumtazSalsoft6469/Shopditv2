import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';
import {useSelector} from 'react-redux';
import {useFetchNearbyBusinessesQuery} from '../../../Api/businessApiSlice';
import PaginatedList from '../../../Api/Pagination/List';

const {width, height} = Dimensions.get('screen');

const DealItems = ({route}) => {
  const ref = useRef(null);
  const {cardItem} = route.params;
  const formattedData = cardItem?.subCategories.map((item, index) => ({
    id: index,
    name: item,
  }));
  const currentLocation = useSelector(state => state.auth.currentLocation);
  const [longitude, latitude] = currentLocation?.coordinates || [];

  return (
    <AppBackground
      back={true}
      title={cardItem?.typeName.toUpperCase()}
      cart
      notification>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          marginBottom: height * 0.07,
          // alignItems: 'center',
          flex: 1,
        }}>
        <SearchInput placeholder={'Search for Coupons'} />

        {/* Horizontal FlatList for Types */}
        <HorizontalFlatList
          data={formattedData}
          onItemPress={selectedIds => console.log('Selected IDs:', selectedIds)}
        />

        <PaginatedList
          ref={ref}
          fetchData={useFetchNearbyBusinessesQuery}
          scrollEnabled={true}
          numColumns={2}
          preferredKey="preferredBusinesses"
          fallbackKey="fallbackBusinesses"
          payload={{typeName: cardItem?.typeName}}
          // payload={{longitude, latitude, typeName: cardItem?.typeName}}
          renderItem={({item, index}) => (
            <CustomCard
              product={true}
              heart={true}
              item={item}
              index={index}
              onPress={() => {
                //Deal item details
                NavService.navigate('DealItemDetails', {cardItem: item});
              }}
            />
          )}
          keyExtractor={item => item._id}
          // ItemSeparatorComponent={() => <View style={{height: 30}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 20,
            paddingBottom: height * 0.16,
            gap: 20,
          }}
        />
      </View>
    </AppBackground>
  );
};

export default DealItems;
