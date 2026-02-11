import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import {family, vh} from '../utils';
import {colors} from '../utils/Colors';

const TabComponent = ({tabs, selectedTab, onTabChange}) => {
  // const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const renderTabItem = ({item, index}) => (
    // <TouchableOpacity onPress={() => setSelectedTab(item)} style={styles.tabButton}>
    <TouchableOpacity
      onPress={() => onTabChange(item)}
      style={styles.tabButton}>
      <View style={styles.tabItem}>
        <CustomText
          text={item.toUpperCase()}
          font={family?.Gilroy_Medium}
          color={selectedTab === item ? colors?.secondary : colors?.lightText}
        />
      </View>
      {selectedTab === item && (
        <View
          style={{
            height: 1.8,
            backgroundColor: colors?.secondary,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={renderTabItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        style={{borderBottomWidth: 1, borderColor: '#D9D9D9', marginTop: 0}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    position: 'relative',
    marginBottom: vh * 3,
  },
  tabButton: {
    marginHorizontal: 20,
    paddingBottom: 10,
  },
});

export default TabComponent;
