import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomPhoneInput,
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size, vh} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import AppBackground from '../../../components/AppBackground';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';
import TransmissionSelector from '../../../components/TransmissionSelector';
import {extractFileName, LOG} from '../../../utils/helperFunction';
import {
  AdCategories,
  carMakes,
  VehicleBodyTypes,
} from '../../../utils/dummyData';
import {appIcons} from '../../../assets';
import FastImage from 'react-native-fast-image';
import ImagePicker2 from '../../../components/ImagePicker2';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import {useAddCarAdMutation, useAddMutation} from '../../../Api/adsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import NavService from '../../../helpers/NavService';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {validationSchema} from './validationSchema';

const {width, height} = Dimensions.get('screen');

const conditionType = [
  {key: '1', value: 'New'},
  {key: '2', value: 'Used'},
];

const AddAd = () => {
  const [focusedField, setFocusedField] = useState('');
  const [images, setImages] = useState([]);
  const [showCustomVariation, setShowCustomVariation] = useState(false);
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [add, {isLoading}] = useAddMutation();
  const [addCarAd, {isLoading: CarLoading}] = useAddCarAdMutation();

  const [featureFields, setFeatureFields] = useState([{id: 1, value: ''}]);

  // const addFeatureField = () => {
  //   const newId =
  //     featureFields.length > 0
  //       ? Math.max(...featureFields.map(f => f.id)) + 1
  //       : 1;
  //   setFeatureFields([...featureFields, {id: newId, value: ''}]);
  // };

  // const removeFeatureField = id => {
  //   if (featureFields.length > 1) {
  //     setFeatureFields(featureFields.filter(field => field.id !== id));
  //   }
  // };

  // const handlePhoneInputChange = (formatted, raw) => {
  //   console.log('formatted', formatted, raw);
  //   setFormattedPhoneNumber(formatted);
  //   setPhoneNumber(raw);
  // };

  const handleImage = imageArray => {
    setImages(imageArray);
  };

  const handleEdit = async values => {
    const payload = {...values, features: JSON.stringify(values.features)};

    if (payload.formattedPhoneNumber) {
      payload.phoneNumber = payload.formattedPhoneNumber;
      delete payload.formattedPhoneNumber;
    }

    LOG('FINAL PAYLOAD: ', payload);
    if (payload?.category === 'AUTOMOBILE') {
      const response = await executeApiRequest({
        apiCallFunction: addCarAd,
        body: payload,
        formData: true,
        toast: true,
        timeout: 30000,
      });

      LOG('Car Add Success:', response);
      NavService.goBack();
    } else {
      const response = await executeApiRequest({
        apiCallFunction: add,
        body: payload,
        formData: true,
        toast: true,
        timeout: 30000,
      });

      LOG('Product Add Success:', response);
      NavService.goBack();
    }
  };
  const carOptions = carMakes.map(item => ({
    label: item,
    value: item,
  }));
  return (
    <Formik
      initialValues={{
        category: '',
        gallery: [],
        brand: '',
        condition: '',
        make: '',
        model: '',
        transmission: '',
        bodyType: '',
        color: '',
        features: [''],
        title: '',
        phoneNumber: '',
        description: '',
        location: {
          coordinates: [],
          type: 'Point',
          address: '',
        },
        price: '',
        image: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleEdit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <AppBackground back={true} title={'AD DETAILS'} notification>
          <View style={{marginTop: height * 0.03}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={styles.field2}>
                <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                  <CustomText
                    text={'Category'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Questrial_Regular}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>
                <SelectList
                  setSelected={value => setFieldValue('category', value)}
                  search={true}
                  searchPlaceholder="Search"
                  placeholder="Select"
                  data={AdCategories}
                  save="value"
                  dropdownTextStyles={{color: colors?.text}}
                  dropdownStyles={{
                    borderWidth: 1,
                    borderColor: colors?.primary,
                  }}
                  boxStyles={[
                    styles?.input,
                    focusedField === 'category' && styles.focusedInput,
                    {paddingVertical: 15, paddingHorizontal: 18},
                  ]}
                  inputStyles={{
                    color: colors?.headingText,
                    fontSize: size?.medium,
                    fontFamily: family?.Questrial_Regular,
                  }}
                />
                {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
              </View>

              <View style={styles?.field}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <CustomText
                    text={'Upload Image'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />

                  <CustomText text="*" color={colors?.red} size={size?.h6} />
                </View>
                <ImagePicker2
                  onImageChange={(images, type) => {
                    console.log('imagesimages', images);
                    setSelectedImage(images);
                    let img = extractFileName(images);
                    let imageObject = {
                      uri: images,
                      type,
                      name: img,
                    };
                    console.log('imageObjectimageObject', imageObject);
                    // handleImageChange(imageObject, setFieldValue);
                    setFieldValue('image', imageObject);
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.inputTouchable,
                      {height: selectedImage ? vh * 20 : vh * 20},
                    ]}
                    disabled={true}>
                    {selectedImage ? (
                      <FastImage
                        source={{uri: selectedImage}}
                        resizeMode="contain"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          paddingHorizontal: 50,
                          gap: vh * 1,
                        }}>
                        <CustomText
                          text={
                            'Browse and choose the file you want to upload from your photos'
                          }
                          color={'#B9B9B9'}
                          font={family?.Gilroy_SemiBold}
                          size={size?.medium}
                          underline={true}
                          style={{textAlign: 'center'}}
                        />
                        <CustomButton
                          gradientColorArr={[
                            colors.secondary,
                            colors.secondary,
                          ]}
                          title={'+ Add File'}
                          disabled={true}
                          customHeight={30}
                          customWidth={width / 4.5}
                          buttonStyle={{borderRadius: 8, alignItems: 'center'}}
                          textStyle={{fontSize: size.medium}}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </ImagePicker2>
                {errors.image && touched.image && (
                  <Text style={[styles.error]}>{errors.image}</Text>
                )}
              </View>

              {values.category === 'AUTOMOBILE' ? (
                <>
                  <View style={styles.field2}>
                    <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                      <CustomText
                        text={'Make'}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                      />
                      <CustomText
                        text={'*'}
                        font={family?.Questrial_Regular}
                        size={size?.h5}
                        color={colors?.red}
                      />
                    </View>
                    <SelectList
                      setSelected={value => setFieldValue('make', value)}
                      search={true}
                      searchPlaceholder="Search"
                      placeholder="Select"
                      data={carOptions}
                      save="value"
                      dropdownTextStyles={{color: colors?.text}}
                      dropdownStyles={{
                        borderWidth: 1,
                        borderColor: colors?.primary,
                      }}
                      boxStyles={[
                        styles?.input,
                        focusedField === 'make' && styles.focusedInput,
                        {paddingVertical: 15, paddingHorizontal: 18},
                      ]}
                      inputStyles={{
                        color: colors?.placeholderText,
                        fontSize: size?.medium,
                        fontFamily: family?.Questrial_Regular,
                      }}
                    />
                    {errors.make && touched.make && (
                      <Text style={styles.error}>{errors.make}</Text>
                    )}
                  </View>
                  <View style={styles.field2}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Model'}
                      onFocus={() => setFocusedField('model')}
                      onBlur={() => {
                        handleBlur('model');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('model')}
                      placeholder="Enter Model"
                      placeholderTextColor={colors?.placeholderText}
                      autoCapitalize="none"
                      value={values.model}
                      containerStyle={[
                        styles.input,
                        focusedField === 'model' && styles.focusedInput,
                      ]}
                    />
                    {errors.model && touched.model && (
                      <Text style={styles.error}>{errors.model}</Text>
                    )}
                  </View>

                  <View style={styles.field2}>
                    <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                      <CustomText
                        text={'Transmission'}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                      />
                      <CustomText
                        text={'*'}
                        font={family?.Questrial_Regular}
                        size={size?.h5}
                        color={colors?.red}
                      />
                    </View>
                    <TransmissionSelector />
                  </View>

                  <View style={styles.field2}>
                    <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                      <CustomText
                        text={'Body Type'}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                      />
                      <CustomText
                        text={'*'}
                        font={family?.Questrial_Regular}
                        size={size?.h5}
                        color={colors?.red}
                      />
                    </View>
                    <SelectList
                      setSelected={value => setFieldValue('bodyType', value)}
                      search={true}
                      searchPlaceholder="Search"
                      placeholder="Select"
                      data={VehicleBodyTypes}
                      save="value"
                      dropdownTextStyles={{color: colors?.text}}
                      dropdownStyles={{
                        borderWidth: 1,
                        borderColor: colors?.primary,
                      }}
                      boxStyles={[
                        styles?.input,
                        focusedField === 'bodyType' && styles.focusedInput,
                        {paddingVertical: 15, paddingHorizontal: 18},
                      ]}
                      inputStyles={{
                        color: colors?.placeholderText,
                        fontSize: size?.medium,
                        fontFamily: family?.Questrial_Regular,
                      }}
                    />
                    {errors.bodyType && touched.bodyType && (
                      <Text style={styles.error}>{errors.bodyType}</Text>
                    )}
                  </View>

                  {/* <View style={styles.field2}>
                    <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                      <CustomText
                        text={'Features'}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                      />
                      <CustomText
                        text={'*'}
                        font={family?.Questrial_Regular}
                        size={size?.h5}
                        color={colors?.red}
                      />
                    </View>
                    <SelectList
                      setSelected={value => setFieldValue('features', value)}
                      search={false}
                      placeholder="Select"
                      data={VehicleBodyTypes}
                      save="value"
                      dropdownTextStyles={{color: colors?.text}}
                      dropdownStyles={{
                        borderWidth: 1,
                        borderColor: colors?.primary,
                      }}
                      boxStyles={[
                        styles?.input,
                        focusedField === 'features' && styles.focusedInput,
                        {paddingVertical: 15, paddingHorizontal: 18},
                      ]}
                      inputStyles={{
                        color: colors?.placeholderText,
                        fontSize: size?.medium,
                        fontFamily: family?.Questrial_Regular,
                      }}
                    />
                    {errors.features && touched.features && (
                      <Text style={styles.error}>{errors.features}</Text>
                    )}
                  </View> */}
                  <View>
                    {values.features.map((feature, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                          width: '92%',
                          marginTop: vh * 2,
                        }}>
                        <View
                          style={{flex: values.features.length > 1 ? 1 : 1}}>
                          <CustomTextInput
                            textInputTitle={true}
                            staric={index === 0}
                            labelTitle={index === 0 ? 'Features' : ''}
                            onFocus={() => setFocusedField(index)}
                            onBlur={() => {
                              handleBlur(`features[${index}]`);
                              setFocusedField(null);
                            }}
                            onChangeText={text => {
                              const updated = [...values.features];
                              updated[index] = text;
                              setFieldValue('features', updated);
                            }}
                            placeholder="Enter feature"
                            placeholderTextColor={colors?.placeholderText}
                            autoCapitalize="none"
                            value={feature}
                            containerStyle={[
                              styles.input,
                              focusedField === index && styles.focusedInput,
                              {width: '100%'},
                            ]}
                          />
                        </View>

                        {values.features.length > 1 && (
                          <TouchableOpacity
                            style={{marginLeft: 10, padding: 5}}
                            onPress={() => {
                              const updated = values.features.filter(
                                (_, i) => i !== index,
                              );
                              setFieldValue('features', updated);
                            }}>
                            <FastImage
                              source={appIcons?.cross}
                              style={{
                                width: 10,
                                height: 10,
                                marginTop: vh * 3,
                              }}
                              tintColor={'red'}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}

                    {/* Validation Error for the whole array */}
                    {typeof errors.features === 'string' &&
                      touched.features && (
                        <Text style={styles.error}>{errors.color}</Text>
                      )}

                    {/* Add Feature Button */}
                    <TouchableOpacity
                      style={[styles.addmore, {marginTop: 5}]}
                      onPress={() =>
                        setFieldValue('features', [...values.features, ''])
                      }>
                      <FastImage
                        source={appIcons?.add}
                        style={{
                          width: vh * 1.5,
                          height: vh * 1.5,
                        }}
                        resizeMode="contain"
                      />
                      <CustomText
                        text={'Add more features'}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.field2}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Brand'}
                      onFocus={() => setFocusedField('brand')}
                      onBlur={() => {
                        handleBlur('brand');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('brand')}
                      placeholder="Enter Brand Name"
                      placeholderTextColor={colors?.placeholderText}
                      autoCapitalize="none"
                      value={values.brand}
                      containerStyle={[
                        styles.input,
                        focusedField === 'brand' && styles.focusedInput,
                      ]}
                    />
                    {errors.brand && touched.brand && (
                      <Text style={styles.error}>{errors.brand}</Text>
                    )}
                  </View>
                </>
              )}

              <View style={styles.field2}>
                <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                  <CustomText
                    text={'Condition'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Questrial_Regular}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>
                <SelectList
                  setSelected={value => setFieldValue('condition', value)}
                  search={false}
                  placeholder="Select"
                  data={conditionType}
                  save="value"
                  dropdownTextStyles={{color: colors?.text}}
                  dropdownStyles={{
                    borderWidth: 1,
                    borderColor: colors?.primary,
                  }}
                  boxStyles={[
                    styles?.input,
                    focusedField === 'condition' && styles.focusedInput,
                    {paddingVertical: 15, paddingHorizontal: 18},
                  ]}
                  inputStyles={{
                    color: colors?.placeholderText,
                    fontSize: size?.medium,
                    fontFamily: family?.Questrial_Regular,
                  }}
                />
                {errors.condition && touched.condition && (
                  <Text style={styles.error}>{errors.condition}</Text>
                )}
              </View>

              <View style={styles.field2}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Color'}
                  onFocus={() => setFocusedField('color')}
                  onBlur={() => {
                    handleBlur('color');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('color')}
                  placeholder="Enter Color"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.color}
                  containerStyle={[
                    styles.input,
                    focusedField === 'color' && styles.focusedInput,
                  ]}
                />
                {errors.color && touched.color && (
                  <Text style={styles.error}>{errors.color}</Text>
                )}
              </View>

              <View style={styles?.hr} />
              <View style={styles.field2}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Ad Title'}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => {
                    handleBlur('title');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('title')}
                  placeholder="Enter Product Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.title}
                  containerStyle={[
                    styles.input,
                    focusedField === 'title' && styles.focusedInput,
                  ]}
                />
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </View>

              <View style={styles.field2}>
                <CustomPhoneInput
                  labelTitle={'Phone Number'}
                  value={values.phoneNumber}
                  formattedValue={values.formattedPhoneNumber}
                  setValue={formattedValue => {
                    setFieldValue('phoneNumber', formattedValue);
                  }}
                  setFormattedValue={formattedValue => {
                    setFieldValue('formattedPhoneNumber', formattedValue);
                  }}
                  valid={valid}
                  staric={true}
                  showMessage={showMessage}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}
              </View>

              <View style={styles.field}>
                <GooglePlaceAutocomplete
                  staric={true}
                  textInputTitle={'Location'}
                  leftIcon={appIcons?.jobLocationIcon}
                  placeholder={'Enter Location'}
                  label={'Location'}
                  wrapperStyles={[
                    styles.input2,
                    focusedField === 'location' && styles.focusedInput,
                    {width: '97%'},
                  ]}
                  fieldName="location"
                  setFieldValue={setFieldValue}
                />
                {errors.location?.address && touched.location?.address && (
                  <Text style={styles.error}>{errors.location.address}</Text>
                )}
              </View>
              <View style={styles.field2}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Price ($)'}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => {
                    handleBlur('price');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('price')}
                  placeholder="Enter Price"
                  keyboardType="numeric"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.price}
                  containerStyle={[
                    styles.input,
                    focusedField === 'price' && styles.focusedInput,
                  ]}
                />
                {errors.price && touched.price && (
                  <Text style={styles.error}>{errors.price}</Text>
                )}
              </View>

              <View style={styles.field2}>
                <CustomTextAreaInput
                  textInputTitle={true}
                  numberOfLines={5}
                  label
                  staric={true}
                  labelTitle={'Description'}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => {
                    handleBlur('description');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('description')}
                  placeholder="Enter Description Here!"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.description}
                  containerStyle={[
                    styles.input,
                    focusedField === 'description' && styles.focusedInput,
                    {borderRadius: 15},
                  ]}
                />
                {errors.description && touched.description && (
                  <Text style={styles.error}>{errors.description}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomMultiImagePicker
                  handleImage={imageArray => {
                    handleImage(imageArray);
                    setFieldValue('gallery', imageArray);
                  }}
                  labelTitle="Gallery"
                  staric={true}
                  // title="Add Image"
                />
                {errors.gallery && touched.gallery && (
                  <Text style={styles.error}>{errors.gallery}</Text>
                )}
              </View>

              <View
                style={{marginTop: height * 0.02, marginBottom: height * 0.02}}>
                {isLoading || CarLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'POST YOUR AD'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default AddAd;
