import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, ScrollView, Share, View} from 'react-native';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import CustomCard from '../../../components/CustomCard';
import {LOG} from '../../../utils/helperFunction';
import {vh} from '../../../utils';
import {useSelector} from 'react-redux';
import {useFetchAllEventsQuery} from '../../../Api/EventsApiSlice';
import {useIsFocused} from '@react-navigation/native';
import PaginatedList from '../../../Api/Pagination/List';
import {SearchInput} from '../../../components/CustomTextInput';

const {width, height} = Dimensions.get('screen');
const Events = () => {
  const isFocused = useIsFocused();
  const ref = useRef(null);

  const currentLocation = useSelector(state => state.auth.currentLocation);
  const [longitude, latitude] = currentLocation?.coordinates || [];
  const [searchText, setSearchText] = useState('');

  // Call API using actual coordinates
  const {data, isLoading, error, refetch} = useFetchAllEventsQuery({
    longitude: longitude?.toString(),
    latitude: latitude?.toString(),
  });

  const renderItem = ({item}) => (
    <CustomCard
      eventCard={true}
      item={item}
      onPress={() => {
        NavService.navigate('EventDetails', {eventDetails: item});
      }}
    />
  );

  useEffect(() => {
    if (isFocused && ref.current) {
      LOG('Screen focused, triggering refetch');
      ref.current.refetch();
    }
  }, [isFocused]);
  LOG('EVENTS DATAas: ', data);
  return (
    <AppBackground
      menu={true}
      title={'EVENTS'}
      notification
      marginHorizontal={false}>
      <View
        style={{
          marginTop: vh * 2,
          // paddingHorizontal: 10,
          paddingVertical: 15,
          flex: 1,
        }}>
        <SearchInput
          placeholder={'Search for Events Here...'}
          value={searchText}
          onChangeText={setSearchText}
        />
        <PaginatedList
          ref={ref}
          fetchData={useFetchAllEventsQuery}
          scrollEnabled={true}
          payload={{longitude, latitude}}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          id="events"
          preferredKey="prefferedEvents"
          fallbackKey="fallbackEvents"
          searchText={searchText}
          searchFields={['eventName']}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: height * 0.13,
          }}
        />
      </View>
    </AppBackground>
  );
};

export default Events;
