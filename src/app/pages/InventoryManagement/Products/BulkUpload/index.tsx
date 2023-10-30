import PageHeader from 'app/components/PageHeader';
import React from 'react';
import History from './History';
import Upload from './Upload';
import { translations } from 'locales/translations';
import path from '../../../../routes/path';
import { useTranslation } from 'react-i18next';

function BulkUpload() {
  const { t } = useTranslation();
  const links = React.useMemo(
    () => [
      {
        label: `${t(translations.productInformation.inventory)}`,
        link: path.productList,
      },
      {
        label: `${t(translations.sidebar.manageProduct)}`,
        link: path.productList,
      },
    ],
    [t],
  );
  return (
    <div className="w-full min-h-[calc(100vh-85px)] p-8">
      <PageHeader parentItems={links} title="Bulk Upload" />
      <Upload />
      <History />
    </div>
  );
}

export default BulkUpload;
