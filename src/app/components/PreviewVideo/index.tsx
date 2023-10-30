import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    position: 'relative',
    overflow: 'unset',
  },
  '& .MuiIconButton-root': {
    position: 'absolute',
    right: '-5%',
    top: '-6%',
    background: 'white',
    height: '25px',
    width: '25px',
    color: 'black',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
  video: string;
}

export default function PreviewVideo(props: Props) {
  const { open, setOpen, video } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      PaperProps={{
        style: {
          background: 'white',
          width: '100%',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'none',
          marginTop: '50px',
          backgroundColor: 'white',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
        },
      }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <div>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <video className="VideoInput_video" width="100%" controls src={video} />
      </div>
    </BootstrapDialog>
  );
}
