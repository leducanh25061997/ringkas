import { Dialog } from '@mui/material';
import tickBlue from 'assets/icons/tick-blue.svg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { PartnerDetails } from 'types/PartnerAccountManagement';
import KybPopup from './KybPopup';
import React from 'react';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

interface Props {
  company?: PartnerDetails['company'];
  verified: boolean;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
        {description}
      </p>
    </div>
  );
};

const KYB = ({ company, verified }: Props) => {
  const { t } = useTranslation();
  const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);

  return (
    <div className="flex flex-col bg-[#fff] rounded-2xl h-full">
      <div className="p-8">
        <div className="flex justify-between mb-6">
          <div className="flex">
            <p className="text-[#202A42] text-[20px] leading-[24px] font-bold mr-2">
              {t(translations.common.kyb)}
            </p>
            {verified && <img src={tickBlue} alt="tick blue" />}
          </div>
          <p className="view-all" onClick={() => setDetailDialogOpen(true)}>
            {t(translations.common.viewAll)}
          </p>
        </div>
        <div className="flex w-full mb-6">
          <Row
            className="w-full"
            title={t(translations.registerNewClient.companyName)}
            description={company?.name || '-'}
          />
        </div>
        <div className="flex w-full mb-6">
          <Row
            className="w-full"
            title={t(translations.registerNewClient.companyAddress)}
            description={company?.address || '-'}
          />
        </div>
        <div className="flex w-full mb-6">
          <Row
            className="w-1/2"
            title={t(translations.registerNewClient.companyEmail)}
            description={company?.email || '-'}
          />
          <Row
            className="w-1/2"
            title={t(translations.registerNewClient.companyPhoneNumber)}
            description={company?.phone || '-'}
          />
        </div>
      </div>
      <Dialog
        open={detailDialogOpen}
        maxWidth="xl"
        onClose={() => setDetailDialogOpen(false)}
      >
        <KybPopup
          company={company}
          verified={verified}
          onClose={() => setDetailDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default KYB;
