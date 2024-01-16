import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItems = state.items.find(obj => obj.id === action.payload.id);
      
      if(findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItems = state.items.find(obj => obj.id === action.payload);
      if(findItems && findItems.count > 0) {
        findItems.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  }
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;