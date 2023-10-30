import React from 'react';
import { Grid } from '@mui/material';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import CustomTabs from 'app/components/CustomTabs';

import AccountInformation from './Component/AccountInformation';
import BranchInformation from './Component/BranchInformation';
import KYC from './Component/KYC';
import HistoryLog from './Component/HistoryLog';

import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import VerifyAccount from './Component/VerifyAccount';
import { useBankAccountInfoSlice } from '../BankAccount/HQBankPartnerManagement/HQBankAccountInformation/slice';
import { selectBankAccountInfo } from '../BankAccount/HQBankPartnerManagement/HQBankAccountEdit/slice/selectors';
import { useNavigate } from 'react-router-dom';
import { ApplicationStatus } from 'types';

interface Props {}

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
  margin-top: 25px;
`;

const ActionButtonWrap2 = styled.div`
  display: flex;
  justify-content: space-between;

  background: #fff;
  padding: 12px 32px;
  margin-top: 25px;
`;

const YellowButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background: rgba(255, 204, 4, 1);
  border-radius: 8px;
  color: #000;
  width: 128px;
`;

const WhiteButton = styled.button`
  width: 128px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #000;
  border: 1px solid #000;
  background: #ffffff;
  margin-right: 32px;
`;

const BankInformation = React.memo((props: Props) => {
  const params = useParams();
  const { id } = params;
  const { actions } = useBankAccountInfoSlice();
  const navigate = useNavigate();
  const { hqBankAccountInfo } = useSelector(selectBankAccountInfo);
  const dispatch = useDispatch();
  const [step, setStep] = React.useState<number>(0);
  const { t } = useTranslation();

  const links = React.useMemo(
    () => [
      { title: t(translations.common.manageUsers), path: path.manageUsers },
      {
        title: t(translations.bankManagement.bankAccount),
        path: path.detailBankAccount,
      },
      { title: hqBankAccountInfo?.kyc?.fullName },
    ],
    [hqBankAccountInfo, t],
  );

  const sidebar = React.useMemo(
    () => [
      {
        key: 0,
        title: 'Account Information',
        component: <AccountInformation info={hqBankAccountInfo} />,
      },
      {
        key: 1,
        title: 'Branch Information',
        component: <BranchInformation info={hqBankAccountInfo} />,
      },
      {
        key: 2,
        title: 'KYC',
        component: <KYC info={hqBankAccountInfo} />,
      },
      {
        key: 3,
        title: 'History log',
        component: <HistoryLog />,
      },
    ],
    [hqBankAccountInfo],
  );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchBankAccountInfo(id, () => navigate('/404')));
  }, []);

  const handleDialog = () => {
    setOpenDialog(prev => !prev);
  };

  const onCloseDialog = () => {
    setOpenDialog(prev => !prev);
  };

  const handUpdate = () => {
    navigate(`${path.branchBankAccountList}/edit/${id}`);
  };

  const handleVerify = () => {
    if (!id) return;
    const payload = {
      userUuid: id,
      verificationStatus: 'VERIFIED',
    };
    dispatch(
      actions.verifyBankAccount(payload, () => navigate('/manage-users/bank')),
    );
  };

  const handleBack = () => {
    navigate('/manage-users/bank');
  };

  return (
    <Grid
      sx={{
        background: '#f3f3f3',
        padding: '20px 20px 0 20px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 85px)!important',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Grid sx={{ height: '100%', paddingBottom: '25px' }}>
        <BreadCrumbs links={links} />
        <CustomTabs sidebar={sidebar} step={step} setStep={setStep} />
      </Grid>

      {step !== 2 ||
      hqBankAccountInfo?.verificationStatus === ApplicationStatus.VERIFIED ? (
        <ActionButtonWrap>
          <WhiteButton onClick={handleBack}>Back</WhiteButton>
          <YellowButton onClick={handUpdate}>Update</YellowButton>
        </ActionButtonWrap>
      ) : (
        <ActionButtonWrap2>
          <Grid item sx={{ width: '128px', mr: '32px' }}>
            <WhiteButton onClick={handleBack}>Back</WhiteButton>
          </Grid>
          <div style={{ display: 'flex' }}>
            <WhiteButton onClick={handUpdate}>Update</WhiteButton>
            <YellowButton onClick={handleDialog}>Verify</YellowButton>
          </div>
        </ActionButtonWrap2>
      )}

      <Dialog maxWidth="lg" open={openDialog} onClose={onCloseDialog}>
        <VerifyAccount onClose={onCloseDialog} handleVerify={handleVerify} />
      </Dialog>
    </Grid>
  );
});

export default BankInformation;
