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
import {
  extractFileName,
  getImageUrl,
  LOG,
  normalizeGallery,
} from '../../../utils/helperFunction';
import {
  AdCategories,
  carMakes,
  VehicleBodyTypes,
} from '../../../utils/dummyData';
import {appIcons, appImages} from '../../../assets';
import FastImage from 'react-native-fast-image';
import ImagePicker2 from '../../../components/ImagePicker2';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import {
  useAddCarAdMutation,
  useAddMutation,
  useUpdateAdMutation,
  useUpdateCarAdMutation,
} from '../../../Api/adsApiSlice';
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

const EditAd = ({route}) => {
  const data = route?.params || {};
  LOG('DATA: ', data);
  const item = data?.data;
  const [focusedField, setFocusedField] = useState('');
  const [images, setImages] = useState([]);
  const [removedOldImages, setRemovedOldImages] = useState([]);
  const [showCustomVariation, setShowCustomVariation] = useState(false);
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateAd, {isLoading}] = useUpdateAdMutation();
  const [updateCarAd, {isLoading: CarLoading}] = useUpdateCarAdMutation();

  const [featureFields, setFeatureFields] = useState([{id: 1, value: ''}]);
  const handleImage = imageArray => {
    setImages(imageArray);
  };
  const initialLocation = {
    coordinates: item?.location?.coordinates || [],
    type: item?.location?.type || 'Point',
    address: item?.location?.address || '',
  };

  const carOptions = carMakes.map((item, index) => ({
    key: String(index + 1),
    label: item,
    value: item,
  }));

  const knownCountryCodes = ['+1', '+44', '+92', '+61'];

  const stripKnownCountryCode = phoneNumber => {
    if (!phoneNumber) return '';
    for (const code of knownCountryCodes) {
      if (phoneNumber.startsWith(code)) {
        return phoneNumber.slice(code.length);
      }
    }
    return phoneNumber;
  };

  const handleEdit = async values => {
    const newImagesToUpload = values.gallery.filter(img =>
      img.uri.startsWith('file'),
    );
    const removedImageNames = removedOldImages.map(img => {
      return img.uri.split('/').pop();
    });

    const payload = {
      ...values,
      category: values.category,
      features: JSON.stringify(values.features),
      oldImages: removedImageNames,
      gallery: newImagesToUpload,
    };

    if (payload.formattedPhoneNumber) {
      payload.phoneNumber = payload.formattedPhoneNumber;
      delete payload.formattedPhoneNumber;
    }

    LOG('FINAL PAYLOADas: ', payload);
    if (payload?.category === 'AUTOMOBILE') {
      const response = await executeApiRequest({
        apiCallFunction: updateCarAd,
        body: payload,
        formData: true,
        params: {id: item?._id},
        toast: true,
        timeout: 30000,
      });

      LOG('Car Add Success:', response);
      NavService.navigate('myads');
    } else {
      const response = await executeApiRequest({
        apiCallFunction: updateAd,
        body: payload,
        formData: true,
        params: {id: item?._id},
        toast: true,
        timeout: 30000,
      });

      LOG('Product Add Success:', response);
      NavService.navigate('myads');
    }
  };

  return (
    <Formik
      initialValues={{
        category: item?.category || '',
        image: null,
        gallery: normalizeGallery(item?.gallery),
        brand: item?.brand || '',
        condition: item?.condition || '',
        make: item?.make || '',
        model: item?.model || '',
        transmission: item?.transmission || '',
        bodyType: item?.bodyType || '',
        color: item?.color || '',
        features: item?.features || [''],
        title: item?.title || '',
        phoneNumber: stripKnownCountryCode(item?.phoneNumber),
        description: item?.description || '',
        location: initialLocation,
        price: item?.price.toString() || '',
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
        <AppBackground back={true} title={'EDIT AD DETAILS'} notification>
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
                  defaultOption={{
                    key: values?.category,
                    value: values.category,
                  }}
                  searchPlaceholder="Search"
                  save="value"
                  placeholder="Select"
                  data={AdCategories}
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
                    style={[styles.inputTouchable, {height: vh * 22}]}
                    disabled={true}>
                    {selectedImage ? (
                      <FastImage
                        source={{uri: selectedImage}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                          resizeMode: 'cover',
                        }}
                      />
                    ) : (
                      <View
                        style={{flex: 1, width: '100%', position: 'relative'}}>
                        <FastImage
                          resizeMode="cover"
                          source={getImageUrl(item?.image)}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                          }}
                          defaultSource={appImages?.placeholder}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '20%',
                          }}>
                          <View
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.6)',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 20,
                              borderRadius: 10,
                              gap: height * 0.01,
                            }}>
                            <CustomText
                              text={'Change Ad image'}
                              font={family?.Gilroy_SemiBold}
                              size={size?.medium}
                              color={colors?.headingText}
                              numberOfLines={1}
                            />
                            <CustomButton
                              gradientColorArr={[
                                'rgba(255, 255, 255, 0.6)',
                                'rgba(255, 255, 255, 0.6)',
                              ]}
                              title={'CHANGE'}
                              customWidth={width - 280}
                              buttonStyle={{
                                alignSelf: 'center',
                                borderWidth: 1,
                                borderColor: colors?.secondary,
                                height: height * 0.045,
                              }}
                              disabled={true}
                              textStyle={{
                                fontSize: size?.xxsmall,
                                color: colors?.secondary,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </ImagePicker2>
              </View>

              {item?.category === 'AUTOMOBILE' ||
              values?.category === 'AUTOMOBILE' ? (
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
                      defaultOption={{
                        key: values?.make,
                        value: values.make,
                      }}
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
                      defaultOption={{
                        key: values?.bodyType,
                        value: values.bodyType,
                      }}
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
                  defaultOption={{
                    key: values?.condition,
                    value: values.condition,
                  }}
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
                  initialAddress={values.location?.address}
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
                  initialImages={values?.gallery}
                  onRemoveOldImage={removed => {
                    setRemovedOldImages(removed);
                    LOG('Removed Old Images: ', removed);
                  }}
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
                    title={'UPDATE YOUR AD'}
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

export default EditAd;

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
