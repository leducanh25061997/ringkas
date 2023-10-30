import tickBlue from 'assets/icons/tick-blue.svg';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCustomerInformation } from '../../../../CustomerAccountEdit/slice/selectors';
import moment from 'moment';
import KycPopup from './KycPopup';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { VerificationStatusResponse } from '../../../PreKprVerification/types';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

interface Props {
  customerInfo?: VerificationStatusResponse;
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

const KYC = ({ customerInfo }: Props) => {
  const { customerApplicationDetail, customerApplicationDetailOfGuarantor } =
    useSelector(selectCustomerInformation);
  const address =
    customerApplicationDetail && customerApplicationDetail?.location;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const isVerified = React.useMemo(() => {
    return (
      customerInfo?.applicationState === 'KPR' ||
      customerInfo?.applicationState === 'POST_KPR'
    );
  }, [customerInfo]);

  if (!customerApplicationDetail) return null;

  return (
    <div className="flex flex-col bg-[#fff] rounded-2xl h-full">
      <div className="p-8">
        <div className="flex justify-between mb-6">
          <div className="flex">
            <p className="text-[#202A42] text-[20px] leading-[24px] font-bold mr-2">
              KYC
            </p>
            {isVerified && <img src={tickBlue} alt="tick blue" />}
          </div>
          <p className="view-all" onClick={() => setOpen(true)}>
            {t(translations.common.viewAll)}
          </p>
        </div>
        <div className="flex mb-6">
          <Row
            className="w-1/5"
            title="Full Name As ID"
            description={
              customerApplicationDetail.fullName
                ? customerApplicationDetail.fullName
                : '-'
            }
          />
          <Row
            className="w-1/5"
            title="Place of Birth"
            description={
              customerApplicationDetail.birthPlace
                ? customerApplicationDetail.birthPlace
                : '-'
            }
          />
          <Row
            className="w-1/5"
            title="Date of Birth"
            description={
              customerApplicationDetail.dob
                ? moment(
                    +moment(customerApplicationDetail.dob).format('x'),
                  ).format('DD/MM/YYYY')
                : '-'
            }
          />
          <Row
            className="w-1/5"
            title="NIK"
            description={
              customerApplicationDetail.nik
                ? customerApplicationDetail.nik
                : '-'
            }
          />
          <Row
            className="w-1/5"
            title="NPWP"
            description={
              customerApplicationDetail.npwp
                ? customerApplicationDetail.npwp
                : '-'
            }
          />
        </div>
        <Row
          title="Address As ID"
          description={
            address
              ? `${address?.province ? address?.province : '-'}/ ${
                  address?.city ? address?.city : '-'
                }/ ${address?.district ? address?.district : '-'}/ ${
                  address?.subDistrict ? address?.subDistrict : '-'
                }/ ${address?.postalCode ? address?.postalCode : '-'}`
              : '-'
          }
        />
      </div>
      <Dialog
        scroll="body"
        open={open}
        maxWidth="xl"
        onClose={() => setOpen(false)}
      >
        <KycPopup
          customerKycBasic={customerInfo}
          customerKyc={customerApplicationDetail}
          customerKycGuarantor={customerApplicationDetailOfGuarantor}
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default KYC;
