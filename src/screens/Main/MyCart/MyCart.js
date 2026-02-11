import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import FastImage from 'react-native-fast-image';
import {appIcons} from '../../../assets';
import {family, size, vh, vw} from '../../../utils';
import CustomText from '../../../components/CustomText';
import CustomCard from '../../../components/CustomCard';
import styles from './styles';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import {LOG} from '../../../utils/helperFunction';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../../redux/slices/cartSlice';

const {width, height} = Dimensions.get('screen');
const MyCart = () => {
  const cartItems = useSelector(state => state.cart.items);
  LOG('CartItems: ', cartItems);
  const dispatch = useDispatch();

  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0,
    );
  }, [cartItems]);

  const orderSummaryData = [
    {label: 'Subtotal', amount: subTotal},
    {label: 'Standard Delivery', amount: 5.12},
    {label: 'VAT', amount: 5.2},
  ];

  const totalAmount = orderSummaryData.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const formattedTotalAmount = totalAmount.toFixed(2);

  const handleCheckout = () => {
    NavService.navigate('Checkout', {
      cartItems: cartItems,
      totalAmount: totalAmount,
      subTotal: subTotal,
    });
  };

  const updateQuantity = (newQty, index) => {
    if (newQty < 1) return;

    const item = cartItems[index];
    const unitPrice =
      item.selectedVariation?.price || item.price || item.dishItem?.price || 0;
    const newTotal = unitPrice * newQty;

    dispatch(
      updateCartItemQuantity({
        id: item?.id,
        variationId: item?.selectedVariation?._id,
        quantity: newQty,
        totalPrice: parseFloat(newTotal.toFixed(2)),
      }),
    );
  };

  const renderCartItem = ({item, index}) => {
    const dishItem = item?.dishItem || {};

    return (
      <View style={{marginBottom: 15}}>
        <CustomCard
          cartCard
          item={{
            ...dishItem,
            selectedVariation: item.selectedVariation,
            specialInstructions: item?.specialInstructions,
          }}
          quantity={item.quantity}
          totalPrice={item.totalPrice}
          setQuantity={newQty => updateQuantity(newQty, index)}
          handleTrashPress={() => {
            dispatch(
              removeFromCart({
                id: item?.id,
                variationId: item?.selectedVariation?._id,
              }),
            );
          }}
        />
      </View>
    );
  };

  return (
    <AppBackground back title={'MY CART'} notification>
      <ScrollView contentContainerStyle={{paddingBottom: vh * 20}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            marginTop: 10,
            alignItems: 'center',
          }}>
          {/* Delivery Estimate */}

          {/* Cart Items or Empty */}
          <View style={{width: '100%', marginTop: 15}}>
            {cartItems.length === 0 ? (
              <View style={{alignItems: 'center', marginTop: 50}}>
                <CustomText
                  text="Your cart is empty"
                  font={family.Gilroy_SemiBold}
                  size={size.h5}
                  color={colors.headingText}
                />
              </View>
            ) : (
              <>
                <View style={styles.deliverDetails}>
                  <View style={{width: vw * 12, height: vw * 12}}>
                    <FastImage
                      source={appIcons.delivery}
                      resizeMode="contain"
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <CustomText
                    text={'Delivery 20-35 min'}
                    font={family.Questrial_Regular}
                    size={size.h6}
                    color={colors.placeholderText}
                  />
                </View>
                <FlatList
                  data={cartItems}
                  renderItem={renderCartItem}
                  keyExtractor={(item, index) => item.id + '_' + index}
                  scrollEnabled={false}
                />
              </>
            )}
          </View>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <View
              style={{alignSelf: 'flex-start', marginTop: 20, width: '100%'}}>
              <CustomText
                text={'Order Summary'}
                font={family.Gilroy_SemiBold}
                size={size.h6}
                color={colors.headingText}
                style={{textTransform: 'uppercase'}}
              />
              <View style={{marginTop: 10}}>
                {orderSummaryData.map((item, index) => (
                  <View key={index} style={styles.summaryItem}>
                    <CustomText
                      text={item.label}
                      font={family.Questrial_Regular}
                      size={size.xxlarge}
                      color={colors.headingText}
                    />
                    <CustomText
                      text={`$ ${item.amount.toFixed(2)}`}
                      font={family.Questrial_Regular}
                      size={size.xxlarge}
                      color={colors.headingText}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      {cartItems.length > 0 && (
        <View style={styles.secondContainerStyles}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  gap: vw * 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomText
                  text={'Total'}
                  font={family.Gilroy_SemiBold}
                  size={size.h1}
                  color={colors.placeholderText}
                />
                <CustomText
                  text={'(incl. fee & tax)'}
                  font={family.Questrial_Regular}
                  size={size.h6}
                  color={colors.placeholderText}
                />
              </View>
              <CustomText
                text={`$${formattedTotalAmount}`}
                font={family.Gilroy_SemiBold}
                size={size.h1}
                color={colors.placeholderText}
              />
            </View>
            <View style={{marginTop: vh * 2}}>
              <CustomButton
                gradientColorArr={[colors.secondary, colors.secondary]}
                title={'PROCEED TO CHECKOUT'}
                customWidth={width - 150}
                customHeight={50}
                buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                textStyle={{fontSize: size.large}}
                onPress={handleCheckout}
              />
            </View>
          </View>
        </View>
      )}
    </AppBackground>
  );
};

export default MyCart;
