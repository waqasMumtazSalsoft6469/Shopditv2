import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import {TextInputMask} from 'react-native-masked-text';
import {appIcons, appLogos} from '../assets';

import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import {family, size} from '../utils';
import CustomIcon from './CustomIcon';
import PhoneInput from 'react-native-phone-number-input';
import Shadows from '../helpers/Shadows';
import {useSelector} from 'react-redux';
import parsePhoneNumberFromString from 'libphonenumber-js';
import {LOG} from '../utils/helperFunction';

const {height} = Dimensions.get('screen');
export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {
    containerStyle,
    types,
    placeholder,
    color,
    placeholderColor,
    verify,
    borderStyles,
    Iconcolor,
    Lineiconcolor,
    Lineicon,
    labeltext,
    label,
    staric = false,
    labelTitle,
    textInputTitle,
    error,
  } = props;
  return (
    <View
      style={{
        width: '100%',
      }}>
      {textInputTitle && (
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <CustomText
            text={labelTitle}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          {staric && (
            <CustomText text="*" color={colors?.red} size={size?.h5} />
          )}
        </View>
      )}

      <View
        style={[
          {
            alignSelf: 'center',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 2,
            height: 55,
            borderWidth: 0,
            borderColor: colors.black,
            marginVertical: 0,
          },
          containerStyle,
        ]}>
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: Iconcolor,
              marginHorizontal: 5,
            }}
          />
        ) : null}

        {props?.Lineicon ? (
          <Image
            source={props?.Lineicon}
            style={{
              width: 18,
              height: 30,
              resizeMode: 'contain',
              tintColor: Lineiconcolor,
              marginHorizontal: -10,
            }}
          />
        ) : null}
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              borderLeftWidth: 0,
              borderLeftColor: colors.border,
              flexDirection: 'row',
            },
            borderStyles,
          ]}>
          {label && (
            <CustomText
              text={labeltext}
              style={{
                color: colors.secondary,
                marginLeft: Platform.OS == 'ios' ? 0 : 3,
              }}
            />
          )}

          <TextInput
            placeholderTextColor={
              placeholderColor ? placeholderColor : colors.placeholder
            }
            style={{
              flex: 1,
              color: colors?.text,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: size.medium,
              fontFamily: family?.Questrial_Regular,
              // backgroundColor: 'red', 
              padding: 5
            }}
            secureTextEntry={props?.rightIcon ? !hidden : hidden}
            autoCapitalize="none"
            {...props}
          />
          {props?.rightIcon && (
            <TouchableOpacity
              style={{padding: 3}}
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={hidden ? appIcons.eye : appIcons?.cutEye}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: '#798A99',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && (
        <View style={{marginTop: -4}}>
          <CustomText
            text={error}
            size={size?.medium}
            color={colors?.red}
            font={family?.Gilroy_Medium}
          />
        </View>
      )}
    </View>
  );
}

export function CustomTextAreaInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {
    containerStyle,
    types,
    placeholder,
    color,
    placeholderColor,
    verify,
    borderStyles,
    Iconcolor,
    Lineiconcolor,
    Lineicon,
    labeltext,
    label,
    staric = false,
    labelTitle,
    textInputTitle,
    error,
    numberOfLines,
    marginBottom,
  } = props;
  return (
    <View
      style={{
        width: '100%',
      }}>
      {textInputTitle && (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: marginBottom,
          }}>
          <CustomText
            text={labelTitle}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          {staric && (
            <CustomText text="*" color={colors?.red} size={size?.h5} />
          )}
        </View>
      )}

      <View
        style={[
          {
            alignSelf: 'center',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 2,
            borderWidth: 0,

            marginVertical: 0,
          },
          containerStyle,
        ]}>
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: Iconcolor,
              marginHorizontal: 5,
              top: 8,
            }}
          />
        ) : null}

        {props?.Lineicon ? (
          <Image
            source={props?.Lineicon}
            style={{
              width: 18,
              height: 30,
              resizeMode: 'contain',
              tintColor: Lineiconcolor,
              marginHorizontal: -10,
            }}
          />
        ) : null}
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              borderLeftWidth: 0,
              borderLeftColor: colors.border,
              flexDirection: 'row',
            },
            borderStyles,
          ]}>
          <TextInput
            placeholderTextColor={
              placeholderColor ? placeholderColor : colors.placeholderText
            }
            style={{
              flex: 1,
              color: colors?.text,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: size.medium,
              fontFamily: family?.Questrial_Regular,
              textAlignVertical: 'top',
              height: height * 0.14,
            }}
            secureTextEntry={props?.rightIcon ? !hidden : hidden}
            autoCapitalize="none"
            multiline
            numberOfLines={numberOfLines}
            {...props}
          />
          {props?.rightIcon && (
            <TouchableOpacity
              style={{padding: 3}}
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={hidden ? appIcons.eye : appIcons?.cutEye}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: '#798A99',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && (
        <View style={{marginTop: -4}}>
          <CustomText
            text={error}
            size={size?.medium}
            color={colors?.red}
            font={family?.Gilroy_Medium}
          />
        </View>
      )}
    </View>
  );
}
export const SearchInput = ({placeholder, onChangeText, value, container}) => {
  return (
    <View style={[styles.searchInputContainer, container]}>
      <CustomIcon src={appIcons?.search} size={18} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={colors?.placeholderText}
      />
    </View>
  );
};

