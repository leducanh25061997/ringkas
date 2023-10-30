import {
  Avatar,
  Container,
  FormControl,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountStatus, Customer } from 'types';
import {
  ChangeStatus,
  DeveloperAccountList,
} from 'types/DeveloperAccountManagement';
import AvatarIcon from 'assets/icons/avatar.svg';
import { Controller, useFormContext } from 'react-hook-form';
import moment from 'moment';
import { CustomSwitch } from 'app/components/CustomSwitch';
import DialogAction from 'app/components/DialogAction';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCustomerInformationSlice } from '../slice';

const MarginLeft = styled('div')({
  marginLeft: '-15px',
});

const DisplayFlex = styled('div')({
  display: 'flex',
});

const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  '& .MuiInputLabel-root': {
    color: '#005FC5',
    '&.Mui-disabled': {
      color: '#005FC5!important',
    },
  },
  '& .MuiFilledInput-input': {
    '&.Mui-disabled': {
      color: 'black!important',
      '-webkit-text-fill-color': 'black!important',
    },
  },
  '& .MuiFilledInput-root': {
    border: '1px solid  #005FC5',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:after': {
    right: 'unset',
    border: '1px solid  #005FC5',
    height: '100%',
    width: '100%',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root.Mui-error:after': {
    border: '1px solid  #FF4842',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:before': {
    right: 'unset',
    content: '""',
  },
  '& .css-1lwbda4-MuiStack-root': {
    '& .MuiFormControl-root:after': {
      border: '1px solid  #005FC5',
    },
  },
  marginRight: '5rem',
});

interface Props {
  customerInformation?: Customer;
}

export const CustomerInformation = memo((props: Props) => {
  const { customerInformation } = props;
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { actions } = useCustomerInformationSlice();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleChange = () => {
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeStatus = () => {
    const customerId = id;
    const newParams: ChangeStatus = {
      userUuid: customerId,
      status: status ? 'INACTIVE' : 'ACTIVE',
    };
    dispatch(
      actions.updateAccountStatus(newParams, (changeStatus?: ChangeStatus) => {
        setOpenDialog(false);
        setStatus(!status);
      }),
    );
  };

  useEffect(() => {
    setValue('email', customerInformation?.email || '');
    setStatus(customerInformation?.status === AccountStatus.ACTIVE);
  }, [customerInformation]);

  return (
    <Container sx={{ mt: 2, minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.customerAccountInfo)}
      </Typography>
      <Row style={{ marginTop: '1rem' }}>
        <Avatar
          src={customerInformation?.filePhoto?.url || AvatarIcon}
          sx={{ width: '120px', height: '120px' }}
        />
      </Row>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 0 }}>
          <Controller
            name="email"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  disabled
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  label={`${t(translations.common.email)}`}
                  value={getValues('email') || ''}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={e => {
                    field.onChange(e);
                  }}
                />
              );
            }}
            control={control}
          />
        </FormControl>
      </RootStyle>
      <Row>
        <Label>{t(translations.developerInformation.registerDate)}</Label>
        <Value>
          {customerInformation?.createdDate
            ? moment(customerInformation?.createdDate).format('DD MMMM YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.accountStatus)}</Label>
        <Value>
          <DisplayFlex>
            <FormControlLabel
              style={{ marginTop: '-10px' }}
              control={
                <CustomSwitch
                  sx={{ m: 1 }}
                  checked={status}
                  onChange={handleChange}
                />
              }
              label={''}
            />
            <MarginLeft>{status ? 'Active' : 'Inactive'}</MarginLeft>
          </DisplayFlex>
        </Value>
      </Row>
      <DialogAction
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        title={status ? 'Inactive Account' : 'Active Account'}
        description={
          status
            ? 'Are you sure you want to inactive this account? The account will no longer be able to use our services.'
            : 'Are you sure you want to active this account?'
        }
        onConfirm={handleChangeStatus}
        titleButtonConfirm={'Update'}
        maxWidth={'xs'}
      />
    </Container>
  );
});
