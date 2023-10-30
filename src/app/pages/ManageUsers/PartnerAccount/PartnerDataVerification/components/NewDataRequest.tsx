import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { WorkflowTable } from 'app/components/WorkflowTable';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RequestDataType } from '../slice/types';
import { translations } from 'locales/translations';
import DocumentTooltip from './DocumentTooltip';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '900px',
    maxWidth: '900px',
  },
}));

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

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface HeaderType {
  title: string;
  width: string;
}

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  items: RequestDataType[];
  setItems: (value: RequestDataType[]) => void;
}

export default function NewDataRequest(props: Props) {
  const { open, setOpen, items, setItems } = props;
  const [isChange, setIsChange] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const header: HeaderType[] = [
    {
      title: t(translations.projectManagement.category),
      width: '30%',
    },
    {
      title: t(translations.partnerManagement.dataName),
      width: '40%',
    },
    {
      title: t(translations.partnerManagement.dataType),
      width: '30%',
    },
  ];

  const onChangeDefaultCategory = (index: number, value: string) => {
    const newTask: RequestDataType[] = [];
    items.map((item: RequestDataType, i: number) => {
      const newItem = { ...item };
      if (index === item.id) {
        newItem.dataName = value;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
    if (!value) {
      setError(`dataName${index}`, {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    } else {
      clearErrors(`dataName${index}`);
    }
  };

  const onChangeDocument = (index: number, value: string) => {
    const newTask: RequestDataType[] = [];
    items.map((item: RequestDataType, i: number) => {
      const newItem = { ...item };
      if (index === item.id) {
        newItem.dataType = value;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  const handleAddMore = () => {
    const newData = JSON.parse(JSON.stringify(items));
    newData.push({
      id: newData.length,
      category: `KYB`,
      dataName: '',
      dataType: 'TEXT',
    });
    setItems(newData);
    setIsChange(!isChange);
  };

  const renderItem = (item: any) => {
    return [
      <div className="ml-6 w-[30%] text-[#6B7A99] text-[14px]">
        {`${item.category}`}
      </div>,
      <RootStyle className="ml-6 w-[40%] text-[#6B7A99] pr-[1rem]">
        <TextField
          aria-describedby="my-helper-text"
          fullWidth
          value={item.dataName}
          name={`dataName${item.id}`}
          onChange={e => {
            onChangeDefaultCategory(item.id, e.target.value);
          }}
          placeholder="Input Text Here"
          error={!!errors[`dataName${item.id}`]}
          helperText={errors[`dataName${item.id}`]?.message}
        />
      </RootStyle>,
      <div className="ml-6 w-[30%] text-[#6B7A99]">
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
                      value="TEXT"
                      control={<Radio />}
                      label="Text"
                    />
                    <DocumentTooltip
                      title={t(translations.projectManagement.specific)}
                      content={'Dokumen untuk pihak tertenku'}
                    />
                  </div>
                  <div className="flex items-center">
                    <FormControlLabel
                      value="FILE"
                      control={<Radio />}
                      label="File"
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
    ];
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {t(translations.partnerManagement.newDataRequest)}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            padding: '0px!important',
            borderTop: 'none!important',
            paddingBottom: '20px!important',
          }}
        >
          <WorkflowTable
            header={header}
            items={items}
            renderItem={renderItem}
            isAdded
            onclick={handleAddMore}
          />
        </DialogContent>
        <DialogActions>
          {' '}
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ background: '#005FC5', color: 'white' }}
          >
            {t(translations.common.save)}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
