import React from 'react';
import CreateProduct from '../CreateProduct';
import { translations } from '../../../../../locales/translations';
import { useTranslation } from 'react-i18next';

const ProductEdit = () => {
  const { t } = useTranslation();
  return (
    <CreateProduct
      typeAction="EDIT"
      title={`${t(translations.productManagement.updateProduct)}`}
    />
  );
};

export default React.memo(ProductEdit);
