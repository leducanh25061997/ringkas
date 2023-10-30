import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { VerificationStatusResponse } from '../../PreKprVerification/types';

import { scoringReadySaga } from './saga';
import {
  AssessmentDataResponse,
  HousePriceResponse,
  ScoringReadyState,
} from './types';

export const initialState: ScoringReadyState = {
  loading: false,
};

const slice = createSlice({
  name: 'scoringReady',
  initialState,
  reducers: {
    getScoringData(state, action: PayloadAction<string>) {
      state.loading = true;
      state.assessmentData = undefined;
      state.housePriceData = undefined;
      state.kycStatus = undefined;
    },
    getScoringDataSuccess(
      state,
      action: PayloadAction<
        [AssessmentDataResponse, HousePriceResponse, VerificationStatusResponse]
      >,
    ) {
      state.assessmentData = action.payload[0];
      state.housePriceData = action.payload[1];
      state.kycStatus = action.payload[2];
      state.loading = false;
    },
    getScoringDataError(state) {
      state.assessmentData = undefined;
      state.housePriceData = undefined;
      state.kycStatus = undefined;
      state.loading = false;
    },

    updateAssessment: {
      reducer(state) {
        return state;
      },
      prepare(payload: any, meta: () => void, error: (err: any) => void) {
        return { payload, meta, error };
      },
    },
  },
});

export const { actions: scoringReadyActions } = slice;

export const useScoringReadySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: scoringReadySaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useScoringReadySlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
