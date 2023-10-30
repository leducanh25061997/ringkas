import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Dialog from '../../../components/Dialog';

import ListImageAndVideo from './component/ListImageAndVideo';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  background: #f3f3f3;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function ProjectManagement() {
  const { t } = useTranslation();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.sidebar.inventoryManagement),
        path: path.inventoryManagement,
      },
      {
        title: t(translations.imageAndVideo.imageOrVideoName),
      },
    ],
    [t],
  );

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <ListImageAndVideo />
    </RootContainer>
  );
}
