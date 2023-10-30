import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import { BankLoanForm, ChangeKprProgramStatus } from 'types/BankLoanManagement';
import { kprProgramManagementSaga } from './saga';
import { KprProgramState } from './types';

export const initialState: KprProgramState = {};

const slice = createSlice({
  name: 'KprProgramManagement',
  initialState,
  reducers: {
    fetchKprProgramList(state, action) {
      state.isLoading = true;
    },
    fetchKprProgramListSuccess(
      state,
      action: PayloadAction<Pageable<BankLoanForm>>,
    ) {
      state.kprProgramManagement = action.payload;
      state.isLoading = false;
    },
    fetchKprProgramListFailed(state) {
      state.isLoading = false;
      state.kprProgramManagement = null;
    },

    updateKprProgramStatus: {
      reducer(state) {
        return state;
      },
      prepare(
        params: ChangeKprProgramStatus,
        meta?: (ChangeStatus?: ChangeKprProgramStatus) => void,
      ) {
        return { payload: params, meta };
      },
    },
    updateKprProgramStatusSuccess(
      state,
      action: PayloadAction<ChangeKprProgramStatus>,
    ) {},
    createKprProgram: (state, action) => {
      state.isLoading = true;
    },
    createKprProgramSuccess: (state, action: PayloadAction<BankLoanForm>) => {
      state.isLoading = false;
    },
    createKprProgramFailed: state => {
      state.isLoading = false;
    },
  },
});

export const { actions: kprProgramManagementActions } = slice;

export const useKprProgramManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: kprProgramManagementSaga });
  return { actions: slice.actions };
};
