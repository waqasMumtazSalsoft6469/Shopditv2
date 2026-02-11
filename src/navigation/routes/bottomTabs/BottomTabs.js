import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../screens/Main/Home/Home';
import Deals from '../../../screens/Main/Deals/Deals';
import Events from '../../../screens/Main/Events/Events';
import Jobs from '../../../screens/Main/Jobs/Jobs';
import Shop from '../../../screens/Main/Shop/Shop';
import TabBar from '../../../components/TabBar';
import CouponDetails from '../../../screens/Main/CouponDetails/CouponDetails';
import DealItems from '../../../screens/Main/DealItems/DealItems';
import DealItemDetails from '../../../screens/Main/DealItemDetails/DealItemDetails';

import {createStackNavigator} from '@react-navigation/stack';
import EventsDetail from '../../../screens/Main/EventsDetails/EventsDetail';
import EventBookTicket from '../../../screens/Main/EventBookTicket/EventBookTicket';
import EventCheckout from '../../../screens/Main/EventCheckout/EventCheckout';
import JobDetails from '../../../screens/Main/JobDetails/JobDetails';
import ShopDetails from '../../../screens/Main/ShopDetails/ShopDetails';
import ShopDetailsItems from '../../../screens/Main/ShopDetailsItems/ShopDetailsItems';
import ItemDetail from '../../../screens/Main/ShopItemDetailsData/ItemDetail';
import DishDetails from '../../../screens/Main/DishDetails/DishDetails';
import Payment from '../../../screens/Main/PaymentMethod/Payment';
import Delivery from '../../../screens/Main/Delivery/Delivery';
import Rewards from '../../../screens/Main/Rewards/Rewards';
import PointsHistory from '../../../screens/Main/PointsHistory/PointsHistory';
import BusinessPoints from '../../../screens/Main/BusinessPoints/BusinessPoints';
import ShopditPoints from '../../../screens/Main/ShopditPoints/ShopditPoints';
import {setCurrentTab, currentTab, previousTab} from '../../tabState/tabState';
import MyAdDetails from '../../../screens/Main/MyAdDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="tabBar4"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="tabBar4" component={Home} />
      <Stack.Screen name="CouponDetails" component={CouponDetails} />
    </Stack.Navigator>
  );
}
function JobStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Rewards" component={Rewards} />
      <Stack.Screen name="PointsHistory" component={PointsHistory} />
      <Stack.Screen name="businessPoints" component={BusinessPoints} />
      <Stack.Screen name="shopditPoints" component={ShopditPoints} />
      {/* <Stack.Screen name="Jobs" component={Jobs} /> */}
      {/* <Stack.Screen name="JobDetails" component={JobDetails} /> */}
    </Stack.Navigator>
  );
}
function DealStack() {
  return (
    <Stack.Navigator
      initialRouteName="Deals"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Deals" component={Deals} />
      <Stack.Screen name="DealItems" component={DealItems} />
      <Stack.Screen name="DealItemDetails" component={DealItemDetails} />
      {/* <Stack.Screen name="Payment" component={Payment} /> */}
    </Stack.Navigator>
  );
}
function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EventDetails" component={EventsDetail} />
      <Stack.Screen name="EventBookTicket" component={EventBookTicket} />
      <Stack.Screen name="EventCheckout" component={EventCheckout} />
    </Stack.Navigator>
  );
}
function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
      <Stack.Screen name="ShopDetailsItems" component={ShopDetailsItems} />
      {/* <Stack.Screen name="ItemDetail" component={ItemDetail} /> */}
      <Stack.Screen name="MyAdDetails" component={MyAdDetails} />
    </Stack.Navigator>
  );
}
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}
      initialRouteName="HomeStack"
      backBehavior="initialRoute"
      onStateChange={state => {
        if (!state) return;
        const tabIndex = state.index;
        const tabRouteName = state.routes[tabIndex].name;
        setCurrentTab(tabRouteName);
      }}>
      <Tab.Screen name="DealStack" component={DealStack} />
      <Tab.Screen name="EventStack" component={EventStack} />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{unmountOnBlur: false}}
      />
      <Tab.Screen name="JobStack" component={JobStack} />
      <Tab.Screen name="ShopStack" component={ShopStack} />
    </Tab.Navigator>
  );
};

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         animation: 'simple_push',
//         headerShown: false,
//       }}
//       tabBar={props => <TabBar {...props} />}
//       initialRouteName={'tabBar4'}>
//       <Tab.Screen name="Deals" component={Deals} />
//       <Tab.Screen name="Jobs" component={Jobs} />
//       <Tab.Screen name="tabBar4" component={Home} />
//       <Tab.Screen name="CouponDetails" component={CouponDetails} />
//       <Tab.Screen name="Events" component={Events} />
//       <Tab.Screen name="Shop" component={Shop} />
//     </Tab.Navigator>
//   );
// };
