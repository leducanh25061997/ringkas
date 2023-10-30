import CustomRow from 'app/components/CustomRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Employment = () => {
  const { data } = useSelector(slikDetailsSlice);

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

  return (
    <div>
      <div className="flex">
        <CustomRow
          title="Occupation"
          description={
            currentEmploymentData?.employmentDataDesc?.occupationDesc
          }
          className="w-1/3"
        />
        <CustomRow
          title="Workplace"
          description={currentEmploymentData?.employmentData?.workplace}
          className="w-1/3"
        />
        <CustomRow
          title="Employer Sector "
          description={
            currentEmploymentData?.employmentDataDesc?.employerSectorDesc
          }
          className="w-1/3"
        />
      </div>
      <div className="flex mt-6">
        <CustomRow
          title="Workplace Address"
          description={currentEmploymentData?.employmentData?.workplaceAddress}
          className="w-2/3"
        />
        <CustomRow
          title="Latest Update Date"
          description={
            currentEmploymentData?.lastUpdateDate
              ? moment(currentEmploymentData?.lastUpdateDate).format(
                  'DD/MM/YYYY',
                )
              : '-'
          }
          className="w-1/3"
        />
      </div>
    </div>
  );
};

export default Employment;
