import CustomRow from 'app/components/CustomRow';
import { formatCurrency } from 'app/components/CustomTextField';
import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Credit = () => {
  const { data } = useSelector(slikDetailsSlice);

  const creditData = useMemo(() => {
    return data?.creditReport?.contractsHistory?.credit?.grantedCredit[0];
  }, [data]);

  const renderCurrency = (value: number) => {
    if (value === undefined) return '-';
    return `Rp ${formatCurrency(value)}`;
  };

  return (
    <div>
      <div className="flex">
        <CustomRow
          title="Debt Details"
          description={creditData?.commonData?.providerCodeDesc}
          className="w-1/3"
        />
        <CustomRow
          title="Monthly Obligation"
          description="-"
          className="w-1/3"
        />
        <CustomRow
          title="Total Monthly Obligation"
          description="-"
          className="w-1/3"
        />
      </div>
      <div className="flex mt-6">
        <CustomRow
          title="Credit Limit"
          description={renderCurrency(creditData?.grantedCredit?.creditLimit)}
          className="w-1/3"
        />
        <CustomRow
          title="Debit Balance"
          description={renderCurrency(creditData?.grantedCredit?.debitBalance)}
          className="w-1/3"
        />
        <CustomRow
          title="Latest Update Date"
          description={
            creditData?.commonData?.referenceDate
              ? moment(creditData.commonData.referenceDate).format('DD/MM/YYYY')
              : '-'
          }
          className="w-1/3"
        />
      </div>
    </div>
  );
};

export default Credit;
