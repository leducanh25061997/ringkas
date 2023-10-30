import { Avatar, Box, Container, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AvatarIcon from 'assets/icons/avatar.svg';
import {
  ChangeStatus,
  DeveloperAccountList,
} from 'types/DeveloperAccountManagement';
import moment from 'moment';
import { AccountStatus } from 'types';
import DialogAction from 'app/components/DialogAction';
import { useParams } from 'react-router-dom';

import { useDeveloperAccountInfoSlice } from '../slice';
import Notifier from 'app/pages/Notifier';
import CustomizedSwitches from 'app/components/AntSwitch';

interface Props {
  developerAccountInfo?: DeveloperAccountList;
}

export const RootStyle = styled('div')({
  '& .css-1wo9mtq-MuiFormControl-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
});

export const AccountInformation = memo((props: Props) => {
  const { developerAccountInfo } = props;
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const [status, setStatus] = useState<boolean>(false);
  const [images, setImages] = useState({
    filePhoto: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { actions } = useDeveloperAccountInfoSlice();

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
        if (changeStatus) {
          setStatus(!status);
          dispatch(actions.fetchDeveloperAccountInfo(id));
          Notifier.addNotifySuccess({
            messageId: 'success.updateStatusSuccess',
          });
        } else {
          Notifier.addNotifyError({
            messageId: 'error.anErrorOccurred',
          });
        }
      }),
    );
  };

  useEffect(() => {
    if (developerAccountInfo?.status === AccountStatus.ACTIVE) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [developerAccountInfo]);

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Row style={{ marginTop: '1rem' }}>
        <Avatar
          src={developerAccountInfo?.kyc?.filePhoto?.url || AvatarIcon}
          sx={{ width: '120px', height: '120px' }}
        />
      </Row>
      <Row>
        <Label>{t(translations.common.email)}</Label>
        <EmailValue>{developerAccountInfo?.email}</EmailValue>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.registerDate)}</Label>
        <Value>
          {developerAccountInfo?.createdDate
            ? moment
                .unix(developerAccountInfo?.createdDate / 1000)
                .format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.accountStatus)}</Label>
        <Value>
          <Box sx={{ display: 'flex' }}>
            <CustomizedSwitches checked={status} onChange={handleChange} />
            <Box ml={1} sx={{ fontWeight: '600' }}>
              {status ? 'Active' : 'Inactive'}
            </Box>
          </Box>
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.verificationStatus)}</Label>
        <Value style={{ textTransform: 'capitalize' }}>
          {developerAccountInfo?.verificationStatus
            ? String(developerAccountInfo?.verificationStatus).toLowerCase()
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.verifiedDate)}</Label>
        <Value>
          {developerAccountInfo?.verifyDate
            ? moment
                .unix(developerAccountInfo?.verifyDate / 1000)
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
