import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectScoringReady } from '../../../ScoringReady/slice/selectors';
import { formatCurrency } from 'app/components/CustomTextField';
import { selectManageCustomer } from '../../../slice/selectors';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { slikDetailsSlice } from '../../SlikDetails/slice/selectors';

interface RowProps {
  title: string;
  description: string;
  customStyle?: string;
}

const Row = ({ title, description, customStyle }: RowProps) => {
  return (
    <div className="flex mb-8">
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-9/12 flex-1">
        {title}
      </p>
      <p
        className={classNames(
          'text-[#223250] text-[16px] leading-[20px] font-medium w-3/12',
          customStyle,
        )}
      >
        {description}
      </p>
    </div>
  );
};

const AssessmentSummary = () => {
  const { t } = useTranslation();
  const { assessmentData } = useSelector(selectScoringReady);
  const { data: slikData } = useSelector(slikDetailsSlice);
  const { propertyDetail, customerPreference } =
    useSelector(selectManageCustomer);

  const tenorPreference =
    customerPreference && customerPreference.tenorPreference;

  const characteristicItem =
    assessmentData &&
    assessmentData.data.filter(item => item.key === 'Characteristic');
  const quantitativeItem =
    assessmentData && assessmentData.data.filter(item => item.key === 'DBR');
  const tenorItem =
    assessmentData && assessmentData.data.filter(item => item.key === 'Tenor');
  const incomeVerification =
    assessmentData &&
    assessmentData.data.filter(item => item.key === 'Income Verification');

  const collectability =
    characteristicItem &&
    characteristicItem[0].children?.filter(
      item => item.key === 'Collectability',
    );

  const finalPrice =
    propertyDetail && propertyDetail.housePrice
      ? Math.round(
          propertyDetail.housePrice -
            (propertyDetail.housePrice * propertyDetail.discount) / 100,
        )
      : 0;

  const downPaymentRp =
    propertyDetail && propertyDetail.downPayment
      ? Math.round((finalPrice * propertyDetail.downPayment) / 100)
      : 0;

  const kprAmount =
    propertyDetail && propertyDetail.bookingFee
      ? Math.round(finalPrice - propertyDetail.bookingFee - downPaymentRp)
      : 0;

  const interestRateItems =
    assessmentData &&
    assessmentData.data.filter(item => item.key === 'Interest Rate');

  let interestRateInPercent =
    interestRateItems &&
    interestRateItems.length > 0 &&
    interestRateItems[0].values.length > 0 &&
    interestRateItems[0].values[0]
      ? Number(interestRateItems[0].values[0])
      : propertyDetail?.interestRate ?? 7;

  if (interestRateInPercent === 0) {
    interestRateInPercent = 7;
  }
  const interestRate = interestRateInPercent / 100;
  const ratePerMonth = interestRate / 12;
  const tenorYear = customerPreference?.tenorPreference ?? 15; // default to 15 years
  const tenorMonth = tenorYear * 12;

  const estimatedMonthlyInstallment =
    Math.round(
      (kprAmount * ratePerMonth) /
        (1 - Math.pow(1 + ratePerMonth, -tenorMonth)),
    ) || 0;

  // DBR can be calculated
  const creditHistory =
    slikData?.creditReport?.contractsHistory?.credit?.grantedCredit || [];

  const activeContracts = creditHistory.filter(
    (item: any) => item.commonData.contractPhase === 'AC',
  );

  const debtData = activeContracts.map(
    (item: any) => item.grantedCredit.currentMonthRealization,
  );
  const totalDebt = debtData.reduce(
    (partialSum: number, a: number) => partialSum + a,
    0,
  );
  const income = assessmentData
    ? Number(
        assessmentData.data.filter(item => item.key === 'Monthly Income')[0]
          .values[0],
      )
    : 0;
  const newDbr = (
    Math.round(
      100 *
        (income ? (totalDebt + estimatedMonthlyInstallment) / income : 0) *
        100,
    ) / 100
  ).toFixed(2);
  // end DBR calculation

  return (
    <div className="w-6/12">
      <p className="text-[#223250] text-[16px] leading-[20px] font-semibold w-full pl-8 pb-6 border-b border-b-[#D7E2EE]">
        {t(translations.developerWorkspace.assessmentSummary).toUpperCase()}
      </p>
      <div className="p-8 pb-0">
        <Row
          title={t(translations.developerWorkspace.soldPrice)}
          description={`Rp ${formatCurrency(finalPrice)}`}
        />
        <Row
          title={t(translations.developerWorkspace.bookingFee)}
          description={
            (propertyDetail?.bookingFee &&
              `Rp ${formatCurrency(propertyDetail.bookingFee)}`) ||
            '-'
          }
        />
        <Row
          title={`${t(translations.developerWorkspace.downPayment)} (@10%)`}
          description={`Rp ${formatCurrency(downPaymentRp)}`}
        />
        <Row
          title={t(translations.scoringReady.interestRate)}
          description={
            propertyDetail?.interestRate
              ? `${propertyDetail.interestRate}%`
              : '-'
          }
        />
        <Row
          title={t(translations.developerWorkspace.kprAmount)}
          description={`Rp ${formatCurrency(kprAmount)}` || '-'}
        />
        <Row
          title={t(
            translations.developerWorkspace.estimatedMonthlyHousePayment,
          )}
          description={`Rp ${formatCurrency(estimatedMonthlyInstallment)}`}
        />
        <Row
          title={t(translations.kprProgram.tenor)}
          description={
            (tenorItem && tenorItem[0]?.values && tenorItem[0].values[0]) ||
            (tenorPreference && `${tenorPreference} years`) ||
            '-'
          }
        />
        <Row
          title={t(translations.scoringReady.incomeVerification)}
          description={
            (incomeVerification &&
              incomeVerification[0]?.values &&
              incomeVerification[0]?.values[0]) ||
            '-'
          }
        />
        <Row
          title={t(translations.developerWorkspace.dbr)}
          description={`${newDbr}%` || '-'}
          customStyle="text-[#39C24F]"
        />
        <Row
          title={t(translations.developerWorkspace.collectability)}
          description={
            (collectability &&
              collectability[0]?.values &&
              collectability[0]?.values[0]) ||
            '-'
          }
          customStyle="text-[#39C24F]"
        />
      </div>
    </div>
  );
};

export default AssessmentSummary;
