import { Box } from '@mui/material';
import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUpdateProject } from '../slice/selectors';
import { ProjectInformation } from './ProjectInformation';
import { WorkflowCustomization } from './WorkflowCustomization';

interface DataType {
  data: string;
  isEdit: boolean;
}

interface Props {
  setHouseType: (value: DataType[]) => void;
  houseType: DataType[];
  setCluster: (value: DataType[]) => void;
  cluster: DataType[];
}

export const ProjectInputForm = memo((props: Props) => {
  const { setHouseType, houseType, setCluster, cluster } = props;
  const { projectInformation } = useSelector(selectUpdateProject);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  React.useEffect(() => {
    if (projectInformation) {
      projectInformation?.certificateTypes.map(item => {
        switch (item) {
          case 'SHM':
            setValue('SHM', true);
            break;
          case 'AJB':
            setValue('AJB', true);
            break;
          case 'HGB':
            setValue('HGB', true);
            break;
          case 'SHSRS':
            setValue('SHSRS', true);
            break;
          case 'GIRIK':
            setValue('GIRIK', true);
            break;
          case 'OTHER':
            setValue('OTHER', true);
            break;
          default:
            break;
        }
      });
      if (
        projectInformation?.houseTypes &&
        projectInformation?.houseTypes.length > 0
      ) {
        setValue('houseType', projectInformation?.houseTypes[0] || '');
        const newItem: DataType[] = [];
        projectInformation?.houseTypes.map((item, index) => {
          if (index !== 0) {
            newItem.push({
              data: item,
              isEdit: true,
            });
          }
        });
        setHouseType(newItem);
      }
      if (
        projectInformation?.clusters &&
        projectInformation?.clusters.length > 0
      ) {
        setValue('cluster', projectInformation?.clusters[0] || '');
        const newItem: DataType[] = [];
        projectInformation?.clusters.map((item, index) => {
          if (index !== 0) {
            newItem.push({
              data: item,
              isEdit: true,
            });
          }
        });
        setCluster(newItem);
      }
      projectInformation?.clusters &&
        setValue('cluster', projectInformation?.clusters[0] || '');
      projectInformation?.facilities &&
        setValue('projectFacility', projectInformation?.facilities[0] || '');
      projectInformation?.accessibilities &&
        setValue(
          'projectAccessibility',
          projectInformation?.accessibilities[0] || '',
        );
      setValue('name', projectInformation?.name || '');
      setValue('provinceName', projectInformation?.provinceName || '');
      setValue('cityName', projectInformation?.cityName || '');
      setValue('fullAddress', projectInformation?.fullAddress || '');
      setValue('longitude', projectInformation?.longitude || 0);
      setValue('latitude', projectInformation?.latitude || 0);
      setValue('buildYear', projectInformation?.buildYear || '0');
      setValue('completionYear', projectInformation?.completionYear || '0');
      setValue('cerType', projectInformation?.certificateTypes[0] || '');
      setValue('location', {
        province: projectInformation?.provinceName || '',
        city: projectInformation?.cityName || '',
      });
    }
  }, [projectInformation]);

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '24px 24px 24px 24px',
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
      {/* <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '0px 24px 24px 24px',
          borderRadius: '12px',
        }}
      >
        <WorkflowCustomization />
      </Box> */}
    </div>
  );
});
