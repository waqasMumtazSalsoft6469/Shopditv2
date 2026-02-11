import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import {appImages} from '../../../assets';
import FastImage from 'react-native-fast-image';
import {family, size, vh, vw} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import styles from './styles';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {useFetchPointsByUserQuery} from '../../../Api/rewardsApiSlice';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
const {width, height} = Dimensions.get('screen');

const BusinessPoints = () => {
  const {data, isLoading, refetch} = useFetchPointsByUserQuery();
  const businessPointsData = data?.data?.docs || [];

  LOG('DATAasa: ', businessPointsData);

  const renderItem = ({item}) => (
    <View
      style={[
        styles?.deliverDetails,
        {
          paddingHorizontal: 10,
          paddingVertical: 5,
          justifyContent: 'space-between',
        },
      ]}>
      <View
        style={styles?.dataContainer}>
        <View
          style={styles?.imageContainer}>
          <FastImage
            source={getImageUrl(item?.businessProfile?.image)}
            resizeMode="cover"
            style={{height: '100%', width: '100%'}}
          />
        </View>

        <View style={{width: '70%'}}>
          <CustomText
            text={`${item?.businessProfile?.businessName}`}
            font={family?.Gilroy_SemiBold}
            size={size?.xlarge}
            color={colors?.headingText}
            numberOfLines={2}
          />
        </View>
      </View>
      <CustomText
        text={`AVAILABLE POINTS: ${item?.points.toString()}`}
        font={family?.Gilroy_Medium}
        size={size?.small}
        color={colors?.secondary}
        numberOfLines={1}
        style={{textTransform: 'uppercase'}}
      />
    </View>
  );
  return (
    <AppBackground
      back={true}
      title={'Business points'.toUpperCase()}
      notification>
      <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: height * 0.03}}>
            {businessPointsData?.length > 0 ? (
              <PullToRefreshFlatList
                refetch={refetch}
                data={businessPointsData}
                scrollEnabled={false}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <View style={{height: vh * 1}} />}
                contentContainerStyle={{
                  paddingBottom: vh * 5,
                  paddingHorizontal: vw * 1,
                }}
              />
            ) : (
              <PullToRefreshScrollView
                onRefresh={refetch}
                refreshingColor={colors2?.theme?.secondary}
                contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
                {isLoading && (
                  <ActivityLoader color={colors2?.theme?.secondary} />
                )}
                <EmptyDataComponent
                  message={
                    isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
                  }
                />
              </PullToRefreshScrollView>
            )}
          </View>
        </ScrollView>
      </View>
    </AppBackground>
  );
};

export default BusinessPoints;