// export function CustomPhoneInput({
//   value,
//   setValue,
//   error,
//   labelTitle,
//   staric,
//   placeholder,
// }) {
//   const phoneInput = useRef(null);
//   const userDetails = useSelector(state => state?.auth?.user || {});

//   let initialCode = 'US';
//   let initialNumber = '';
//   const numberToParse =
//     userDetails?.phoneNumber && userDetails.phoneNumber !== value
//       ? userDetails.phoneNumber
//       : value || '';

//   if (numberToParse) {
//     try {
//       const phoneNumberObj = parsePhoneNumberFromString(numberToParse);
//       if (phoneNumberObj && phoneNumberObj.isValid()) {
//         initialCode = phoneNumberObj.country;
//         initialNumber = phoneNumberObj.nationalNumber;
//       }
//     } catch (e) {
//       console.error('Error initializing phone number:', e.message);
//     }
//   }

//   const [defaultCode, setDefaultCode] = useState(initialCode);
//   const [phoneNumber, setPhoneNumber] = useState(initialNumber);
//   const [key, setKey] = useState(0);

//   useEffect(() => {
//     console.log('CustomPhoneInput useEffect triggered');
//     console.log('Input value (from Formik):', value);
//     console.log('userDetails.phoneNumber:', userDetails?.phoneNumber);
//     console.log(
//       'Number to parse (priority: Redux if different):',
//       numberToParse,
//     );

//     if (numberToParse) {
//       try {
//         console.log('Parsing phone number:', numberToParse);
//         const phoneNumberObj = parsePhoneNumberFromString(numberToParse);
//         if (phoneNumberObj && phoneNumberObj.isValid()) {
//           console.log('Parsed phone number:', {
//             country: phoneNumberObj.country,
//             nationalNumber: phoneNumberObj.nationalNumber,
//             formatted: phoneNumberObj.number,
//           });
//           if (
//             defaultCode !== phoneNumberObj.country ||
//             phoneNumber !== phoneNumberObj.nationalNumber
//           ) {
//             setDefaultCode(phoneNumberObj.country);
//             setPhoneNumber(phoneNumberObj.nationalNumber);
//           }
//           setTimeout(() => {
//             console.log(
//               'PhoneInput internal state:',
//               phoneInput.current?.state,
//             );
//           }, 100);
//         } else {
//           console.log('Phone number is invalid or not parseable');
//           if (defaultCode !== 'US' || phoneNumber !== '') {
//             setDefaultCode('US');
//             setPhoneNumber('');
//           }
//         }
//       } catch (e) {
//         console.error('Error parsing phone number:', e.message);
//         if (defaultCode !== 'US' || phoneNumber !== '') {
//           setDefaultCode('US');
//           setPhoneNumber('');
//         }
//       }
//     } else {
//       console.log('No phone number provided, resetting to defaults (US)');
//       if (defaultCode !== 'US' || phoneNumber !== '') {
//         setDefaultCode('US');
//         setPhoneNumber('');
//       }
//     }
//     console.log('Final state values (in useEffect):', {
//       defaultCode,
//       phoneNumber,
//     });
//   }, [value, userDetails?.phoneNumber, defaultCode, phoneNumber]);

//   useEffect(() => {
//     console.log('State changed:', {defaultCode, phoneNumber});
//   }, [defaultCode, phoneNumber]);

//   const handlePhoneInputRender = useCallback(() => {
//     console.log('Rendering PhoneInput with props:', {
//       defaultCode,
//       value: phoneNumber,
//     });
//   }, [defaultCode, phoneNumber]);

