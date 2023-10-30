import {
  DataSource,
  DataType,
} from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/types';
export interface AssessmentRowProps {
  parameter?: string;
  dataSource?: keyof typeof DataSource;
  dataType?: keyof typeof DataType;
  value?: string | number;
  editable?: boolean;
}
