import React, { useEffect, useState } from 'react';
import { ControlledTextField } from 'app/components/CustomTextField';
import { useFormContext } from 'react-hook-form';
import { Key, KV, Row, Value } from 'app/components/DataDisplay';
import CustomizedSwitches from 'app/components/AntSwitch';
import moment from 'moment';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AccountStatus } from 'types';
import DialogAction from 'app/components/DialogAction';
import { capitalize } from 'lodash';
import { PartnerInformation } from '../../../PartnerInfomation/Component/types';
import { usePartnerInformationSlice } from '../../../PartnerInfomation/Component';

interface Props {
  info?: PartnerInformation;
}

const AccountInformationEdit = (props: Props) => {
  const { info } = props;
  const { control } = useFormContext();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { actions } = usePartnerInformationSlice();

  const [checked, setChecked] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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

  useEffect(() => {
    if (info?.status === AccountStatus.ACTIVE) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [info]);

  return (
    <div style={{ paddingRight: '122px' }}>
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
