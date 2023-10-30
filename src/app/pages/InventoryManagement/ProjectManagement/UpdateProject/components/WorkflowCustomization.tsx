import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { WorkflowTable } from 'app/components/WorkflowTable';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ProjectTask, Task } from 'types/ProjectManagement';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'assets/icons/delete-icon.svg';
import EditIcon from 'assets/icons/edit-icon.svg';
import saveIcon from 'assets/icons/save.svg';

import { selectUpdateProject } from '../slice/selectors';
import DocumentTooltip from './DocumentTooltip';
import { StatusToDo } from '../../CreateProject/slice/types';
import { useParams } from 'react-router-dom';
import { useUpdateProjectSlice } from '../slice';

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: 'white!important',
    height: '35px',
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

interface Props {
  setItems: (value: ProjectTask[]) => void;
  items: ProjectTask[];
}

interface HeaderType {
  title: string;
  width: string;
}

export const WorkflowCustomization = memo((props: Props) => {
  const { items, setItems } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useUpdateProjectSlice();
  const params = useParams();
  const { id } = params;
  const { projectTaskList } = useSelector(selectUpdateProject);
  const [isChange, setIsChange] = useState<boolean>(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const header: HeaderType[] = [
    {
      title: t(translations.projectManagement.category),
      width: '10%',
    },
    {
      title: t(translations.projectManagement.defaultCategory),
      width: '20%',
    },
    {
      title: t(translations.projectManagement.customCategory),
      width: '30%',
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

  const onChangeMandatory = (index: number, value: boolean) => {
    const newTask: ProjectTask[] = [];
    items.map((item: ProjectTask, i: number) => {
      const newItem = { ...item };
      if (index === item.id) {
        newItem.isMandatory = value;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  const onChangeDocument = (index: number, value: string) => {
    const newTask: ProjectTask[] = [];
    items.map((item: ProjectTask, i: number) => {
      const newItem = { ...item };
      if (index === item.id) {
        newItem.documentType = value;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  useEffect(() => {
    if (projectTaskList) {
      setItems(projectTaskList.data);
    }
  }, [projectTaskList]);

  const onChangeCustomCategory = (index: number, value: string) => {
    const newTask: ProjectTask[] = [];
    items.map((item: ProjectTask, i: number) => {
      const newItem = { ...item };
      if (index === item.id) {
        newItem.customCategory = value;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
    if (!value) {
      setError(`customCategory${index}`, {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    } else {
      clearErrors(`customCategory${index}`);
    }
  };

  const onChangeDefaultCategory = (index: number, value: string) => {
    const newTask: ProjectTask[] = [];
    items.map((item: ProjectTask, i: number) => {
      const newItem = { ...item };
      if (index === item.id) {
        newItem.defaultCategory = value;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
    if (!value) {
      setError(`defaultCategory${index}`, {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    } else {
      clearErrors(`defaultCategory${index}`);
    }
  };

  const deleteTaskById = (index: number) => {
    const newTask: ProjectTask[] = [];
    let k = 0;
    items.map((item: ProjectTask, i: number) => {
      const newItem = { ...item };
      const character: string = (k + 10).toString(36).toUpperCase();
      newItem.category = `Task ${character}`;
      if (index !== item.id) {
        newTask.push(newItem);
        k = k + 1;
      }
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  const updateTaskById = (index: number) => {
    const newTask: ProjectTask[] = [];
    items.map((item: ProjectTask, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.isEdit = StatusToDo.DOING;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  const saveTaskById = (data: ProjectTask) => {
    const body = {
      ...data,
      projectId: id,
    };
    if (!data.document?.url) {
      delete body.document;
    }
    dispatch(actions.updateProjectTask(body));
  };

  const handleAddMore = () => {
    const newData = JSON.parse(JSON.stringify(items));
    const character: string = (newData.length + 10).toString(36).toUpperCase();
    newData.push({
      id: newData.length + items[newData.length - 1].id,
      category: `Task ${character}`,
      defaultCategory: 'New Category',
      customCategory: 'New Custom Category',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.TODO,
    });
    setItems(newData);
    setIsChange(!isChange);
  };

  const renderItem = (item: any) => {
    return [
      <div className="ml-6 w-[10%] text-[#6B7A99] text-[14px]">
        {`Task ${item.category}`}
      </div>,
      <RootStyle className="ml-6 w-[20%] text-[#6B7A99] pr-[1rem]">
        <TextField
          aria-describedby="my-helper-text"
          fullWidth
          value={item.defaultCategory}
          name={`defaultCategory${item.id}`}
          onChange={e => {
            onChangeDefaultCategory(item.id, e.target.value);
          }}
          error={!!errors[`defaultCategory${item.id}`]}
          helperText={errors[`defaultCategory${item.id}`]?.message}
        />
      </RootStyle>,
      <RootStyle className="ml-6 w-[30%] text-[#6B7A99]">
        <TextField
          aria-describedby="my-helper-text"
          fullWidth
          value={item.customCategory}
          name={`customCategory${item.id}`}
          onChange={e => {
            onChangeCustomCategory(item.id, e.target.value);
          }}
          error={!!errors[`customCategory${item.id}`]}
          helperText={errors[`customCategory${item.id}`]?.message}
        />
      </RootStyle>,
      <div className="ml-6 w-[20%] text-[#6B7A99]">
        <Controller
          name="consentApproval"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => {
            return (
              <div className="w-full flex items-center">
                <RadioGroup
                  aria-labelledby="radio-buttons-group"
                  name={`document-type-${item.id}`}
                  value={field.value || item.documentType}
                  onChange={e => {
                    onChangeDocument(item.id, e.target.value);
                  }}
                >
                  <div className="flex items-center">
                    <FormControlLabel
                      value="SPECIFIC"
                      control={<Radio />}
                      label="Specific"
                    />
                    <DocumentTooltip
                      title={t(translations.projectManagement.specific)}
                      content={t(
                        translations.projectManagement.specificDescription,
                      )}
                    />
                  </div>
                  <div className="flex items-center">
                    <FormControlLabel
                      value="PUBLIC"
                      control={<Radio />}
                      label="Public"
                    />
                    <DocumentTooltip
                      title={t(translations.projectManagement.public)}
                      content={t(
                        translations.projectManagement.publicDescription,
                      )}
                    />
                  </div>
                </RadioGroup>
              </div>
            );
          }}
        />
      </div>,
      <div className="ml-6 flex w-[20%] text-[#6B7A99] mt-[1.5rem]">
        <Controller
          name="mandatory"
          render={({ field }) => {
            return (
              <FormControlLabel
                control={
                  <RootCheckbox>
                    <Checkbox
                      onChange={e => {
                        const getData: boolean = e.target.value === 'true';
                        e.target.value && onChangeMandatory(item.id, !getData);
                      }}
                      value={item.isMandatory}
                      checked={item.isMandatory}
                    />
                  </RootCheckbox>
                }
                label={'Mandatory'}
              />
            );
          }}
          control={control}
        />
        {item.isEdit === StatusToDo.TODO && (
          <div className="flex" style={{ alignSelf: 'center' }}>
            <Button onClick={e => deleteTaskById(item.id)}>
              <img src={DeleteIcon} alt="delete icon" />
            </Button>
          </div>
        )}
      </div>,
    ];
  };

  return (
    <Box sx={{ mt: 4, mb: 4, width: '100%' }}>
      <Box sx={{ ml: '3rem' }}>
        <Typography sx={{ fontWeight: 600 }}>
          {t(translations.projectManagement.developerWorkflowCustomization)}
        </Typography>
        <Typography sx={{ color: '#9098a7', mt: 1 }}>
          {t(translations.projectManagement.completeYourCustomWorkflow)}
        </Typography>
      </Box>
      <WorkflowTable
        header={header}
        items={items}
        renderItem={renderItem}
        isAdded
        onclick={handleAddMore}
      />
    </Box>
  );
});
