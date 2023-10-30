import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CustomButton from 'app/components/CustomButton';
import { DialogProps } from '@mui/material/Dialog';

interface Props {
  openDialog: boolean;
  onCloseDialog?: () => void;
  title: string;
  description: any;
  onConfirm?: () => void;
  titleButtonConfirm: string;
  maxWidth: DialogProps['maxWidth'];
}

const DialogAction = (props: Props) => {
  const {
    openDialog,
    onCloseDialog,
    title,
    description,
    onConfirm,
    titleButtonConfirm,
    maxWidth,
  } = props;

  return (
    <Dialog
      open={openDialog}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: 'center',
          color: '#223250',
          marginTop: '2rem',
          fontSize: '24px!important',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ textAlign: 'center' }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '12px 0 50px 0',
        }}
      >
        {onCloseDialog && (
          <CustomButton
            content={'cancel'}
            fullWidth={false}
            isDisable={false}
            variant={'#FFFFFF'}
            handleClick={onCloseDialog}
            isBorder
          />
        )}
        {onConfirm && (
          <CustomButton
            content={titleButtonConfirm}
            fullWidth={false}
            isDisable={false}
            variant={'rgba(255, 204, 4, 1)'}
            handleClick={onConfirm}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogAction;
