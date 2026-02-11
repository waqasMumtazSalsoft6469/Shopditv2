import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';

import BottomSheet from '../../../components/BottomSheet';
import {LOG} from '../../../utils/helperFunction';

import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import CustomBox from '../../../components/CustomBox/CustomBox';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {useFetchMyOrdersQuery} from '../../../Api/orderApiSlice';

const {height} = Dimensions.get('screen');

const MyOrders = () => {
  const isFocused = useIsFocused();
  const {data, isLoading, error, refetch} = useFetchMyOrdersQuery();

  LOG('datata: ', data?.docs);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const flattenedOrders = (data?.docs || []).flatMap(order =>
    order.products.map(product => ({
      ...product,
      orderInfo: {
        _id: order._id,
        subTotal: order.subTotal,
        createdAt: order.createdAt,
        status: order.status,
        personName: order.personName,
      },
    })),
  );

  const renderItem = ({item}) => (
    <CustomBox
      disabled={true}
      item={item}
      OrderBox={true}
      onRefundPress={() => Alert.alert('Payment')}
    />
  );

  return (
    <AppBackground back={true} title={'My Orders'.toUpperCase()} notification>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
        }}>
        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
              data={flattenedOrders}
              renderItem={renderItem}
              keyExtractor={(item, index) => item._id + '_' + index}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: height * 0.01,
                paddingBottom: height * 0.1,
              }}
            />
            {/* <BottomSheet
              successfull={true}
              text={'SYSTEM MESSAGE'}
              description={'The ticket amount has been refunded successfully!'}
              ref={bottomSheetRef}
              OnYesPress={() => {
                bottomSheetRef.current.close();
              }}
            /> */}
          </>
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
    </AppBackground>
  );
};

export default MyOrders;
