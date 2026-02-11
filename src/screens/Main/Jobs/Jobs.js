import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {jobType} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';
import {useFetchNearbyJobsQuery} from '../../../Api/jobsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import PaginatedList from '../../../Api/Pagination/List';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const Jobs = () => {
  const isFocused = useIsFocused();
  const ref = useRef(null);
  const currentLocation = useSelector(state => state.auth.currentLocation);
  const [longitude, latitude] = currentLocation?.coordinates || [];
  const [searchText, setSearchText] = useState('');

  const renderItem = ({item}) => (
    // LOG('Job Item: ', item),
    <CustomCard
      jobCard={true}
      item={item}
      onPress={() => {
        NavService.navigate('JobDetails', {jobDetails: item});
      }}
    />
  );

  useEffect(() => {
    if (isFocused && ref.current) {
      LOG('Screen focused, triggering refetch');
      ref.current.refetch();
      LOG('ref data: ', ref.current.data);
    }
  }, [isFocused]);

  // const handleTypePress = () => {};

  return (
    <AppBackground back={true} title={'JOBS'} notification>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          flex: 1,
        }}>
        <SearchInput
          placeholder={'Search for Jobs Here...'}
          value={searchText}
          onChangeText={setSearchText}
        />
        {/* <HorizontalFlatList data={jobType} onItemPress={handleTypePress} /> */}
        <PaginatedList
          ref={ref}
          fetchData={useFetchNearbyJobsQuery}
          scrollEnabled={true}
          payload={{longitude, latitude}}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          id="jobs"
          preferredKey="featuredJobs"
          fallbackKey="fallbackJobs"
          searchText={searchText}
          searchFields={['category', 'subCategory']}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AppBackground>
  );
};

export default Jobs;
