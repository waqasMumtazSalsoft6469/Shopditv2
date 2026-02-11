import {createSlice} from '@reduxjs/toolkit';
import {LOG} from '../../utils/helperFunction';

const initialState = {
  items: [], // array of cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const newItem = action.payload;

    //   const existingIndex = state.items.findIndex(
    //     item => item.id === newItem.id && item.selectedVariation?.id === newItem.selectedVariation?.id
    //   );

    //   if (existingIndex >= 0) {
    //     // If item exists, update quantity and total price
    //     state.items[existingIndex].quantity += newItem.quantity;
    //     state.items[existingIndex].totalPrice =
    //       state.items[existingIndex].quantity *
    //       (newItem.selectedVariation?.price ?? newItem.price);
    //   } else {
    //     // Add new item to cart
    //     state.items.push({
    //       ...newItem,
    //       totalPrice:
    //         (newItem.selectedVariation?.price ?? newItem.price) * newItem.quantity,
    //     });
    //   }
    // },

    addToCart: (state, action) => {
      const newItem = action.payload;

      const newProductId = newItem.dishItem._id;
      const newVariationId = newItem.selectedVariation?._id ?? null;
      const unitPrice = newItem.selectedVariation?.price ?? newItem.price;

      const existingIndex = state.items.findIndex(cartItem => {
        const existingProductId = cartItem.dishItem._id;
        const existingVariationId = cartItem.selectedVariation?._id ?? null;

        return (
          existingProductId === newProductId &&
          existingVariationId === newVariationId
        );
      });

      if (existingIndex !== -1) {
        // 🔁 Same product + same variation
        state.items[existingIndex].quantity += newItem.quantity;
        state.items[existingIndex].totalPrice =
          state.items[existingIndex].quantity * unitPrice;
      } else {
        // 🆕 New product or new variation
        const totalPrice = unitPrice * newItem.quantity;
        state.items.push({...newItem, totalPrice});
      }
    },

    // removeFromCart: (state, action) => {
    //   const {id, variationId} = action.payload;
    //   LOG('ID: ', id);
    //   LOG('VARIATION ID: ', variationId);
    //   state.items = state.items.filter(
    //     item => !(item.id === id && item.selectedVariation?.id === variationId),
    //   );
    // },

    removeFromCart: (state, action) => {
      const {id, variationId} = action.payload;

      state.items = state.items.filter(item => {
        const isSameId = item.id === id;
        const isSameVariation =
          String(item.selectedVariation?._id) === String(variationId);

        if (variationId) {
          return !(isSameId && isSameVariation);
        } else {
          return !isSameId;
        }
      });
    },

    updateCartItemQuantity: (state, action) => {
      const {id, variationId, quantity, totalPrice} = action.payload;

      const index = state.items.findIndex(
        item =>
          item.id === id &&
          String(item.selectedVariation?._id) === String(variationId),
      );

      if (index !== -1) {
        state.items[index].quantity = quantity;
        state.items[index].totalPrice = totalPrice;
      }
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart, updateCartItemQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;
