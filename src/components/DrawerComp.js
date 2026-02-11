// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Linking,
//   Dimensions,
//   StyleSheet,
// } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { useNavigation } from '@react-navigation/native';
// import { appIcons, appImages } from '../assets';
// import { colors } from '../utils/Colors';
// import { family, size } from '../utils';
// import ProfileImage from './ProfileImage';
// import CustomIcon from './CustomIcon';
// import NavService from '../helpers/NavService';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   clearAuth,
//   clearCurrentLocation,
//   logoutUser,
//   setFavorites,
// } from '../redux/slices/authSlice';
// import { persistor } from '../redux/store';
// import { jobApi } from '../Api/jobsApiSlice';
// import { eventApi } from '../Api/EventsApiSlice';
// import { getImageUrl, LOG } from '../utils/helperFunction';
// import { couponApi } from '../Api/couponApiSlice';
// import { businessprofileApi } from '../Api/businessApiSlice';
// import { orderApi } from '../Api/orderApiSlice';
// import { rewardsApi } from '../Api/rewardsApiSlice';
// import { clearCart } from '../redux/slices/cartSlice';
// import { adsApi } from '../Api/adsApiSlice';

// const { height, width } = Dimensions.get('screen');

// const menuItems = [
//   //Edit Profile
//   {
//     icon: appIcons?.gender,
//     title: 'EDIT PROFILE',
//     nav: 'editProfile',
//     border: '#0FAAFA',
//   },
//   //Change Password
//   {
//     icon: appIcons?.lock,
//     title: 'CHANGE PASSWORD',
//     nav: 'changePassword',
//     border: '#FDA864',
//   },
//   // Favorites
//   {
//     icon: appIcons?.heart,
//     title: 'MY favorite COUPONS'.toUpperCase(),
//     nav: 'coupons',
//     border: '#25E750',
//   },
//   // {
//   //   icon: appIcons?.coupon,
//   //   title: 'MY favorite COUPONS'.toUpperCase(),
//   //   nav: 'coupons',
//   //   border: '#9747FF',
//   // },
//   {
//     icon: appIcons?.myads,
//     title: 'MY ADS',
//     nav: 'myads',
//     border: '#4750FF',
//   },
//   {
//     icon: appIcons?.delivery3,
//     title: 'DELIVERY',
//     nav: 'delivery',
//     border: '#BD0109',
//   },
//   {
//     icon: appIcons?.campaignIcon,
//     title: 'Campaign'.toUpperCase(),
//     nav: 'campaign',
//     border: '#F5B936',
//   },
//   {
//     icon: appIcons?.event,
//     title: 'MY BOOKINGS',
//     nav: 'MyBookings',
//     tintColor: '#003585',
//     border: '#003585',
//   },
//   {
//     icon: appIcons?.myorders,
//     title: 'MY ORDERS',
//     nav: 'MyOrders',
//     tintColor: '#FF7971',
//     border: '#FF7971',
//   },
//   {
//     icon: appIcons?.rewards,
//     title: 'MY REWARDS',
//     nav: 'myRewards',
//     tintColor: '#76e2beff',
//     border: '#76e2beff',
//   },

//   {
//     icon: appIcons?.job,
//     title: 'jobs'.toUpperCase(),
//     nav: 'Jobs',
//     border: '#4099FF',
//     tintColor: '#4099FF',
//   },
//   {
//     icon: appIcons.wallet,
//     title: 'WALLET',
//     nav: 'wallet',
//     border: '#FF7940',
//   },
//   {
//     icon: appIcons.settings,
//     title: 'SETTINGS',
//     nav: 'settings',
//     border: '#FF388C',
//   },
//   // {
//   //   icon: appIcons.about,
//   //   title: 'ABOUT US',
//   //   nav: 'about',
//   //   border: '#0FDEFA',
//   // },
//   {
//     icon: appIcons.contact,
//     title: 'CONTACT US',
//     nav: 'contact',
//     border: '#654EF5',
//   },
//   // {
//   //   icon: appIcons.help,
//   //   title: 'HELP CENTER',
//   //   nav: 'help',
//   //   border: '#D9DD00',
//   // },
//   // {
//   //   icon: appIcons.privacy,
//   //   title: 'PRIVACY POLICY',
//   //   nav: 'privacy',
//   //   border: '#FF7971',
//   // },
//   {
//     icon: appIcons.terms,
//     title: 'TERMS OF USE',
//     nav: 'terms',
//     border: '#FA9C0F',
//   },
//   {
//     icon: appIcons.logoutBtn,
//     title: 'LOGOUT',
//     nav: '',
//     border: '#EF314C',
//   },
// ];

