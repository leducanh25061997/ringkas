import {
  Container,
  FormControlLabel,
  Grid,
  Stack,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
// import CustomAvatar from 'app/components/Avatar';
import CustomizedSwitches from 'app/components/AntSwitch';
import moment from 'moment';
import { BankAccountInfo } from 'types/BankAccountManagement';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { CustomSwitch } from 'app/components/CustomSwitch';
import DialogAction from 'app/components/DialogAction';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import { useParams } from 'react-router-dom';
import { AccountStatus } from 'types';
import { useDispatch } from 'react-redux';
import { useBankAccountInfoSlice } from '../../slice';

interface Props {
  hqBankAccountInfo?: BankAccountInfo;
}

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  fontWeight: 'bold',
});

const DisplayFlex = styled('div')({
  display: 'flex',
});

const RenderInput = styled('div')({
  background: '#F6F8FC',
  borderRadius: '10px',
  border: '1px solid #C6D7E0',
  '& .MuiFormControl-root': {
    width: '100%',
    '& input': {
      // padding: '5px 13px',
    },
    '& input:focus': {
      boxShadow: 'none',
      color: 'black',
    },
    '& .MuiFilledInput-root:before': {
      right: 'unset',
      content: '""',
    },
    '& .MuiFilledInput-root:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
    },
    '& .MuiInputLabel-root:focus': {
      color: '#000000',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
});

const AccountInformation = React.memo((props: Props) => {
  const { hqBankAccountInfo } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const { actions } = useBankAccountInfoSlice();
  const { id } = params;

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
      actions.updateStatusAccount(newParams, (changeStatus?: ChangeStatus) => {
        setOpenDialog(false);
        setStatus(!status);
      }),
    );
  };

  React.useEffect(() => {
    if (hqBankAccountInfo?.status === AccountStatus.ACTIVE) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [hqBankAccountInfo]);

  return (
    <Container sx={{ mt: 2, minHeight: '600px' }}>
      <Row>
        <Label>{t(translations.common.email)}</Label>
        <EmailValue>{hqBankAccountInfo?.email || '-'}</EmailValue>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.registerDate)}</Label>
        <Value>
          {(hqBankAccountInfo?.createdDate &&
            moment(hqBankAccountInfo?.createdDate).format('DD/MM/YYYY')) ||
            '-'}
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
      <Row>
        <Label>{t(translations.developerInformation.verificationStatus)}</Label>
        <Value style={{ textTransform: 'capitalize' }}>
          {hqBankAccountInfo?.verificationStatus
            ? String(hqBankAccountInfo?.verificationStatus).toLowerCase()
            : '-'}
        </Value>
        on
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.verifiedDate)}</Label>
        <Value>
          {hqBankAccountInfo?.verifyDate
            ? moment
                .unix(hqBankAccountInfo?.verifyDate / 1000)
                .format('DD/MM/YYYY')
            : '-'}
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

export default AccountInformation;
