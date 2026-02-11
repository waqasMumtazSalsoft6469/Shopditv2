import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import { colors } from '../../../utils/Colors';
import { family, size } from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomCheckbox from '../../../components/CustomCheckbox';
import BottomSheet from '../../../components/BottomSheet';

const { width, height } = Dimensions.get('screen');


const SignupSchema = Yup.object().shape({
    full_name: Yup.string().required('Card Holder Name is required'),
    card_number: Yup.string()
        .matches(/^[0-9]{16}$/, 'Card Number must be 16 digits')
        .required('Card Number is required'),
    expiry_date: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry Date must be in MM/YY format')
        .required('Expiry Date is required'),
    cvc: Yup.string()
        .matches(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits')
        .required('CVC is required'),
    isChecked: Yup.boolean(),
});

const AddCardDetails = ({ route }) => {
    const { dishItem, totalAmount } = route.params;
    console.log('Add',dishItem)
    console.log(totalAmount)
    const [cardType, setCardType] = useState('');

    const [focusedField, setFocusedField] = useState('');
    const bottomSheetRef = useRef()
    const handleEdit = values => {
        // NavService?.navigate('DrawerStack');
        bottomSheetRef.current.open();
    };

    const formatExpiryDate = (value) => {

        const cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length <= 2) return cleanedValue;
        return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
    };

    return (
        <Formik
            initialValues={{
                full_name: '',
                card_number: '',
                expiry_date: '',
                cvc: '',
                isChecked: false,
            }}
            // validationSchema={SignupSchema}
            onSubmit={handleEdit}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
            }) => (
                <AppBackground back={true} title={'ADD CARD DETAILS'} notification>
                    <View style={{ paddingHorizontal: 15, marginTop: height * 0.03 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle
                                    staric
                                    labelTitle="Card Holder Name"
                                    onFocus={() => setFocusedField('full_name')}
                                    onBlur={() => {
                                        handleBlur('full_name');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('full_name')}
                                    placeholder="Enter Full Name"
                                    placeholderTextColor={colors?.placeholderText}
                                    autoCapitalize="words"
                                    value={values.full_name}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'full_name' && styles.focusedInput,
                                    ]}
                                />
                                {errors.full_name && touched.full_name && (
                                    <Text style={styles.error}>{errors.full_name}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle
                                    staric
                                    labelTitle="Card Number"
                                    onFocus={() => setFocusedField('card_number')}
                                    onBlur={() => {
                                        handleBlur('card_number');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('card_number')}
                                    placeholder="Enter Card Number"
                                    placeholderTextColor={colors?.placeholderText}
                                    keyboardType="numeric"
                                    maxLength={16}
                                    value={values.card_number}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'card_number' && styles.focusedInput,
                                    ]}
                                />
                                {errors.card_number && touched.card_number && (
                                    <Text style={styles.error}>{errors.card_number}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle
                                    staric
                                    labelTitle="Expiry Date"
                                    onFocus={() => setFocusedField('expiry_date')}
                                    onBlur={() => {
                                        handleBlur('expiry_date');
                                        setFocusedField('');
                                    }}
                                    onChangeText={(text) => {
                                        const formattedText = formatExpiryDate(text);
                                        setFieldValue('expiry_date', formattedText);
                                    }}
                                    placeholder="MM/YY"
                                    placeholderTextColor={colors?.placeholderText}
                                    keyboardType="numeric"
                                    maxLength={5} // MM/YY format
                                    value={values.expiry_date}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'expiry_date' && styles.focusedInput,
                                    ]}
                                />
                                {errors.expiry_date && touched.expiry_date && (
                                    <Text style={styles.error}>{errors.expiry_date}</Text>
                                )}
                            </View>
                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle
                                    staric
                                    labelTitle="CVC"
                                    onFocus={() => setFocusedField('cvc')}
                                    onBlur={() => {
                                        handleBlur('cvc');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('cvc')}
                                    placeholder="Enter CVC"
                                    placeholderTextColor={colors?.placeholderText}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    value={values.cvc}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'cvc' && styles.focusedInput,
                                    ]}
                                />
                                {errors.cvc && touched.cvc && (
                                    <Text style={styles.error}>{errors.cvc}</Text>
                                )}
                            </View>

                            <View style={styles.agreementContainerWrap}>
                                <View style={[styles?.agreementContainer, { alignItems: 'center' }]}>
                                    <CustomCheckbox
                                        checked={values.isChecked}
                                        onChange={value => setFieldValue('isChecked', value)}
                                    />
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '90%' }}>
                                        <CustomText
                                            text="Save this card for next time"
                                            font={family?.Questrial_Regular}
                                            size={size?.large}
                                            color={colors?.placeholderText}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: height * 0.02 }}>
                                <CustomButton
                                    gradientColorArr={[colors.secondary, colors.secondary]}
                                    title="ADD"
                                    customWidth={width - 55}
                                    buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                                    textStyle={{ fontSize: size.large }}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <BottomSheet
                        successfull={true}
                        text={'SYSTEM MESSAGE'}
                        description={'Card has been added successfully!'}
                        ref={bottomSheetRef}
                        OnYesPress={() => {
                            bottomSheetRef.current.close()
                            setTimeout(() => {
                                NavService?.navigate('Checkout', { dishItem: dishItem, totalAmount: totalAmount })
                            }, 650)
                        }}
                    />
                </AppBackground>
            )}
        </Formik>
    );
};

export default AddCardDetails;
