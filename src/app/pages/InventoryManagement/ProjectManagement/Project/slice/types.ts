import { Pageable } from 'types';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import { ProjectManagement } from 'types/ProjectManagement';

export interface ProjectState {
  projectManagement?: Pageable<ProjectManagement> | null;
  isLoading?: boolean;
}
