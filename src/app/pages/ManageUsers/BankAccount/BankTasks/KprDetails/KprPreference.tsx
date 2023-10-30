import { shallowEqual, useSelector } from 'react-redux';
import { selectManageCustomer } from '../../../CustomerAccount/slice/selectors';
import { capitalize } from 'lodash';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import KprPreferencePopup from '../../../CustomerAccount/CustomerInformation/CustomerDetails/KprPreference/KprPreferencePopup';
import { Dialog } from '@mui/material';
import React from 'react';
import { selectScoringReady } from '../../../CustomerAccount/ScoringReady/slice/selectors';
import { selectAuth } from 'app/pages/Login/slice/selectors';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className="flex mb-8">
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-1/2">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium w-1/2">
        {description}
      </p>
    </div>
  );
};

const KprPreference = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const { customerPreference, propertyDetail } =
    useSelector(selectManageCustomer);
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const thisBankInPreference =
    customerPreference?.customerBankPreferences.filter(
      item => item.bank.userUuid === userInformation?.userUuid,
    );
  const thisBank =
    thisBankInPreference && thisBankInPreference.length > 0
      ? thisBankInPreference[0]
      : undefined;
  const kprProgram = thisBank?.loanProgram;
  const loanProgram = `Fixed ${kprProgram?.fixedYear ?? 0}Y @ ${(
    kprProgram?.fixedRate ?? 0
  ).toFixed(2)}% Float at ${(kprProgram?.floatRate ?? 0).toFixed(2)}%`;

  return (
    <div className="card min-h-[349px]">
      <div className="pt-6 px-8 pb-10">
        <div className="flex justify-between mb-6">
          <p className="text-[#202A42] text-[18px] leading-[24px] font-bold mb-6">
            {t(translations.createCustomer.kprPreference)}
          </p>
          <p className="view-all" onClick={() => setOpen(true)}>
            {t(translations.common.viewAll)}
          </p>
        </div>
        <div className="flex">
          <div className="mr-10">
            <Row
              title={t(translations.developerWorkspace.typeOfLoan)}
              description={capitalize(customerPreference?.typeOfLoan) || '-'}
            />
            <Row
              title="Length of Tenor"
              description={
                customerPreference?.tenorPreference
                  ? `${customerPreference?.tenorPreference} years`
                  : '-'
              }
            />
            <Row
              title={t(translations.customerAccountManagement.loanProgram)}
              description={loanProgram}
            />
            {/*<Row title={t(translations.customerAccountManagement.typeOfApplication)} description="Joint Income"/>*/}
            <Row
              title={t(translations.createCustomer.jointIncome)}
              description={
                customerPreference?.jointIncome
                  ? t(translations.createCustomer.yes)
                  : t(translations.createCustomer.no)
              }
            />
          </div>
          <div className="flex-1">
            <Row
              title={t(translations.customerAccountManagement.employmentType)}
              description={
                customerPreference?.employeeType
                  ? capitalize(customerPreference?.employeeType)
                  : '-'
              }
            />
            <Row
              title={t(translations.customerAccountManagement.maritalStatus)}
              description="Married"
            />
          </div>
        </div>
      </div>
      <Dialog
        scroll="body"
        open={open}
        maxWidth="xl"
        onClose={() => setOpen(false)}
      >
        <KprPreferencePopup
          customerPreference={customerPreference}
          propertyDetail={propertyDetail}
          activeBankPreference={thisBank}
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default KprPreference;
