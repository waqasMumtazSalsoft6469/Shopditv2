import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import { colors } from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import { appIcons, appImages } from '../../../assets';
import CustomText from '../../../components/CustomText';
import { family, size, vh, vw } from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {
  dishSize,
  pizzaDough,
  pizzaSizes,
  reviewDetails,
  toppings,
} from '../../../utils/dummyData';
import CustomRadioButton from '../../../components/CustomRadioButton';
import CustomCheckbox from '../../../components/CustomCheckbox';
import { CustomTextAreaInput } from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import CircularIcon from '../../../components/CircularIcon';
import NavService from '../../../helpers/NavService';
import { styles } from './styles';
import { getImageUrl, LOG } from '../../../utils/helperFunction';
import { useFocusEffect } from '@react-navigation/native';
import CustomIcon from '../../../components/CustomIcon';
import { addToCart } from '../../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../utils/toast';

// useEffect(() => {
//   console.log('Selected Option:', selectedPizzaOption);
// }, [selectedPizzaOption]);
// useEffect(() => {
//   console.log('Selected Option:', selectedDishSize);
// }, [selectedDishSize]);

// useEffect(() => {
//   console.log('Selected Dough:', selectDough);
// }, [selectDough]);

// const handleCheckboxChange = (index, isChecked) => {
//   const updatedToppings = [...toppingOptions];
//   updatedToppings[index].checked = isChecked;
//   setToppingOptions(updatedToppings);
// };

