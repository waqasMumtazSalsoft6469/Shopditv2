import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import {family, size, vh, vw} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import {
  useFetchNotificationsQuery,
  useSetNotificationAsReadMutation,
} from '../../../Api/notificationsApiSlice';
import {
  formatDateShort,
  formatDateYear,
  formattedTime,
} from '../../../utils/helperFunction';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  decrementNotificationCount,
  setNotificationCount,
} from '../../../redux/actions/notificationsActions';
import {executeApiRequest} from '../../../Api/methods/method';
import {useSetActiveMutation} from '../../../Api/locationApiSlice';
import PaginatedList from '../../../Api/Pagination/List';
const {width, height} = Dimensions.get('screen');
const Notification = () => {
  const ref = useRef(null);
  const {data, isLoading, error, refetch} = useFetchNotificationsQuery();
  const [setNotificationAsRead, {isLoading: activeLoading}] =
    useSetNotificationAsReadMutation();

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data?.unreadCount >= 0) {
      dispatch(setNotificationCount(data?.data?.unreadCount));
    }
  }, [data, dispatch]);

  const notificationData = data?.data?.notifications;

  const [notifications, setNotifications] = useState([]);

  // jab bhi API se new data aaye → state update
  useEffect(() => {
    if (notificationData?.docs) {
      setNotifications(notificationData.docs);
    }
  }, [notificationData]);

  const handleToggleNotification = async (id, index) => {
    const response = await executeApiRequest({
      apiCallFunction: setNotificationAsRead,
      params: {id},
      toast: true,
      timeout: 30000,
    });

    if (response?.success) {
      dispatch(decrementNotificationCount());
      setNotifications(prev =>
        prev.map((notif, i) =>
          i === index ? {...notif, isRead: true} : notif,
        ),
      );
    }
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    // LOG('Job Item: ', item),
    <View style={{marginTop: height * 0.01, padding: 5}}>
      <View
        style={{
          gap: 2,
          padding: 20,
          backgroundColor: colors?.white,
          justifyContent: 'center',
          borderRadius: 15,
          ...Shadows?.shadow5,
          position: 'relative',
        }}>
        <CustomText
          text={item?.title}
          font={family?.Gilroy_SemiBold}
          size={size?.xxlarge}
          color={colors?.headingText}
          numberOfLines={2}
        />
        <CustomText
          text={item?.content}
          font={family?.Questrial_Regular}
          size={size?.xxlarge}
          color={colors?.headingText}
          numberOfLines={2}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: vw * 1,
            alignItems: 'center',
          }}>
          <CustomText
            text={formatDateYear(item?.createdAt)}
            font={family?.Questrial_Regular}
            size={size?.normal}
            color={colors?.secondary}
            numberOfLines={1}
          />
          <CustomText
            text={formattedTime(item?.createdAt)}
            font={family?.Questrial_Regular}
            size={size?.normal}
            color={colors?.secondary}
            numberOfLines={1}
          />
        </View>

        {item?.isRead ? (
          <View
            style={{
              backgroundColor: colors?.lightgray,
              paddingVertical: 4,
              paddingHorizontal: 7,
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: vh * 1,
              right: 10,
              borderRadius: 5,
            }}>
            <CustomText
              text={'Read'}
              font={family?.Questrial_Regular}
              size={size?.xsmall}
              color={colors?.black}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleToggleNotification(item?._id, index)}
            style={{
              backgroundColor: colors?.secondary,
              paddingVertical: 4,
              paddingHorizontal: 7,
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: vh * 1,
              right: 10,
              borderRadius: 5,
            }}>
            <CustomText
              text={'Mark As Read'}
              font={family?.Questrial_Regular}
              size={size?.xsmall}
              color={colors?.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <AppBackground back={true} title={'NOTIFICATIONS'}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}>
        <PaginatedList
          ref={ref}
          fetchData={useFetchNotificationsQuery}
          scrollEnabled={true}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          id="notifications"
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: height * 0.15,
            backgroundColor: colors?.white,
            paddingTop: vh * 1,
          }}
        />
      </View>
    </AppBackground>
  );
};

export default Notification;
