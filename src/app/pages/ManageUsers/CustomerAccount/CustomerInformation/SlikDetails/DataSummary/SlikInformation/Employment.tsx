import React, { useState } from 'react';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';
import Tabs from 'app/components/Tabs';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import moment from 'moment';

function Employment() {
  const { data } = useSelector(slikDetailsSlice);

  const [tabActive, setTabActive] = useState('Historical Employment 1');
  const currentTabIndex = Number(tabActive.substring(tabActive.length - 1)) - 1;

  const matchedSubjectData = data?.creditReport?.matchedSubject
    ? data.creditReport.matchedSubject.filter(
        (item: any) => item.flagMatched === '1',
      )[0]
    : undefined;

  const employmentData =
    matchedSubjectData?.individual?.employmentDataHistory || [];

  const currentEmploymentData = employmentData.filter(
    (item: any) => item.flagCurrent === '1',
  )[0];

  const historicalEmploymentData = employmentData.filter(
    (item: any) => item.flagCurrent === '0',
  );

  const historicalTabActiveData = historicalEmploymentData[currentTabIndex];

  const tabListLength = historicalEmploymentData.length || 0;

  return (
    <InfoItem label="Employment" className="mt-4">
      <p className="leading-[22px] font-bold mb-6">Current Employment</p>
      <ItemRow
        label="Occupation"
        value={currentEmploymentData?.employmentDataDesc?.occupationDesc}
      />
      <ItemRow
        label="Workplace"
        value={currentEmploymentData?.employmentData?.workplace}
      />
      <ItemRow
        label="Employer Sector"
        value={currentEmploymentData?.employmentDataDesc?.employerSectorDesc}
      />
      <ItemRow
        label="Workplace Address"
        value={currentEmploymentData?.employmentData?.workplaceAddress}
      />
      <ItemRow
        label="Latest Update Date"
        value={
          currentEmploymentData?.lastUpdateDate
            ? moment(currentEmploymentData?.lastUpdateDate).format('DD/MM/YYYY')
            : '-'
        }
      />
      {tabListLength ? (
        <>
          <Tabs
            tabWidth={250}
            pageActive="Historical Employement 1"
            tabList={historicalEmploymentData.map(
              (item: any, index: number) =>
                `Historical Employment ${index + 1}`,
            )}
            className="mb-6"
            onChange={setTabActive}
          />
          <ItemRow
            label="Occupation"
            value={historicalTabActiveData.employmentDataDesc?.occupationDesc}
          />
          <ItemRow
            label="Workplace"
            value={historicalTabActiveData.employmentData?.workplace}
          />
          <ItemRow
            label="Employer Sector"
            value={
              historicalTabActiveData.employmentDataDesc?.employerSectorDesc
            }
          />
          <ItemRow
            label="Workplace Address"
            value={historicalTabActiveData.employmentData?.workplaceAddress}
          />
          <ItemRow
            label="Latest Update Date"
            value={
              historicalTabActiveData.lastUpdateDate
                ? moment(historicalTabActiveData.lastUpdateDate).format(
                    'DD/MM/YYYY',
                  )
                : '-'
            }
          />
        </>
      ) : null}
    </InfoItem>
  );
}

export default Employment;
