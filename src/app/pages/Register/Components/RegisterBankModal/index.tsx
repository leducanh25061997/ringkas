import { Dialog } from '@mui/material';
import path from 'app/routes/path';
import branchIcon from 'assets/register/branch.jpg';
import headquarterIcon from 'assets/register/headquarter.jpg';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const RootContainer = styled.div`
  padding: 24px 16px 39px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #223250;
`;

const DialogTitle = styled.h1`
  font-weight: 700;
  line-height: 36px;
  font-size: 24px;
`;

const DialogDescription = styled.h1`
  line-height: 22px;
  font-size: 14px;
  color: #323232;
  margin-top: 15px;
`;

const DialogContent = styled.div`
  display: flex;
  margin-top: 21px;
`;

const BankType = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 32px 8px 22px 8px;
  margin-right: 16px;
  background: #f6f8fc;
  border-radius: 14px;
  width: 121px;
  cursor: pointer;

  &.active {
    border: 1.5px solid #005fc5;

    .bank-type {
      font-weight: 600;
    }
  }

  .bank-type {
    font-weight: 500;
    line-height: 24px;
    margin-top: 16px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const DialogActions = styled.div`
  display: flex;
  margin-top: 46px;
  line-height: 28px;
  .cancel-btn {
    margin-right: 66px;
    background: #ffffff;
    border: 1px solid #223250;
    border-radius: 8px;
    font-weight: 600;
    width: 128px;
    height: 48px;
  }
  .continue-btn {
    background: #ffcc04;
    border-radius: 8px;
    font-weight: 600;
    width: 128px;
    height: 48px;
  }
`;

interface Props {
  open: boolean;
  onClose: () => void;
  bankType?: 'HEADQUARTER' | 'BRANCH';
  onSelectBankType: (bankType: 'HEADQUARTER' | 'BRANCH') => void;
}

export default function RegisterBankModal(props: Props) {
  const { bankType, onClose, onSelectBankType, open } = props;

  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <RootContainer>
        <DialogTitle>Business Organization</DialogTitle>
        <DialogDescription>
          Select the type of business organization you want to register
        </DialogDescription>
        <DialogContent>
          <BankType
            className={classNames({ active: bankType === 'HEADQUARTER' })}
            onClick={() => onSelectBankType('HEADQUARTER')}
          >
            <img
              src={headquarterIcon}
              alt=""
              width={44}
              height={44}
              className="bank-type-img"
            />
            <p className="bank-type">Headquarter</p>
          </BankType>
          <BankType
            onClick={() => onSelectBankType('BRANCH')}
            className={classNames({ active: bankType === 'BRANCH' })}
          >
            <img
              src={branchIcon}
              alt=""
              width={44}
              height={44}
              className="bank-type-img"
            />
            <p className="bank-type">Branch</p>
          </BankType>
        </DialogContent>
        <DialogActions>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="continue-btn"
            disabled={bankType === undefined}
            onClick={() =>
              bankType === 'HEADQUARTER'
                ? navigate(path.registerHeadquarterBank)
                : navigate(path.registerBranchBank)
            }
          >
            Continue
          </button>
        </DialogActions>
      </RootContainer>
    </Dialog>
  );
}
