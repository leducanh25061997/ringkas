import CustomRow from 'app/components/CustomRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Address = () => {
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
    <div>
      <div className="grid grid-cols-2 gap-8">
        <CustomRow
          title="Current Address"
          description={
            currentAddressData
              ? `${currentAddressData.address.address}, ${currentAddressData?.addressDesc?.cityDesc}, ${currentAddressData.address.district}, ${currentAddressData.address.subDistrict}, ${currentAddressData.address.postalCode}`
              : '-'
          }
        />
        <CustomRow
          title="Latest Update Date"
          description={
            data?.enquiredData?.subjectRefDate
              ? moment(data.enquiredData.subjectRefDate).format('DD/MM/YYYY')
              : '-'
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-8 mt-6">
        <CustomRow
          title="Historical Address"
          description={
            historicalAddressData
              ? `${historicalAddressData.address.address}, ${historicalAddressData?.addressDesc?.cityDesc}, ${historicalAddressData.address.district}, ${historicalAddressData.address.subDistrict}, ${historicalAddressData.address.postalCode}`
              : '-'
          }
        />
        <CustomRow
          title="Latest Update Date"
          description={
            historicalAddressData?.lastUpdateDate
              ? moment(historicalAddressData.lastUpdateDate).format(
                  'DD/MM/YYYY',
                )
              : '-'
          }
        />
      </div>
    </div>
  );
};

export default Address;
