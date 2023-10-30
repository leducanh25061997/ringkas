import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { EmailValue, Key, KV, Row, Value } from 'app/components/DataDisplay';
import CustomizedSwitches from 'app/components/AntSwitch';
import { capitalize } from 'lodash';
import moment from 'moment';
import { AccountStatus } from 'types';
import { useParams } from 'react-router-dom';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import { useDispatch } from 'react-redux';
import DialogAction from '../../../../../components/DialogAction';
import { PartnerInformation } from '../types';
import { usePartnerInformationSlice } from '../index';

interface Props {
  info?: PartnerInformation;
}

const AccountInformation = (props: Props) => {
  const { info } = props;
  const params = useParams();
  const { id } = params;
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { actions } = usePartnerInformationSlice();
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
      actions.updateStatusPartnerAccount(newParams, () => {
        dispatch(actions.getPartnerInformation(id));
        setOpenDialog(prev => !prev);
        setChecked(prev => !prev);
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
