import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import InfoCard from './components/InfoCard';
import ListDeveloper from './components/ListDeveloper';
import { useDeveloperAccountManagementSlice } from './slice';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  .parent-label {
    color: #005fc5;
  }
`;

const InfoContainer = styled.div`
  margin-block: 32px;
  display: flex;
`;

export default function DeveloperAccount() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useDeveloperAccountManagementSlice();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.manageUsers,
      },
      {
        title: t(translations.common.developerAccount),
      },
    ],
    [t],
  );
  const fetchDataForPage = (
    page: number = 0,
    size: number = 20,
    orders: string = 'createdDate DESC',
  ) => {
    dispatch(
      actions.fetchDeveloperAccountList({
        size,
        page,
        orders,
      }),
    );
  };

  React.useEffect(() => {
    fetchDataForPage();
  }, []);

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <InfoContainer>
        <InfoCard label="Need Verified" value={0} />
        <InfoCard label="Active Account" value={0} />
        <InfoCard label="Verified Account" value={0} />
      </InfoContainer>
      <ListDeveloper />
    </RootContainer>
  );
}
