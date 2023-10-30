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
import { useDropzone } from 'react-dropzone';
import { fileService } from 'services';
import Spinner from 'app/components/Spinner';
import { DropImage } from 'app/components/KeyText';
import uploadIcon from 'assets/icons/upload-v3.svg';
import fileIcon from 'assets/icons/file.svg';
import { Abc } from '@mui/icons-material';
import { ParamsUrl } from 'types';
import { DeveloperTaskBody, DeveloperTaskForm } from 'types/CustomerManagement';
import { useDispatch } from 'react-redux';
import { useManageCustomerSlice } from '../../../slice';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import TasksDropdown from './TasksDropdown';
import { Controller } from 'react-hook-form';
import { UploadData } from '../slice/types';

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

const Error = styled('div')({
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '8px',
  color: '#ff0000',
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
  item?: DeveloperTaskForm;
}

export default function UploadZone(props: Props) {
  const { open, setOpen, item } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { actions } = useManageCustomerSlice();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [images, setImages] = React.useState<ParamsUrl[]>([]);
  const [fileDocuments, setFileDocuments] = React.useState<UploadData[]>([]);
  const handleClose = () => {
    setOpen(false);
    setFileDocuments([]);
  };
  const updateImages = () => {
    const newFile: string[] = [];
    fileDocuments.map(item => {
      item.files.s3Key && newFile.push(item.files.s3Key);
    });
    const formData: DeveloperTaskBody = {
      fileDocuments: newFile,
      status: newFile.length > 0 ? 'DONE' : 'UNDONE',
      note: item?.note || '',
      id: item?.id || 0,
    };
    dispatch(
      actions.updateDeveloperTask({
        id,
        formData,
      }),
    );
    setFileDocuments([]);
    setOpen(false);
  };

  const onChangeBank = (value: string, index: number) => {
    const newFileDocuments: UploadData[] = [];
    fileDocuments.map((item, i) => {
      const newItem = { ...item };
      if (index === i) {
        newItem.bankName = value;
      }
      newFileDocuments.push(newItem);
      setFileDocuments(newFileDocuments);
    }, []);
  };
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5120000,
    accept:
      'image/png, image/jpg, image/jpeg, application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    onDrop: files => {
      const newFile = files[0];
      const fileName = [newFile.name];
      if (newFile.size > 5120000) {
        setIsError(true);
      } else {
        setIsError(false);
        setIsLoading(true);
        fileService
          .fetchUrlImages({ fileName })
          .then(res => {
            fileService
              .getUrlImageData([{ url: res[0].url as string, files: newFile }])
              .then(() => {
                const newImage = { ...res[0], newFile };
                const newFileDocuments = fileDocuments;
                const newFileDocument: UploadData = {
                  bankName: '',
                  files: newImage,
                };
                newFileDocuments.push(newFileDocument);
                setFileDocuments(newFileDocuments);
                setIsLoading(false);
              })
              .catch(err => {
                setIsLoading(false);
              });
          })
          .catch(err => {
            setIsLoading(false);
          });
      }
    },
  });

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
          {t(translations.common.uploadDocuments)}
        </BootstrapDialogTitle>
        <DialogContent
          sx={{
            padding: '0px!important',
            borderTop: 'none!important',
            paddingBottom: '20px!important',
          }}
        >
          <React.Fragment>
            <section className="container">
              <div {...getRootProps({ className: 'dropzone disabled' })}>
                {isLoading ? (
                  <div className="spinner flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="pt-4 px-4">
                    <input {...getInputProps()} />
                    <DropImage
                      className={classNames({
                        error: isError,
                      })}
                    >
                      <div className="image flex justify-center">
                        <img src={uploadIcon} alt="" />
                        <div className="ml-1 mr-1 text-[#6B7A99] font-[16px] font-[500]">
                          Drag and drop document or
                        </div>
                        <span className="text-[#005FC5] font-[16px] font-[500] underline">
                          Browser
                        </span>
                      </div>
                      <p className="text-[#9098A7]">
                        {t(translations.imageUploadComponent.maxFileSize)}
                      </p>
                    </DropImage>
                  </div>
                )}
              </div>
            </section>
          </React.Fragment>
          {isError && (
            <Error className="px-4">
              t(translations.imageUploadComponent.maxFileSize)
            </Error>
          )}
          {fileDocuments.map((value, rowIndex: number) => (
            <div className="flex px-6 mt-4 h-[45px]">
              <div className="flex w-[60%]">
                <img src={fileIcon} alt="" height={20} width={20}></img>
                <div className="ml-2 text-[#202A42] font-[500] font-[16px] pt-[10px]">
                  {value.files.originalName}
                </div>
              </div>
              {item?.category === 'B' && (
                <div className="w-[40%]">
                  <TasksDropdown
                    value={value.bankName}
                    onChange={e => {
                      onChangeBank(e, rowIndex);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          {' '}
          <Button
            autoFocus
            onClick={updateImages}
            sx={{ background: '#005FC5', color: 'white', mr: 1 }}
          >
            {t(translations.common.save)}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
