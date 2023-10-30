import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import { ProjectManagement } from 'types/ProjectManagement';

import { projectManagementSaga } from './saga';
import { ProjectState } from './types';

export const initialState: ProjectState = {};

const slice = createSlice({
  name: 'projectManagement',
  initialState,
  reducers: {
    fetchProjectList(state, action) {
      state.isLoading = true;
    },
    fetchProjectListSuccess(
      state,
      action: PayloadAction<Pageable<ProjectManagement>>,
    ) {
      state.projectManagement = action.payload;
      state.isLoading = false;
    },
    fetchProjectListFailed(state) {
      state.isLoading = false;
      state.projectManagement = null;
    },
  },
});

export const { actions: projectManagementActions } = slice;

export const useProjectManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectManagementSaga });
  return { actions: slice.actions };
};
