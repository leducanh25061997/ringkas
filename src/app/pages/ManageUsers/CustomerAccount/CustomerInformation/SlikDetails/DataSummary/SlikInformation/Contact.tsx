import React, { useState } from 'react';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';
import Tabs from 'app/components/Tabs';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import moment from 'moment';

function Contact() {
  const { data } = useSelector(slikDetailsSlice);

  const [tabActive, setTabActive] = useState('Historical Contact 1');
  const currentTabIndex = Number(tabActive.substring(tabActive.length - 1)) - 1;

  const matchedSubjectData = data?.creditReport?.matchedSubject
    ? data.creditReport.matchedSubject.filter(
        (item: any) => item.flagMatched === '1',
      )[0]
    : undefined;

  const contactData = matchedSubjectData?.individual?.contactHistory;
  const currentContactData = data?.enquiredData?.subject?.individual?.contact;
  const historicalContactData = contactData
    ? contactData.filter((item: any) => item.flagCurrent === '0')
    : [];

  const historicalTabActiveData = historicalContactData[currentTabIndex];

  const tabListLength = historicalContactData.length || 0;

  return (
    <InfoItem label="Contact" className="mt-4">
      <p className="leading-[22px] font-bold mb-6">Current Contact</p>
      <ItemRow label="Phone Number" value={currentContactData?.phoneNumber} />
      <ItemRow
        label="Mobile Number"
        value={currentContactData?.cellphoneNumber}
      />
      <ItemRow label="Email Address" value={currentContactData?.emailAddress} />
      <ItemRow
        label="Latest Update Date"
        value={
          data?.enquiredData?.subjectRefDate
            ? moment(data.enquiredData.subjectRefDate).format('DD/MM/YYYY')
            : '-'
        }
      />
      {tabListLength ? (
        <>
          <div className="w-full overflow-x-auto scrollbar">
            <Tabs
              tabWidth={200}
              pageActive={tabActive}
              tabList={historicalContactData.map(
                (item: any, index: number) => `Historical Contact ${index + 1}`,
              )}
              className="mb-6"
              onChange={setTabActive}
            />
          </div>

          <ItemRow
            label="Phone Number"
            value={historicalTabActiveData?.contacts?.phoneNumber}
          />
          <ItemRow
            label="Mobile Number"
            value={historicalTabActiveData?.contacts.cellphoneNumber}
          />
          <ItemRow
            label="Email Address"
            value={historicalTabActiveData?.contacts.emailAddress}
          />
          <ItemRow
            label="Latest Update Date"
            value={
              historicalTabActiveData?.lastUpdateDate
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

export default Contact;
