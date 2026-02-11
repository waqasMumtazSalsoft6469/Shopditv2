import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {colors} from '../utils/Colors';
import {appIcons} from '../assets';
import CustomText from './CustomText';
import {size} from '../utils';

const {height} = Dimensions.get('screen');

// const HorizontalFlatList = ({ data, onItemPress }) => {
//     const [selectedItem, setSelectedItem] = useState(null);

//     const handleItemPress = (id) => {
//         if (selectedItem === id) {
//             setSelectedItem(null);
//             onItemPress(null);
//         } else {
//             setSelectedItem(id);
//             onItemPress(id);
//         }
//     };

//     return (
//         <FlatList
//             style={{ marginTop: height * 0.01, marginBottom: height * 0.01 }}
//             horizontal
//             data={data}
//             keyExtractor={(item) => item.id.toString()}
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => (
//                 <TouchableOpacity
//                     onPress={() => handleItemPress(item.id)}
//                     activeOpacity={0.8}
//                     style={{
//                         paddingHorizontal: 17,
//                         backgroundColor: selectedItem === item.id ? colors.iconColor : colors.placeholderText,
//                         borderRadius: 50,
//                         marginRight: 10,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         height: height * 0.04,
//                     }}>
//                     <CustomText
//                         color={colors?.white}
//                         text={item.name}
//                         size={size?.medium}
//                     />
//                     {selectedItem === item.id && (
//                         <View
//                             style={{
//                                 position: 'absolute',
//                                 padding: 5,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 borderRadius: 50,
//                                 backgroundColor: colors?.white,
//                                 right: 5,
//                                 top: -8,
//                                 borderWidth: 2,
//                                 borderColor: colors?.iconColor,
//                             }}>
//                             <Image
//                                 source={appIcons?.cross}
//                                 style={{ width: 8, height: 8 }}
//                             />
//                         </View>
//                     )}
//                 </TouchableOpacity>
//             )}
//             contentContainerStyle={{ paddingVertical: 10 }}
//         />
//     );
// };

const HorizontalFlatList = ({data, onItemPress}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Normalize data (in case it's an array of strings)
  const normalizedData = data.map((item, index) =>
    typeof item === 'string' ? {id: index, name: item} : item,
  );

  const handleItemPress = id => {
    if (selectedItems.includes(id)) {
      const updated = selectedItems.filter(item => item !== id);
      setSelectedItems(updated);
      onItemPress(updated);
    } else {
      const updated = [...selectedItems, id];
      setSelectedItems(updated);
      onItemPress(updated);
    }
  };

  return (
    <View style={{paddingVertical: 8, height: height * 0.06}}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onItemPress(item.id)}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 17,
              backgroundColor: selectedItems.includes(item.id)
                ? colors.iconColor
                : colors.placeholderText,
              borderRadius: 50,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: height * 0.04, // fixed height
            }}>
            <CustomText
              color={colors?.white}
              text={item.name.toUpperCase()}
              size={size?.medium}
            />
            {selectedItems.includes(item.id) && (
              <View
                style={{
                  position: 'absolute',
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: colors?.white,
                  right: 5,
                  top: -8,
                  borderWidth: 2,
                  borderColor: colors?.iconColor,
                }}>
                <Image source={appIcons?.cross} style={{width: 8, height: 8}} />
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
    </View>
  );
};

export default HorizontalFlatList;
