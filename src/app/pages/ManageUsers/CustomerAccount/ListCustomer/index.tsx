import { shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { VerificationStatus } from 'types/enums';
import NoPermission from 'app/components/NoPermission';

import PageHeader from 'app/components/PageHeader';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ListCustomer from './ListCustomer';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  min-height: calc(100vh - 85px);
`;

const Header = styled.div`
  line-height: 20px;
  .parent-label {
    color: #005fc5;
    font-weight: 600;
  }
`;

export default function CustomerAccount() {
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const allowInteraction =
    userInformation?.verificationStatus === VerificationStatus.VERIFIED;
  const { t } = useTranslation();

  const links = React.useMemo(
    () => [
      {
        label: t(translations.common.manageUsers),
      },
    ],
    [t],
  );

  return (
    <RootContainer>
      <Header>
        <PageHeader
          className="mb-4"
          parentItems={links}
          title={t(translations.sidebar.customerPipeline)}
        />
      </Header>
      <ListCustomer allowInteraction={allowInteraction} />
      {!allowInteraction && <NoPermission />}
    </RootContainer>
  );
}
