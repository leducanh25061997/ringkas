import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import CustomRow from 'app/components/CustomRow';
import Img from 'app/components/Img';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import notFound from 'assets/images/not-found.jpg';
import { Typography } from '@mui/material';
import deleteIcon from 'assets/icons/delete.svg';
import styled from 'styled-components';
import {
  CustomerBankPreference,
  CustomerPreference,
  LoanProgramType,
} from '../../../slice/types';
import { formatCurrency } from 'app/components/CustomTextField';
import { PropertyDetailForm } from '../../../../../InventoryManagement/Products/CreateProduct/slice/types';
import { capitalize } from 'lodash';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

interface Props {
  customerPreference?: CustomerPreference;
  activeBankPreference?: CustomerBankPreference;
  propertyDetail?: PropertyDetailForm;
  onClose?: () => void;
}

interface ImageProps {
  url?: string;
}

interface RowProps {
  loanProgram?: Partial<LoanProgramType>;
  className?: string;
}

const Image = ({ url }: ImageProps) => {
  return (
    <div className="w-full relative h-[460px]">
      <Img src={url} alt="" className="rounded-lg h-full w-full object-cover" />
      {url && (
        <a
          className="p-2 absolute right-3 bottom-3 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-lg"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          <img src={fullscreenIcon} alt="" width={16} height={16} />
        </a>
      )}
    </div>
  );
};

const Row = ({ loanProgram, className }: RowProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        Loan Program
      </p>
      <div className="flex">
        <p className="text-[#223250] text-[16px] leading-[20px] font-medium w-1/3">
          {loanProgram?.programName || '-'}
        </p>
        <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-1/3">
          Fixed
        </p>
        <p className="mb-2 text-[#223250] text-[14px] leading-[20px] font-semibold w-1/3">
          {loanProgram?.fixedYear
            ? `${loanProgram?.fixedYear} years ${loanProgram?.fixedRate || 0}%`
            : '-'}
        </p>
      </div>
      <div className="flex">
        <p className="text-[#6B7A99] text-[14px] leading-[20px] font-medium w-1/3">
          Interest Rate
        </p>
        <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-1/3">
          Float
        </p>
        <p className="mb-2 text-[#223250] text-[14px] leading-[20px] font-semibold w-1/3">
          {loanProgram?.floatRate ? `${loanProgram?.floatRate}%` : '-'}
        </p>
      </div>
    </div>
  );
};

const KprPreferencePopup = ({
  customerPreference,
  propertyDetail,
  activeBankPreference,
  onClose,
}: Props) => {
  const { t } = useTranslation();

  const finalPrice = customerPreference
    ? Math.round(
        customerPreference?.housePrice -
          (customerPreference?.housePrice * customerPreference.discount) / 100,
      )
    : 0;

  return (
    <div className="py-6 w-[850px]">
      <Header>
        <Typography
          sx={{
            color: '#223250',
            fontSize: '20px',
            fontWeight: '700',
            lineHeight: '25px',
            flex: '1 !important',
            textAlign: 'center',
          }}
        >
          <p className="text-[#202A42] text-[20px] leading-[24px] text-center font-bold mr-2 pb-6">
            {t(translations.createCustomer.kprPreference)}
          </p>
        </Typography>
        <img
          src={deleteIcon}
          width={24}
          height={24}
          alt="delete-icon"
          className="cursor-pointer"
          // @ts-ignore
          onClick={onClose}
        />
      </Header>
      <div className="max-h-[700px] px-10 overflow-y-auto scrollbar">
        <Image
          url={
            (propertyDetail?.property?.images &&
              propertyDetail?.property?.images[0] &&
              propertyDetail?.property?.images[0].url) ||
            notFound
          }
        />
        <p className="text-[#202A42] text-[24px] leading-[24px] font-bold my-8">
          {propertyDetail?.property?.projectName
            ? propertyDetail?.property?.projectName
            : '-'}
        </p>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.createCustomer.cityLabel)}
            description={customerPreference?.location?.city || '-'}
            className="w-1/3"
          />
          <CustomRow
            title={t(translations.customerAccountManagement.developerName)}
            description={customerPreference?.project?.developerName || '-'}
            className="w-1/3"
          />
          <CustomRow
            title={'Type/Unit'}
            description={
              customerPreference?.unit && customerPreference?.type
                ? `${customerPreference?.type}/${customerPreference?.unit}`
                : '-'
            }
            className="w-1/3"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.developerWorkspace.soldPrice)}
            description={`Rp ${formatCurrency(finalPrice)}`}
            className="w-1/3"
          />
          <CustomRow
            title={t(translations.customerAccountManagement.employmentType)}
            description={
              customerPreference?.employeeType
                ? capitalize(customerPreference?.employeeType)
                : '-'
            }
            className="w-1/3"
          />
          <CustomRow
            title={t(translations.createCustomer.jointIncome)}
            // @ts-ignore
            description={
              customerPreference?.jointIncome
                ? t(translations.createCustomer.yes)
                : t(translations.createCustomer.no)
            }
            className="w-1/3"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.developerWorkspace.typeOfLoan)}
            description={
              customerPreference?.typeOfLoan
                ? capitalize(customerPreference?.typeOfLoan)
                : '-'
            }
            className="w-2/4"
          />
          <CustomRow
            title={t(
              translations.customerAccountManagement
                .monthlyInstallmentPreference,
            )}
            description={
              customerPreference?.installmentPreferenceMonthly
                ? `Rp ${formatCurrency(
                    customerPreference?.installmentPreferenceMonthly,
                  )}`
                : '-'
            }
            className="w-2/4"
          />
          <CustomRow
            title={t(
              translations.customerAccountManagement.downPaymentPreference,
            )}
            description={
              customerPreference?.downPaymentPreference
                ? `Rp ${formatCurrency(
                    customerPreference?.downPaymentPreference,
                  )}`
                : '-'
            }
            className="w-2/4"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.createCustomer.tenorPreference)}
            description={
              customerPreference?.tenorPreference
                ? `${customerPreference?.tenorPreference} years`
                : '-'
            }
            className="w-2/4"
          />
          <CustomRow
            title={t(translations.createCustomer.takeHomePayMonthlyLabel)}
            description={
              customerPreference?.takeHomePayMonthly
                ? `Rp ${formatCurrency(customerPreference?.takeHomePayMonthly)}`
                : '-'
            }
            className="w-2/4"
          />
          <CustomRow
            title={t(translations.createCustomer.totalObligationMonthlyLabel)}
            description={
              customerPreference?.totalObligationMonthly
                ? `Rp ${formatCurrency(
                    customerPreference?.totalObligationMonthly,
                  )}`
                : '-'
            }
            className="w-2/4"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.customerAccountManagement.bankName)}
            description={activeBankPreference?.bank?.bankName || '-'}
            className="w-1/3"
          />
          <div className="w-2/3">
            <Row
              loanProgram={activeBankPreference?.loanProgram}
              className="w-full"
            />
          </div>
        </div>
        <div className="p-4 bg-[#F8F9FA] rounded-2xl mt-8">
          <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
            {t(translations.common.remarks)}
          </p>
          <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
            -
          </p>
        </div>
      </div>
    </div>
  );
};

export default KprPreferencePopup;
