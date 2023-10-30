import Dialog from 'app/components/Dialog';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectManageCustomer } from '../../../CustomerAccount/slice/selectors';
import { selectCustomerInformation } from '../../../CustomerAccountEdit/slice/selectors';
import { useTranslation } from 'react-i18next';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import { translations } from 'locales/translations';
import moment from 'moment';
import { capitalize } from 'lodash';
import { selectScoringReady } from '../../../CustomerAccount/ScoringReady/slice/selectors';
import Img from 'app/components/Img';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

export const Row = ({ title, description, className }: RowProps) => {
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

const CustomerData = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { customerPreference } = useSelector(selectManageCustomer);
  const { customerApplicationDetail } = useSelector(selectCustomerInformation);
  const { kycStatus } = useSelector(selectScoringReady);
  const address =
    customerApplicationDetail && customerApplicationDetail?.location;

  return (
    <div className="card min-h-[349px]">
      <div className="pt-6 px-8 pb-10">
        <div className="flex justify-between mb-6">
          <p className="text-[#202A42] text-[18px] leading-[24px] font-bold">
            {t(translations.common.customerData)}
          </p>
          <p className="view-all" onClick={() => setOpen(true)}>
            {t(translations.common.viewAll)}
          </p>
        </div>
        <div className="flex">
          <div className="w-[120px] h-[120px]">
            <Img
              className="w-full h-full object-cover rounded-[8px]"
              src={kycStatus?.account?.photo?.url || defaultAvatar}
              alt="property"
            />
          </div>
          <div className="ml-6 flex-1">
            <p className="text-[#202A42] text-[18px] leading-[24px] font-bold mb-6">
              {kycStatus?.account?.fullName || '-'}
              <span className="text-[#202A42] text-[16px] leading-[20px] font-medium">
                / {t(translations.partnerManagement.applicationId)}:{' '}
                {kycStatus?.applicationId}
              </span>
            </p>
            <div className="flex mb-8">
              <Row
                title={t(translations.dataVerification.phone)}
                description={
                  (customerApplicationDetail &&
                    customerApplicationDetail?.phone) ||
                  '-'
                }
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.developerInformation.registerDate)}
                description={
                  moment(kycStatus?.account?.createdDate).format(
                    'DD/MM/YYYY',
                  ) || '-'
                }
                className="w-6/12"
              />
            </div>
            <div className="flex">
              <Row
                title={t(translations.registerNewClient.email)}
                description={kycStatus?.account?.email || '-'}
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.common.employment)}
                description={
                  capitalize(customerPreference?.employeeType) || '-'
                }
                className="w-6/12"
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        title={t(translations.common.customerData)}
        submitTitle={t(translations.common.download)}
      >
        <div className="flex p-6 w-[720px]">
          <div className="w-[120px] h-[120px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={defaultAvatar}
              alt="default avatar"
            />
          </div>
          <div className="ml-6 w-[370px] flex-1">
            <p className="text-[#202A42] text-[18px] leading-[24px] font-bold mb-2">
              {kycStatus?.account?.fullName || '-'}
            </p>
            <p className="text-[#202A42] text-[16px] leading-[20px] font-medium mb-10">
              {t(translations.partnerManagement.applicationId)}:{' '}
              {kycStatus?.applicationId}
            </p>
            <div className="flex mb-8">
              <Row
                title={t(translations.dataVerification.phone)}
                description={
                  (customerApplicationDetail &&
                    customerApplicationDetail?.phone) ||
                  '-'
                }
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.developerInformation.registerDate)}
                description={
                  moment(kycStatus?.account?.createdDate).format(
                    'DD/MM/YYYY',
                  ) || '-'
                }
              />
            </div>
            <div className="flex mb-8">
              <Row
                title={t(translations.registerNewClient.email)}
                description={kycStatus?.account?.email || '-'}
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.common.employment)}
                description={
                  capitalize(customerPreference?.employeeType) || '-'
                }
              />
            </div>
            <div className="flex mb-8">
              <Row
                title={t(translations.createCustomer.birthPlaceLabel)}
                description="Surabaya"
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.createCustomer.dobLabel)}
                description={
                  customerApplicationDetail && customerApplicationDetail.dob
                    ? moment(
                        +moment(customerApplicationDetail.dob).format('x'),
                      ).format('DD/MM/YYYY')
                    : '-'
                }
              />
            </div>
            <div className="flex mb-8">
              <Row
                title={t(translations.common.idNumber)}
                description={customerApplicationDetail?.nik || '-'}
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.createCustomer.npwp)}
                description={customerApplicationDetail?.npwp || '-'}
              />
            </div>
            <div className="flex mb-8">
              <Row
                title={t(translations.createCustomer.cityLabel)}
                description={customerApplicationDetail?.location?.city || '-'}
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.common.districtAsId)}
                description={
                  customerApplicationDetail?.location?.district || '-'
                }
              />
            </div>
            <div className="flex mb-8">
              <Row
                title={t(translations.common.subDistrictAsId)}
                description={
                  customerApplicationDetail?.location?.subDistrict || '-'
                }
                className="w-6/12 mr-[60px]"
              />
              <Row
                title={t(translations.dataVerification.postalCode)}
                description={
                  customerApplicationDetail?.location?.postalCode || '-'
                }
              />
            </div>
            <Row
              title={t(translations.partnerDetail.addressAsId)}
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
        </div>
      </Dialog>
    </div>
  );
};

export default CustomerData;
