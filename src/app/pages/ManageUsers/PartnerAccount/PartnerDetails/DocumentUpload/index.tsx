import { Dialog } from '@mui/material';
import { translations } from 'locales/translations';
import { last } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileUpload } from 'types';
import { PartnerDetails } from 'types/PartnerAccountManagement';
import DocumentPopup from './DocumentPopup';

interface Props {
  document?: PartnerDetails['document'];
}

const S3Files = ({
  files = [],
  label,
}: {
  label: string;
  files?: FileUpload[];
}) => {
  const { t } = useTranslation();
  const noFile = React.useMemo(
    () => (
      <span className="text-[#6B7A99] w-1/2 ml-[25px]">
        {t(translations.common.noFile)}
      </span>
    ),
    [t],
  );

  const handleOpenFile = React.useCallback((file: FileUpload) => {
    window.open(file.url, '_blank');
  }, []);

  const renderItem = React.useCallback(
    (file, itemLabel) => {
      return (
        <div className="flex w-full mb-3">
          <span className="text-[##6B7A99] w-1/2">{itemLabel}</span>
          {file ? (
            <span
              className="text-[#005FC5] w-1/2 ml-[25px] underline cursor-pointer"
              onClick={() => handleOpenFile(file)}
            >
              {last(file.s3Key?.split('/'))}
            </span>
          ) : (
            noFile
          )}
        </div>
      );
    },
    [handleOpenFile, noFile],
  );

  return (
    <>
      {files?.length > 0
        ? files?.map((file, index) => {
            if (index === 0) {
              return renderItem(file, label);
            } else {
              return renderItem(file, label + ` ${index}`);
            }
          })
        : renderItem(undefined, label)}
    </>
  );
};

const DocumentUpload = ({ document }: Props) => {
  const { t } = useTranslation();
  const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);

  return (
    <div className="bg-white p-8 rounded-2xl">
      <div className="flex justify-between mb-6">
        <div className="flex">
          <p className="text-[#202A42] text-[20px] leading-[24px] font-bold mr-2">
            {t(translations.partnerDetail.documentUpload)}
          </p>
        </div>
        <p className="view-all" onClick={() => setDetailDialogOpen(true)}>
          {t(translations.common.viewAll)}
        </p>
      </div>
      <S3Files
        label={t(translations.registerNewClient.kptDirector)}
        files={document?.fileKtpDirector}
      />
      <S3Files
        label={t(translations.registerNewClient.deedOfCompany)}
        files={document?.fileDeedOfCompany}
      />

      <S3Files
        label={t(translations.registerNewClient.companyNPWP)}
        files={document?.fileCompanyNpwp}
      />
      <S3Files
        label={t(translations.registerNewClient.nib)}
        files={document?.fileNib}
      />
      <S3Files
        label={t(translations.registerNewClient.companyDecree)}
        files={document?.fileCompanyDecree}
      />
      <S3Files
        label={t(translations.registerNewClient.supportingDocument)}
        files={document?.fileSupportingDocument}
      />
      <Dialog
        open={detailDialogOpen}
        maxWidth="xl"
        onClose={() => setDetailDialogOpen(false)}
      >
        <DocumentPopup
          document={document}
          onClose={() => setDetailDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default React.memo(DocumentUpload);
