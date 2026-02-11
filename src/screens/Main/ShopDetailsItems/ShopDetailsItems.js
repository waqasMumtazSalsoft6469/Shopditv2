import React, {useRef} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {AllCouponData, carData} from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';
import {SearchInput} from '../../../components/CustomTextInput';
import BottomSheet from '../../../components/BottomSheet';
import {
  useFetchNearbyAdsQuery,
  useFetchNearbyCarsQuery,
} from '../../../Api/adsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';

const {width, height} = Dimensions.get('screen');
const ShopDetailsItems = ({route}) => {
  const bottomSheetRef = useRef();
  const {marketItem} = route.params;
  console.log('first', marketItem);

  const currentLocation = useSelector(state => state.auth.currentLocation);
  const [longitude, latitude] = currentLocation?.coordinates || [];

  const commonParams = {
    longitude: longitude?.toString(),
    latitude: latitude?.toString(),
    keyword: marketItem?.name,
  };

  const isAutomobile = marketItem?.name?.toUpperCase()?.includes('AUTOMOBILE');
  LOG('ITEM NAME: ', isAutomobile);

  const {
    data: nearbyData,
    isLoading,
    error,
    refetch,
  } = isAutomobile
    ? useFetchNearbyCarsQuery(commonParams)
    : useFetchNearbyAdsQuery(commonParams);

  LOG('DATA: ', nearbyData);

  return (
    <AppBackground
      back={true}
      title={marketItem?.name}
      notification
      filter={isAutomobile ? true : false}
      filterPress={() => {
        bottomSheetRef.current.open();
      }}>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, marginTop: 10}}>
        <SearchInput placeholder={'Search For Cars Here...'} />

        {nearbyData?.docs?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={refetch}
            style={{marginTop: height * 0.01}}
            contentContainerStyle={{
              justifyContent: 'center',
              paddingVertical: 20,
              paddingBottom: height * 0.18,
            }}
            showsVerticalScrollIndicator={false}
            data={nearbyData?.docs}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            renderItem={({item}) => (
              <CustomCard
                shopItemCard={true}
                // heart={true}
                item={item}
                onPress={() => {
                  NavService.navigate('MyAdDetails', {
                    carDetails: item,
                    showCall: true,
                  });
                }}
              />
            )}
          />
        ) : (
          <PullToRefreshScrollView
            onRefresh={refetch}
            refreshingColor={colors2?.theme?.secondary}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
              }
            />
          </PullToRefreshScrollView>
        )}
      </View>
      <BottomSheet
        carFilter={true}
        title={'FILTER BY CATEGORY'}
        ref={bottomSheetRef}
      />
    </AppBackground>
  );
};

export default ShopDetailsItems;