// const DrawerComp = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const token = useSelector(state => state?.auth?.token);
//   const userDetails = useSelector(state => state?.auth?.user || {});
//   let fullName = userDetails?.fullName;
//   let profileImage = getImageUrl(userDetails?.image);
//   let email = userDetails?.email;

//   const renderItem = ({ item, index }) => {
//     const { title, icon, nav } = item;
//     const handlePress = () => {
//       if (title === 'LOGOUT') {
//         setTimeout(async () => {
//           dispatch(clearAuth());

//           // Optionally reset other APIs
//           dispatch(jobApi.util.resetApiState());
//           dispatch(eventApi.util.resetApiState());
//           dispatch(couponApi.util.resetApiState());
//           dispatch(businessprofileApi.util.resetApiState());
//           dispatch(orderApi.util.resetApiState());
//           dispatch(rewardsApi.util.resetApiState());
//           dispatch(adsApi.util.resetApiState());
//           dispatch(clearCurrentLocation());

//           await persistor.purge();

//           // Rehydrate favorites into auth again
//         }, 550);
//       } else if (item?.browser) {
//         Linking.openURL(item?.browser);
//       } else {
//         navigation.navigate(nav);
//       }
//     };

//     return (
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={handlePress}
//         style={[styles.menuItem, !(index === menuItems.length - 1)]}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 5,
//           }}>
//           <View
//             style={{
//               padding: 15,
//               borderRadius: 50,
//               borderWidth: 1.5,
//               borderColor: item?.border,
//             }}>
//             <Image
//               source={icon}
//               style={{
//                 width: 25,
//                 height: 25,
//                 resizeMode: 'contain',
//                 tintColor: item?.tintColor,
//               }}
//             />
//           </View>
//           <Text style={styles.menuItemText}>{title}</Text>
//         </View>
//         <CustomIcon
//           src={appIcons.rightArrow}
//           size={14}
//           tintColor={colors.description}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[styles.container, { paddingTop: getStatusBarHeight() }]}>
//       <View
//         style={{
//           height: 35,
//           width: 35,
//           paddingHorizontal: 20,
//           justifyContent: 'center',
//         }}>
//         <CustomIcon
//           src={appIcons.back}
//           size={30}
//           tintColor={colors.black}
//           onPress={NavService?.closeDrawer}
//         />
//       </View>

//       <View style={styles.header}>
//         <ProfileImage
//           size={'100%'}
//           innerAsset={!userDetails?.image}
//           imageUri={
//             userDetails?.image
//               ? getImageUrl(userDetails.image) // remote image
//               : appImages.placeholder // must be a require('...') asset
//           }
//           style={{ borderWidth: 2, borderColor: colors.white }}
//         />

//         <View>
//           <Text style={styles?.profileName}>{fullName ?? 'Mark Carson'}</Text>

//           <Text style={styles?.profileEmail}>
//             {email ?? 'mark.carson@gmail.com'}
//           </Text>
//         </View>
//       </View>
//       <View style={{ flex: 1, marginTop: 10 }}>
//         <FlatList
//           bounces={false}
//           showsVerticalScrollIndicator={false}
//           data={menuItems}
//           style={{ paddingHorizontal: 20 }}
//           renderItem={renderItem}
//         />
//       </View>
//     </View>
//   );
// };

