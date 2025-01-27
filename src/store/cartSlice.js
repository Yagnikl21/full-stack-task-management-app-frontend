// store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to store cart items
  totalAmount: 0, // Total price of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        state.totalAmount -= item.price * item.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },

    // Increment item quantity
    incrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
      }
    },

    // Decrement item quantity
    decrementQuantity: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
      }
    },

    // Clear the cart
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
