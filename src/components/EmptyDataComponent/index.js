import React from 'react';
import {StyleSheet, View} from 'react-native';

import {font} from '../../theme/styles';
import {colors2} from '../../theme/colors2';
import CustomText from '../CustomText';
import {HEIGHT} from '../../theme/units';
import {vh} from '../../utils';

const EmptyDataComponent = ({message = 'No data available!'}) => {
  return (
    <View style={styles.container}>
      <CustomText
        text={message}
        size={font.xlarge}
        color={colors2.text.placeholder}
        style={{textAlign: 'center', lineHeight: vh * 3}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: HEIGHT / 2,
  },
});

export default EmptyDataComponent;
