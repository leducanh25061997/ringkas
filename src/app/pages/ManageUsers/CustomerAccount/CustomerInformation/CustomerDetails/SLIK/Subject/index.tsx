import CustomRow from 'app/components/CustomRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Subject = () => {
  const { data } = useSelector(slikDetailsSlice);

  const matchedSubjectData = data?.creditReport?.matchedSubject
    ? data.creditReport.matchedSubject.filter(
        (item: any) => item.flagMatched === '1',
      )[0]
    : undefined;

  return (
    <div>
      <div className="flex">
        <CustomRow
          title="Credit Bureau Subject Code"
          description={matchedSubjectData?.cbsubjectCode}
          className="w-1/6"
        />
        <CustomRow
          title="Residence"
          description={matchedSubjectData?.individual?.residentDesc}
          className="w-1/6"
        />
        <CustomRow
          title="Name as ID"
          description={matchedSubjectData?.individual?.individualName?.nameAsId}
          className="w-1/6"
        />
        <CustomRow
          title="Full Name"
          description={matchedSubjectData?.individual?.individualName?.fullName}
          className="w-1/6"
        />
        <CustomRow
          title="NIK"
          description={
            matchedSubjectData?.individual?.identificationCode[0]
              ?.identificationCode?.identityNumber
          }
          className="w-1/6"
        />
        <CustomRow
          title="Mother’s Maiden Name"
          description={
            matchedSubjectData?.individual?.individualName?.mothersName
          }
          className="w-1/6"
        />
      </div>
      <div className="flex mt-6">
        <CustomRow
          title="Gender"
          description={matchedSubjectData?.individual?.genderDesc}
          className="w-1/6"
        />
        <CustomRow
          title="Date of Birth"
          description={
            matchedSubjectData?.individual?.birthData?.date
              ? moment(matchedSubjectData?.individual?.birthData?.date).format(
                  'DD/MM/YYYY',
                )
              : '-'
          }
          className="w-1/6"
        />
        <CustomRow
          title="Place of Birth"
          description={matchedSubjectData?.individual?.birthData?.place}
          className="w-1/6"
        />
        <CustomRow
          title="Marital Status"
          description={matchedSubjectData?.individual?.marriageStatusDesc}
          className="w-1/6"
        />
        <CustomRow
          title="Latest Update Date"
          description={
            matchedSubjectData?.individual?.lastUpdateDate
              ? moment(matchedSubjectData.individual.lastUpdateDate).format(
                  'DD/MM/YYYY',
                )
              : '-'
          }
          className="w-1/6"
        />
      </div>
    </div>
  );
};

export default Subject;