const { width, height } = Dimensions.get('screen');
const DishDetails = ({ route }) => {
  const { dishItem, id } = route.params;
  const token = useSelector(state => state?.auth?.token);

  console.log('PARAMS: ', dishItem);
  console.log('ID: ', id);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  // const [selectDough, setSelectedDough] = useState('regular');
  // const [toppingOptions, setToppingOptions] = useState(toppings);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  //Here was pizza stuff

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isAddedToCart) {
          setIsAddedToCart(false);
          return true; // prevents default behavior
        } else {
          NavService?.goBack();
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [isAddedToCart]),
  );

  return (
    <AppBackground
      back
      notification
      couponDetails={true}
      cart
      childrenContainerStyle={{ marginBottom: 0 }}
      titleColor={colors?.white}
      onBack={() => {
        if (isAddedToCart) {
          setIsAddedToCart(false);
        } else {
          NavService?.goBack();
        }
      }}>
      <CustomContainer
        bgImage={getImageUrl(dishItem?.image)}
        secondContainer={true}
        mb={true}
        customItemStyles={{ marginTop: -height * 0.04 }}
        bannerStyle={{
          backgroundColor: '#F6F6F6',
          height: height / 2.1,
          marginTop: -height * 0.01,
        }}
        children2={
          <View
            style={{ width: '100%', justifyContent: 'center', height: '70%' }}>
            {!isAddedToCart ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: width * 0.03,
                  alignSelf: 'center',
                }}>
                <CircularIcon
                  size={width * 0.1}
                  image={true}
                  src={appIcons?.minus}
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                />
                <CustomText
                  text={String(quantity)}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h3}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{ textTransform: 'uppercase' }}
                />
                <CircularIcon
                  size={width * 0.1}
                  image={true}
                  src={appIcons?.add}
                  onPress={() => {
                    if (quantity < 10) {
                      setQuantity(quantity + 1);
                    } else {
                      Alert.alert(
                        'Limit Reached',
                        'You cannot add more than 10 items.',
                      );
                    }
                  }}
                />
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'ADD TO CART'}
                  customWidth={width - 220}
                  buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                  textStyle={{ fontSize: size.large }}
                  // onPress={() => {
                  //   if (dishItem.type === 'Pizza') {
                  //     if (selectedPizzaOption === '') {
                  //       Alert.alert('Select Pizza Variation');
                  //     } else {
                  //       setIsAddedToCart(true);
                  //     }
                  //   } else {
                  //     if (selectedDishSize === '') {
                  //       Alert.alert('Select Dish Variation');
                  //     } else {
                  //       setIsAddedToCart(true);
                  //     }
                  //   }
                  // }}

                  // onPress={() => {
                  //   if (
                  //     Array.isArray(dishItem?.variations) &&
                  //     dishItem.variations.length > 0
                  //   ) {
                  //     if (!selectedVariation) {
                  //       Alert.alert('Please select a variation');
                  //     } else {
                  //       // setIsAddedToCart(true);
                  //       const totalPrice =
                  //         (selectedVariation?.price ?? dishItem?.price) *
                  //         quantity;

                  //       NavService?.navigate('MyCart', {
                  //         dishItem: dishItem,
                  //         selectedVariation: selectedVariation,
                  //         quantity: quantity,
                  //         totalPrice: totalPrice.toFixed(2),
                  //         specialInstructions: specialInstructions,
                  //         id: id,
                  //       });
                  //     }
                  //   } else {
                  //     // No variations required, proceed to add to cart directly
                  //     // setIsAddedToCart(true);
                  //     const totalPrice =
                  //       (selectedVariation?.price ?? dishItem?.price) *
                  //       quantity;

                  //     NavService?.navigate('MyCart', {
                  //       dishItem: dishItem,
                  //       selectedVariation: selectedVariation,
                  //       quantity: quantity,
                  //       totalPrice: totalPrice.toFixed(2),
                  //       specialInstructions: specialInstructions,
                  //       id: id,
                  //     });
                  //   }
                  // }}
                  onPress={() => {
                    if (!token) {
                      showToast('Please log in to continue');
                      return;
                    }
                    if (
                      Array.isArray(dishItem?.variations) &&
                      dishItem.variations.length > 0
                    ) {
                      if (!selectedVariation) {
                        Alert.alert('Please select a variation');
                        return;
                      }
                    }

                    const payload = {
                      id: dishItem?._id,
                      selectedVariation: selectedVariation ?? null,
                      quantity,
                      price: dishItem.price,
                      dishItem,
                      specialInstructions: specialInstructions,
                      businessProfileId: id,
                    };

                    // console.log('Adding item:', {
                    //   id: dishItem._id,
                    //   variationId: selectedVariation?._id,
                    // });
                    dispatch(addToCart(payload));
                    showToast('Product added to cart');
                    // NavService.navigate('MyCart'); // no need to send data via params anymore
                  }}
                />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles?.viewCartContainer}
                onPress={() => {
                  const totalPrice =
                    (selectedVariation?.price ?? dishItem?.price) * quantity;

                  NavService?.navigate('MyCart', {
                    dishItem: dishItem,
                    selectedVariation: selectedVariation,
                    quantity: quantity,
                    totalPrice: totalPrice.toFixed(2),
                    specialInstructions: specialInstructions,
                    id: id,
                  });
                }}>
                <CircularIcon
                  size={width * 0.1}
                  disabled={true}
                  text={quantity}
                  color={colors?.secondary}
                />

                <View style={{ flexDirection: 'column' }}>
                  <CustomText
                    text={'View my cart'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.xxlarge}
                    color={colors?.white}
                    numberOfLines={1}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <CustomText
                    text={'Kitchen Café and Rostro'}
                    font={family?.Questrial_Regular}
                    size={size?.medium}
                    color={colors?.white}
                    numberOfLines={1}
                    style={{ textTransform: 'uppercase' }}
                  />
                </View>
                {/* <CustomText
                  text={`$${dishItem?.price}`}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h3}
                  color={colors?.white}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase'}}
                /> */}

                <CustomText
                  text={`$${(
                    (selectedVariation?.price ?? dishItem?.price) * quantity
                  ).toFixed(2)}`}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h3}
                  color={colors?.white}
                  numberOfLines={1}
                  style={{ textTransform: 'uppercase' }}
                />
              </TouchableOpacity>
            )}
          </View>
        }>
        <View style={[styles?.titleSection, { paddingVertical: 2 }]}>
          <View style={{ gap: 5 }}>
            <CustomText
              text={dishItem?.productName}
              font={family?.Gilroy_SemiBold}
              size={size?.h3}
              color={colors?.headingText}
              numberOfLines={1}
              style={{ textTransform: 'uppercase' }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: height * 0.02,
                }}>
                {dishItem?.price ? (
                  <CustomText
                    text={`$ ${dishItem?.price}`}
                    color={colors.secondary}
                    font={family.Gilroy_Bold}
                    size={size?.h3}
                    numberOfLines={1}
                  />
                ) : (
                  <CustomText
                    text={`$ ${dishItem?.variations[0]?.price}`}
                    color={colors.secondary}
                    font={family.Gilroy_Bold}
                    size={size?.h3}
                    numberOfLines={1}
                  />
                )}
                <CustomText
                  text={`/`}
                  color={colors.secondary}
                  font={family.Gilroy_Bold}
                  size={size?.h3}
                  numberOfLines={1}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomIcon src={appIcons?.coin} size={height * 0.03} />

                  <CustomText
                    text={`${dishItem?.pointsRequired} Points`}
                    color={'#E4890D'}
                    font={family?.Gilroy_Bold}
                    size={size.h6}
                    numberOfLines={1}
                  />
                </View>
                {dishItem?.requiredShopditPoints && (
                  <>
                    <CustomText
                      text={`/`}
                      color={colors.secondary}
                      font={family.Gilroy_Bold}
                      size={size?.h3}
                      numberOfLines={1}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: vw * 1,
                      }}>
                      <CustomIcon
                        src={appIcons?.shopditPoint}
                        size={height * 0.03}
                      />

                      <CustomText
                        text={`${dishItem?.requiredShopditPoints} Points`}
                        color={'#634296'}
                        font={family?.Gilroy_Bold}
                        size={size.h6}
                        numberOfLines={1}
                      />
                    </View>
                  </>
                )}
              </View>

              {dishItem?.original !== undefined && (
                <CustomText
                  text={`$ ${dishItem?.original}`}
                  color={colors.lightText}
                  font={family.Gilroy_Medium}
                  size={size?.large}
                  numberOfLines={1}
                  style={{ textDecorationLine: 'line-through' }}
                />
              )}

              {/* <CustomText
                text={`$ ${dishItem?.price}`}
                color={colors.secondary}
                font={family.Gilroy_Bold}
                size={size?.large}
                numberOfLines={1}
              /> */}
            </View>

            <CustomText
              text={dishItem?.description}
              font={family?.Questrial_Regular}
              size={size?.large}
              color={colors?.headingText}
              numberOfLines={2}
              style={{ lineHeight: height * 0.025 }}
            />
          </View>

          <View style={{ width: '100%', marginTop: height * 0.03, gap: 5 }}>
            <CustomText
              text={'Purchase Reward'}
              font={family?.Gilroy_SemiBold}
              size={size?.xxlarge}
              color={colors?.headingText}
              numberOfLines={1}
              style={{ textTransform: 'uppercase' }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomIcon src={appIcons?.coin} size={height * 0.03} />

              <CustomText
                text={`${dishItem?.rewardPoints} Points`}
                color={'#E4890D'}
                font={family?.Gilroy_Bold}
                size={size.h6}
                numberOfLines={1}
              />
            </View>
          </View>
          {/* <View style={styles?.variationContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <CustomText
                text={'Variation'}
                font={family?.Gilroy_SemiBold}
                size={size?.xxlarge}
                color={colors?.headingText}
                numberOfLines={1}
                style={{textTransform: 'uppercase'}}
              />
              {(dishItem.type === 'Pizza'
                ? selectedPizzaOption
                : selectedDishSize) && (
                <View
                  style={{
                    backgroundColor: '#00BA00',
                    borderRadius: 50,
                    width: '32%',
                    height: height * 0.037,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    text={'Completed'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.small}
                    color={colors?.white}
                    style={{textTransform: 'uppercase'}}
                  />
                </View>
              )}
            </View>


            {dishItem?.type === 'Pizza' ? (
              <View style={{marginTop: 10, gap: height * 0.02}}>
                {pizzaSizes.map(size => (
                  <View key={size?.id}>
                    <CustomRadioButton
                      disabled={isAddedToCart ? true : false}
                      selected={selectedPizzaOption === size.value}
                      onPress={() => {
                        setSelectedPizzaOption(size.value);
                      }}
                      label={size.label}
                      colors={colors}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View style={{marginTop: 10, gap: height * 0.02}}>
                {dishSize.map(size => (
                  <View key={size?.id}>
                    <CustomRadioButton
                      disabled={isAddedToCart ? true : false}
                      selected={selectedDishSize === size.value}
                      onPress={() => {
                        setSelectedDishSize(size.value);
                      }}
                      label={size.label}
                      colors={colors}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>  */}

          {Array.isArray(dishItem?.variations) &&
            dishItem.variations.length > 0 && (
              <View style={styles?.variationContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    text={'Variation'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.xxlarge}
                    color={colors?.headingText}
                    numberOfLines={1}
                    style={{ textTransform: 'uppercase' }}
                  />

                  {selectedVariation && (
                    <View
                      style={{
                        backgroundColor: '#00BA00',
                        borderRadius: 50,
                        width: '32%',
                        height: height * 0.037,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <CustomText
                        text={'Completed'}
                        font={family?.Gilroy_SemiBold}
                        size={size?.small}
                        color={colors?.white}
                        style={{ textTransform: 'uppercase' }}
                      />
                    </View>
                  )}
                </View>

                <View style={{ marginTop: 10, gap: height * 0.02 }}>
                  {dishItem?.variations.map(variation => (
                    <View key={variation._id}>
                      <CustomRadioButton
                        disabled={isAddedToCart}
                        selectedColor={colors?.secondary}
                        selected={selectedVariation === variation}
                        onPress={() => setSelectedVariation(variation)}
                        label={`${variation.name} - $${variation.price}`}
                        colors={colors}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}

          {!isAddedToCart && (
            <>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: height * 0.03,
                }}>
                <CustomText
                  text={'EXTRA TOPPING'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.xxlarge}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase'}}
                />
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 50,
                    width: '26%',
                    height: height * 0.037,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#DDDDDD',
                  }}>
                  <CustomText
                    text={'Optional'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.small}
                    color={colors?.headingText}
                    style={{textTransform: 'uppercase'}}
                  />
                </View>
              </View>
              <CustomText
                text={'Select up to 12'}
                font={family?.Questrial_Regular}
                size={size?.small}
                color={colors?.headingText}
                numberOfLines={1}
              /> */}
              {/* <View style={{gap: height * 0.015, marginTop: 10}}>
                {toppingOptions.map((topping, index) => (
                  <View
                    key={topping.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <CustomCheckbox
                        checked={topping.checked}
                        onChange={isChecked =>
                          handleCheckboxChange(index, isChecked)
                        }
                      />
                      <CustomText
                        text={topping.label}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                        color={colors?.headingText}
                        numberOfLines={1}
                      />
                    </View>
                    <CustomText
                      text={`+ $ ${topping.charges}`}
                      font={family?.Questrial_Regular}
                      size={size?.large}
                      color={colors?.headingText}
                      numberOfLines={1}
                    />
                  </View>
                ))}
              </View> */}

              {/* {dishItem?.type === 'Pizza' && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                      marginTop: height * 0.03,
                    }}>
                    <CustomText
                      text={'Choose pizza dough'}
                      font={family?.Gilroy_SemiBold}
                      size={size?.xxlarge}
                      color={colors?.headingText}
                      numberOfLines={1}
                      style={{textTransform: 'uppercase'}}
                    />
                    <View
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 50,
                        width: '26%',
                        height: height * 0.037,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#DDDDDD',
                      }}>
                      <CustomText
                        text={'Optional'}
                        font={family?.Gilroy_SemiBold}
                        size={size?.small}
                        color={colors?.headingText}
                        style={{textTransform: 'uppercase'}}
                      />
                    </View>
                  </View>
                  <CustomText
                    text={'Select up to 1'}
                    font={family?.Questrial_Regular}
                    size={size?.small}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />

                  <View
                    style={{
                      marginTop: 10,
                      gap: height * 0.02,
                      alignSelf: 'flex-start',
                      alignItems: 'flex-start',
                      right: 5,
                    }}>
                    {pizzaDough.map(size => (
                      <View
                        key={size?.id}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}>
                        <View>
                          <CustomRadioButton
                            selected={selectDough === size.value}
                            onPress={() => setSelectedDough(size.value)}
                            label={size.label}
                            colors={colors}
                          />
                        </View>
                        <CustomText
                          text={`+ $ ${size?.charges}`}
                          font={family?.Questrial_Regular}
                          size={size?.large}
                          color={colors?.headingText}
                          numberOfLines={1}
                        />
                      </View>
                    ))}
                  </View>
                </>
              )} */}

              <View style={{ width: '100%', marginTop: height * 0.03, gap: 5 }}>
                <CustomText
                  text={'SPECIAL INSTRUCTIONS'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.xxlarge}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{ textTransform: 'uppercase' }}
                />
                <CustomText
                  text={
                    "Special request are subject to the restaurant's approval. Tell us here!"
                  }
                  font={family?.Questrial_Regular}
                  size={size?.large}
                  color={colors?.headingText}
                  style={{ marginBottom: 5 }}
                />

                <CustomTextAreaInput
                  textInputTitle={true}
                  numberOfLines={5}
                  label
                  labelTitle={'Message'}
                  marginBottom={10}
                  placeholder="Tap to add Instructions here...."
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={specialInstructions}
                  onChangeText={text => setSpecialInstructions(text)}
                  containerStyle={[styles?.input, { borderRadius: 15 }]}
                />
              </View>
            </>
          )}
        </View>
      </CustomContainer>
    </AppBackground>
  );
};

export default DishDetails;
