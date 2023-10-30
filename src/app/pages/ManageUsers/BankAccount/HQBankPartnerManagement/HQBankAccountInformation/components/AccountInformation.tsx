import { Avatar, Container, FormControlLabel, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AvatarIcon from 'assets/icons/avatar.svg';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import moment from 'moment';
import { AccountStatus } from 'types';
import DialogAction from 'app/components/DialogAction';
import { useParams } from 'react-router-dom';
import { CustomSwitch } from 'app/components/CustomSwitch';

import { BankAccountInfo, BankAccountText } from 'types/BankAccountManagement';

import { useBankAccountInfoSlice } from '../slice';
import { selectBankAccountInfo } from '../slice/selectors';

interface Props {
  hqBankAccountInfo?: BankAccountInfo;
}

export const RootStyle = styled('div')({
  '& .css-1wo9mtq-MuiFormControl-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
});

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  fontWeight: 'bold',
});

const DisplayFlex = styled('div')({
  display: 'flex',
});

export const AccountInformation = memo((props: Props) => {
  const { hqBankAccountInfo } = props;
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const [status, setStatus] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { actions } = useBankAccountInfoSlice();

  const handleChange = () => {
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeStatus = () => {
    const developerId = id;
    const newParams: ChangeStatus = {
      userUuid: developerId,
      status: status ? 'INACTIVE' : 'ACTIVE',
    };
    dispatch(
      actions.updateStatusAcount(newParams, (changeStatus?: ChangeStatus) => {
        setOpenDialog(false);
        setStatus(!status);
      }),
    );
  };

  useEffect(() => {
    if (hqBankAccountInfo?.status === AccountStatus.ACTIVE) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [hqBankAccountInfo]);

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      {/* <Row style={{ marginTop: '1rem' }}>
        <Avatar
          src={hqBankAccountInfo?.kyc?.filePhoto?.url || AvatarIcon}
          sx={{ width: '120px', height: '120px' }}
        />
      </Row> */}
      <Row>
        <Label>{t(translations.common.email)}</Label>
        <EmailValue>{hqBankAccountInfo?.email || '-'}</EmailValue>
      </Row>
      <Row>
        <Label>{t(translations.common.businessOrganization)}</Label>
        <Value>{BankAccountText.HEAD_QUARTER}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.registerDate)}</Label>
        <Value>
          {hqBankAccountInfo?.createdDate
            ? moment
                .unix(hqBankAccountInfo?.createdDate / 1000)
                .format('DD/MM/YYYY')
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
      <Row>
        <Label>{t(translations.developerInformation.verificationStatus)}</Label>
        <Value style={{ textTransform: 'capitalize' }}>
          {hqBankAccountInfo?.verificationStatus
            ? String(hqBankAccountInfo?.verificationStatus).toLowerCase()
            : '-'}
        </Value>
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
        title={`${status ? 'Inactive' : 'Active'} Account`}
        description={
          'Are you sure you want to deactivate this account? The account will no longer be able to use our services.'
        }
        onConfirm={handleChangeStatus}
        titleButtonConfirm={'Update'}
        maxWidth={'xs'}
      />
    </Container>
  );
});
