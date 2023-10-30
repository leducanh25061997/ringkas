import { Avatar, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EmailValue, Key, KV, Row, Value } from 'app/components/DataDisplay';
import CustomizedSwitches from 'app/components/AntSwitch';
import { BankAccountInfo } from 'types/BankAccountManagement';
import { capitalize } from 'lodash';
import moment from 'moment';

import defaultAvatar from 'assets/images/default_avatar.svg';
import { AccountStatus } from 'types';
import { useParams } from 'react-router-dom';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import { useDispatch } from 'react-redux';
import { useBankAccountInfoSlice } from '../../../BankAccount/HQBankPartnerManagement/HQBankAccountInformation/slice';
import DialogAction from '../../../../../components/DialogAction';
import Notifier from '../../../../Notifier';

interface Props {
  info?: BankAccountInfo;
}

const AccountInformation = (props: Props) => {
  const { info } = props;
  const params = useParams();
  const { id } = params;
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { actions } = useBankAccountInfoSlice();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (info?.status === AccountStatus.ACTIVE) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [info]);

  const handleChangeStatus = () => {
    if (!id) return;
    const newParams: ChangeStatus = {
      userUuid: id,
      status: checked ? 'INACTIVE' : 'ACTIVE',
    };
    dispatch(
      actions.updateStatusAcount(newParams, () => {
        dispatch(actions.fetchBankAccountInfo(id));
        setOpenDialog(prev => !prev);
        setChecked(prev => !prev);
        Notifier.addNotifySuccess({
          messageId: 'success.updateStatusSuccess',
        });
      }),
    );
  };

  const handleChange = () => {
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container>
      <Avatar
        src={
          info && info?.kyc?.filePhoto
            ? info?.kyc?.filePhoto.url
            : defaultAvatar
        }
        sx={{ width: '120px', height: '120px', marginBottom: '12px' }}
      />
      <Grid item md={12}>
        <KV>
          <Row>
            <Key>{'Email'}</Key>
            <EmailValue>{info?.email}</EmailValue>
          </Row>
          <Row>
            <Key>{'Registered Date'}</Key>
            <Value>
              {moment(info?.createdDate).format('DD/MM/YYYY') || '-'}
            </Value>
          </Row>
          <Row>
            <Key>{'Account Status'}</Key>
            <CustomizedSwitches
              isDisplayTitle
              checked={checked}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Key>{'Verification Status'}</Key>
            <Value>{capitalize(info?.verificationStatus) || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Verified Date'}</Key>
            <Value>
              {(info?.verifyDate &&
                moment(info?.verifyDate).format('DD/MM/YYYY')) ||
                '-'}
            </Value>
          </Row>
        </KV>
      </Grid>
      <DialogAction
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        title={`${checked ? 'Inactive' : 'Active'} Account`}
        description={
          'Are you sure you want to deactivate this account? The account will no longer be able to use our services.'
        }
        onConfirm={handleChangeStatus}
        titleButtonConfirm={'Update'}
        maxWidth={'xs'}
      />
    </Grid>
  );
};

export default AccountInformation;
