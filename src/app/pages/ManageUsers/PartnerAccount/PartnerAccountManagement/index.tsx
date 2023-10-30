import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ListPartner from './components/ListPartner';

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

export default function PartnerAccountManagement() {
  const { t } = useTranslation();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.customerAccountList,
      },
      {
        title: t(translations.partnerManagement.partnerAccount),
      },
    ],
    [t],
  );
  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <ListPartner />
    </RootContainer>
  );
}
