import { selectScoringReady } from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/selectors';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AssessmentCollapseRow from './components/CollapseRow';
import AssessmentDetailsRow from './components/NonCollapseRow';
import DBR from './DBR';
import LoanToValue from './LoanToValue';
import TotalOutstandingCredit from './TotalOutstandingCredit/TotalOutstandingCredit';

export const TABLE_COLUMN_WIDTHS = ['40%', '20%', '20%', '20%'];

interface Props {
  editable?: boolean;
  predefinedAssessmentValues?: Record<string, string>;
}

export default function AssessmentDetails({
  editable = false,
  predefinedAssessmentValues = {} as Record<string, string>,
}: Props) {
  const { assessmentData, housePriceData } = useSelector(selectScoringReady);
  const formMethods = useFormContext();

  const getValueForItem = (item: any) => {
    if (item && item.key && predefinedAssessmentValues[item.key]) {
      return predefinedAssessmentValues[item.key];
    }
    if (item && item.values && item.values.length > 0 && item.values[0]) {
      return item.values[0];
    }
    return undefined;
  };

  const getRowData = (key: string) => {
    return assessmentData
      ? assessmentData.data.filter(item => item.key === key)[0]
      : undefined;
  };

  const finalPrice = housePriceData
    ? Math.round(
        housePriceData.housePrice -
          (housePriceData.housePrice * housePriceData.discount) / 100,
      )
    : 0;

  const downPaymentRp = housePriceData
    ? Math.round((finalPrice * housePriceData.downPayment) / 100)
    : 0;

  const kprAmount = housePriceData
    ? Math.round(finalPrice - housePriceData.bookingFee - downPaymentRp)
    : 0;

  const interestRateInPercent = editable
    ? formMethods.watch('Interest Rate')
    : getValueForItem(getRowData('Interest Rate')) ??
      housePriceData?.interestRate ??
      7;

  const interestRate = interestRateInPercent / 100;
  const ratePerMonth = interestRate / 12;
  const tenorYear = housePriceData?.tenorPreference ?? 15; // default to 15 years
  const tenorMonth = tenorYear * 12;

  const estimatedMonthlyInstallment =
    Math.round(
      (kprAmount * ratePerMonth) /
        (1 - Math.pow(1 + ratePerMonth, -tenorMonth)),
    ) || 0;

  return (
    <div className="w-full pb-8">
      <div className="flex text-[#6B7A99] text-[14px] leading-5 px-8 pb-2 border-b border-b-[#D7E2EE]">
        <p className="font-semibold" style={{ width: TABLE_COLUMN_WIDTHS[0] }}>
          PARAMETER
        </p>
        <p className="font-semibold" style={{ width: TABLE_COLUMN_WIDTHS[1] }}>
          DATA SOURCE
        </p>
        <p className="font-semibold" style={{ width: TABLE_COLUMN_WIDTHS[2] }}>
          DATA TYPE
        </p>
        <p className="font-semibold" style={{ width: TABLE_COLUMN_WIDTHS[3] }}>
          VALUE
        </p>
      </div>
      <div className="px-8 leading-5 text-[#6B7A99] w-full">
        <AssessmentCollapseRow
          parameter={getRowData('Monthly Income')?.key}
          dataSource={getRowData('Monthly Income')?.dataSource}
          dataType={getRowData('Monthly Income')?.dataType}
          value={getRowData('Monthly Income')?.values[0]}
          child={[
            {
              parameter: 'Monthly Income Requestor',
              dataSource: 'RINGKAS_DATABASE',
              dataType: 'QUALITATIVE',
              value: '-',
            },
            {
              parameter: 'Monthly Income Guarantor',
              dataSource: 'RINGKAS_DATABASE',
              dataType: 'QUALITATIVE',
              value: '-',
            },
          ]}
        />
        <AssessmentDetailsRow
          parameter={getRowData('Monthly Obligation')?.key}
          dataSource={getRowData('Monthly Obligation')?.dataSource}
          dataType={getRowData('Monthly Obligation')?.dataType}
          value={getRowData('Monthly Obligation')?.values[0]}
        />
        <AssessmentDetailsRow
          parameter={getRowData('Down Payment Saving')?.key}
          dataSource={getRowData('Down Payment Saving')?.dataSource}
          dataType={getRowData('Down Payment Saving')?.dataType}
          value={getRowData('Down Payment Saving')?.values[0]}
        />
        <AssessmentDetailsRow
          parameter={getRowData('KPR Amount')?.key}
          dataSource={getRowData('KPR Amount')?.dataSource}
          dataType={getRowData('KPR Amount')?.dataType}
          value={getValueForItem(getRowData('KPR Amount')) ?? kprAmount}
        />
        <AssessmentDetailsRow
          parameter={getRowData('Interest Rate')?.key}
          dataSource={getRowData('Interest Rate')?.dataSource}
          dataType={getRowData('Interest Rate')?.dataType}
          value={interestRateInPercent}
          editable={editable}
        />
        <AssessmentDetailsRow
          parameter={getRowData('Estimated Monthly Installment')?.key}
          dataSource={getRowData('Estimated Monthly Installment')?.dataSource}
          dataType={getRowData('Estimated Monthly Installment')?.dataType}
          value={
            getRowData('Estimated Monthly Installment')?.values[0] ??
            estimatedMonthlyInstallment
          }
        />
        <AssessmentDetailsRow
          parameter={getRowData('Estimated Tenor')?.key}
          dataSource={getRowData('Estimated Tenor')?.dataSource}
          dataType={getRowData('Estimated Tenor')?.dataType}
          value={getRowData('Estimated Tenor')?.values[0]}
        />
        <AssessmentDetailsRow
          parameter={getRowData('Loan Type')?.key}
          dataSource={getRowData('Loan Type')?.dataSource}
          dataType={getRowData('Loan Type')?.dataType}
          value={getRowData('Loan Type')?.values[0]}
        />
        <AssessmentDetailsRow
          parameter={getRowData('Verified Income')?.key}
          dataSource={getRowData('Verified Income')?.dataSource}
          dataType={getRowData('Verified Income')?.dataType}
          value={getRowData('Verified Income')?.values[0]}
        />
        <TotalOutstandingCredit />
        <LoanToValue />
        <DBR
          predefinedEstimatedMonthlyInstallment={estimatedMonthlyInstallment}
        />
        <AssessmentCollapseRow
          parameter={getRowData('Ringkas Additional Data')?.key}
          child={
            getRowData('Ringkas Additional Data')
              ? getRowData('Ringkas Additional Data')!.children!.map(item => ({
                  parameter: item.key,
                  dataType: item.dataType,
                  dataSource: item.dataSource,
                  value: item.values[0],
                }))
              : []
          }
        />
        <AssessmentCollapseRow
          parameter={getRowData('Characteristic')?.key}
          child={
            getRowData('Characteristic')
              ? getRowData('Characteristic')!.children!.map((item, index) => ({
                  parameter: item.key,
                  dataType: item.dataType,
                  dataSource: item.dataSource,
                  value: getValueForItem(item),
                  editable: index === 0 ? false : editable,
                }))
              : []
          }
        />
      </div>
    </div>
  );
}
