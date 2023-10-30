import styled from 'styled-components';
import { Grid } from '@mui/material';
import CustomButton from '../../../../../components/CustomButton';
import React from 'react';

const RootContainer = styled.div`
  max-width: 480px;
  padding: 24px 0 56px 0;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    color: #223250;

    margin-bottom: 45px;
  }

  .detail {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #323232;

    padding: 0 70px;

    margin-bottom: 53px;
  }
`;

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: center;

  background: #fff;
  margin-top: 25px;
`;

interface Props {
  onClose?: () => void;
  handleVerify?: () => void;
}

const VerifyAccount = (props: Props) => {
  const { onClose, handleVerify } = props;

  return (
    <RootContainer>
      <p className="title">Verify Account</p>
      <p className="detail">
        Are you sure you want to vrerify this account? The account will be able
        to use our services.
      </p>
      <ActionButtonWrap>
        <Grid item sx={{ width: '128px', mr: '32px' }}>
          <CustomButton
            content={'Cancel'}
            isDisable={false}
            fullWidth={true}
            variant={'#FFFFFF'}
            handleClick={onClose}
            isBorder
          />
        </Grid>
        <Grid item sx={{ width: '128px' }}>
          <CustomButton
            content={'Verify'}
            fullWidth={true}
            isDisable={false}
            variant={'rgba(255, 204, 4, 1)'}
            handleClick={handleVerify}
          />
        </Grid>
      </ActionButtonWrap>
    </RootContainer>
  );
};

export default VerifyAccount;
