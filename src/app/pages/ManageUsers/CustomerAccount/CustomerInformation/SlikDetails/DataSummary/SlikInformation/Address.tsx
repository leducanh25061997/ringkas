import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';

function Address() {
  const { data } = useSelector(slikDetailsSlice);

  const matchedSubjectData = data?.creditReport?.matchedSubject
    ? data.creditReport.matchedSubject.filter(
        (item: any) => item.flagMatched === '1',
      )[0]
    : undefined;

  const currentAddressData = data?.enquiredData?.subject?.individual?.address;

  const historicalAddressData = matchedSubjectData?.individual?.addressHistory
    ? matchedSubjectData.individual.addressHistory.filter(
        (item: any) => item.flagCurrent === '0',
      )[0]
    : undefined;

  return (
    <InfoItem label="Address" className="mt-4">
      <ItemRow
        label="Current Address"
        value={
          currentAddressData
            ? `${currentAddressData.address.address}, ${currentAddressData?.addressDesc?.cityDesc}, ${currentAddressData.address.district}, ${currentAddressData.address.subDistrict}, ${currentAddressData.address.postalCode}`
            : '-'
        }
      />
      <ItemRow
        label="Latest Update Date"
        value={
          data?.enquiredData?.subjectRefDate
            ? moment(data.enquiredData.subjectRefDate).format('DD/MM/YYYY')
            : '-'
        }
      />
      <ItemRow
        label="Historical Address"
        value={
          historicalAddressData
            ? `${historicalAddressData.address.address}, ${historicalAddressData?.addressDesc?.cityDesc}, ${historicalAddressData.address.district}, ${historicalAddressData.address.subDistrict}, ${historicalAddressData.address.postalCode}`
            : '-'
        }
      />
      <ItemRow
        label="Latest Update Date"
        value={
          historicalAddressData?.lastUpdateDate
            ? moment(historicalAddressData.lastUpdateDate).format('DD/MM/YYYY')
            : '-'
        }
      />
    </InfoItem>
  );
}

export default Address;