// export default DrawerComp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors?.white,
//     borderTopRightRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   header: {
//     marginTop: height * 0.02,
//     width: '100%',
//     alignItems: 'center',
//     paddingBottom: 30,
//   },
//   profileName: {
//     color: colors?.black,
//     fontSize: size.h6,
//     fontFamily: family?.Gilroy_SemiBold,
//     textAlign: 'center',
//   },
//   profileEmail: {
//     color: colors.black,
//     fontSize: size.xxlarge,
//     fontFamily: family?.Questrial_Regular,
//     marginLeft: 10,
//     textAlign: 'center',
//   },
//   menuItem: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 18,
//     justifyContent: 'space-between',
//     paddingBottom: 10,
//   },
//   menuItemText: {
//     marginLeft: 10,
//     color: colors?.drawerItem,
//     fontSize: size?.large,
//     fontFamily: family?.Gilroy_Regular,
//   },
//   borderBottom: {
//     borderBottomWidth: 0.3,
//     borderColor: colors?.black,
//   },
// });


import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { appIcons, appImages } from '../assets';
import { colors } from '../utils/Colors';
import { family, size } from '../utils';
import ProfileImage from './ProfileImage';
import CustomIcon from './CustomIcon';
import NavService from '../helpers/NavService';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAuth,
  clearCurrentLocation,
} from '../redux/slices/authSlice';
import { persistor } from '../redux/store';
import { jobApi } from '../Api/jobsApiSlice';
import { eventApi } from '../Api/EventsApiSlice';
import { couponApi } from '../Api/couponApiSlice';
import { businessprofileApi } from '../Api/businessApiSlice';
import { orderApi } from '../Api/orderApiSlice';
import { rewardsApi } from '../Api/rewardsApiSlice';
import { adsApi } from '../Api/adsApiSlice';
import { getImageUrl } from '../utils/helperFunction';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('screen');

/* =======================
   MENU CONFIG (UNCHANGED)
======================= */

const menuItems = [
  {
    icon: appIcons?.gender,
    title: 'EDIT PROFILE',
    nav: 'editProfile',
    border: '#0FAAFA',
  },
  {
    icon: appIcons?.lock,
    title: 'CHANGE PASSWORD',
    nav: 'changePassword',
    border: '#FDA864',
  },
  {
    icon: appIcons?.heart,
    title: 'MY favorite COUPONS'.toUpperCase(),
    nav: 'coupons',
    border: '#25E750',
  },
  {
    icon: appIcons?.myads,
    title: 'MY ADS',
    nav: 'myads',
    border: '#4750FF',
  },
  {
    icon: appIcons?.delivery3,
    title: 'DELIVERY',
    nav: 'delivery',
    border: '#BD0109',
  },
  {
    icon: appIcons?.campaignIcon,
    title: 'CAMPAIGN',
    nav: 'campaign',
    border: '#F5B936',
  },
  {
    icon: appIcons?.event,
    title: 'MY BOOKINGS',
    nav: 'MyBookings',
    tintColor: '#003585',
    border: '#003585',
  },
  {
    icon: appIcons?.myorders,
    title: 'MY ORDERS',
    nav: 'MyOrders',
    tintColor: '#FF7971',
    border: '#FF7971',
  },
  {
    icon: appIcons?.rewards,
    title: 'MY REWARDS',
    nav: 'myRewards',
    tintColor: '#76e2beff',
    border: '#76e2beff',
  },
  {
    icon: appIcons?.job,
    title: 'JOBS',
    nav: 'Jobs',
    border: '#4099FF',
    tintColor: '#4099FF',
  },
  {
    icon: appIcons.wallet,
    title: 'WALLET',
    nav: 'wallet',
    border: '#FF7940',
  },
  {
    icon: appIcons.settings,
    title: 'SETTINGS',
    nav: 'settings',
    border: '#FF388C',
  },
  {
    icon: appIcons.contact,
    title: 'CONTACT US',
    nav: 'contact',
    border: '#654EF5',
  },
  {
    icon: appIcons.terms,
    title: 'TERMS OF USE',
    nav: 'terms',
    border: '#FA9C0F',
  },
  {
    icon: appIcons.logoutBtn,
    title: 'LOGOUT',
    nav: '',
    border: '#EF314C',
  },
];

