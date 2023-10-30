import { FileUpload, Pageable } from 'types';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

export interface DeveloperAccountCreateState {
  isLoading?: boolean;
  fileUploadRequests?: FileUpload[];
}
