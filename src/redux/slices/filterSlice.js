import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categotyId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categotyId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  }
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;