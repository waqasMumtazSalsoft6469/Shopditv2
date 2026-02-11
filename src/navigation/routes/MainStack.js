// @app
import React from 'react';

// drawerComponentt
import DrawerStack from './drawer/DrawerStack';
import Home from '../../screens/Main/Home/Home';
import Deals from '../../screens/Main/Deals/Deals';
import Events from '../../screens/Main/Events/Events';
import Jobs from '../../screens/Main/Jobs/Jobs';
import Shop from '../../screens/Main/Shop/Shop';
import { createStackNavigator } from '@react-navigation/stack';
import Edit from '../../screens/Main/EditProfile/Edit';
import Change from '../../screens/Main/ChangePassword/Change';

import Coupon from '../../screens/Main/MyCoupons/Coupon';
import Wallet from '../../screens/Main/Wallet/Wallet';
import Settings from '../../screens/Main/Settings/Settings';
import About from '../../screens/Main/AboutUs/About';
import Contact from '../../screens/Main/ContactUs/Contact';
import Help from '../../screens/Main/HelpCenter/Help';
import Terms from '../../screens/Main/Terms/Terms';
import Privacy from '../../screens/Main/Privacy/Privacy';
import CouponDetails from '../../screens/Main/CouponDetails/CouponDetails';
import DealItems from '../../screens/Main/DealItems/DealItems';
import MyCoupon from '../../screens/Main/MyCoupons/Coupon';
import MyCouponDetails from '../../screens/Main/MyCouponDetails/MyCouponDetails';
import DealItemDetails from '../../screens/Main/DealItemDetails/DealItemDetails';
import EventsDetail from '../../screens/Main/EventsDetails/EventsDetail';
import EventBookTicket from '../../screens/Main/EventBookTicket/EventBookTicket';
import EventCheckout from '../../screens/Main/EventCheckout/EventCheckout';
import JobDetails from '../../screens/Main/JobDetails/JobDetails';
import ViewAllCoupons from '../../screens/Main/ViewAllCoupons/ViewAllCoupons';
import Details from '../../screens/Main/ViewAllCouponDetails/Details';
import Notification from '../../screens/Main/Notifications/Notification';
import ShopDetails from '../../screens/Main/ShopDetails/ShopDetails';
import ShopDetailsItems from '../../screens/Main/ShopDetailsItems/ShopDetailsItems';
import ItemDetail from '../../screens/Main/ShopItemDetailsData/ItemDetail';
import DishDetails from '../../screens/Main/DishDetails/DishDetails';
import MyCart from '../../screens/Main/MyCart/MyCart';
import Checkout from '../../screens/Main/Checkout/Checkout';
import Flipp from '../../screens/Main/Flipp/Flipp';
import Payment from '../../screens/Main/PaymentMethod/Payment';
import AddCardDetails from '../../screens/Main/AddCardDetails/AddCardDetails';
import Delivery from '../../screens/Main/Delivery/Delivery';
import MyAds from '../../screens/Main/MyAds/MyAds';
import MyAdsItems from '../../screens/Main/MyAdsItems/MyAdsItems';
import AddAd from '../../screens/Main/AddAd/AddAd';
import MyBookings from '../../screens/Main/MyBookings';
import SubmitJobApplication from '../../screens/Main/SubmitJobApplication';
import MyOrders from '../../screens/Main/MyOrders';
import MyAdDetails from '../../screens/Main/MyAdDetails';
import EditAd from '../../screens/Main/EditAd';
import PreferencesStepTwo from '../../screens/Main/Preferences/PreferencesTwo';
import Preferences from '../../screens/Main/Preferences/Preferences';
import Campaign from '../../screens/Main/Campaigns';
import PointsHistory from '../../screens/Main/PointsHistory/PointsHistory';
import BusinessPoints from '../../screens/Main/BusinessPoints/BusinessPoints';
import ShopditPoints from '../../screens/Main/ShopditPoints/ShopditPoints';
import MyRewards from '../../screens/Main/MyRewards';
import MyRewardDetails from '../../screens/Main/MyRewardsDetail';
import Login from '../../screens/Auth/Login/Login';
import SignUp from '../../screens/Auth/Signup/SignUp';
import ForgetPassword from '../../screens/Auth/ForgetPassword/ForgetPassword';
import OTPInput from '../../screens/Auth/OTPInput/OTPInput';
import ChangePassword from '../../screens/Auth/ChangePassword/ChangePassword';
import AuthPreference from '../../screens/Auth/Preferences/AuthPreference';
import AuthPreferencesTwo from '../../screens/Auth/Preferences/AuthPreferencesTwo';

const Stack = createStackNavigator();
const MainStack = ({ initialRoute }) => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerStack"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
      <Stack.Screen name="tabBar4" component={Home} />
      <Stack.Screen name="CouponDetails" component={CouponDetails} />
      <Stack.Screen name="Deals" component={Deals} />
      <Stack.Screen name="DealItems" component={DealItems} />
      <Stack.Screen name="DealItemDetails" component={DealItemDetails} />
      <Stack.Screen name="DishDetails" component={DishDetails} />
      <Stack.Screen name="MyCart" component={MyCart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ViewAllCoupons" component={ViewAllCoupons} />
      <Stack.Screen name="ViewCouponDetail" component={Details} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EventDetails" component={EventsDetail} />
      <Stack.Screen name="EventBookTicket" component={EventBookTicket} />
      <Stack.Screen name="EventCheckout" component={EventCheckout} />
      <Stack.Screen name="MyBookings" component={MyBookings} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="SubmitApplication" component={SubmitJobApplication} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
      <Stack.Screen name="ShopDetailsItems" component={ShopDetailsItems} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Flipp" component={Flipp} />
      <Stack.Screen name="AddCardDetails" component={AddCardDetails} />
      <Stack.Screen name="PointsHistory" component={PointsHistory} />
      <Stack.Screen name="businessPoints" component={BusinessPoints} />
      <Stack.Screen name="shopditPoints" component={ShopditPoints} />
      <Stack.Screen name="myRewards" component={MyRewards} />
      <Stack.Screen name="myRewardsDetail" component={MyRewardDetails} />

      {/* Drawer Screens */}
      <Stack.Screen name="editProfile" component={Edit} />
      <Stack.Screen name="preferences" component={Preferences} />
      <Stack.Screen name="preferencesTwo" component={PreferencesStepTwo} />
      <Stack.Screen name="changePassword" component={Change} />
      <Stack.Screen name="delivery" component={Delivery} />
      <Stack.Screen name="campaign" component={Campaign} />
      <Stack.Screen name="myads" component={MyAds} />
      <Stack.Screen name="addad" component={AddAd} />
      <Stack.Screen name="MyAdDetails" component={MyAdDetails} />
      <Stack.Screen name="editad" component={EditAd} />
      <Stack.Screen name="myadsitems" component={MyAdsItems} />
      <Stack.Screen name="coupons" component={MyCoupon} />
      <Stack.Screen name="MyCouponDetails" component={MyCouponDetails} />
      <Stack.Screen name="wallet" component={Wallet} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="help" component={Help} />
      <Stack.Screen name="privacy" component={Privacy} />
      <Stack.Screen name="terms" component={Terms} />

      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="authpreferences" component={AuthPreference} />
      <Stack.Screen name="authpreferencesTwo" component={AuthPreferencesTwo} />
      <Stack.Screen name="forget" component={ForgetPassword} />
      <Stack.Screen name="otp" component={OTPInput} />
      <Stack.Screen name="change" component={ChangePassword} />
    </Stack.Navigator>
  );
};
export default MainStack;
