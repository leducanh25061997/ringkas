import { formatCurrency } from 'app/components/CustomTextField';
import { selectScoringReady } from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/selectors';
import { selectManageCustomer } from 'app/pages/ManageUsers/CustomerAccount/slice/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import SpecialCollapseRow from '../components/SpecialCollapseRow';

function LoanToValue() {
  const { assessmentData } = useSelector(selectScoringReady);

  const { customerPreference: housePriceData } =
    useSelector(selectManageCustomer);

  const rowData = assessmentData
    ? assessmentData.data.filter(item => item.key === 'Loan To Value')[0]
    : undefined;

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

  return (
    <SpecialCollapseRow
      parameter={rowData?.key}
      dataSource={rowData?.dataSource}
      dataType={rowData?.dataType}
      value={
        housePriceData?.housePrice
          ? ((kprAmount / housePriceData.housePrice) * 100).toFixed(2) + '%'
          : '-'
      }
    >
      <div className="border border-[#D7E2EE] rounded-lg flex items-center w-fit p-6 text-[#202A42]">
        <p className="font-medium whitespace-pre-wrap">LTV ratio = </p>
        <div className="min-w-[200px]">
          <p className="border-b border-b-[#202A42] font-medium text-center pb-2">
            KPR Amount
          </p>
          <p className="font-medium text-center pt-2">
            Appraised Property Value
          </p>
        </div>
      </div>
      <div className="rounded-lg flex items-center w-fit p-6 pt-0 text-[#202A42] mt-6">
        <p className="font-medium whitespace-pre-wrap">LTV ratio = </p>
        <div className="min-w-[200px]">
          <p className="border-b border-b-[#202A42] font-medium text-center pb-2">
            {kprAmount ? formatCurrency(kprAmount) : '-'}
          </p>
          <p className="font-medium text-center pt-2">
            {housePriceData?.housePrice !== undefined
              ? formatCurrency(housePriceData.housePrice)
              : '-'}
          </p>
        </div>
      </div>
    </SpecialCollapseRow>
  );
}

export default LoanToValue;
