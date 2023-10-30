import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { ProjectInformation } from 'types/ProjectManagement';

import { createProjectSaga } from './saga';

import { CreateProjectState } from './types';

export const initialState: CreateProjectState = {};

const slice = createSlice({
  name: 'createProject',
  initialState,
  reducers: {
    fetchProvinces: () => {},
    fetProvincesSuccess: (state, action: PayloadAction<string[]>) => {
      state.provinces = action.payload;
    },
    fetchCities: (state, action) => {},
    fetchCitiesSuccess: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    createProject: (state, action) => {
      state.isLoading = true;
    },
    createProjectSuccess: (
      state,
      action: PayloadAction<ProjectInformation>,
    ) => {
      state.isLoading = false;
    },
    createProjectFailed: state => {
      state.isLoading = false;
    },
  },
});

export const { actions: createProjectActions } = slice;

export const useCreateProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: createProjectSaga });
  return { actions: slice.actions };
};
