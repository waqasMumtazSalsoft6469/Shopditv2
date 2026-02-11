import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import CustomContainer from '../../../components/CustomContainer';
import AppBackground from '../../../components/AppBackground';
import {appIcons} from '../../../assets';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {family, size, vh} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import FastImage from 'react-native-fast-image';
import NavService from '../../../helpers/NavService';
import {
  useBuyRewardMutation,
  useFetchPointsByUserQuery,
  useFetchShopditPointsByUserQuery,
  useFetchUserRewardsQuery,
} from '../../../Api/rewardsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {useIsFocused} from '@react-navigation/native';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import CustomCard from '../../../components/CustomCard';
import {executeApiRequest} from '../../../Api/methods/method';

const {width, height} = Dimensions.get('screen');

const Rewards = () => {
  const isFocused = useIsFocused();
  const {data, isLoading, refetch} = useFetchUserRewardsQuery();

  const [buyReward, {isLoading: buyLoading}] = useBuyRewardMutation();

  const flattenedRewards = data?.rewards?.flatMap(business =>
    business.rewards.map(reward => ({
      ...reward,
      businessProfile: business.businessProfile,
    })),
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <CustomCard
      rewardCard={true}
      item={item}
      onRewardPress={handleRewardPress}
      onLoading={buyLoading}
    />
  );

  // Temp keyExtractor with fallback
  const keyExtractor = useCallback(
    item => item?._id || Math.random().toString(36).substr(2, 9),
    [],
  );

  const handleRewardPress = useCallback(
    async item => {
      // Now receives full item for businessName
      const id = item?._id;
      const businessName =
        item?.businessProfile?.businessName || 'this business';

      Alert.alert(
        'Are you sure?',
        `This reward will be bought using your business points for ${businessName}.`,
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              console.log('Reward id on Main Screen:', id);
              try {
                const response = await executeApiRequest({
                  apiCallFunction: buyReward,
                  params: {id: id},
                  toast: true,
                  timeout: 30000,
                });
                console.log('Buy Success:', response);
                refetch();
              } catch (error) {
                console.error('Buy Reward Error:', error);
              }
            },
          },
        ],
        {cancelable: false}, // Optional: Prevent dismiss on backdrop tap
      );
    },
    [buyReward, refetch], // Dependencies
  );

  return (
    <AppBackground
      menu={true}
      notification
      // couponDetails
      title={'REWARDS'}>
      <View
        style={{
          // paddingHorizontal: 15,
          // paddingVertical: 15,
          marginTop: 10,
          flex: 1,
        }}>
        {isLoading ? (
          <ActivityLoader />
        ) : flattenedRewards?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={refetch}
            data={flattenedRewards}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: height * 0.15,

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
                  : 'No Data Available. \n\n Rewards will appear here.'
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

export default Rewards;
