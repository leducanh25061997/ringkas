import { NavigateFunction } from 'react-router';
import { Pageable } from 'types';
import { ProjectInformation, ProjectTask } from 'types/ProjectManagement';

export interface UpdateProjectState {
  provinces?: string[];
  cities?: string[];
  projectInformation?: ProjectInformation;
  projectTaskList?: Pageable<ProjectTask>;
  isLoading?: boolean;
}

export interface BodyProjectTask {
  formData: ProjectTask[];
  navigate: NavigateFunction;
  id: number;
}
