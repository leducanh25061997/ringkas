import { Box } from '@mui/material';
import { memo } from 'react';
import { ProjectInformation } from './ProjectInformation';
import { WorkflowCustomization } from './WorkflowCustomization';

interface DataType {
  data: string;
  isEdit: boolean;
}

interface Props {
  stepProject: number;
  setIsDisabled: (value: boolean) => void;
  setProjectAssess: (value: string[]) => void;
  projectAccess: string[];
  setHouseType: (value: DataType[]) => void;
  houseType: DataType[];
  setCluster: (value: DataType[]) => void;
  cluster: DataType[];
}

export const ProjectInputForm = memo((props: Props) => {
  const {
    stepProject,
    setIsDisabled,
    setProjectAssess,
    projectAccess,
    setHouseType,
    houseType,
    setCluster,
    cluster,
  } = props;
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '0px 24px 24px 24px',
          borderRadius: '12px',
          paddingLeft: '3rem',
          paddingRight: '4rem',
        }}
      >
        <ProjectInformation
          setHouseType={setHouseType}
          houseType={houseType}
          setCluster={setCluster}
          cluster={cluster}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '0px 24px 24px 24px',
          borderRadius: '12px',
        }}
      >
        <WorkflowCustomization />
      </Box>
    </div>
  );
});
