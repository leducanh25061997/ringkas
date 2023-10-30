import { PayloadAction } from '@reduxjs/toolkit';
import { ProjectManagement } from 'types/ProjectManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { productManagementCreateSaga } from './saga';

import {
  ProductInformation,
  ProductInformationResponse,
  ProductState,
} from './types';

export const initialState: ProductState = {};

const slice = createSlice({
  name: 'productState',
  initialState,
  reducers: {
    fetchProjects(state) {
      state.isLoading = true;
    },
    fetchProjectsSuccess(state, action: PayloadAction<ProjectManagement[]>) {
      state.projects = action.payload;
      state.isLoading = false;
    },
    fetchProjectsFailed(state) {
      state.isLoading = false;
    },

    // create new product

    createProduct: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(
        params: ProductInformation,
        meta: (value: ProductInformationResponse) => void,
        error: (err: any) => void,
      ) {
        return { payload: params, meta, error };
      },
    },

    createProductSuccess(
      state,
      action: PayloadAction<ProductInformationResponse>,
    ) {
      state.isLoading = false;
    },

    createProductFailed(state) {
      state.isLoading = false;
    },

    // update new product

    updateProduct: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(params: ProductInformation, meta: () => void, error: () => void) {
        return { payload: params, meta, error };
      },
    },

    updateProductSuccess(
      state,
      action: PayloadAction<ProductInformationResponse>,
    ) {
      state.isLoading = false;
    },

    updateProductFailed(state) {
      state.isLoading = false;
    },

    // get product information
    getProductInformation: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(params: string) {
        return { payload: params };
      },
    },

    getProductInformationSuccess(state, action) {
      state.isLoading = false;
      state.productDetail = action.payload;
    },

    getProductInformationFailed(state, action) {
      state.isLoading = false;
    },
  },
});

export const { actions: productManagementCreateActions } = slice;

export const useProductManagementCreateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: productManagementCreateSaga });
  return { actions: slice.actions };
};
