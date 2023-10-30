import { PayloadAction } from '@reduxjs/toolkit';
import {
  ProductInformationResponse,
  PropertyDetailForm,
  PropertyForm,
} from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import Notifier from 'app/pages/Notifier';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  BankAccountService,
  ManageUserService,
  ProductService,
} from 'services';
import { Pageable } from 'types';
import {
  BankPreferenceFormType,
  DeveloperTaskForm,
  DeveloperTaskUpdateForm,
  HousePriceForm,
} from 'types/CustomerManagement';
import { KPRSummaryUpdate } from 'types/DeveloperAccountManagement';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { manageCustomerActions as actions } from '.';
import { FilterListParams } from '../../../../../types/FilterParams';
import { FilterParams } from '../../BankAccount/slice/types';
import {
  CreateCustomerData,
  CustomerListResponse,
  FilterCustomerParams,
  UserRole,
} from '../ListCustomer/types';
import {
  ApplicationDataSummary,
  UpdateVerificationParams,
  VerificationResponse,
} from '../PreKprVerification/types';
import {
  CustomerDetails,
  CustomerPreference,
  GetProjectsParams,
  ProjectsResponse,
} from './types';

function* getListCustomer(
  action: PayloadAction<
    { params: FilterCustomerParams; role: UserRole },
    string,
    (loading: boolean) => void
  >,
) {
  try {
    const { params } = action.payload;
    action.meta(true);
    const response: CustomerListResponse = yield call(
      ManageUserService.getListCustomer,
      params,
    );
    yield put(actions.getListCustomerSuccess(response));
  } catch (error) {
  } finally {
    action.meta(false);
  }
}

function* getKycVerificationData(
  action: PayloadAction<string | number, string, (loading: boolean) => void>,
) {
  try {
    action.meta(true);
    const response: [VerificationResponse, ApplicationDataSummary] = yield all([
      call(ManageUserService.getKycVerificationData, action.payload),
      call(ManageUserService.getKycDataSummary, action.payload),
    ]);

    yield put(
      actions.getKycVerificationDataSuccess({
        data: response[0],
        dataSummary: response[1],
      }),
    );
  } catch (error) {
  } finally {
    action.meta(false);
  }
}

function* updateVerification(
  action: PayloadAction<
    UpdateVerificationParams,
    string,
    () => void,
    (error: any) => void
  >,
) {
  try {
    yield call(ManageUserService.updateVerificationData, action.payload);
    action.meta();
  } catch (error: any) {
    action.error(error.response.data.message);
  }
}

function* createCustomer(
  action: PayloadAction<
    CreateCustomerData,
    string,
    () => void,
    (error: any) => void
  >,
) {
  try {
    yield call(ManageUserService.createNewCustomer, action.payload);
    action.meta();
    yield;
  } catch (error: any) {
    action.error(error.response.data.code);
  }
}

function* getListProject(
  action: PayloadAction<
    GetProjectsParams,
    string,
    () => void,
    (error: any) => void
  >,
) {
  try {
    const projectsData: ProjectsResponse = yield call(
      ManageUserService.getListProject,
      action.payload,
    );
    yield put(actions.getListProjectSuccess(projectsData));
    action.meta();
  } catch (error: any) {
    action.error(error.response.data.code);
  }
}

function* getListProjectByOwner(
  action: PayloadAction<
    FilterListParams,
    string,
    () => void,
    (error: any) => void
  >,
) {
  const { meta, error } = action;
  try {
    const projectsData: ProjectsResponse = yield call(
      ManageUserService.getListProjectByOwner,
      action.payload,
    );
    yield put(actions.getListProjectByOwnerSuccess(projectsData));
    if (meta) meta();
  } catch (err: any) {
    if (error) error(err.response.data.code);
  }
}

function* fetchHousePrice(action: PayloadAction<string>) {
  try {
    const result: HousePriceForm = yield call(
      ManageUserService.getHousePrice,
      action.payload,
    );
    yield put(actions.fetchHousePriceSuccess(result));
  } catch (error) {
    yield put(actions.fetchHousePriceFailed());
  }
}

function* fetchDeveloperTask(action: PayloadAction<string>) {
  try {
    const result: DeveloperTaskForm[] = yield call(
      ManageUserService.getDeveloperTask,
      action.payload,
    );
    yield put(actions.fetchDeveloperTaskSuccess(result));
  } catch (error) {
    yield put(actions.fetchDeveloperTaskFailed());
  }
}

function* updateDeveloperTask(action: PayloadAction<DeveloperTaskUpdateForm>) {
  try {
    const result: DeveloperTaskForm = yield call(
      ManageUserService.updateDeveloperTask,
      action.payload,
    );
    yield put(actions.fetchDeveloperTask(action.payload.id));
    yield put(actions.updateDeveloperTaskSuccess(result));
    action.payload.isNotification &&
      Notifier.addNotifySuccess({
        messageId: 'success.developerTaskSuccess',
      });
  } catch (error) {
    yield put(actions.updateDeveloperTaskFailed());
  }
}

function* fetchPropertyDetail(action: PayloadAction<string>) {
  try {
    const result: PropertyDetailForm = yield call(
      ManageUserService.getPropertyByApplicationId,
      action.payload,
    );
    yield put(actions.fetchPropertyDetailSuccess(result));
  } catch (error) {}
}

