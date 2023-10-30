import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Control, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ControlledCityDropdown } from 'app/components/DropdownInput/Cities';
import { ControlledProjectsDropdown } from 'app/components/DropdownInput/Projects';
import { ControlledClusterDropdown } from 'app/components/DropdownInput/Cluster';
import { ControlledHouseTypeDropdown } from 'app/components/DropdownInput/HouseType';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ProductInformation } from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '800px',
    maxWidth: '800px',
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
    <DialogTitle
      sx={{ m: 0, p: 2, textAlign: 'center', color: '#202A42' }}
      {...other}
    >
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

interface CityType {
  label: string;
  value: string;
}

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm: (inputData: ProductInformation) => void;
  city?: CityType;
  controlMethod1: Control<FieldValues, any>;
}

export default function CreateNewInventory(props: Props) {
  const { open, setOpen, onConfirm, city, controlMethod1 } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };

  const { control, ...methods } = useForm<any>({});
  const projectId = methods.watch('projectData')?.value;

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
          {t(translations.createCustomer.newInventory)}
        </BootstrapDialogTitle>
        <FormProvider {...methods} control={control}>
          <form onSubmit={methods.handleSubmit(onConfirm)}>
            <DialogContent
              sx={{
                padding: '20px!important',
                borderTop: 'none!important',
              }}
              dividers
            >
              <ControlledCityDropdown
                name="city"
                label={t(translations.createCustomer.cityLabel)}
                placeholder={t(translations.createCustomer.cityLabel)}
                rules={{
                  required: t(translations.formValidate.required) as string,
                }}
                value={city}
                disabled
                className="mx-4"
                control={controlMethod1}
              />
              <ControlledProjectsDropdown
                className="mb-4 mx-4 mt-4"
                label={`${t(translations.common.selectProject)}`}
                name="projectData"
                control={control}
                location={city?.value}
              />
              <ControlledClusterDropdown
                className="mb-4 mx-4"
                label={`${t(translations.common.selectCluster)}`}
                placeholder={`${t(translations.common.selectCluster)}`}
                name="clusterData"
                control={control}
                projectId={projectId}
              />
              <ControlledHouseTypeDropdown
                className="mb-4 mx-4"
                label={`${t(translations.common.selectType)}`}
                placeholder={`${t(translations.common.selectType)}`}
                name="typeData"
                control={control}
                rules={{
                  required: t(translations.required.fillThisField) as string,
                }}
                projectId={projectId}
              />
              <ControlledTextField
                className="mx-4 mb-4"
                label={`${t(translations.common.unit)}`}
                name="unit"
                control={control}
                rules={{
                  required: t(translations.required.fillThisField) as string,
                }}
                required
              />
              <ControlledTextField
                className="mx-4"
                label={`${t(translations.common.price)}`}
                name="pricing.housePrice"
                control={control}
                rules={{
                  required: t(translations.required.fillThisField) as string,
                }}
                endAdornment="Rp"
                required
                type="currency"
                maxLength={17}
              />
            </DialogContent>
            <DialogActions>
              {' '}
              <Button
                autoFocus
                onSubmit={onConfirm}
                type="submit"
                sx={{ background: '#005FC5', color: 'white', mr: 1 }}
              >
                {t(translations.common.save)}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </BootstrapDialog>
    </div>
  );
}
