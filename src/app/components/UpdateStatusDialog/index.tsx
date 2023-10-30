import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '@mui/material/Dialog';
import { translations } from 'locales/translations';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

interface Props {
  openDialog: boolean;
  onCloseDialog?: () => void;
  title: string;
  description: any;
  onConfirm?: () => void;
  titleButtonConfirm: string;
  maxWidth: DialogProps['maxWidth'];
  cancelText?: string;
  confirmText?: string;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '600px',
    maxWidth: '600px',
  },
}));

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, paddingY: 3, paddingX: 2, textAlign: 'center' }}
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
            top: 16,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const UpdateStatusDialog = (props: Props) => {
  const {
    openDialog,
    cancelText,
    confirmText,
    onCloseDialog,
    title,
    description,
    onConfirm,
    maxWidth,
  } = props;
  const { t } = useTranslation();

  return (
    <BootstrapDialog
      open={openDialog}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={onCloseDialog}
      >
        {title}
      </BootstrapDialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ textAlign: 'center', fontWeight: 500, fontSize: '16px', py: 2 }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 0 50px 0',
        }}
      >
        {onCloseDialog && (
          <Button
            sx={{
              padding: '0.5rem 2rem',
              margin: '1rem',
              color: '#005FC5',
              fontSize: '16px',
              background: '#F6F7FF',
            }}
            onClick={onCloseDialog}
          >
            {cancelText}
          </Button>
        )}
        {onConfirm && (
          <LoadingButton
            sx={{
              padding: '0.5rem 2rem',
              margin: '1rem',
              color: 'white',
              background: '#005FC5',
              fontSize: '16px',
            }}
            type="submit"
            onClick={onConfirm}
          >
            {confirmText}
          </LoadingButton>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default UpdateStatusDialog;
