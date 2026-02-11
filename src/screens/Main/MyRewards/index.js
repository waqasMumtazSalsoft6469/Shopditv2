import {Alert, Dimensions, View} from 'react-native';
import React, {useEffect} from 'react';
import AppBackground from '../../../components/AppBackground';
import {colors} from '../../../utils/Colors';
import {vh} from '../../../utils';
import NavService from '../../../helpers/NavService';
import {useFetchUserOwnedRewardsQuery} from '../../../Api/rewardsApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {useIsFocused} from '@react-navigation/native';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import CustomCard from '../../../components/CustomCard';

const {width, height} = Dimensions.get('screen');

const MyRewards = () => {
  const isFocused = useIsFocused();
  const {data, isLoading, refetch} = useFetchUserOwnedRewardsQuery();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <CustomCard
      userRewardCard={true}
      item={item}
      onPress={() => {
        NavService.navigate('myRewardsDetail', {rewardDetails: item});
      }}
    />
  );

  return (
    <AppBackground
      back={true}
      notification
      // couponDetails
      title={'MY REWARDS'}>
      <View
        style={{
          // paddingHorizontal: 15,
          // paddingVertical: 15,
          marginTop: vh * 2,
          flex: 1,
        }}>
        {isLoading ? (
          <ActivityLoader />
        ) : data?.rewards?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={refetch}
            data={data?.rewards}
            renderItem={renderItem}
            keyExtractor={item => item?._id}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              //   paddingBottom: height * 0.15,
              backgroundColor: colors?.white,
              paddingTop: vh * 1,
              gap: vh * 1,
            }}
          />
        ) : (
          <PullToRefreshScrollView
            onRefresh={refetch}
            refreshingColor={colors2?.theme?.secondary}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
              // marginTop: vh * 3,
            }}>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading
                  ? 'Loading! Please Wait.'
                  : 'No Data Available. \n\n User Owned Rewards will appear here.'
              }
              height={height * 0.2}
            />
          </PullToRefreshScrollView>
        )}
      </View>
      {/* </View> */}
    </AppBackground>
  );
};

export default MyRewards;
