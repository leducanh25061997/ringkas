import { VerificationStatusResponse } from '../../../PreKprVerification/types';
import Spinner from 'app/components/Spinner';
import moment from 'moment';
import React from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCustomerInformation } from '../../../../CustomerAccountEdit/slice/selectors';
import defaultAvatar from 'assets/images/default-avatar.jpg';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

interface Props {
  isLoading?: boolean;
  customerInfo?: VerificationStatusResponse;
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

const CustomerAccount = ({ isLoading, customerInfo }: Props) => {
  const { customerApplicationDetail } = useSelector(selectCustomerInformation);
  const { t } = useTranslation();

  return (
    <div className="p-8 bg-[#fff] rounded-2xl h-[224px]">
      {isLoading ? (
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
                {customerInfo?.account?.fullName
                  ? `${customerInfo?.account?.fullName}`
                  : '-'}
              </p>
              <div className="flex items-center">
                <div className="h-[12px] w-[12px] bg-[#39C24F] rounded-2xl" />
                <p className="text-[#6B7A99] text-[16px] leading-[20px] ml-3">
                  Active
                </p>
              </div>
            </div>
            <div className="flex mb-6 w-full">
              <Row
                className="w-1/2 pr-10"
                title={t(translations.customerList.email)}
                description={
                  customerInfo?.account?.email
                    ? `${customerInfo?.account?.email}`
                    : '-'
                }
              />
              <Row
                className="w-1/2"
                title={t(translations.dataVerification.phone)}
                description={
                  customerApplicationDetail && customerApplicationDetail.phone
                    ? customerApplicationDetail.phone
                    : '-'
                }
              />
            </div>

            <div className="flex w-full">
              <Row
                className="w-1/2 pr-10"
                title={t(translations.customerList.leads)}
                description={customerInfo?.leads?.kyc?.fullName || 'Ringkas'}
              />
              <Row
                className="w-1/2"
                title={t(translations.developerInformation.registerDate)}
                description={
                  customerInfo?.account?.createdDate
                    ? `${moment(customerInfo?.account?.createdDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : '-'
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccount;
