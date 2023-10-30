import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

import { createDeveloperSaga } from './saga';
import { DeveloperAccountCreateState } from './types';

export const initialState: DeveloperAccountCreateState = {};

const slice = createSlice({
  name: 'developerAccountCreate',
  initialState,
  reducers: {
    createDeveloperRequest(state, action) {
      state.isLoading = true;
    },
    createDeveloperRequestSuccess(state, action: any) {
      state.isLoading = false;
    },
    createDeveloperRequestFailed(state) {
      state.isLoading = false;
    },

    fetchUrlFileRequest(state, action: PayloadAction<any>) {},

    fetchUrlFileRequestsSuccess: (state, action) => {
      state.fileUploadRequests = action.payload;
    },

    fetchUrlFileRequestsFailed: (state, action) => {},
  },
});

export const { actions: createDeveloperActions } = slice;

export const useCreateDeveloperSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: createDeveloperSaga });
  return { actions: slice.actions };
};
