import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import {
  ChangeProjectStatus,
  ProjectInformation,
  ProjectInformationParams,
  ProjectTask,
} from 'types/ProjectManagement';

import { updateProjectSaga } from './saga';

import { UpdateProjectState } from './types';

export const initialState: UpdateProjectState = {};

const slice = createSlice({
  name: 'updateProject',
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
    fetchProjectDetail: (state, action) => {},
    fetchProjectDetailSuccess: (
      state,
      action: PayloadAction<ProjectInformation>,
    ) => {
      state.projectInformation = action.payload;
    },
    fetchProjectTaskList: (state, action) => {},
    fetchProjectTaskListSuccess: (
      state,
      action: PayloadAction<Pageable<ProjectTask>>,
    ) => {
      state.projectTaskList = action.payload;
    },
    updateProjectStatus: {
      reducer(state) {
        return state;
      },
      prepare(
        params: ChangeProjectStatus,
        meta?: (ChangeStatus?: ChangeProjectStatus) => void,
      ) {
        return { payload: params, meta };
      },
    },
    updateProjectStatusSuccess(
      state,
      action: PayloadAction<ChangeProjectStatus>,
    ) {},
    updateProjectStatusFailed() {},
    updateProject: (state, action) => {
      state.isLoading = true;
    },
    updateProjectSuccess: (
      state,
      action: PayloadAction<ProjectInformationParams>,
    ) => {
      state.isLoading = false;
      state.projectInformation = action.payload;
    },
    updateProjectFailed: state => {
      state.isLoading = false;
    },
    updateProjectTask: (state, action) => {},
    createProjectTask: {
      reducer(state) {
        return state;
      },
      prepare(params: ProjectTask, meta?: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    createProjectTaskSuccess(state, action: PayloadAction<any>) {},
    updateMultiProjectTask: (state, action) => {
      state.isLoading = true;
    },
    updateMultiProjectTaskSuccess: (
      state,
      action: PayloadAction<ProjectTask[]>,
    ) => {
      state.isLoading = false;
    },
    updateMultiProjectTaskFailed: state => {
      state.isLoading = false;
    },
  },
});

export const { actions: updateProjectActions } = slice;

export const useUpdateProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: updateProjectSaga });
  return { actions: slice.actions };
};
