import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { MediaParams, MediaState, MediaDataItem } from './types';
import { Pageable } from '../../../../../types';
import { mediaManagementSaga } from './saga';

export const initialState: MediaState = {};

const slice = createSlice({
  name: 'uploadMedia',
  initialState,
  reducers: {
    fetchMedia: (state, action: PayloadAction<MediaParams>) => {
      state.isLoading = true;
    },
    fetchMediaSuccess: (
      state,
      action: PayloadAction<Pageable<MediaDataItem>>,
    ) => {
      state.isLoading = false;
      state.mediaFetchList = action.payload;
    },
    fetMediaFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { actions: mediaActions } = slice;

export const useMediaManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: mediaManagementSaga });
  return { actions: slice.actions };
};
