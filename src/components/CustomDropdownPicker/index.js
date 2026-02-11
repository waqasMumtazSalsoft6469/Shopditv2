import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../utils/Colors';
import {family, size} from '../../utils';

const CustomDropdownPicker = ({
  label,
  placeholder = 'Select an option',
  items = [],
  name,
  value,
  error,
  touched,
  setFieldValue,
  zIndex = 1000,
  zIndexInverse = 999,
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(items);

  const getLabelForValue = val => {
    const selected = dropdownItems.find(i => i.value === val);
    return selected?.label || placeholder;
  };

  return (
    <View style={{zIndex: open ? zIndex : zIndexInverse}}>
      {label && <Text style={styles.label}>{label}</Text>}

      <DropDownPicker
        open={open}
        value={value}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={callback => {
          const selectedValue = callback(value);
          setFieldValue(name, selectedValue);
        }}
        setItems={setDropdownItems}
        placeholder={placeholder}
        style={[styles.input, {paddingVertical: 15, paddingHorizontal: 18}]}
        textStyle={{
          color: colors?.text,
          fontSize: size?.medium,
          fontFamily: family?.Questrial_Regular,
        }}
        dropDownContainerStyle={styles.dropdownContainer}
        searchable={true}
        searchPlaceholder="Search..."
        listMode={Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW'}
        modalAnimationType="slide"
        searchTextInputStyle={{
          color: colors?.text,
          fontSize: size?.medium,
          fontFamily: family?.Questrial_Regular,
        }}
        searchContainerStyle={{
          borderColor: '#EDEDED',
          paddingHorizontal: 12,
          fontSize: size.medium,
          fontFamily: family?.Gilroy_SemiBold,
        }}
        listItemLabelStyle={{fontSize: size?.large}}
        searchTextInputProps={{borderColor: colors?.lightgray}}
        placeholderStyle={{
          color: value ? '#000' : colors?.placeholderText, // show darker color if selected
          fontSize: size?.medium,
          fontFamily: family?.Questrial_Regular,
        }}
        labelStyle={{color: '#000'}}
      />
    </View>
  );
};

export default CustomDropdownPicker;

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
  },
  dropdownContainer: {},
});
