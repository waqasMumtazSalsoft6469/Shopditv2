import {FlatList, ScrollView, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import AppBackground from '../../../components/AppBackground';
import {colors} from '../../../utils/Colors';

import CustomText from '../../../components/CustomText';
import {size, family, vh, vw} from '../../../utils';
import styles from '../BusinessPoints/styles';

const data = [
  {
    id: '1',
    PointTitle: 'Recognition from admin',
    PointDate: 'Nov 13, 2024 at 3:30 PM',
    points: '20',
  },
  {
    id: '2',
    PointTitle: 'Login Completion Goal',
    PointDate: 'Oct 10, 2024 at 2:15 PM',
    points: '25',
  },
  {
    id: '3',
    PointTitle: 'Kitchen Cafe',
    PointDate: 'Sep 5, 2024 at 1:00 PM',
    points: '35',
  },
];

const PointsHistory = () => {
  // Preprocess data to group by month and year
  const groupedData = useMemo(() => {
    const groups = data.reduce((acc, item) => {
      const dateParts = item.PointDate.split(' ');
      const monthYear = `${dateParts[0]} ${dateParts[2]}`; // Extracting Month and Year

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(item);
      return acc;
    }, {});

    // Convert object to array and sort by date (descending)
    return Object.entries(groups)
      .sort(([a], [b]) => new Date(`1 ${b}`) - new Date(`1 ${a}`)) // Sorting by date
      .map(([monthYear, items]) => ({monthYear, items}));
  }, [data]);

  // Render each group section
  const renderSection = ({item}) => (
    <View style={{marginBottom: vh * 2}}>
      {/* Section Heading */}
      <CustomText
        text={item.monthYear.toUpperCase()}
        font={family?.Gilroy_Bold}
        size={size?.h6}
        color={colors?.headingText}
        style={{left: 10}}
       
      />
      {/* Section Items */}
      {item.items.map(point => (
        <View
          key={point.id}
          style={[
            styles?.deliverDetails,
            {
              paddingHorizontal: 10,
              paddingVertical: 5,
              justifyContent: 'space-between',
            },
          ]}>
          <View
            style={{
              width: '75%',
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}>
            <View>
              <CustomText
                text={point.PointTitle.toUpperCase()}
                font={family?.Gilroy_SemiBold}
                size={size?.large}
                color={colors?.headingText}
              />
              <CustomText
                text={point.PointDate.toUpperCase()}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.secondary}
              />
            </View>
          </View>
          <View
            style={{
              width: vw * 10,
              height: vw * 10,
              borderRadius: 100,
              backgroundColor: '#00BA0073',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              text={`+${point.points}`}
              font={family?.Gilroy_SemiBold}
              size={size?.small}
              color={colors?.headingText}
              numberOfLines={1}
              style={{textTransform: 'uppercase'}}
            />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <AppBackground
      back={true}
      title={'Points History'.toUpperCase()}
      notification={true}>
      <View style={{padding: vh*2, marginTop: vh*4}}>
        <FlatList
          data={groupedData}
          renderItem={renderSection}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={()=> <View style={{height: 10}}/>}
          contentContainerStyle={{
            paddingBottom: vh * 5,
            paddingHorizontal: vw * 1,
          }}
        />
      </View>
    </AppBackground>
  );
};

export default PointsHistory;
