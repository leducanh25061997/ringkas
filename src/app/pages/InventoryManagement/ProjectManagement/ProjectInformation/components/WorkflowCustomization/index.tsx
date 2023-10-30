import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ProjectTask } from 'types/ProjectManagement';
import EditIcon from 'assets/icons/edit-icon.svg';

import { selectProjectInformation } from '../../slice/selectors';
import DocumentTooltip from '../DocumentTooltip';
import { WorkflowTable } from '../WorkflowTable';
import path from 'app/routes/path';
import { useNavigate, useParams } from 'react-router-dom';

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  '& .MuiInputBase-root': {
    borderBottomColor: 'unset',
    borderRadius: '8px',
    border: '1px solid #C3CAD9',
    padding: '0 1rem',
    color: '#6B7A99',
  },
  '& .MuiInputBase-root:before': {
    right: 'unset',
    content: '""',
    border: 'unset',
    '&.focus': {
      border: 'unset',
    },
  },
  '& .MuiInput-root:after': {
    border: 'unset!important',
  },
  '& .MuiInput-root:before': {
    border: 'unset!important',
  },
});

export const RootCheckbox = styled('div')({
  '& .MuiCheckbox-root': {
    color: '#C6D7E0',
    '&.Mui-checked': {
      color: '#005FB6!important',
    },
  },
});

interface Props {}

interface HeaderType {
  title: string;
  width: string;
}

export const WorkflowCustomization = memo((props: Props) => {
  const { t } = useTranslation();
  const { projectTaskList } = useSelector(selectProjectInformation);
  const [items, setItems] = useState<ProjectTask[]>([]);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (projectTaskList) {
      setItems(projectTaskList.data);
    }
  }, [projectTaskList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const header: HeaderType[] = [
    {
      title: t(translations.projectManagement.category),
      width: '20%',
    },
    {
      title: t(translations.projectManagement.defaultCategory),
      width: '20%',
    },
    {
      title: t(translations.projectManagement.customCategory),
      width: '20%',
    },
    {
      title: t(translations.projectManagement.documentType),
      width: '20%',
    },
    {
      title: t(translations.projectManagement.configuration),
      width: '20%',
    },
  ];

  const renderItem = (item: any) => {
    return [
      <div className="ml-6 w-[20%] text-[#6B7A99] text-[14px]">
        {`Task ${item.category}`}
      </div>,
      <div className="ml-6 w-[20%] text-[#6B7A99] text-[14px]">
        {item.defaultCategory}
      </div>,
      <div className="ml-6 w-[20%] text-[#6B7A99] text-[14px]">
        {item.customCategory}
      </div>,
      <div className="ml-6 w-[20%] text-[#6B7A99] text-[14px]">
        {item.documentType === 'SPECIFIC' ? 'Specific' : 'Public'}
      </div>,
      <div className="ml-6 w-[20%] text-[#6B7A99] text-[14px]">
        {item.isMandatory ? 'Mandatory' : 'Not Selected'}
      </div>,
    ];
  };

  const updateProjectTask = () => {
    navigate(`${path.project}/task/update/${id}`);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, width: '100%' }}>
      <Box sx={{ ml: '2rem' }}>
        <div className="flex">
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#223250',
              mr: '1rem',
            }}
          >
            {t(translations.projectManagement.developerWorkflowCustomization)}
          </Typography>
          <img src={EditIcon} alt="edit icon" onClick={updateProjectTask} />
        </div>
      </Box>
      <WorkflowTable header={header} items={items} renderItem={renderItem} />
    </Box>
  );
});
