import { PayloadAction } from '@reduxjs/toolkit';
import { Pageable, Product } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { productManagementSaga } from './saga';
import { ProductManagementState } from './types';

export const initialState: ProductManagementState = {};

const slice = createSlice({
  name: 'productManagement',
  initialState,
  reducers: {
    fetchProductsData(state, action) {
      state.isLoading = true;
    },
    fetchProductsDataSuccess: (
      state,
      action: PayloadAction<Pageable<Product>>,
    ) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    fetchProductListFailed(state) {
      state.isLoading = false;
      state.products = null;
    },

    // products list by owner
    fetchProductsByOwner(state, action) {
      state.isLoading = true;
    },
    fetchProductsByOwnerSuccess: (
      state,
      action: PayloadAction<Pageable<Product>>,
    ) => {
      state.productsByOwner = action.payload;
      state.isLoading = false;
    },
    fetchProductByOwnerFailed(state) {
      state.isLoading = false;
      state.productsByOwner = null;
    },
  },
});

export const { actions: productManagementActions } = slice;

export const useProductManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: productManagementSaga });
  return { actions: slice.actions };
};
