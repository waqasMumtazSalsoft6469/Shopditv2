import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {marketplaceData, restaurants} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';

const {width, height} = Dimensions.get('screen');

const Shop = () => {
  return (
    <AppBackground menu={true} title={'MARKETPLACE'} notification>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          marginBottom: height * 0.07,
        }}>
        <SearchInput placeholder={'Search...'} />
        <FlatList
          style={{marginTop: height * 0.01}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 20,
            paddingBottom: height * 0.1,
          }}
          showsVerticalScrollIndicator={false}
          data={marketplaceData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item, index}) => (
            <CustomCard
              shopCard={true}
              item={item}
              index={index}
              onPress={() => {
                NavService.navigate('ShopDetailsItems', {marketItem: item});
              }}
            />
          )}
          numColumns={2}
        />
      </View>
    </AppBackground>
  );
};

export default Shop;
