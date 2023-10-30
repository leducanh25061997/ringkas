import BreadCrumbs from 'app/components/BreadCrumbs';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ListProject from './components/KPRProgramList';
import { useKprProgramManagementSlice } from './slice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`;

const Header = styled.div`
  font-size: 16px;
  line-height: 21px;
  padding-top: 12px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function KPRProgramList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useKprProgramManagementSlice();
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const links = React.useMemo(
    () => [
      {
        title: t(translations.sidebar.bankProgram),
        path: path.bankProgram,
      },
      {
        title: t(translations.sidebar.kprProgram),
      },
    ],
    [t],
  );
  const fetchDataForPage = (
    page: number = 0,
    size: number = 20,
    orders: string = 'createdDate DESC',
    uuid: string,
  ) => {
    dispatch(
      actions.fetchKprProgramList({
        size,
        page,
        orders,
        uuid,
      }),
    );
  };

  React.useEffect(() => {
    if (userInformation) {
      fetchDataForPage(0, 20, 'createdDate DESC', userInformation.userUuid);
    }
  }, [userInformation]);

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <ListProject />
    </RootContainer>
  );
}
