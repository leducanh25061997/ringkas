import { FormControlLabel } from '@mui/material';
import { CustomStatus } from 'app/components/CustomSwitch';
import Spinner from 'app/components/Spinner';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PartnerDetails } from 'types/PartnerAccountManagement';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

interface Props {
  partner?: PartnerDetails;
  loading?: boolean;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium break-all">
        {description}
      </p>
    </div>
  );
};

const PartnerInfo = ({ partner, loading }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="p-8 bg-[#fff] rounded-2xl h-[230px]">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex">
          <div className="w-[120px] h-[120px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={defaultAvatar}
              alt="default avatar"
            />
          </div>
          <div className="ml-8 w-[370px] flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#202A42] text-[18px] leading-[24px] font-bold">
                {partner?.kyc?.fullName || '-'}
              </p>
              <div className="flex items-center">
                <div
                  style={{
                    backgroundColor:
                      partner?.verificationStatus === 'VERIFIED'
                        ? '#39C24F'
                        : '#6B7A99',
                  }}
                  className={`w-[12px] h-[12px] rounded-full mr-2`}
                />
                <p className="text-[#6B7A99] text-[16px] leading-[20px]">
                  {partner?.verificationStatus === 'VERIFIED'
                    ? t(translations.common.active)
                    : t(translations.common.inactive)}
                </p>
              </div>
            </div>
            <div className="flex mb-6 w-full">
              <Row
                className="w-1/2 pr-10"
                title={t(translations.customerList.email)}
                description={partner?.kyc?.email || '-'}
              />
              <Row
                className="w-1/2"
                title={t(translations.dataVerification.phone)}
                description={partner?.kyc?.phone || '-'}
              />
            </div>

            <div className="flex w-full">
              <Row
                className="w-1/2 pr-10"
                title={t(translations.partnerManagement.partner)}
                description={partner?.company?.name || '-'}
              />
              <Row
                className="w-1/2"
                title={t(translations.developerInformation.registerDate)}
                description={moment(partner?.createdDate).format('DD/MM/YYYY')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerInfo;
