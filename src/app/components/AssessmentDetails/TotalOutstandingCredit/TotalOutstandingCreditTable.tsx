import { slikDetailsSlice } from 'app/pages/ManageUsers/CustomerAccount/CustomerInformation/SlikDetails/slice/selectors';
import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import TotalOutstandingCreditTableRow from './TotalOutstandingCreditTableRow';
interface Props {
  className?: string;
}
function TotalOutstandingCreditTable({ className }: Props) {
  const { data } = useSelector(slikDetailsSlice);

  const creditHistory =
    data?.creditReport?.contractsHistory?.credit?.grantedCredit || [];

  const activeContracts = creditHistory.filter(
    (item: any) => item.commonData.contractPhase === 'AC',
  );

  return (
    <div
      className={classNames(
        'w-full border border-[#D7E2EE] rounded-lg pb-4',
        className,
      )}
    >
      <div className="grid grid-cols-5 text-[14px] p-4 border-b border-b-[#D7E2EE]">
        <p className="font-semibold uppercase">Credit Type</p>
        <p className="font-semibold uppercase">Provider</p>
        <p className="font-semibold uppercase">Collect Record</p>
        <p className="font-semibold uppercase">Debit Balance</p>
        <p className="font-semibold uppercase">Payment</p>
      </div>
      {activeContracts.length === 0 ? (
        <TotalOutstandingCreditTableRow />
      ) : (
        activeContracts.map((item: any, index: number) => (
          <TotalOutstandingCreditTableRow
            key={index}
            contractType={item.commonData.contractTypeCodeDesc}
            provider={item.commonData.providerCodeDesc}
            daysPastDue={item.grantedCredit.daysPastDue}
            debitBalance={item.grantedCredit.debitBalance}
          />
        ))
      )}
    </div>
  );
}

export default TotalOutstandingCreditTable;
