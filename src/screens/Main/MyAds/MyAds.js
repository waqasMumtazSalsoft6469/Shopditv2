import React, {useEffect, useRef} from 'react';
import {Alert, Dimensions, FlatList, View} from 'react-native';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {addData, AllCouponData, carData} from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';
import {SearchInput} from '../../../components/CustomTextInput';
import BottomSheet from '../../../components/BottomSheet';
import {
  useDeleteAdMutation,
  useDeleteCarMutation,
  useFetchMyAdsQuery,
  useFetchMyCarsQuery,
} from '../../../Api/adsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import {executeApiRequest} from '../../../Api/methods/method';

const {width, height} = Dimensions.get('screen');
const MyAds = ({route}) => {
  const {data, isLoading, error, refetch} = useFetchMyAdsQuery({});
  const {data: CarData, refetch: carRefetch} = useFetchMyCarsQuery({});
  const isFocused = useIsFocused();
  const selectedAdRef = useRef(null);
  const selectedAdCategoryRef = useRef(null);
  const bottomSheetRef = useRef();

  const [deleteAd] = useDeleteAdMutation();
  const [deleteCar] = useDeleteCarMutation();

  useEffect(() => {
    if (isFocused) {
      refetch();
      carRefetch();
    }
  }, [isFocused]);

  const ads = data?.data || [];
  const cars = CarData?.data || [];
  const mappedCars = cars.map(car => ({
    ...car,
    category: 'AUTOMOBILE',
  }));

  const combinedAds = [...ads, ...mappedCars];
  LOG('COMBINED ADS: ', combinedAds);

  // const groupedByCategory = combinedAds.reduce((acc, ad) => {
  //   const category = ad.category;
  //   if (!acc[category]) {
  //     acc[category] = [];
  //   }
  //   acc[category].push(ad);
  //   return acc;
  // }, {});

  // const uniqueCategoryList = Object.keys(groupedByCategory).map(category => ({
  //   category,
  //   ads: groupedByCategory[category],
  // }));

  // LOG('LIST: ', uniqueCategoryList);

  const handleDelete = async () => {
    const adToDelete = selectedAdRef.current;
    const adCategory = selectedAdCategoryRef.current;
    LOG('IDss: ', adToDelete);
    LOG('ID Category: ', adCategory);
    // if (!adToDelete) {
    //   Alert?.alert('Unable to Delete');
    //   bottomSheetRef?.current?.close();
    //   return;
    // }

    if (adCategory === 'AUTOMOBILE') {
      if (!adToDelete) {
        Alert?.alert('Unable to Delete');
        bottomSheetRef?.current?.close();
        return;
      }

      const response = await executeApiRequest({
        apiCallFunction: deleteCar,
        params: {
          id: adToDelete,
        },
        toast: true,
        timeout: 30000,
      });
      LOG('Delete Success:', response);
      if (response) {
        bottomSheetRef.current.close();
        selectedAdRef.current = null;
        selectedAdCategoryRef.current = null;
        refetch();
        carRefetch();
      }
    } else {
      const response = await executeApiRequest({
        apiCallFunction: deleteAd,
        params: {
          id: adToDelete,
        },
        toast: true,
        timeout: 30000,
      });
      LOG('Delete Success:', response);
      if (response) {
        bottomSheetRef.current.close();
        selectedAdRef.current = null;
        selectedAdCategoryRef.current = null;
        refetch();
        carRefetch();
      }
    }
  };

  return (
    <AppBackground
      back={true}
      title={'MY ADS'}
      notification
      add={true}
      AddPress={() => {
        NavService?.navigate('addad');
      }}>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, marginTop: 10}}>
        <SearchInput placeholder={'Search For Ads Here...'} />
        {combinedAds?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={refetch}
            style={{marginTop: height * 0.01}}
            contentContainerStyle={{
              justifyContent: 'center',
              paddingVertical: 20,
              paddingBottom: height * 0.18,
            }}
            showsVerticalScrollIndicator={false}
            data={combinedAds}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            renderItem={({item}) => (
              <CustomCard
                myAdsDetailsCard={true}
                onRemovePress={() => {
                  selectedAdRef.current = item?._id;
                  selectedAdCategoryRef.current = item?.category;
                  bottomSheetRef.current.open();
                }}
                item={item}
                onPress={() => {
                  NavService.navigate('MyAdDetails', {carDetails: item});
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

        <BottomSheet
          remove={true}
          text={'Are you sure you want to remove this event?'}
          ref={bottomSheetRef}
          OnNoPress={() => {
            Alert.alert('No Pressed');
            bottomSheetRef.current.close();
          }}
          OnYesPress={handleDelete}
        />
      </View>
    </AppBackground>
  );
};

export default MyAds;
