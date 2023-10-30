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
import { Stack } from '@mui/material';
import { ControlledDevelopersDropdown } from 'app/components/DropdownInput/Developer';
import { Control, FieldValues, useFormContext } from 'react-hook-form';
import { ControlledTextField } from 'app/components/CustomTextField';

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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm: () => void;
  control: Control<FieldValues, any>;
}

export default function InputHousePriceDialog(props: Props) {
  const { open, setOpen, onConfirm, control } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
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
          {t(translations.createCustomer.inputHousePrice)}
        </BootstrapDialogTitle>
        <DialogContent
          sx={{
            px: 8,
            borderTop: 'none!important',
            paddingBottom: '20px!important',
          }}
          dividers
        >
          <Stack mt={0}>
            <ControlledDevelopersDropdown
              className="mx-4"
              label={t(translations.createCustomer.developerLabel)}
              name="developer"
              control={control}
            />
          </Stack>
          <Stack mt={2}>
            <ControlledTextField
              className="mb-4 mx-4"
              label={`${t(translations.productManagement.price)}`}
              name="housePrice"
              control={control}
              endAdornment="Rp"
              type="currency"
              maxLength={17}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {' '}
          <Button
            autoFocus
            onClick={onConfirm}
            sx={{ background: '#005FC5', color: 'white', mr: 1 }}
          >
            {t(translations.common.save)}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
