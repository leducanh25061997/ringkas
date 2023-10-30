import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ProductService } from 'services';
import { Pageable, Product } from 'types';
import { FilterListParams } from 'types/FilterParams';

import { productManagementActions as actions } from '.';

function* fetchProductsData(action: PayloadAction<FilterListParams>) {
  try {
    const result: Pageable<Product> = yield call(
      ProductService.fetchProductsData,
      action.payload,
    );
    yield put(actions.fetchProductsDataSuccess(result));
  } catch (error) {
    yield put(actions.fetchProductListFailed());
    console.log(error);
  }
}

function* fetchProductsByOwner(action: PayloadAction<FilterListParams>) {
  try {
    const result: Pageable<Product> = yield call(
      ProductService.fetchProductsDataByOwner,
      action.payload,
    );
    yield put(actions.fetchProductsByOwnerSuccess(result));
  } catch (error) {
    yield put(actions.fetchProductByOwnerFailed());
  }
}

export function* productManagementSaga() {
  yield takeLatest(actions.fetchProductsData.type, fetchProductsData);
  yield takeLatest(actions.fetchProductsByOwner.type, fetchProductsByOwner);
}
