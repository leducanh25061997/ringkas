import { Box, FormControlLabel, styled, TextField } from '@mui/material';
import { CustomStatus } from 'app/components/CustomSwitch';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { WorkspaceTable } from './WorkspaceTable';
import deleteIcon from 'assets/icons/delete-icon-no-fill.svg';
import { useDispatch, useSelector } from 'react-redux';

import { selectManageCustomer } from '../../../slice/selectors';
import { DeveloperTaskBody, DeveloperTaskForm } from 'types/CustomerManagement';
import UploadZone from './UploadZone';
import { useParams } from 'react-router-dom';
import { useManageCustomerSlice } from '../../../slice';
import { ParamsUrl } from 'types';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';

const LinkFile = styled('a')({
  fontWeight: 600,
  textDecoration: 'underline',
  color: '#005FC5',
  width: '200px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  ':visited': {
    color: '#005FC5',
  },
});

const TextareaStyle = styled('div')({
  textarea: {
    overflowY: 'scroll!important',
    maxHeight: '70px!important',
    '::-webkit-scrollbar': {
      width: '6px',
      borderRadius: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#8D96B0',
      borderRadius: '8px',
    },
    ':focus': {
      '::-webkit-scrollbar-track': {
        background: '#C3CAD9',
        borderRadius: '8px',
      },
    },
  },
  '& .MuiOutlinedInput-root': {
    flexFlow: 'column-reverse',
    maxHeight: '80px',
  },
});

const CustomDate = styled('div')({
  input: {
    paddingRight: '0px!important',
    paddingLeft: '20px!important',
  },
  '& .MuiButtonBase-root': {
    paddingLeft: '0px',
  },
  '& .MuiFilledInput-root': {
    '&.Mui-disabled': {
      backgroundColor: 'white',
    },
  },
});

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  color: '#6B7A99',
  marginTop: '3px',
});

const DisplayFlex = styled('div')({
  display: 'flex',
});

interface Props {}

interface HeaderType {
  title: string;
  width: string;
}

