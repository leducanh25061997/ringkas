import { formatCurrency } from 'app/components/CustomTextField';
import DropDownInput from 'app/components/DropdownInput';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import DebtDetailsDropdown from './Components/DebtDetailsDropdown';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';

function CreditHistory() {
  const { data } = useSelector(slikDetailsSlice);

  const [creditActive, setCreditActive] = useState<any>();

  const creditData = useMemo(() => {
    return data?.creditReport?.contractsHistory?.credit?.grantedCredit || [];
  }, [data]);

  const creditActiveData = creditData.filter(
    (item: any) => item.commonData.cbcontractCode === creditActive?.value,
  )[0];

  const dropdownOptions = creditData.map((item: any) => ({
    label: `${item.commonData?.providerCodeDesc} - ${item.commonData?.contractTypeCodeDesc}`,
    value: item.commonData.cbcontractCode,
  }));

  useEffect(() => {
    if (!creditData[0]?.commonData) return;
    setCreditActive({
      label: `${creditData[0]?.commonData?.providerCodeDesc} - ${creditData[0]?.commonData?.contractTypeCodeDesc}`,
      value: creditData[0]?.commonData.cbcontractCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditData]);

  const renderCurrency = (value: number) => {
    if (value === undefined) return '-';
    return `Rp ${formatCurrency(value)}`;
  };

  return (
    <InfoItem label="Credit History" className="mt-4">
      <DebtDetailsDropdown
        options={dropdownOptions}
        value={creditActive}
        onChange={setCreditActive}
      />
      {/* <DropDownInput
        label="Debt Details"
        size="SMALL"
        onChange={setCreditActive}
        options={dropdownOptions}
        className="w-full mb-6"
        value={creditActive}
      /> */}
      <ItemRow label="Monthly Obligation" value="-" />
      <ItemRow label="Total Monthly Obligation" value="-" />
      <ItemRow
        label="Credit Limit	"
        value={renderCurrency(creditActiveData?.grantedCredit?.creditLimit)}
      />
      <ItemRow
        label="Debit Balance"
        value={renderCurrency(creditActiveData?.grantedCredit?.debitBalance)}
      />
      <ItemRow
        label="Latest Update Date"
        value={
          creditActiveData?.commonData?.referenceDate
            ? moment(creditActiveData.commonData.referenceDate).format(
                'DD/MM/YYYY',
              )
            : '-'
        }
      />
    </InfoItem>
  );
}

export default CreditHistory;
