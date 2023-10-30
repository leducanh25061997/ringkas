import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';

function Subject() {
  const { data } = useSelector(slikDetailsSlice);

  const matchedSubjectData = data?.enquiredData?.subject;

  return (
    <InfoItem label="Subject">
      <ItemRow
        label="Credit Bureau Subject Code"
        value={matchedSubjectData?.cbsubjectCode}
      />
      <ItemRow
        label="Residence"
        value={matchedSubjectData?.individual?.residentDesc}
      />
      <ItemRow
        label="Name as ID"
        value={matchedSubjectData?.individual.individualName?.nameAsId}
      />
      <ItemRow
        label="Full Name"
        value={matchedSubjectData?.individual?.individualName?.fullName}
      />
      <ItemRow
        label="ID Card Number"
        value={
          matchedSubjectData?.individual?.identificationCode?.identificationCode
            ?.identityNumber
        }
      />
      <ItemRow
        label="Mother’s Maiden Name"
        value={matchedSubjectData?.individual?.individualName?.mothersName}
      />
      <ItemRow
        label="Gender"
        value={matchedSubjectData?.individual?.genderDesc}
      />
      <ItemRow
        label="Date of Birth"
        value={
          matchedSubjectData?.individual?.birthData?.date
            ? moment(matchedSubjectData?.individual?.birthData?.date).format(
                'DD/MM/YYYY',
              )
            : '-'
        }
      />
      <ItemRow
        label="Place of Birth"
        value={matchedSubjectData?.individual?.birthData?.place}
      />
      <ItemRow
        label="Marital Status"
        value={matchedSubjectData?.individual?.marriageStatusDesc}
      />
      <ItemRow
        label="Latest Update Date"
        value={
          data?.enquiredData?.subjectRefDate
            ? moment(data.enquiredData.subjectRefDate).format('DD/MM/YYYY')
            : '-'
        }
      />
    </InfoItem>
  );
}

export default Subject;
