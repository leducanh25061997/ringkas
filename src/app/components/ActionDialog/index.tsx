import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  SxProps,
  Theme,
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import { BootstrapDialogTitle as DialogTitle } from 'app/components/UpdateStatusDialog';
interface Props {
  openDialog: boolean;
  onCloseDialog?: () => void;
  title: string;
  description: any;
  renderAction?: () => React.ReactNode;
  maxWidth?: DialogProps['maxWidth'];
  sx?: SxProps<Theme>;
}

const DialogAction = (props: Props) => {
  const {
    openDialog,
    onCloseDialog,
    title,
    description,
    renderAction,
    maxWidth,
    sx,
  } = props;

  return (
    <Dialog
      open={openDialog}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={maxWidth}
      sx={sx}
    >
      <DialogTitle id="dialog-title" onClose={onCloseDialog}>
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
          justifyContent: 'flex-end',
          padding: 2,
          borderTop: '1px solid #D7E2EE',
        }}
      >
        {renderAction && renderAction()}
      </DialogActions>
    </Dialog>
  );
};

export default DialogAction;
