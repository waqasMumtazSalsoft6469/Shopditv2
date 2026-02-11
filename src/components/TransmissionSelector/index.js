import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';
import {family, size} from '../../utils';
import CustomText from '../CustomText';
import {colors} from '../../utils/Colors';

const TransmissionSelector = () => {
  const {values, setFieldValue, errors, touched, setFieldTouched} =
    useFormikContext();

  const options = ['Automatic', 'Manual'];

  return (
    <View>
      <View style={styles.container}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.button,
              values.transmission === option && styles.selectedButton,
            ]}
            onPress={() => {
              setFieldValue('transmission', option);
              setFieldTouched('transmission', false); //
            }}>
            <CustomText
              text={option.toUpperCase()}
              font={family?.Gilroy_Medium}
              size={size?.medium}
              color={
                values?.transmission === option
                  ? colors?.white
                  : colors?.placeholderText
              }
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Error Message */}
      {errors.transmission && touched.transmission && (
        <Text style={styles.error}>{errors.transmission}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: colors?.placeholderColor,
  },
  selectedButton: {
    backgroundColor: colors?.secondary,
    borderColor: colors?.secondary,
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
  selectedText: {
    color: '#FFF',
  },
  error: {
    color: 'red',
    marginTop: 8,
    fontSize: size?.normal,
    fontFamily: family?.Gilroy_SemiBold,
    left: 15,
  },
});

export default TransmissionSelector;
