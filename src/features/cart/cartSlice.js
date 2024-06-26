import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity: quantity,
        });
      }

      state.totalQuantity += quantity;
    },
    removeFromCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity -= quantity;

        if (existingProduct.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        }
      }

      state.totalQuantity -= quantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
    buyItems: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, buyItems } = cartSlice.actions;
export default cartSlice.reducer;