//   return (
//     <View style={{width: '100%', marginTop: 5}}>
//       <View
//         style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
//         <CustomText
//           text={labelTitle}
//           font={family?.Gilroy_Medium}
//           size={size?.large}
//         />
//         {staric && <CustomText text="*" color={colors?.red} size={size?.h5} />}
//       </View>

//       <View style={[styles.wrapper]}>
//         {handlePhoneInputRender()}
//         <PhoneInput
//           key={key}
//           ref={phoneInput}
//           placeholder={placeholder}
//           defaultCode={defaultCode}
//           value={phoneNumber}
//           layout="first"
//           onChangeText={text => {
//             console.log('onChangeText triggered, new text:', text);
//             setPhoneNumber(text);
//           }}
//           onChangeCountry={country => {
//             console.log(
//               'onChangeCountry triggered, country:',
//               JSON.stringify(country, null, 2),
//             );

//             let countryCode;
//             if (typeof country === 'string') {
//               countryCode = country;
//             } else if (country && typeof country === 'object') {
//               countryCode =
//                 country.code ||
//                 country.cca2 ||
//                 country.countryCode ||
//                 country.name ||
//                 'US';
//             } else {
//               countryCode = 'US';
//             }
//             console.log('Setting defaultCode to:', countryCode);
//             setDefaultCode(countryCode);
//             setKey(prev => prev + 1);
//           }}
//           onChangeFormattedText={text => {
//             console.log(
//               'onChangeFormattedText triggered, formatted text:',
//               text,
//             );
//             setValue(text);
//           }}
//           withShadow
//           textInputStyle={{height: height * 0.06, color: colors?.text}}
//           containerStyle={[styles?.inputWrapper, {overflow: 'hidden'}]}
//           textContainerStyle={{
//             height: height * 0.06,
//             backgroundColor: '#EDEDED',
//           }}
//           textInputProps={{
//             placeholderTextColor: colors?.placeholderText,
//             fontFamily: family?.Questrial_Regular,
//             fontSize: size?.large,
//           }}
//           codeTextStyle={{
//             color: colors?.placeholderText,
//             fontFamily: family?.Questrial_Regular,
//             fontSize: size?.large,
//           }}
//         />
//         {error && (
//           <View style={{marginTop: 6}}>
//             <CustomText
//               text={error}
//               size={size?.medium}
//               color={colors?.red}
//               font={family?.Questrial_Regular}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }


