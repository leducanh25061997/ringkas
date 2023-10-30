import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ListProject from './components/ListProject';
import { useManageCustomerSlice } from '../../../ManageUsers/CustomerAccount/slice';

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

export default function ProjectManagement() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { actions } = useManageCustomerSlice();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.sidebar.inventoryManagement),
        path: path.inventoryManagement,
      },
      {
        title: t(translations.sidebar.manageProject),
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
      actions.getListProjectByOwner({
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
      <ListProject />
    </RootContainer>
  );
}
