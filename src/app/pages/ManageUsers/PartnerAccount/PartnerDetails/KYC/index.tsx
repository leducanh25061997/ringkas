import tickBlue from 'assets/icons/tick-blue.svg';
import { translations } from 'locales/translations';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { PartnerDetails } from 'types/PartnerAccountManagement';
import { Dialog } from '@mui/material';
import KycPopup from './KycPopup';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

interface Props {
  kyc?: PartnerDetails['kyc'];
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

const KYC = ({ kyc, verified }: Props) => {
  const { t } = useTranslation();
  const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);
  return (
    <div className="flex flex-col bg-[#fff] rounded-2xl h-full">
      <div className="p-8">
        <div className="flex justify-between mb-6">
          <div className="flex">
            <p className="text-[#202A42] text-[20px] leading-[24px] font-bold mr-2">
              {t(translations.common.kyc)}
            </p>
            {verified && <img src={tickBlue} alt="tick blue" />}
          </div>
          <p className="view-all" onClick={() => setDetailDialogOpen(true)}>
            {t(translations.common.viewAll)}
          </p>
        </div>
        <div className="flex-col">
          <div className="flex w-full mb-6">
            <Row
              className="w-1/2"
              title={t(translations.common.nameAsID)}
              description={kyc?.fullName || '-'}
            />
            <Row
              className="w-2/5"
              title={t(translations.registerNewClient.placeOfBirth)}
              description={kyc?.birthPlace || '-'}
            />
            <Row
              className="w-1/5"
              title={t(translations.registerNewClient.dateOfBirth)}
              description={moment(kyc?.dob).format('DD/MM/YYYY') || '-'}
            />
          </div>
          <div className="flex w-full mb-6">
            <Row className="w-1/2" title="NIK" description={kyc?.nik || '-'} />
            <Row
              className="w-2/5"
              title="NPWP"
              description={kyc?.npwp || '-'}
            />
            <div className="w-1/5" />
          </div>
        </div>
        <div className="w-full">
          <Row
            title={t(translations.partnerDetail.addressAsId)}
            description={
              kyc?.location ? Object.values(kyc?.location).join(', ') : '-'
            }
          />
        </div>
      </div>
      <Dialog
        open={detailDialogOpen}
        maxWidth="xl"
        onClose={() => setDetailDialogOpen(false)}
      >
        <KycPopup
          kyc={kyc}
          verified={verified}
          onClose={() => setDetailDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default KYC;
