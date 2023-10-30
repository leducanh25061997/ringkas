import { Pageable } from 'types';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

export interface DeveloperAccountState {
  developerAccountManagement?: Pageable<DeveloperAccountList>;
  isLoading?: boolean;
}
