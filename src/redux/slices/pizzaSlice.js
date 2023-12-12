import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, orderSort, categoty, search, currentPage } = params;

    const { data } = await axios.get(
        `https://654f76e5358230d8f0cd58cf.mockapi.io/items?page=${currentPage}&limit=4&${categoty}&sortBy=${sortBy}&order=${orderSort}${search}`
      )
    return data;
  }
)

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;