import CustomRow from 'app/components/CustomRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Table = styled.table`
  width: 100%;
  border: 1px solid #adb8cc;
  margin-bottom: 24px;
  font-size: 12px;
  th,
  td {
    border: 1px solid #adb8cc;
    font-weight: 600;
    padding: 7px 10px;
  }
  td {
    text-align: center;
  }
  th {
    color: #adb8cc;
  }
`;

const Payment = () => {
  const { data } = useSelector(slikDetailsSlice);

  const creditData =
    data?.creditReport?.contractsHistory?.credit?.grantedCredit || [];

  const creditActiveData = creditData[0];

  const paymentRecordsData = creditActiveData?.creditProfile || [];

  const currentYearPaymentData = paymentRecordsData.filter((item: any) => {
    if (!paymentRecordsData[0].referenceYear) return false;
    return item.referenceYear === paymentRecordsData[0].referenceYear;
  });
  const lastYearPaymentData = paymentRecordsData.filter((item: any) => {
    if (!paymentRecordsData[0].referenceYear) return false;
    return item.referenceYear === paymentRecordsData[0].referenceYear - 1;
  });
  const pass2YearPaymentData = paymentRecordsData.filter((item: any) => {
    if (!paymentRecordsData[0].referenceYear) return false;
    return item.referenceYear === paymentRecordsData[0].referenceYear - 2;
  });

  const renderMonthCell = (data: any[], month: number) => {
    const cellData = data.filter(item => item.referenceMonth === month)[0];
    if (!cellData)
      return (
        <td className="text-[#6B7A99]" key={month}>
          N/A
        </td>
      );
    if (cellData.overdue === 0)
      return (
        <td className="text-[#39C24F]" key={month}>
          OK
        </td>
      );
    return (
      <td className="text-[#F7C839]" key={month}>
        X
      </td>
    );
  };

  const PaymentRecords = () => {
    return (
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>JAN</th>
            <th>FEB</th>
            <th>MAR</th>
            <th>APR</th>
            <th>MEI</th>
            <th>JUN</th>
            <th>JUL</th>
            <th>AUG</th>
            <th>SEP</th>
            <th>OCT</th>
            <th>NOV</th>
            <th>DEC</th>
          </tr>

          {currentYearPaymentData.length > 0 && (
            <tr>
              <td className="text-[#ADB8CC]">
                {currentYearPaymentData[0].referenceYear}
              </td>
              {Array.from(Array(12).keys()).map(monthIndex =>
                renderMonthCell(currentYearPaymentData, monthIndex + 1),
              )}
            </tr>
          )}
          {lastYearPaymentData.length > 0 && (
            <tr>
              <td className="text-[#ADB8CC]">
                {lastYearPaymentData[0].referenceYear}
              </td>
              {Array.from(Array(12).keys()).map(monthIndex =>
                renderMonthCell(lastYearPaymentData, monthIndex + 1),
              )}
            </tr>
          )}
          {pass2YearPaymentData.length > 0 && (
            <tr>
              <td className="text-[#ADB8CC]">
                {pass2YearPaymentData[0].referenceYear}
              </td>
              {Array.from(Array(12).keys()).map(monthIndex =>
                renderMonthCell(pass2YearPaymentData, monthIndex + 1),
              )}
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="flex">
      <div className="w-2/4">
        <div className="flex">
          <CustomRow
            title="Credit Bureau Contract"
            description={creditActiveData?.commonData?.cbcontractCode}
            className="w-1/3"
          />
          <CustomRow
            title="Contract Type"
            description={creditActiveData?.commonData?.contractTypeCodeDesc}
            className="w-1/3"
          />
          <CustomRow
            title="Contract Phase"
            description={creditActiveData?.commonData?.contractPhaseDesc}
            className="w-1/3"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title="Role"
            description={creditActiveData?.commonData?.roleDesc}
            className="w-1/3"
          />
          <CustomRow
            title="Start Date"
            description={
              creditActiveData?.commonData?.startDate
                ? moment(creditActiveData.commonData.startDate).format(
                    'DD/MM/YYYY',
                  )
                : '-'
            }
            className="w-1/3"
          />
          <CustomRow
            title="Due Date"
            description={
              creditActiveData?.commonData?.dueDate
                ? moment(creditActiveData.commonData.dueDate).format(
                    'DD/MM/YYYY',
                  )
                : '-'
            }
            className="w-1/3"
          />
        </div>
      </div>
      {(currentYearPaymentData.length > 0 ||
        lastYearPaymentData.length > 0 ||
        lastYearPaymentData.length > 0) && (
        <div className="w-2/4">
          <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
            Payment Records
          </p>
          <PaymentRecords />
        </div>
      )}
    </div>
  );
};

export default Payment;
