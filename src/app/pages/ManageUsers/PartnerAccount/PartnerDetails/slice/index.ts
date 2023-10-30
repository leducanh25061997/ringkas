import { PayloadAction } from '@reduxjs/toolkit';
import { PartnerDetails } from 'types/PartnerAccountManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { partnerDetailsSaga } from './saga';
import { PartnerDetailsState } from './types';

export const initialState: PartnerDetailsState = {};

const slice = createSlice({
  name: 'partnerDetails',
  initialState,
  reducers: {
    getPartnerDetails: {
      reducer(state, action: PayloadAction<{ userUuid: string }>) {},
      prepare(payload: { userUuid: string }, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
    getPartnerDetailsSuccess(state, action: PayloadAction<PartnerDetails>) {
      state.partner = action.payload;
    },
  },
});

export const { actions: partnerDetailsActions } = slice;

export const usePartnerDetailsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: partnerDetailsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = usePartnerDetailsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