export const DeveloperTask = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { actions } = useManageCustomerSlice();
  const { developerTaskData, isLoading } = useSelector(selectManageCustomer);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [dataUpload, setDataUpload] = useState<DeveloperTaskForm>();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [directionHeader, setDirectionHeader] = useState<
    'ascending' | 'descending' | 'none'
  >('ascending');
  const handleOnChangeStatus = (data: DeveloperTaskForm) => {
    const status: string =
      data.status.toLowerCase() === 'done' ? 'UNDONE' : 'DONE';
    const newItems: DeveloperTaskForm[] = [];
    items.map((item: DeveloperTaskForm) => {
      const newItem = { ...item };
      if (item?.id === data.id) {
        newItem.status = status;
      }
      newItems.push(newItem);
    });
    setItems(newItems);
    setIsChange(isChange);
  };

  const onChangeNote = (e: any, id?: string) => {
    const newItems: DeveloperTaskForm[] = [];
    items.map((item: DeveloperTaskForm) => {
      const newItem = { ...item };
      if (item?.id === id) {
        newItem.note = e.target.value;
      }
      newItems.push(newItem);
    });
    setItems(newItems);
    setIsChange(isChange);
  };

  const updateDeveloperTask = () => {
    const newBody: DeveloperTaskBody[] = [];
    items.map(item => {
      const newFiles: string[] = [];
      item.fileDocuments &&
        item.fileDocuments.map(file => {
          newFiles.push(file?.s3Key || '');
        });
      const formData: DeveloperTaskBody = {
        fileDocuments: newFiles,
        status: item.status,
        note: item.note,
        id: item?.id || 0,
      };
      newBody.push(formData);
    });
    dispatch(
      actions.updateDeveloperTask({
        id,
        formData: newBody,
        isNotification: true,
      }),
    );
  };

  const deleteFiles = (data: DeveloperTaskForm, index: number) => {
    const newFiles: string[] = [];
    data.fileDocuments.map((item, i: number) => {
      if (i !== index) {
        newFiles.push(item?.s3Key || '');
      }
    });
    const formData: DeveloperTaskBody = {
      fileDocuments: newFiles,
      status: newFiles.length > 0 ? 'DONE' : 'UNDONE',
      note: data?.note || '',
      id: data?.id || 0,
    };
    dispatch(
      actions.updateDeveloperTask({
        id,
        formData,
      }),
    );
  };
  const [items, setItems] = useState<DeveloperTaskForm[]>([]);
  const header: HeaderType[] = [
    {
      title: t(translations.projectManagement.category),
      width: '10%',
    },
    {
      title: t(translations.projectManagement.customCategory),
      width: '15%',
    },
    {
      title: t(translations.developerWorkspace.planDate),
      width: '18%',
    },
    {
      title: t(translations.developerWorkspace.actualDate),
      width: '18%',
    },
    {
      title: t(translations.developerWorkspace.task),
      width: '20%',
    },
    {
      title: t(translations.developerWorkspace.notes),
      width: '20%',
    },
    {
      title: t(translations.common.status),
      width: '15%',
    },
  ];

  const uploadImages = (item: DeveloperTaskForm) => {
    setDataUpload(item);
    setIsUpload(true);
  };

  useEffect(() => {
    if (developerTaskData) setItems(developerTaskData);
    else setItems([]);
  }, [developerTaskData]);

  const sortArrayOfObjects: any = (
    data: DeveloperTaskForm[],
    keyToSort: keyof DeveloperTaskForm,
    direction: 'ascending' | 'descending' | 'none',
  ) => {
    if (direction === 'none') {
      return data;
    }
    const compare = (
      objectA: DeveloperTaskForm,
      objectB: DeveloperTaskForm,
    ) => {
      const valueA = objectA[keyToSort];
      const valueB = objectB[keyToSort];

      if (valueA === valueB) {
        return 0;
      }

      if (valueA && valueB && valueA > valueB) {
        return direction === 'ascending' ? 1 : -1;
      } else {
        return direction === 'ascending' ? -1 : 1;
      }
    };

    return data.slice().sort(compare);
  };

  const sortItem = () => {
    const direction =
      directionHeader === 'ascending' ? 'descending' : 'ascending';
    const sortedArray: DeveloperTaskForm[] = sortArrayOfObjects(
      items,
      'category',
      direction,
    );
    setItems(sortedArray);
    setDirectionHeader(direction);
  };

  const renderItem = (item: any) => {
    return [
      <div className="ml-4 w-[10%] text-[#6B7A99] text-[16px] mt-[6px]">
        {`Task ${item.category}`}
      </div>,
      <div className="ml-4 w-[15%] text-[#6B7A99] text-[16px] mt-[6px]">
        {item.customCategory}
      </div>,
      <div className="ml-4 w-[18%] text-[#6B7A99] text-[16px]">
        {item.planDate ? (
          <CustomDate>
            <ControlledDatePicker
              name={`planDate.${item.id}`}
              label="Promo Start Date	"
              control={control}
              className="mb-4 mr-4 flex-1"
              isNotLabel
              defaultValue={item.planDate}
              disabled
            />
          </CustomDate>
        ) : (
          '-'
        )}
      </div>,
      <div className="ml-4 w-[18%] text-[#6B7A99] text-[16px]">
        {item.actualDate ? (
          <CustomDate>
            <ControlledDatePicker
              name={`actualDate.${item.id}`}
              label="Promo Start Date	"
              control={control}
              className="mb-4 mr-4 flex-1"
              isNotLabel
              defaultValue={item.actualDate}
              disabled
            />
          </CustomDate>
        ) : (
          '-'
        )}
      </div>,
      <div className="ml-4 w-[20%] text-[#6B7A99] text-[16px] mt-[5px]">
        {item.fileDocuments && item.fileDocuments.length > 0 ? (
          item.fileDocuments.map((file: ParamsUrl, index: number) => (
            <div
              className={classNames('flex', {
                'mt-4': index > 0,
              })}
            >
              <LinkFile href={file.url} target="_blank">
                {file.url}
              </LinkFile>
              <img
                className="ml-2 mt-[-5px] cursor-pointer"
                src={deleteIcon}
                alt=""
                onClick={e => {
                  deleteFiles(item, index);
                }}
              />
            </div>
          ))
        ) : (
          <LinkFile onClick={e => uploadImages(item)}>{'Upload Doc'}</LinkFile>
        )}
      </div>,
      <div className="ml-4 w-[20%] text-[#6B7A99] text-[16px]">
        <TextareaStyle>
          <TextField
            aria-describedby="my-helper-text"
            fullWidth
            name={`notes${item.id}`}
            multiline
            placeholder={t(translations.common.inputText)}
            value={item.note}
            onChange={e => {
              onChangeNote(e, item.id);
            }}
          />
        </TextareaStyle>
      </div>,
      <div className="ml-4 w-[15%] text-[#6B7A99] text-[16px]">
        <DisplayFlex>
          <FormControlLabel
            style={{ marginTop: '-15px' }}
            control={
              <CustomStatus
                sx={{ m: 1, mt: 2 }}
                checked={String(item.status).toLowerCase() === 'done'}
                onChange={e => {
                  handleOnChangeStatus(item);
                }}
                onClick={e => {
                  e.stopPropagation();
                }}
              />
            }
            label={''}
          />
          <MarginLeft>
            {String(item.status).toLowerCase() === 'done'
              ? t(translations.common.done)
              : t(translations.common.unDone)}
          </MarginLeft>
        </DisplayFlex>
      </div>,
    ];
  };

  return (
    <Box sx={{ mt: 4, mb: 4, width: '100%' }}>
      <WorkspaceTable
        header={header}
        items={items}
        renderItem={renderItem}
        isDivider
        sortItem={sortItem}
        direction={directionHeader}
      />
      <LoadingButton
        sx={{
          padding: '0.5rem 2rem',
          color: 'white',
          background: '#005FC5',
          fontSize: '16px',
          float: 'right',
          mx: '2rem',
          my: '1rem',
        }}
        loading={isLoading}
        onClick={updateDeveloperTask}
      >
        {t(translations.common.save)}
      </LoadingButton>
      <UploadZone open={isUpload} setOpen={setIsUpload} item={dataUpload} />
    </Box>
  );
});
