import { Box } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectProjectInformation } from '../../slice/selectors';
import { ProjectInformation } from '../ProjectInformation';
import { WorkflowCustomization } from '../WorkflowCustomization';

interface Props {
  houseType: string[];
  setHouseType: (value: string[]) => void;
}

export const ProjectInputForm = memo((props: Props) => {
  const { houseType, setHouseType } = props;
  const { projectInformation } = useSelector(selectProjectInformation);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '0px 24px 24px 24px',
          borderRadius: '12px',
          paddingLeft: '2rem',
          paddingRight: '4rem',
        }}
      >
        <ProjectInformation houseType={houseType} />
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
