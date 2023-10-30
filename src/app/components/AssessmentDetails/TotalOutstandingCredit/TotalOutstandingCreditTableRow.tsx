import { formatCurrency } from 'app/components/CustomTextField';
import React from 'react';

interface Props {
  contractType?: string;
  provider?: string;
  daysPastDue?: number;
  debitBalance?: number;
  payment?: string | number;
}

function TotalOutstandingCreditTableRow({
  contractType,
  provider,
  daysPastDue,
  debitBalance,
  payment,
}: Props) {
  const renderCollectRecord = () => {
    if (daysPastDue === undefined) return <p className="font-medium pl-6">-</p>;
    if (daysPastDue < 31)
      return (
        <p className="font-medium pl-6 text-[#39C24F]">{`1(${daysPastDue} Days)`}</p>
      );
    if (daysPastDue < 91)
      return (
        <p className="font-medium pl-6 text-[#005FC5]">{`2(${daysPastDue} Days)`}</p>
      );
    if (daysPastDue < 121)
      return (
        <p className="font-medium pl-6 text-[#223250]">{`3(${daysPastDue} Days)`}</p>
      );
    if (daysPastDue < 181)
      return (
        <p className="font-medium pl-6 text-[#FF8F00]">{`4(${daysPastDue} Days)`}</p>
      );
    return (
      <p className="font-medium pl-6 text-[#FF0000]">{`5(${daysPastDue} Days)`}</p>
    );
  };

  return (
    <div className="grid grid-cols-5 px-4 pt-4">
      <p className="font-medium pl-6">{contractType ?? '-'}</p>
      <p className="font-medium pl-6">{provider ?? '-'}</p>
      {renderCollectRecord()}
      <p className="font-medium pl-6">
        {debitBalance !== undefined ? formatCurrency(debitBalance) : '-'}
      </p>
      <p className="font-medium">-</p>
    </div>
  );
}

export default TotalOutstandingCreditTableRow;
