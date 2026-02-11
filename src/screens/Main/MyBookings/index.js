import {Alert, Dimensions, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppBackground from '../../../components/AppBackground';
import {LOG} from '../../../utils/helperFunction';
import {useIsFocused} from '@react-navigation/native';
import CustomBox from '../../../components/CustomBox/CustomBox';
import {useFetchMyBookingsQuery} from '../../../Api/EventsApiSlice';
import PaginatedList from '../../../Api/Pagination/List';

const {height} = Dimensions.get('screen');

const MyBookings = () => {
  const isFocused = useIsFocused();
  const ref = useRef(null);

  useEffect(() => {
    if (isFocused && ref.current) {
      LOG('Screen focused, triggering refetch');
      ref.current.refetch();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <CustomBox
      disabled={true}
      item={item}
      ticketBox={true}
      onRefundPress={() => Alert.alert('Payment')}
    />
  );

  return (
    <AppBackground back={true} title={'My Bookings'.toUpperCase()} notification>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
        }}>
        <PaginatedList
          ref={ref}
          fetchData={useFetchMyBookingsQuery}
          scrollEnabled={true}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: height * 0.01,
          }}
        />
      </View>
    </AppBackground>
  );
};

export default MyBookings;
