import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {colors} from '../utils/Colors';
import {family, size} from '../utils';
import CustomText from './CustomText';
import {WIDTH} from '../theme/units';

const CustomRadioButton = ({
  selected,
  onPress,
  label,
  selectedColor,
  containerStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
      disabled={disabled}>
      <View
        style={[
          styles.radioButtonOuter,
          {borderColor: selected ? selectedColor : '#ccc'},
        ]}>
        {selected && (
          <View
            style={[styles.radioButtonInner, {backgroundColor: selectedColor}]}
          />
        )}
      </View>
      {/* <Text
        style={[
          styles.radioButtonLabel,
          {color: selected ? colors?.white : '#000'},
        ]}>
        {label}
      </Text> */}
      <CustomText
        text={label}
        size={size?.large}
        font={family?.Gilroy_Medium}
        numberOfLines={2}
        color={selected ? selectedColor : '#000'}
        style={{width: WIDTH * 0.67}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 10,
    // This will be replaced dynamically
  },
  radioButtonLabel: {
    fontSize: size?.large,
    fontFamily: family?.Gilroy_Medium,
  },
});

export default CustomRadioButton;