function* updateProperty(action: PayloadAction<PropertyForm>) {
  try {
    const result: PropertyDetailForm = yield call(
      ManageUserService.updatePropertyByApplicationId,
      action.payload,
    );
    Notifier.addNotifySuccess({
      messageId: 'success.changePropertySuccess',
    });
    yield put(actions.fetchPropertyDetail(action.payload.id));
    yield put(actions.updatePropertyTaskSuccess(result));
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updatePropertyFailed());
  }
}

function* getCustomerPreference(
  action: PayloadAction<string, string, () => void, () => void>,
) {
  const { meta, error } = action;
  try {
    const result: CustomerPreference = yield call(
      ManageUserService.getCustomerPreference,
      action.payload,
    );
    yield put(actions.getCustomerPreferenceSuccess(result));
    if (meta) meta();
  } catch (err) {
    yield put(actions.getCustomerPreferenceFailed());
    if (error) error();
  }
}
function* getCustomerDetails(
  action: PayloadAction<string, string, () => void, () => void>,
) {
  const { meta } = action;
  try {
    const result: CustomerDetails = yield call(
      ManageUserService.getCustomerDetails,
      action.payload,
    );
    yield put(actions.getCustomerDetailsSuccess(result));
    if (meta) meta();
  } catch (err) {
    if (meta) meta();
  }
}

function* getBankAccounts(
  action: PayloadAction<FilterParams, string, (loading: boolean) => void>,
) {
  try {
    const params: any = action.payload;
    action.meta(true);
    const response: Pageable<PartnerAccountForm> = yield call(
      BankAccountService.getListBanks,
      params,
    );
    yield put(actions.getBankAccountsSuccess(response));
  } catch (error) {
  } finally {
    action.meta(false);
  }
}

function* changeNewProperty(
  action: PayloadAction<
    KPRSummaryUpdate,
    string,
    () => void,
    (error: any) => void
  >,
) {
  try {
    if (action.payload.property.propertyId) {
      yield call(ProductService.updateProduct, action.payload.property);
      yield call(ManageUserService.updateHousePrice, action.payload.pricing);
    } else {
      const result: ProductInformationResponse = yield call(
        ProductService.createProductRequest,
        action.payload.property,
      );
      const data: PropertyForm = {
        id: action.payload.property.id,
        propertyId: result.id,
      };
      action.payload.pricing.id = result.id;
      // yield call(ManageUserService.updateHousePrice, action.payload.pricing);
      yield call(ManageUserService.updatePropertyByApplicationId, data);
    }
    action.meta();
  } catch (error: any) {
    action.error(error.response.data.message);
  }
}

function* fetchBankPreference(action: PayloadAction<string>) {
  try {
    const result: BankPreferenceFormType = yield call(
      ManageUserService.getBankPreference,
      action.payload,
    );
    yield put(actions.fetchBankPreferenceSuccess(result));
  } catch (error) {}
}

function* createBankPreference(action: PayloadAction<BankPreferenceFormType>) {
  try {
    const result: BankPreferenceFormType = yield call(
      ManageUserService.createBankPreference,
      action.payload,
    );
    yield put(actions.fetchBankPreference(action.payload.id));
    yield put(actions.createBankPreferenceSuccess(result));
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updatePropertyFailed());
  }
}

function* updateBankPreference(
  action: PayloadAction<
    BankPreferenceFormType,
    string,
    () => void,
    (error: any) => void
  >,
) {
  try {
    yield call(ManageUserService.updateBankPreference, action.payload);
    yield put(actions.fetchBankPreference(action.payload.id));
    action.meta();
  } catch (error: any) {
    action.error(error.response.data.message);
  }
}

function* developerDeclineApplication(
  action: PayloadAction<
    string,
    string,
    (data?: CustomerDetails) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: CustomerDetails = yield call(
      ManageUserService.developerDeclineApplication,
      action.payload,
    );
    if (meta) {
      meta(result);
    }
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
  }
}

export function* manageCustomerSaga() {
  yield takeLatest(actions.getListProject.type, getListProject);
  yield takeLatest(actions.getListCustomer.type, getListCustomer);
  yield takeLatest(actions.createCustomer.type, createCustomer);
  yield takeLatest(actions.getKycVerificationData.type, getKycVerificationData);
  yield takeLatest(actions.updateVerification.type, updateVerification);
  yield takeLatest(actions.fetchHousePrice.type, fetchHousePrice);
  yield takeLatest(actions.fetchDeveloperTask.type, fetchDeveloperTask);
  yield takeLatest(actions.updateDeveloperTask.type, updateDeveloperTask);
  yield takeLatest(actions.fetchPropertyDetail.type, fetchPropertyDetail);
  yield takeLatest(actions.updateProperty.type, updateProperty);
  yield takeLatest(actions.getCustomerPreference.type, getCustomerPreference);
  yield takeLatest(actions.getListProjectByOwner.type, getListProjectByOwner);
  yield takeLatest(actions.getCustomerDetails.type, getCustomerDetails);
  yield takeLatest(actions.getBankAccounts.type, getBankAccounts);
  yield takeLatest(actions.changeNewProperty.type, changeNewProperty);
  yield takeLatest(actions.fetchBankPreference.type, fetchBankPreference);
  yield takeLatest(actions.createBankPreference.type, createBankPreference);
  yield takeLatest(actions.updateBankPreference.type, updateBankPreference);
  yield takeLatest(
    actions.developerDeclineApplication.type,
    developerDeclineApplication,
  );
}
