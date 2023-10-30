import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { slikDetailsSlice } from '../../slice/selectors';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';

const Table = styled.table`
  width: 100%;
  border: 1px solid #adb8cc;
  margin-bottom: 24px;
  font-size: 12px;
  th,
  td {
    border: 1px solid #adb8cc;
    font-weight: 600;
  }
  td {
    text-align: center;
  }
  th {
    color: #adb8cc;
  }
`;

function Payment() {
  const { data } = useSelector(slikDetailsSlice);

  const [hasScrollbar, setHasScrollbar] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null);

  const [creditActive, setCreditActive] = useState('');

  const creditData =
    data?.creditReport?.contractsHistory?.credit?.grantedCredit || [];

  const creditActiveData = creditData.filter(
    (item: any) => item.commonData.cbcontractCode === creditActive,
  )[0];

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

  useEffect(() => {
    setCreditActive(creditData[0]?.commonData?.cbcontractCode || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!scrollbarRef.current) return;
    setHasScrollbar(
      scrollbarRef.current.scrollWidth > scrollbarRef.current.clientWidth,
    );
  }, [data]);

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

  return (
    <InfoItem label="Payment" className="mt-4">
      <p className="leading-[22px] font-bold mb-6">Credit Bureau Contract</p>
      {creditData.length > 0 && (
        <div
          className={classNames('flex gap-6 mb-6 overflow-x-auto scrollbar', {
            'pb-4': hasScrollbar,
          })}
          ref={scrollbarRef}
        >
          {creditData.map((item: any) => (
            <div
              onClick={() => setCreditActive(item.commonData.cbcontractCode)}
              key={item.commonData.cbcontractCode}
              className={classNames(
                'font-medium leading-5 text-[#202A42] border-2 rounded-[14px] px-4 py-[14px] bg-[#F6F8FC] cursor-pointer',
                {
                  'border-[#005FC5]':
                    creditActive === item.commonData.cbcontractCode,
                },
              )}
            >
              {item.commonData.cbcontractCode}
            </div>
          ))}
        </div>
      )}
      <ItemRow
        label="Contract Type"
        value={creditActiveData?.commonData?.contractTypeCodeDesc}
      />
      <ItemRow
        label="Contract Phase"
        value={creditActiveData?.commonData?.contractPhaseDesc}
      />
      <ItemRow label="Role" value={creditActiveData?.commonData?.roleDesc} />
      <ItemRow
        label="Start Date"
        value={
          creditActiveData?.commonData?.startDate
            ? moment(creditActiveData.commonData.startDate).format('DD/MM/YYYY')
            : '-'
        }
      />
      <ItemRow
        label="Due Date"
        value={
          creditActiveData?.commonData?.dueDate
            ? moment(creditActiveData.commonData.dueDate).format('DD/MM/YYYY')
            : '-'
        }
      />
      <ItemRow
        label="Collaterals Counter"
        value={
          creditActiveData?.collaterals?.collateralsSummary?.collateralsCounter
        }
      />
      <ItemRow
        label="Total Collaterals Value"
        value={
          creditActiveData?.collaterals?.collateralsSummary
            ?.totalCollateralValue
        }
      />
      <ItemRow
        label="Guarantors Counter"
        value={
          creditActiveData?.guarantors?.guarantorsSummary?.guarantorsCounter
        }
      />
      <ItemRow
        label="Provider Type"
        value={creditActiveData?.commonData?.providerTypeCodeDesc}
      />
      <ItemRow
        label="Provider"
        value={creditActiveData?.commonData?.providerCodeDesc}
      />

      {(currentYearPaymentData.length > 0 ||
        lastYearPaymentData.length > 0 ||
        pass2YearPaymentData.length > 0) && (
        <>
          <p className="leading-[22px] font-bold mb-6">Payment Records</p>
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
        </>
      )}

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

export default Payment;