const guestMenuItems = [
  {
    icon: appIcons?.gender,
    title: 'LOGIN / SIGN UP',
    nav: 'login',
    border: '#0FAAFA',
  },
  {
    icon: appIcons?.terms,
    title: 'TERMS OF USE',
    nav: 'terms',
    border: '#FA9C0F',
  },
  {
    icon: appIcons?.job,
    title: 'JOBS',
    nav: 'Jobs',
    border: '#4099FF',
    tintColor: '#4099FF',
  },
];

/* =======================
   COMPONENT
======================= */

const DrawerComp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector(state => state?.auth?.token);
  const userDetails = useSelector(state => state?.auth?.user || {});

  const isGuest = !token;
  const drawerData = isGuest ? guestMenuItems : menuItems;

  const fullName = isGuest ? 'Guest User' : userDetails?.fullName;
  const email = isGuest ? '' : userDetails?.email;
  const insets = useSafeAreaInsets();

  const profileImage = isGuest
    ? appImages.placeholder
    : userDetails?.image
      ? getImageUrl(userDetails.image)
      : appImages.placeholder;

  const renderItem = ({ item }) => {
    const handlePress = () => {
      if (item.title === 'LOGOUT' && token) {
        setTimeout(async () => {
          dispatch(clearAuth());

          dispatch(jobApi.util.resetApiState());
          dispatch(eventApi.util.resetApiState());
          dispatch(couponApi.util.resetApiState());
          dispatch(businessprofileApi.util.resetApiState());
          dispatch(orderApi.util.resetApiState());
          dispatch(rewardsApi.util.resetApiState());
          dispatch(adsApi.util.resetApiState());
          dispatch(clearCurrentLocation());

          await persistor.purge();
        }, 500);
      } else {
        navigation.navigate(item.nav);
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={styles.menuItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View
            style={{
              padding: 15,
              borderRadius: 50,
              borderWidth: 1.5,
              borderColor: item.border,
            }}>
            <Image
              source={item.icon}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                tintColor: item?.tintColor, // ✅ COLOR FIX
              }}
            />
          </View>

          <Text style={styles.menuItemText}>{item.title}</Text>
        </View>

        <CustomIcon
          src={appIcons.rightArrow}
          size={14}
          tintColor={colors.description}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top * 1 : getStatusBarHeight() }]}>
      <View style={{ height: 35, paddingHorizontal: 20, justifyContent: 'center' }}>
        <CustomIcon
          src={appIcons.back}
          size={30}
          tintColor={colors.black}
          onPress={NavService.closeDrawer}
        />
      </View>

      {/* PROFILE HEADER */}
      <View style={styles.header}>
        <ProfileImage
          size="100%"
          innerAsset
          imageUri={profileImage}
          style={{ borderWidth: 2, borderColor: colors.white }}
        />

        <Text style={styles.profileName}>{fullName}</Text>

        {!!email && (
          <Text style={styles.profileEmail}>{email}</Text>
        )}
      </View>

      {/* MENU LIST */}
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={drawerData}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default DrawerComp;

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    marginTop: height * 0.02,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  profileName: {
    color: colors.black,
    fontSize: size.h6,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
  },
  profileEmail: {
    color: colors.black,
    fontSize: size.xxlarge,
    fontFamily: family.Questrial_Regular,
    textAlign: 'center',
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  menuItemText: {
    marginLeft: 10,
    color: colors.drawerItem,
    fontSize: size.large,
    fontFamily: family.Gilroy_Regular,
  },
});