export function CustomPhoneInput({
  value, // Full number from Formik, e.g., "+923332587590"
  setValue, // Formik setFieldValue
  error,
  labelTitle,
  staric,
  placeholder,
}) {
  const phoneInput = useRef(null);
  const userDetails = useSelector(state => state?.auth?.user || {});
  
  // Initialize states based on Redux or Formik value
  let initialCode = 'US'; // Default to United States
  let initialNumber = '';
  const numberToParse = userDetails?.phoneNumber && userDetails.phoneNumber !== value 
    ? userDetails.phoneNumber 
    : value || '';

  if (numberToParse) {
    try {
      const phoneNumberObj = parsePhoneNumberFromString(numberToParse);
      if (phoneNumberObj && phoneNumberObj.isValid()) {
        initialCode = phoneNumberObj.country;
        initialNumber = phoneNumberObj.nationalNumber;
      }
    } catch (e) {
      console.error('Error initializing phone number:', e.message);
    }
  }
  
  const [defaultCode, setDefaultCode] = useState(initialCode);
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [key, setKey] = useState(0); // Force re-render only for country changes

  useEffect(() => {
    console.log('CustomPhoneInput useEffect triggered');
    console.log('Input value (from Formik):', value);
    console.log('userDetails.phoneNumber:', userDetails?.phoneNumber);
    console.log('Number to parse (priority: Redux if different):', numberToParse);

    if (numberToParse) {
      try {
        console.log('Parsing phone number:', numberToParse);
        const phoneNumberObj = parsePhoneNumberFromString(numberToParse);
        if (phoneNumberObj && phoneNumberObj.isValid()) {
          console.log('Parsed phone number:', {
            country: phoneNumberObj.country,
            nationalNumber: phoneNumberObj.nationalNumber,
            formatted: phoneNumberObj.number,
          });
          // Only update if different to avoid unnecessary re-renders
          if (defaultCode !== phoneNumberObj.country || phoneNumber !== phoneNumberObj.nationalNumber) {
            setDefaultCode(phoneNumberObj.country); // e.g., 'PK' or 'US'
            setPhoneNumber(phoneNumberObj.nationalNumber); // e.g., '3332587590'
          }
          // Log PhoneInput internal state
          setTimeout(() => {
            console.log('PhoneInput internal state:', phoneInput.current?.state);
          }, 100);
        } else {
          console.log('Phone number is invalid or not parseable');
          if (defaultCode !== 'US' || phoneNumber !== '') {
            setDefaultCode('US');
            setPhoneNumber('');
          }
        }
      } catch (e) {
        console.error('Error parsing phone number:', e.message);
        if (defaultCode !== 'US' || phoneNumber !== '') {
          setDefaultCode('US');
          setPhoneNumber('');
        }
      }
    } else {
      console.log('No phone number provided, resetting to defaults (US)');
      if (defaultCode !== 'US' || phoneNumber !== '') {
        setDefaultCode('US');
        setPhoneNumber('');
      }
    }

    console.log('Final state values (in useEffect):', { defaultCode, phoneNumber });
  }, [value, userDetails?.phoneNumber, defaultCode, phoneNumber]);

  // Log state changes
  useEffect(() => {
    console.log('State changed:', { defaultCode, phoneNumber });
  }, [defaultCode, phoneNumber]);

  // Log before rendering PhoneInput
  const handlePhoneInputRender = useCallback(() => {
    console.log('Rendering PhoneInput with props:', { defaultCode, value: phoneNumber });
  }, [defaultCode, phoneNumber]);

  return (
    <View style={{ width: '100%', marginTop: 5 }}>
      <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
        <CustomText
          text={labelTitle}
          font={family?.Gilroy_Medium}
          size={size?.large}
        />
        {staric && <CustomText text="*" color={colors?.red} size={size?.h5} />}
      </View>

      <View style={[styles.wrapper]}>
        {handlePhoneInputRender()}
        <PhoneInput
          key={key} // Force re-render only for country changes
          ref={phoneInput}
          placeholder={placeholder}
          defaultCode={defaultCode} // Auto-select country code (e.g., 'US')
          value={phoneNumber} // Display national number (e.g., '3332587590')
          layout="first"
          onChangeText={text => {
            console.log('onChangeText triggered, new text:', text);
            setPhoneNumber(text);
          }}
          onChangeCountry={country => {
            console.log('onChangeCountry triggered, country:', JSON.stringify(country, null, 2));
            // Handle different country formats
            let countryCode;
            if (typeof country === 'string') {
              countryCode = country; // e.g., 'US'
            } else if (country && typeof country === 'object') {
              countryCode = country.code || country.cca2 || country.countryCode || country.name || 'US';
            } else {
              countryCode = 'US'; // Fallback to United States
            }
            console.log('Setting defaultCode to:', countryCode);
            setDefaultCode(countryCode);
            setKey(prev => prev + 1); // Force re-render only for country changes
          }}
          onChangeFormattedText={text => {
            console.log('onChangeFormattedText triggered, formatted text:', text);
            setValue(text); // Update Formik with full number
          }}
          withShadow
          textInputStyle={{ height: height * 0.06, color: colors?.text }}
          containerStyle={[styles?.inputWrapper, { overflow: 'hidden' }]}
          textContainerStyle={{
            height: height * 0.06,
            backgroundColor: '#EDEDED',
          }}
          textInputProps={{
            placeholderTextColor: colors?.placeholderText,
            fontFamily: family?.Questrial_Regular,
            fontSize: size?.large,
          }}
          codeTextStyle={{
            color: colors?.placeholderText,
            fontFamily: family?.Questrial_Regular,
            fontSize: size?.large,
          }}
        />
        {error && (
          <View style={{ marginTop: 6 }}>
            <CustomText
              text={error}
              size={size?.medium}
              color={colors?.red}
              font={family?.Questrial_Regular}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.065,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderColor: '#F1F1F1',
    backgroundColor: '#EDEDED',
    gap: 6,
    marginBottom: 5,
  },
  searchInputIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: size?.large,
    color: colors?.placeholderText,
    fontFamily: family?.Questrial_Regular,
  },
  inputWrapper: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 50,
    paddingVertical: 10,
    height: height * 0.065,
    backgroundColor: '#EDEDED',
    color: colors?.text,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size.medium,
    fontFamily: family?.Questrial_Regular,
    textAlignVertical: 'top',
    ...Shadows.shadow1,
  },
});

