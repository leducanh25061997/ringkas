import classNames from 'classnames';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { selectManageCustomer } from '../../../slice/selectors';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { formatCurrency } from 'app/components/CustomTextField';
import { Dialog } from '@mui/material';
import KprPreferencePopup from './KprPreferencePopup';
import defaultBuilding from 'assets/images/default-building.jpg';
import Spinner from 'app/components/Spinner';
import { CustomerBankPreference } from '../../../slice/types';

interface RowProps {
  title: string;
  description: string;
  className?: string;
  link?: string;
}

interface PriorityProps {
  item: string;
  active: boolean;
  onClick: () => void;
}

const Row = ({ title, description, className, link }: RowProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
        {description}{' '}
        <span className="text-[#005FC5] text-[16px] leading-[20px] font-medium underline cursor-pointer">
          {link}
        </span>
      </p>
    </div>
  );
};

const PriorityItem = ({ item, active, onClick }: PriorityProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'mr-4 underline text-[18px] leading-[25px] font-bold cursor-pointer',
        { 'text-[#005FC5]': active },
        { 'text-[#6B7A99]': !active },
      )}
    >
      {item}
    </div>
  );
};

const KprPreference = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { customerPreference, propertyDetail, isLoading } =
    useSelector(selectManageCustomer);
  const [activeBankPreference, setActiveBankPreference] = useState<
    CustomerBankPreference | undefined
  >();

  useEffect(() => {
    if (
      customerPreference?.customerBankPreferences &&
      customerPreference?.customerBankPreferences.length > 0
    ) {
      setActiveBankPreference(customerPreference?.customerBankPreferences[0]);
    }
  }, [customerPreference?.customerBankPreferences]);

  const finalPrice = customerPreference
    ? Math.round(
        customerPreference?.housePrice -
          (customerPreference?.housePrice * customerPreference.discount) / 100,
      )
    : 0;

  return (
    <div className="p-8 bg-[#fff] rounded-2xl h-fit">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#223250] text-[20px] leading-[24px] font-bold">
          {t(translations.createCustomer.kprPreference)}
        </p>
        <p className="view-all text-center" onClick={() => setOpen(true)}>
          {t(translations.common.viewAll)}
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex">
          <div className="w-[120px] h-[120px]">
            <img
              className="w-full h-full object-cover rounded-[8px]"
              src={
                (propertyDetail?.property?.images &&
                  propertyDetail?.property?.images[0] &&
                  propertyDetail?.property?.images[0].url) ||
                defaultBuilding
              }
              alt="default building"
            />
          </div>
          <div className="px-8 flex-1 border-r border-r-[#D7E2EE]">
            <p className="text-[#202A42] text-[18px] leading-[24px] font-bold mb-6">
              {propertyDetail?.property?.projectName || '-'}
            </p>
            <div className="flex justify-between mb-8">
              <Row
                className="w-6/12"
                title={t(translations.bankManagement.cityRegency)}
                description={customerPreference?.location?.city || '-'}
              />
              <Row
                className="w-6/12"
                title={t(translations.customerAccountManagement.developerName)}
                description={customerPreference?.project?.developerName || '-'}
              />
            </div>
            <div className="flex justify-between mb-8">
              <Row
                className="w-6/12"
                title="Type/Unit"
                description={
                  customerPreference?.unit && customerPreference?.type
                    ? `${customerPreference?.type}/${customerPreference?.unit}`
                    : '-'
                }
              />
              <Row
                className="w-6/12"
                title={t(translations.developerWorkspace.soldPrice)}
                description={`Rp ${formatCurrency(finalPrice)}`}
              />
            </div>
            <Row
              className="w-6/12"
              title={t(translations.createCustomer.jointIncome)}
              description={
                customerPreference?.jointIncome
                  ? t(translations.createCustomer.yes)
                  : t(translations.createCustomer.no)
              }
            />
          </div>

          <div className="px-8 flex-1">
            <div className="flex items-center mb-6">
              <p className="text-[#202A42] text-[18px] leading-[24px] font-bold">
                {t(translations.developerWorkspace.bankPreference)}
              </p>
              <div className="flex ml-4">
                {customerPreference?.customerBankPreferences?.map(
                  (preference, index) => (
                    <PriorityItem
                      item={(index + 1).toString()}
                      onClick={() => setActiveBankPreference(preference)}
                      active={
                        index ===
                        customerPreference?.customerBankPreferences?.findIndex(
                          p =>
                            p.bank.bankName ===
                              activeBankPreference?.bank?.bankName &&
                            p.loanProgram.id ===
                              activeBankPreference?.loanProgram.id,
                        )
                      }
                    />
                  ),
                )}
              </div>
            </div>
            <div className="flex mb-8">
              <Row
                className="w-1/2"
                title={t(translations.customerAccountManagement.bankName)}
                description={activeBankPreference?.bank?.bankName || '-'}
              />
              <Row
                className="w-1/2"
                title={t(translations.customerAccountManagement.loanProgram)}
                description={
                  activeBankPreference?.loanProgram?.programName || '-'
                }
              />
            </div>
            <div className="p-4 bg-[#F8F9FA] rounded-2xl mb-8">
              <Row title={t(translations.common.remarks)} description="-" />
            </div>
          </div>
        </div>
      )}
      <Dialog
        scroll="body"
        open={open}
        maxWidth="xl"
        onClose={() => setOpen(false)}
      >
        <KprPreferencePopup
          customerPreference={customerPreference}
          propertyDetail={propertyDetail}
          activeBankPreference={activeBankPreference}
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default KprPreference;
