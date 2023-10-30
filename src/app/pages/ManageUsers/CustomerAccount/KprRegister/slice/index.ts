import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { KprPayload, KprState, KprParams, KprFilter } from './types';
import { kprSaga } from './saga';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: KprState = {
  isUpdateKprLoading: false,
  isGetKprLoading: false,
  isGetKprSuccess: false,
};

const slice = createSlice({
  name: 'kprInformation',
  initialState,
  reducers: {
    updateKpr: {
      reducer(state) {
        return {
          ...state,
          isUpdateKprLoading: true,
        };
      },
      prepare(payload: KprPayload, meta?: () => void, error?: () => void) {
        return { payload, meta, error };
      },
    },

    updateKprSuccess(state) {
      state.isUpdateKprLoading = false;
    },
    updateKprFailed(state) {
      state.isUpdateKprLoading = false;
    },

    // get kpr
    getKpr: {
      reducer(state) {
        return {
          ...state,
          isGetKprLoading: true,
          isGetKprSuccess: false,
        };
      },
      prepare(payload: KprFilter, meta?: () => void, error?: () => void) {
        return { payload, meta, error };
      },
    },
    getKprSuccess(state, action: PayloadAction<KprParams[]>) {
      state.isGetKprLoading = false;
      state.isGetKprSuccess = true;
      state.kpr = action.payload;
    },
    getKprFailed(state) {
      state.isGetKprLoading = false;
      state.isGetKprSuccess = false;
    },
  },
});

export const { actions: kprActions } = slice;

export const useKprSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: kprSaga });
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
