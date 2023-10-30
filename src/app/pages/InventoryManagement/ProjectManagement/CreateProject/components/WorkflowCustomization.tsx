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
import { StatusToDo, Task } from '../slice/types';
import DocumentTooltip from './DocumentTooltip';
import DeleteIcon from 'assets/icons/delete-icon.svg';
import EditIcon from 'assets/icons/edit-icon.svg';
import saveIcon from 'assets/icons/save.svg';
import { stubFalse } from 'lodash';
import { ProjectTask } from 'types/ProjectManagement';

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

interface Props {}

interface HeaderType {
  title: string;
  width: string;
}

export const WorkflowCustomization = memo((props: Props) => {
  const { t } = useTranslation();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [data, setData] = useState<Task[]>([
    {
      id: 0,
      category: 'Task A',
      defaultCategory: 'Booking',
      customCategory: 'Reservasi',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.DONE,
    },
    {
      id: 1,
      category: 'Task B',
      defaultCategory: 'Pre-sales Contract',
      customCategory: 'Surat Pemesanan',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.DONE,
    },
    {
      id: 2,
      category: 'Task C',
      defaultCategory: 'Sales Contract',
      customCategory: 'PPJB',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.DONE,
    },
    {
      id: 3,
      category: 'Task D',
      defaultCategory: 'Down Payment',
      customCategory: 'Bukti Lunas Uang Muka',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.DONE,
    },
    {
      id: 4,
      category: 'Task E',
      defaultCategory: 'Transfer of Title',
      customCategory: 'BAST',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.DONE,
    },
    {
      id: 5,
      category: 'Task F',
      defaultCategory: 'Transfer of Title',
      customCategory: 'AJB',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.DONE,
    },
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    control,
    setValue,
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
      width: '25%',
    },
    {
      title: t(translations.projectManagement.documentType),
      width: '20%',
    },
    {
      title: t(translations.projectManagement.configuration),
      width: '25%',
    },
  ];

  const deleteTaskById = (index: number) => {
    const newTask: Task[] = [];
    let k = 0;
    data.map((item: Task, i: number) => {
      const newItem = { ...item };
      const character: string = (k + 10).toString(36).toUpperCase();
      newItem.category = `Task ${character}`;
      if (index !== i) {
        newTask.push(newItem);
        k = k + 1;
      }
    });
    setData(newTask);
    setIsChange(!isChange);
  };

  const updateTaskById = (index: number) => {
    const newTask: Task[] = [];
    data.map((item: Task, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.isEdit = StatusToDo.DOING;
      }
      newTask.push(newItem);
    });
    setData(newTask);
    setIsChange(!isChange);
  };

  const saveTaskById = (index: number) => {
    const newTask: Task[] = [];
    data.map((item: Task, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.isEdit = StatusToDo.DONE;
      }
      newTask.push(newItem);
    });
    setData(newTask);
    setIsChange(!isChange);
  };

  const onChangeDefaultCategory = (index: number, value: string) => {
    const newTask: Task[] = [];
    data.map((item: Task, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.defaultCategory = value;
      }
      newTask.push(newItem);
    });
    setData(newTask);
    setIsChange(!isChange);
    if (!value) {
      setError(`defaultCategory${index}`, {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    } else {
      clearErrors(`defaultCategory${index}`);
    }
  };

  const onChangeCustomCategory = (index: number, value: string) => {
    const newTask: Task[] = [];
    data.map((item: Task, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.customCategory = value;
      }
      newTask.push(newItem);
    });
    setData(newTask);
    setIsChange(!isChange);
    if (!value) {
      setError(`customCategory${index}`, {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    } else {
      clearErrors(`customCategory${index}`);
    }
  };

  const onChangeDocument = (index: number, value: string) => {
    const newTask: Task[] = [];
    data.map((item: Task, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.documentType = value;
      }
      newTask.push(newItem);
    });
    setData(newTask);
    setIsChange(!isChange);
  };

  const onChangeMandatory = (index: number, value: boolean) => {
    const newTask: Task[] = [];
    data.map((item: Task, i: number) => {
      const newItem = item;
      if (index === i) {
        newItem.isMandatory = value;
      }
      newTask.push(newItem);
    });
    setData(newTask);
    setIsChange(!isChange);
  };

  const renderItem = (item: any) => {
    return [
      <div className="ml-6 w-[10%] text-[#6B7A99] text-[14px]">
        {item.category}
      </div>,
      item.isEdit === StatusToDo.TODO ? (
        <RootStyle className="ml-6 w-[20%] text-[#6B7A99] pr-[1rem]">
          <TextField
            aria-describedby="my-helper-text"
            fullWidth
            value={item.defaultCategory}
            onChange={e => {
              onChangeDefaultCategory(item.id, e.target.value);
            }}
            name={`defaultCategory${item.id}`}
            error={!!errors[`defaultCategory${item.id}`]}
            helperText={errors[`defaultCategory${item.id}`]?.message}
          />
        </RootStyle>
      ) : (
        <div className="ml-6 w-[20%] text-[#6B7A99] text-[14px]">
          {item.defaultCategory}
        </div>
      ),
      <RootStyle className="ml-6 w-[25%] text-[#6B7A99] pr-[1rem]">
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
          name={`consentApproval-${item.id}`}
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
                    field.onChange(e);
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
                      content={'Dokumen untuk pihak tertenku'}
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
                      content={'Dokumen untuk semua tertenku'}
                    />
                  </div>
                </RadioGroup>
              </div>
            );
          }}
        />
      </div>,
      <div className="ml-6 flex w-[25%] text-[#6B7A99]">
        <Controller
          name="isMandatory"
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
            {/* <Button onClick={e => updateTaskById(item.id)}>
              <img src={EditIcon} alt="edit icon" />
            </Button> */}
            <Button onClick={e => deleteTaskById(item.id)}>
              <img src={DeleteIcon} alt="delete icon" />
            </Button>
          </div>
        )}
        {item.isEdit === StatusToDo.DOING && (
          <div className="flex" style={{ alignSelf: 'center' }}>
            <Button onClick={e => saveTaskById(item.id)}>
              <img src={saveIcon} alt="save icon" />
            </Button>
          </div>
        )}
      </div>,
    ];
  };

  const handleAddMore = () => {
    const newData = data;
    const character: string = (newData.length + 10).toString(36).toUpperCase();
    newData.push({
      id: newData.length,
      category: `Task ${character}`,
      defaultCategory: 'New Category',
      customCategory: 'New Custom Category',
      documentType: 'SPECIFIC',
      isMandatory: false,
      isEdit: StatusToDo.TODO,
    });
    setData(newData);
    setIsChange(!isChange);
  };

  useEffect(() => {
    if (data) {
      const newData: ProjectTask[] = [];
      data.map((item: Task) => {
        const newItem: ProjectTask = {
          defaultCategory: item.defaultCategory,
          customCategory: item.customCategory,
          documentType: item.documentType,
          isMandatory: item.isMandatory,
        };
        newData.push(newItem);
      });
      setValue('tasks', newData);
    }
  }, [data]);

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
        items={data}
        onclick={handleAddMore}
        renderItem={renderItem}
        isAdded
      />
    </Box>
  );
});
