import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import {
  ChangeProjectStatus,
  ProjectInformation,
  ProjectTask,
} from 'types/ProjectManagement';

import { projectInformationSaga } from './saga';

import { ProjectInformationState } from './types';

export const initialState: ProjectInformationState = {};

const slice = createSlice({
  name: 'projectInformation',
  initialState,
  reducers: {
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
  },
});

export const { actions: updateProjectActions } = slice;

export const useProjectInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectInformationSaga });
  return { actions: slice.actions };
};
