import { Draft, PayloadAction } from '@reduxjs/toolkit';
import {
  CustomerDetails,
  CustomerPreference,
  GetProjectsParams,
  ManageCustomerState,
  ProjectsResponse,
} from 'app/pages/ManageUsers/CustomerAccount/slice/types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { ApplicationDataSummary } from './../PreKprVerification/types';

import { PropertyDetailForm } from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import { Pageable } from 'types';
import {
  BankPreferenceForm,
  BankPreferenceFormType,
  DeveloperTaskForm,
  HousePriceForm,
} from 'types/CustomerManagement';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { FilterListParams } from '../../../../../types/FilterParams';
import {
  CreateCustomerData,
  CustomerListResponse,
  FilterCustomerParams,
} from '../ListCustomer/types';
import {
  UpdateVerificationParams,
  VerificationResponse,
} from '../PreKprVerification/types';
import { manageCustomerSaga } from './saga';
import { KPRSummaryUpdate } from 'types/DeveloperAccountManagement';

export const initialState: ManageCustomerState = {
  customersData: { data: [] },
  kycVerificationData: {
    data: { data: [], total: 0 },
  },
  bankList: { data: [], total: 0 },
};

const slice = createSlice({
  name: 'manageCustomer',
  initialState,
  reducers: {
    getListCustomer: {
      reducer(state) {
        return state;
      },
      prepare(
        params: { params: FilterCustomerParams },
        meta: (loading: boolean) => void,
      ) {
        return { payload: params, meta };
      },
    },
    getListCustomerSuccess(state, action: PayloadAction<CustomerListResponse>) {
      state.customersData.data = action.payload.data;
      state.customersData.total = action.payload.total;
    },
    getListProject: {
      reducer(state) {
        return state;
      },
      prepare(
        params: GetProjectsParams,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    getListProjectSuccess(state, action: PayloadAction<ProjectsResponse>) {
      state.projectsData = action.payload;
    },

    // getListProject by owner
    getListProjectByOwner: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(
        params: FilterListParams,
        meta?: () => void,
        error?: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    getListProjectByOwnerSuccess(
      state,
      action: PayloadAction<ProjectsResponse>,
    ) {
      state.projectsData = action.payload;
      state.isLoading = false;
    },

    createCustomer: {
      reducer(state) {
        return state;
      },
      prepare(
        params: CreateCustomerData,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    getKycVerificationData: {
      reducer(state) {
        return state;
      },
      prepare(params: string | number, meta: (loading: boolean) => void) {
        return { payload: params, meta };
      },
    },

    getKycVerificationDataSuccess(
      state,
      action: PayloadAction<{
        data: VerificationResponse;
        dataSummary: ApplicationDataSummary;
      }>,
    ) {
      state.kycVerificationData.data = action.payload.data;
      state.kycVerificationData.dataSummary = action.payload.dataSummary;
    },

    updateVerification: {
      reducer(state) {
        return state;
      },
      prepare(
        params: UpdateVerificationParams,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    fetchHousePrice: (state, action) => {},
    fetchHousePriceSuccess: (state, action: PayloadAction<HousePriceForm>) => {
      state.housePriceData = action.payload;
    },
    fetchHousePriceFailed: state => {
      state.housePriceData = undefined;
    },
    fetchDeveloperTask: (state, action) => {},
    fetchDeveloperTaskSuccess: (
      state,
      action: PayloadAction<DeveloperTaskForm[]>,
    ) => {
      state.developerTaskData = action.payload;
    },
    fetchDeveloperTaskFailed: state => {
      state.developerTaskData = [];
    },
    updateDeveloperTask: (state, action) => {
      state.isLoading = true;
    },
    updateDeveloperTaskSuccess: (
      state,
      action: PayloadAction<DeveloperTaskForm>,
    ) => {
      state.isLoading = false;
    },
    updateDeveloperTaskFailed: state => {
      state.isLoading = false;
    },
    developerDeclineApplication: {
      reducer(state) {
        return state;
      },
      prepare(params: string, meta?: (data?: CustomerDetails) => void) {
        return { payload: params, meta };
      },
    },
    developerDeclineApplicationSuccess: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
    },
    developerDeclineApplicationFailed: state => {
      state.isLoading = false;
    },
    fetchPropertyDetail: (state, action) => {
      state.propertyDetail = undefined;
    },
    fetchPropertyDetailSuccess: (
      state,
      action: PayloadAction<PropertyDetailForm>,
    ) => {
      state.propertyDetail = action.payload;
    },
    updateProperty: (state, action) => {
      state.isLoading = true;
    },
    updatePropertyTaskSuccess: (
      state,
      action: PayloadAction<PropertyDetailForm>,
    ) => {
      state.isLoading = false;
    },
    updatePropertyFailed: state => {
      state.isLoading = false;
    },

    // get customer preference
    getCustomerPreference: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(params: string, meta?: () => void, error?: () => void) {
        return { payload: params, meta, error };
      },
    },
    getCustomerPreferenceSuccess: (
      state: Draft<typeof initialState>,
      action: PayloadAction<CustomerPreference>,
    ) => {
      state.customerPreference = action.payload;
      state.isLoading = false;
    },
    getCustomerPreferenceFailed: state => {
      state.customerPreference = undefined;
      state.isLoading = false;
    },

    getCustomerDetails: {
      reducer(state) {
        return { ...state, customerDetails: undefined };
      },
      prepare(params: string | number, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    getCustomerDetailsSuccess: (
      state: Draft<typeof initialState>,
      action: PayloadAction<CustomerDetails>,
    ) => {
      state.customerDetails = action.payload;
    },

    getBankAccounts: {
      reducer(state) {
        return state;
      },
      prepare(params: any, meta: (loading: boolean) => void) {
        return { payload: params, meta };
      },
    },
    getBankAccountsSuccess(
      state,
      action: PayloadAction<Pageable<PartnerAccountForm>>,
    ) {
      state.bankList.data = action.payload.data;
      state.bankList.total = action.payload.total;
    },
    changeNewProperty: {
      reducer(state) {
        return state;
      },
      prepare(
        params: KPRSummaryUpdate,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    fetchBankPreference: (state, action) => {},
    fetchBankPreferenceSuccess: (
      state,
      action: PayloadAction<BankPreferenceFormType>,
    ) => {
      state.bankPreference = action.payload;
    },
    createBankPreference: (state, action) => {},
    createBankPreferenceSuccess: (
      state,
      action: PayloadAction<BankPreferenceFormType>,
    ) => {
      state.bankPreference = action.payload;
    },
    updateBankPreference: {
      reducer(state) {
        return state;
      },
      prepare(
        params: BankPreferenceFormType,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
  },
});

export const { actions: manageCustomerActions } = slice;

export const useManageCustomerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: manageCustomerSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useManageCustomerSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
