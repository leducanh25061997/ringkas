import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { WorkflowTableDragAndDrop } from 'app/components/WorkflowTableDragAndDrop';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import {
  BankPreferenceForm,
  BankPreferenceFormType,
  BanksForm,
} from 'types/CustomerManagement';
import { RequestDataType } from 'app/pages/ManageUsers/PartnerAccount/PartnerDataVerification/slice/types';
import { ControlledCityDropdown } from 'app/components/DropdownInput/Cities';
import { ControlledBankPreferencesDropdown } from 'app/components/DropdownInput/BankPreference';
import fileIcon from 'assets/icons/file.svg';
import crossIcon from 'assets/icons/icons_cross.svg';
import { useDropzone } from 'react-dropzone';
import { fileService } from 'services';
import { ControlledBankOfficeDropdown } from 'app/components/DropdownInput/BankOffice';
import { useSelector } from 'react-redux';
import { selectManageCustomer } from 'app/pages/ManageUsers/CustomerAccount/slice/selectors';
import { LoadingButton } from '@mui/lab';

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
  onConfirm: (value: BanksForm[]) => void;
  isLoading?: boolean;
}

export default function BankPreferenceDialog(props: Props) {
  const { open, setOpen, onConfirm, isLoading } = props;
  const [isChange, setIsChange] = React.useState<boolean>(false);
  const { bankPreference } = useSelector(selectManageCustomer);
  const [items, setItems] = React.useState<BanksForm[]>([]);
  const [listBank, setListBank] = React.useState<string[]>([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (bankPreference) {
      const newItems: BanksForm[] = [];
      const newListBank: string[] = [];
      bankPreference.banks.map((bank, index: number) => {
        bank?.bankName && newListBank.push(bank?.bankName);
        newItems.push({
          id: index,
          bankInfo: {
            label: bank?.bankName,
            value: bank?.userUuid,
            file: bank?.fileLogo && bank?.fileLogo[0].url,
          },
        });
      });
      setListBank(newListBank);
      setItems(newItems);
    }
  }, [bankPreference]);

  const handleConfirm = () => {
    onConfirm(items);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const { control, watch, setValue, reset, ...methods } = useForm<any>({});

  const header: HeaderType[] = [
    {
      title: t(translations.kprProgram.priority),
      width: '10%',
    },
    {
      title: t(translations.common.branch),
      width: '60%',
    },
    {
      title: t(translations.common.file),
      width: '30%',
    },
  ];

  const handleClickUpload = (id: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('accept', 'image/*');
    input.click();
    input.remove();
    input.onchange = e => {
      const elm = e.target as HTMLInputElement;
      if (!elm.files) return;
      const file = elm.files[0];
      handleUploadFile(file, id);
    };
  };

  const handleUploadFile = (file: File, id: number) => {
    if (!file.type.includes('image/')) return;

    if (file.size / 1024 / 1024 > 5) {
      return;
    }
    fileService
      .fetchUrlImages({ fileName: [file.name] })
      .then(res => {
        fileService
          .getUrlImageData([{ url: res[0].url as string, files: file }])
          .then(() => {
            const newImage = { ...res[0], file };
            const newItems: BanksForm[] = [];
            items.map((item: BanksForm, index: number) => {
              const newItem: BanksForm = { ...item };
              if (item.id === id) {
                newItem.file = newImage;
              }
              newItems.push(newItem);
            });
            setItems(newItems);
          })
          .catch(err => {});
      })
      .catch(err => {});
  };

  const onChangeBankName = (data: any, id: number) => {
    const newItems: BanksForm[] = [];
    const newListBank: string[] = [];
    items.map((item: BanksForm, index: number) => {
      const newItem: BanksForm = { ...item };
      if (item.id === id) {
        newItem.bankInfo = data;
      }
      newItem.bankInfo?.label && newListBank.push(newItem.bankInfo?.label);
      newItems.push(newItem);
    });
    setListBank(newListBank);
    setItems(newItems);
  };

  // const onChangeCity = (data: any, id: number) => {
  //   const newItems: BankPreferenceForm[] = [];
  //   items.map((item: BankPreferenceForm, index: number) => {
  //     const newItem: BankPreferenceForm = { ...item };
  //     if (item.id === id) {
  //       newItem.branch.city = data;
  //     }
  //     newItems.push(newItem);
  //   });
  //   setItems(newItems);
  // };

  // const onChangeLoanProgram = (data: any, id: number) => {
  //   const newItems: BankPreferenceForm[] = [];
  //   items.map((item: BankPreferenceForm, index: number) => {
  //     const newItem: BankPreferenceForm = {...item};
  //     if(item.id === id) {
  //       newItem.branch.loanProgram = data;
  //     }
  //     newItems.push(newItem);
  //   });
  //   setItems(newItems);
  // }

  const handleAddMore = () => {
    const newData = JSON.parse(JSON.stringify(items));
    newData.length < 5 &&
      newData.push({
        id: newData.length,
      });
    setItems(newData);
  };

  const renderItem = (item: any, index: number) => {
    const currentBank = watch(`bankPreferences.${index}.bank`);
    return [
      <div className="ml-6 w-[10%] text-[#6B7A99] text-[14px] flex self-start">
        <div>{`${index + 1}`}</div>
        {index > 0 && <img className="h-[20px] ml-2" src={crossIcon} />}
      </div>,
      <div className="w-[60%] mr-2">
        <ControlledBankPreferencesDropdown
          className="mb-4 mx-4"
          label={`${t(translations.common.chooseBankPreference)}`}
          name={`bankPreferences.${item.id}.bank`}
          control={control}
          disabled={
            index < 1 &&
            bankPreference?.banks &&
            bankPreference?.banks.length > 0
          }
          value={item?.bankInfo}
          listBank={listBank}
          onChange={e => {
            onChangeBankName(e, item.id);
          }}
        />
        {/* <ControlledCityDropdown
          name={`bankPreferences.${item.id}.city`}
          label={t(translations.createCustomer.cityLabel)}
          placeholder={t(translations.createCustomer.cityLabel)}
          rules={{
            required: t(translations.formValidate.required) as string,
          }}
          className="mx-4 mb-4"
          control={control}
          disabled={index < 1}
          value={item?.branch?.city}
          onChange={e => {
            onChangeCity(e, item.id);
          }}
        /> */}
        {/* <ControlledBankOfficeDropdown
          name={`bankPreferences.${item.id}.branchOffice`}
          label={t(translations.common.branchOffice)}
          rules={{
            required: t(translations.formValidate.required) as string,
          }}
          className="mx-4"
          control={control}
          bankUuid={currentBank?.value}
          value={item?.branch?.loanProgram}
          disabled={index < lengthDefault}
          onChange={e => {
            onChangeLoanProgram(e, item.id);
          }}
        /> */}
      </div>,
      <div className="w-[30%] self-start">
        <span className="text-[#005FC5] font-semibold underline">
          {'Surat Pemesanan'}
        </span>
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
          {t(translations.createCustomer.bankPreference)}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            padding: '0px!important',
            borderTop: 'none!important',
            paddingBottom: '20px!important',
          }}
        >
          <WorkflowTableDragAndDrop
            header={header}
            items={items}
            setItems={setItems}
            renderItem={renderItem}
            isAdded={items.length < 5}
            onclick={handleAddMore}
          />
        </DialogContent>
        <DialogActions>
          {' '}
          <LoadingButton
            autoFocus
            onClick={handleConfirm}
            sx={{ background: '#005FC5', color: 'white' }}
            loading={isLoading}
          >
            {t(translations.common.save)}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
