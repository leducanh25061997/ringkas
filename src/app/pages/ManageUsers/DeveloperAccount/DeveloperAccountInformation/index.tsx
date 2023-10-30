import { translations } from 'locales/translations';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import path from 'app/routes/path';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import Notifier from 'app/pages/Notifier';
import BreadCrumbs from 'app/components/BreadCrumbs';

import { DeveloperInputForm } from './components/DeveloperInputForm';
import { Footer } from './components/Footer';
import { useDeveloperAccountInfoSlice } from './slice';
import { selectDeveloperAccountInfo } from './slice/selectors';
import DialogAction from 'app/components/DialogAction';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  min-height: calc(100vh - 85px) !important;
  height: 100%;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  padding: 16px 24px 0px 24px;
  margin-bottom: 16px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function DeveloperAccountInformation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { developerAccountInfo } = useSelector(selectDeveloperAccountInfo);
  const { actions } = useDeveloperAccountInfoSlice();
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.manageUsers,
      },
      {
        title: t(translations.common.developerAccount),
        path: path.developerAccountList,
      },
      {
        title: developerAccountInfo?.kyc?.fullName || '',
      },
    ],
    [developerAccountInfo, t],
  );

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchDeveloperAccountInfo(id));
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
      actions.verifyAccount(newParams, (changeStatus?: ChangeStatus) => {
        setOpenConfirmModal(false);
        Notifier.addNotifySuccess({ message: 'Verify successfully' });
        dispatch(actions.fetchDeveloperAccountInfo(id));
      }),
    );
  };

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <DeveloperInputForm developerAccountInfo={developerAccountInfo} />
      <Footer
        developerAccountInfo={developerAccountInfo}
        handleVerify={handleVerify}
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
