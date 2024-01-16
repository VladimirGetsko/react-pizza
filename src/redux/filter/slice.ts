import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: '',
  categotyId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categotyId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      // if(Object.keys(action.payload).length) {
      //   state.currentPage = Number(action.payload.currentPage);
      //   state.categotyId = Number(action.payload.categotyId);
      //   state.sort = action.payload.sort;
      // } else {
      //   state.categotyId = 0,
      //   state.currentPage = 1,
      //   state.sort = {
      //     name: 'популярности',
      //     sortProperty: SortPropertyEnum.RATING_DESC,
      //   }
      // }

      state.currentPage = Number(action.payload.currentPage);
      state.categotyId = Number(action.payload.categotyId);
      state.sort = action.payload.sort;
    }
  }
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;