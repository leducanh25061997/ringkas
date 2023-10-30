import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { VerificationStatus } from 'types/enums';
import NoPermission from 'app/components/NoPermission';

import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useEmployeeAccountManagementSlice } from '../slice';

import ListEmployee from './components/ListEmployee';

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

export default function EmployeeAccountManagementByAdmin() {
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const allowInteraction =
    userInformation?.verificationStatus === VerificationStatus.VERIFIED;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useEmployeeAccountManagementSlice();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.manageUsers,
      },
      {
        title: t(translations.sidebar.administration),
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
      actions.fetchEmployeeAccountList({
        size,
        page,
        orders,
      }),
    );
  };

  React.useEffect(() => {
    if (allowInteraction) fetchDataForPage(0, 20, 'createdDate desc');
  }, []);

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <ListEmployee allowInteraction={allowInteraction} />
      {!allowInteraction && <NoPermission />}
    </RootContainer>
  );
}
