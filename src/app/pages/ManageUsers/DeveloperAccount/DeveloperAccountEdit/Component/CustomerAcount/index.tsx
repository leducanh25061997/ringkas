import { Box, Container, Grid, Stack, styled } from '@mui/material';
import React from 'react';
import { KV, Row, Key, Value, EmailValue } from 'app/components/DataDisplay';
// import CustomAvatar from 'app/components/Avatar';
import CustomizedSwitches from 'app/components/AntSwitch';
import moment from 'moment';

import { DeveloperAccountInfor } from '../../slice/types';
import DialogAction from 'app/components/DialogAction';
import { AccountStatus } from 'types';
import { useDispatch } from 'react-redux';
import { useDeveloperAccountInfoSlice } from '../../../DeveloperAccountInformation/slice';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import Notifier from 'app/pages/Notifier';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  developerAccountInfo?: DeveloperAccountInfor;
}

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

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  marginBottom: '3rem',
  marginRight: '5rem',
});

const CustomerAcount = React.memo((props: Props) => {
  const { developerAccountInfo } = props;
  const params = useParams();
  const { t } = useTranslation();
  const { id } = params;
  const [status, setStatus] = React.useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { actions } = useDeveloperAccountInfoSlice();

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenDialog(true);
  };

  React.useEffect(() => {
    if (developerAccountInfo?.status === AccountStatus.ACTIVE) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [developerAccountInfo]);

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

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <RootStyle>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'Email'}</Key>
              <EmailValue>{developerAccountInfo?.email}</EmailValue>
            </Row>
            <Row>
              <Key>{'Registered Date'}</Key>
              <Value>
                {developerAccountInfo?.createdDate &&
                  moment(developerAccountInfo?.createdDate).format(
                    'DD/MM/YYYY',
                  )}
              </Value>
            </Row>
            <Row>
              <Key>{'Account Status'}</Key>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ display: 'flex' }}>
                  <CustomizedSwitches
                    checked={status}
                    onChange={handleChangeSwitch}
                  />
                  <Box ml={1} sx={{ fontWeight: '600' }}>
                    {status ? 'Active' : 'Inactive'}
                  </Box>
                </Box>
              </Stack>
            </Row>
            <Row>
              <Key>
                {t(translations.developerInformation.verificationStatus)}
              </Key>
              <Value>
                {developerAccountInfo?.verificationStatus
                  ? String(
                      developerAccountInfo?.verificationStatus,
                    ).toLowerCase()
                  : '-'}
              </Value>
            </Row>
            <Row>
              <Key>{t(translations.developerInformation.verifiedDate)}</Key>
              <Value>
                {developerAccountInfo?.verifyDate
                  ? moment
                      .unix(developerAccountInfo?.verifyDate / 1000)
                      .format('DD/MM/YYYY')
                  : '-'}
              </Value>
            </Row>
          </KV>
        </Grid>
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
      </RootStyle>
    </Container>
  );
});

export default CustomerAcount;
