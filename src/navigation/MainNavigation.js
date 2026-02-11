import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavService from '../helpers/NavService';
import AuthStack from './routes/AuthStack';
import MainStack from './routes/MainStack';

import { useSelector } from 'react-redux';
import { LOG } from '../utils/helperFunction';
import { connectSocket, disconnectSocket } from '../utils/Services/socketService';

const MainNavigation = () => {
  // const token = useSelector(state => state?.auth?.token);
  // LOG('Token-Parent', token);
  // const userDetails = useSelector(state => state?.auth?.user || {});
  // useEffect(() => {
  //   if (token && userDetails) {
  //     connectSocket(userDetails);
  //   } else {
  //     disconnectSocket();
  //   }
  // }, [token, userDetails]);

  return (
    <NavigationContainer ref={NavService.setTopLevelNavigator}>
      {/* {token ? ( */}
      <MainStack />
      {/* ) : ( */}
      {/* <AuthStack initialRoute={undefined} /> */}
      {/* )} */}
    </NavigationContainer>
  );
};

export default MainNavigation;
