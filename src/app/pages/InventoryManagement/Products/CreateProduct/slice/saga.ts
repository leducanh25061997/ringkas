import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProductService, ProjectService } from 'services';
import { ProjectManagement } from 'types/ProjectManagement';

import { productManagementCreateActions as actions } from './index';
import { ProductInformation, ProductInformationResponse } from './types';

function* fetchProjects() {
  try {
    const resultProjects: ProjectManagement[] = yield call(
      ProjectService.fetchProjects,
    );
    yield put(actions.fetchProjectsSuccess(resultProjects));
  } catch (error) {
    console.log(error);
  }
}

function* createProduct(
  action: PayloadAction<
    ProductInformation,
    string,
    (value: ProductInformationResponse) => void,
    (err: any) => void
  >,
) {
  const { meta, error } = action;
  try {
    const result: ProductInformationResponse = yield call(
      ProductService.createProductRequest,
      action.payload,
    );
    yield put(actions.createProductSuccess(result));
    if (meta) {
      meta(result);
    }
  } catch (e) {
    if (error) {
      error(e.response.data);
    }
  }
}

function* updateProduct(
  action: PayloadAction<ProductInformation, string, () => void, () => void>,
) {
  const { meta, error } = action;
  try {
    const result: ProductInformationResponse = yield call(
      ProductService.updateProduct,
      action.payload,
    );
    yield put(actions.updateProductSuccess(result));
    if (meta) {
      meta();
    }
  } catch (e) {
    if (error) {
      error();
    }
  }
}

function* getProductInformation(
  action: PayloadAction<string, string, () => void, () => void>,
) {
  try {
    const result: ProductInformation = yield call(
      ProductService.fetchProductData,
      action.payload,
    );
    yield put(actions.getProductInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* productManagementCreateSaga() {
  yield takeLatest(actions.fetchProjects.type, fetchProjects);
  yield takeLatest(actions.createProduct.type, createProduct);
  yield takeLatest(actions.updateProduct.type, updateProduct);
  yield takeLatest(actions.getProductInformation.type, getProductInformation);
}
