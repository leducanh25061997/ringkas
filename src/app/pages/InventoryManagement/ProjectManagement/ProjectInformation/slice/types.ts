import { Pageable } from 'types';
import { ProjectInformation, ProjectTask } from 'types/ProjectManagement';

export interface ProjectInformationState {
  projectInformation?: ProjectInformation;
  projectTaskList?: Pageable<ProjectTask>;
}

export enum FieldInput {
  'SHM' = 'Sertifikat Hk Milik (SHM)',
  'AJB' = 'Akta Jual Beli (AJB)',
  'HGB' = 'Hak Guna Bangun (HGB)',
  'SHSRS' = 'Sertifikat Hak Satuan Rumah Susun (SHSRS)',
  'GIRIK' = 'Girik',
  'OTHER' = 'Others Certificate Type',
}
