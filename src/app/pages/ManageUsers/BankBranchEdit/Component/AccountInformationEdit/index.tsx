import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { useFormContext } from 'react-hook-form';
import { Key, KV, Row, Value } from 'app/components/DataDisplay';
import CustomizedSwitches from 'app/components/AntSwitch';
import { BankAccountInfo } from 'types/BankAccountManagement';
import moment from 'moment';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import { useDispatch } from 'react-redux';
import { useBankAccountInfoSlice } from '../../../BankAccount/HQBankPartnerManagement/HQBankAccountInformation/slice';
import { useParams } from 'react-router-dom';
import { AccountStatus } from 'types';
import DialogAction from 'app/components/DialogAction';
import { capitalize } from 'lodash';
import defaultAvatar from '../../../../../../assets/images/default_avatar.svg';
import Notifier from '../../../../Notifier';

interface Props {
  info?: BankAccountInfo;
}

const AccountInformationEdit = (props: Props) => {
  const { info } = props;
  const { control } = useFormContext();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { actions } = useBankAccountInfoSlice();

  const [checked, setChecked] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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

  useEffect(() => {
    if (info?.status === AccountStatus.ACTIVE) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [info]);

  return (
    <div style={{ paddingRight: '122px' }}>
      <Avatar
        src={
          info && info?.kyc?.filePhoto
            ? info?.kyc?.filePhoto.url
            : defaultAvatar
        }
        sx={{ width: '120px', height: '120px', marginBottom: '24px' }}
      />
      <ControlledTextField
        name="email"
        label="Email"
        control={control}
        disabled
        type="text"
        className={'mt-3'}
      />
      <KV>
        <Row>
          <Key>{'Registered Date'}</Key>
          <Value>{moment(info?.createdDate).format('DD/MM/YYYY')}</Value>
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
          <Key>{'Verication Status'}</Key>
          <Value>{capitalize(info?.verificationStatus)}</Value>
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
    </div>
  );
};

export default AccountInformationEdit;
