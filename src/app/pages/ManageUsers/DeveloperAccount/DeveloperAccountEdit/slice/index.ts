import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';

import { developerAccountEditSaga } from './saga';
import { DeveloperAccountEditState, DeveloperAccountInfor } from './types';

export const initialState: DeveloperAccountEditState = {};

const slice = createSlice({
  name: 'editDevelopAccount',
  initialState,
  reducers: {
    fetchDeveloperAccountInfo(state, action) {},
    fetchDeveloperAccountInfoSuccess(
      state,
      action: PayloadAction<DeveloperAccountInfor>,
    ) {
      state.developerAccountInfo = action.payload;
    },
    editDeveloperAccountInfo(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    editDeveloperAccountInfoSuccess(state, action) {
      state.isLoading = false;
    },
    editDeveloperAccountInfoFailed(state, action) {
      state.isLoading = false;
    },

    fetchUrlFileRequestsSuccess: (state, action) => {},
    fetchUrlFileRequestsFailed: (state, action) => {},
  },
});

export const { actions: developerAccountEditActions } = slice;

export const useDeveloperAccountEditSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: developerAccountEditSaga });
  return { actions: slice.actions };
};
