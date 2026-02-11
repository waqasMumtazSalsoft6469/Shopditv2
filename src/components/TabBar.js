// import React from 'react';
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   Platform,
// } from 'react-native';
// import { colors } from '../utils/Colors';
// import { appIcons, appImages } from '../assets';
// import CustomText from './CustomText';
// import { size } from '../utils';
// import { CommonActions } from '@react-navigation/native';

// const { width } = Dimensions.get('screen');
// const isAndroid = Platform.OS === 'android';

// class TabBar extends React.Component {
//   state = {
//     isVisible: false,
//   };
//   render() {
//     const { state, navigation } = this.props;

//     const onPress = (routeName) => {
//       navigation.navigate(routeName);
//     };

//     const resetAndNavigate = (routeName) => {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: routeName }],
//         })
//       );
//     };
//     return (
//       <ImageBackground
//         style={{ position: 'absolute', width: '100%', bottom: isAndroid ? -12 : 0 }}
//          source={appImages?.tabBar}
//         resizeMode="stretch"
//         imageStyle={styles?.tabbarContainer}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             gap: 10,
//           }}>
//           {state.routes.map((route, index) => {
//             const isFocused = state.index === index;

//             let imageSrc = appIcons.homeUnSelected;
//             let tabLabel = 'Home';
//             if (route.name === 'DealStack') {
//               imageSrc = appIcons.deal;
//               tabLabel = 'Deals';

//             } else if (route.name === 'EventStack') {
//               imageSrc = appIcons.event;
//               tabLabel = 'Events';
//             } else if (route.name === 'JobStack') {
//               imageSrc = appIcons.rewards2;
//               tabLabel = 'Rewards';
//             } else if (route.name === 'ShopStack') {
//               imageSrc = appIcons.shop;
//               tabLabel = 'Shop';
//             }
//             if (route.name === 'HomeStack') {
//               return (
//                 <TouchableOpacity
//                   key={index}
//                   activeOpacity={1}
//                   onPress={() => onPress(route.name)}
//                   style={{
//                     backgroundColor: isFocused
//                       ? colors?.secondary
//                       : colors?.unselectedHome,
//                     borderRadius: 100,
//                     height: 70,
//                     width: 70,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     top: -56,
//                   }}>
//                   <Image
//                     source={appIcons?.home}
//                     style={{
//                       height: 30,
//                       width: 30,
//                       tintColor: isFocused ? colors.white : colors.primary,
//                     }}
//                     resizeMode="contain"
//                   />
//                 </TouchableOpacity>
//               );
//             }
//             return (
//               <TouchableOpacity
//                 key={index}
//                 accessibilityState={isFocused ? { selected: true } : {}}
//                 accessibilityRole="button"
//                 activeOpacity={0.8}
//                 onPress={() => resetAndNavigate(route.name)}
//                 style={styles.tabs}>
//                 <Image
//                   source={imageSrc}
//                   style={{
//                     height: isAndroid ? 20 : 25,
//                     width: isAndroid ? 20 : 25,
//                     tintColor: isFocused
//                       ? colors.secondary
//                       : colors.unselectedTab,
//                   }}
//                   resizeMode="contain"
//                 />
//                 <CustomText
//                   text={tabLabel.toUpperCase()}
//                   size={size?.xxsmall}
//                   color={isFocused ? colors.secondary : colors.unselectedTab}
//                   style={{ marginTop: 4 }}
//                 />
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ImageBackground>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     backgroundColor: colors.white,
//     flex: 0.14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//   },
//   tabbarContainer: {},
//   buttonWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   buttonStyle: {
//     width: width * 0.4,
//     borderRadius: 10,
//   },
//   buttonPerfectionNext: {
//     backgroundColor: colors.secondary,
//     marginLeft: 15,
//   },
//   tabs: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//     marginBottom: 5,
//     height: 80,
//     borderRadius: 65,
//   },
//   tabCircle: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default TabBar;


import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import { colors } from '../utils/Colors';
import { appIcons, appImages } from '../assets';
import CustomText from './CustomText';
import { size } from '../utils';
import { CommonActions } from '@react-navigation/native';
import { showToast } from '../utils/toast';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('screen');
const isAndroid = Platform.OS === 'android';

class TabBarClass extends React.Component {
  handleTabPress = (routeName) => {
    const { navigation, token } = this.props;

    // Check token only for Rewards/JobStack
    if (routeName === 'JobStack' && !token) {
      showToast('You do not have a token.');
      return; // ❌ Do not navigate
    }

    // Default behavior: reset and navigate
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  };

  render() {
    const { state } = this.props;

    return (
      <ImageBackground
        style={{ position: 'absolute', width: '100%', bottom: isAndroid ? -12 : 0 }}
        source={appImages?.tabBar}
        resizeMode="stretch"
        imageStyle={styles?.tabbarContainer}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 10,
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            let imageSrc = appIcons.homeUnSelected;
            let tabLabel = 'Home';

            if (route.name === 'DealStack') {
              imageSrc = appIcons.deal;
              tabLabel = 'Deals';
            } else if (route.name === 'EventStack') {
              imageSrc = appIcons.event;
              tabLabel = 'Events';
            } else if (route.name === 'JobStack') {
              imageSrc = appIcons.rewards2;
              tabLabel = 'Rewards';
            } else if (route.name === 'ShopStack') {
              imageSrc = appIcons.shop;
              tabLabel = 'Shop';
            }

            if (route.name === 'HomeStack') {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => this.props.navigation.navigate(route.name)}
                  style={{
                    backgroundColor: isFocused ? colors?.secondary : colors?.unselectedHome,
                    borderRadius: 100,
                    height: 70,
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -56,
                  }}
                >
                  <Image
                    source={appIcons?.home}
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: isFocused ? colors.white : colors.primary,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={() => this.handleTabPress(route.name)}
                style={styles.tabs}
              >
                <Image
                  source={imageSrc}
                  style={{
                    height: isAndroid ? 20 : 25,
                    width: isAndroid ? 20 : 25,
                    tintColor: isFocused ? colors.secondary : colors.unselectedTab,
                  }}
                  resizeMode="contain"
                />
                <CustomText
                  text={tabLabel.toUpperCase()}
                  size={size?.xxsmall}
                  color={isFocused ? colors.secondary : colors.unselectedTab}
                  style={{ marginTop: 4 }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  tabbarContainer: {},
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: width * 0.4,
    borderRadius: 10,
  },
  buttonPerfectionNext: {
    backgroundColor: colors.secondary,
    marginLeft: 15,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 5,
    height: 80,
    borderRadius: 65,
  },
  tabCircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// 🔹 Functional wrapper to provide Redux token
const TabBar = (props) => {
  const token = useSelector((state) => state?.auth?.token);
  return <TabBarClass {...props} token={token} />;
};

export default TabBar;