// export const CustomTextAreaInput = ({
//   labelTitle,
//   placeholder,
//   value,
//   placeholderColor,
//   onChangeText,
//   numberOfLines,
//   staric,
// }) => {
//   return (
//     <View style={{ marginTop: 18, gap: 10 }}>
//       {labelTitle && (
//         <View
//           style={{
//             flexDirection: 'row',
//             marginLeft: 20,
//             width: 120,
//           }}>
//           <CustomText
//             text={labelTitle}
//             font={family?.Gilroy_Medium}
//             size={size?.large}
//           />
//           {staric && (
//             <CustomText text="*" color={colors?.error} size={size?.h5} />
//           )}
//         </View>
//       )}
//       <TextInput
//         multiline
//         numberOfLines={numberOfLines ? numberOfLines : 4}
//         placeholder={placeholder}

//         value={value}
//         onChangeText={onChangeText}
//         style={{
//           backgroundColor: '#EDEDED',
//           borderRadius: 5,
//           textAlignVertical: 'top',
//           fontSize: size.medium,
//           fontFamily: family?.Questrial_Regular,
//           color: colors?.text,
//           paddingHorizontal: 20,
//           paddingVertical: 20,

//         }}
//         placeholderTextColor={
//           placeholderColor ? placeholderColor : colors?.placeholderText
//         }
//       />
//     </View>
//   );
// };
// export function ProfileTextInput(props) {
//   const {icon} = props;
//   return (
//     <View
//       style={{
//         width: '100%',
//         borderWidth: 1,
//         borderColor: colors.border,
//         borderRadius: 10,
//         marginTop: 20,
//         paddingHorizontal: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: colors.border,
//         paddingHorizontal: 10,
//       }}>
//       <Image
//         source={icon}
//         style={{width: 15, height: 15, resizeMode: 'contain'}}
//       />

//       <TextInput
//         style={{
//           width: '100%',
//           height: 50,
//           color: colors.primary,
//           marginLeft: 10,
//           fontFamily: family.Outfit_Regular,
//         }}
//         placeholderTextColor={'#7E7E7E'}
//         {...props}
//       />
//     </View>
//   );
// }
// export function CustomPhoneInput(props) {
//   const [hidden, setHidden] = useState(props?.isPassword);
//   const {containerStyle, types, placeholder, color, placeholderColor, verify} =
//     props;
//   return (
//     <View style={{width: '100%', marginTop: 18}}>
//       {/* <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
//         {placeholder}
//       </Text> */}
//       <View
//         style={[
//           {
//             alignSelf: 'center',
//             width: '90%',
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'red',
//             borderRadius: 10,
//             paddingHorizontal: 7,
//             paddingVertical: 5,
//             height: 55,
//             marginVertical: 0,
//           },
//           containerStyle,
//         ]}>
//         {props?.leftIcon ? (
//           <Image
//             source={props?.leftIcon}
//             style={{
//               width: 18,
//               height: 18,
//               resizeMode: 'contain',
//               tintColor: colors.secondary,
//               marginHorizontal: 10,
//               // marginTop: 5,
//             }}
//           />
//         ) : null}
//         <View
//           style={{
//             flex: 1,

//             flexDirection: 'row',
//             alignItems: 'center',
//             borderLeftWidth: 1,
//             borderLeftColor: colors.border,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//             }}>
//             <TextInputMask
//               type={'cel-phone'}
//               style={{
//                 flex: 1,
//                 color: colors.black,
//                 paddingLeft: 10,
//                 fontSize: size.small,
//               }}
//               onChangeText={phoneNumberFormat => {
//                 let phoneNumber = phoneNumberFormat
//                   .toString()
//                   .replace(/\D+/g, '');
//                 props?.onChangePhoneInput(phoneNumberFormat, phoneNumber);
//               }}
//               maxLength={
//                 props?.formattedPhoneNumber.toString().startsWith('1') ? 18 : 19
//               }
//               options={
//                 props?.phoneNumber.startsWith('1')
//                   ? {
//                       dddMask: '9 (999) 999 - ',
//                     }
//                   : {
//                       dddMask: '(999) 999 - ',
//                     }
//               }
//               {...props}
//             />
//             {props.verify && (
//               <Text
//                 style={{
//                   color: colors.red,
//                   alignSelf: 'center',
//                   textDecorationLine: 'underline',
//                 }}>
//                 Verify
//               </Text>
//             )}
//           </View>
//           {props.rightIcon && (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => setHidden(!hidden)}>
//               <Image
//                 source={!hidden ? appIcons.Visible : appIcons.Unvisible}
//                 style={{
//                   height: 22,
//                   width: 22,
//                   resizeMode: 'contain',
//                 }}
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }
