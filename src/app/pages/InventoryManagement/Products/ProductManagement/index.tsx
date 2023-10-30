import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import BreadCrumbs from 'app/components/BreadCrumbs';
import ListProduct from './components/ListProduct';

import { useProductManagementSlice } from './slice';
import PageHeader from '../../../../components/PageHeader';
import { translations } from '../../../../../locales/translations';
import path from '../../../../routes/path';
import { useTranslation } from 'react-i18next';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`;

const ProductManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useProductManagementSlice();

  const links = React.useMemo(
    () => [
      {
        label: `${t(translations.productInformation.inventory)}`,
        link: path.productList,
      },
    ],
    [t],
  );

  const fetchDataForPage = (page: number = 0, size: number = 20) => {
    dispatch(
      actions.fetchProductsByOwner({
        size,
        page,
      }),
    );
  };

  React.useEffect(() => {
    fetchDataForPage();
  }, []);

  return (
    <RootContainer>
      <PageHeader parentItems={links} title="Manage Product" className="mb-6" />
      <ListProduct />
    </RootContainer>
  );
};

export default ProductManagement;
