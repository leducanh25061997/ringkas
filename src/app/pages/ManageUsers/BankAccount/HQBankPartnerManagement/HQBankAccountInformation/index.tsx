import { Box, Button } from '@mui/material';
import CustomButton from 'app/components/CustomButton';
import { translations } from 'locales/translations';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import path from 'app/routes/path';
import { ApprovalDialog } from 'app/components/ApprovalDialog';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import Notifier from 'app/pages/Notifier';
import BreadCrumbs from 'app/components/BreadCrumbs';

import { HQBankInputForm } from './components/HQBankInputForm';
import { Footer } from './components/Footer';
import { selectBankAccountInfo } from './slice/selectors';
import { useBankAccountInfoSlice } from './slice';
import DialogAction from 'app/components/DialogAction';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 16px;
  padding: 16px 32px 0px 32px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function HQBankAccountInformation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { hqBankAccountInfo, isLoading } = useSelector(selectBankAccountInfo);
  const { actions } = useBankAccountInfoSlice();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.manageUsers,
      },
      {
        title: t(translations.bankManagement.bankAccount),
        path: path.developerAccountList,
      },
      {
        title: hqBankAccountInfo?.kyc?.fullName || '',
      },
    ],
    [hqBankAccountInfo],
  );

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchBankAccountInfo(id));
  }, []);

  const handleVerify = () => {
    setOpenConfirmModal(true);
  };

  const handleConfirmVerify = () => {
    const developerId = id;
    const newParams: ChangeStatus = {
      userUuid: developerId,
      verificationStatus: 'VERIFIED',
    };
    dispatch(
      actions.verifyBankAccount(newParams, (changeStatus?: ChangeStatus) => {
        setOpenConfirmModal(false);
        Notifier.addNotifySuccess({ message: 'Verify successfully' });
        navigate(path.bankAccountList);
      }),
    );
  };

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <Box sx={{ padding: '10px 32px' }}>
        <HQBankInputForm
          hqBankAccountInfo={hqBankAccountInfo}
          step={step}
          setStep={setStep}
        />
      </Box>
      <Footer
        hqBankAccountInfo={hqBankAccountInfo}
        isLoading={isLoading}
        handleVerify={handleVerify}
        step={step}
      />
      <DialogAction
        openDialog={openConfirmModal}
        title={t(translations.bankManagement.verifyAccount)}
        description={t(translations.bankManagement.verifyDescription)}
        onCloseDialog={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          handleConfirmVerify();
        }}
        titleButtonConfirm={t(translations.common.verify)}
        maxWidth={'xs'}
      />
    </RootContainer>
  );
}
