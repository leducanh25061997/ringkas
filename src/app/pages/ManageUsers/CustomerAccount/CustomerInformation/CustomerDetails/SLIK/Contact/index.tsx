import CustomRow from 'app/components/CustomRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Contact = () => {
  const { data } = useSelector(slikDetailsSlice);

  const matchedSubjectData = data?.creditReport?.matchedSubject
    ? data.creditReport.matchedSubject.filter(
        (item: any) => item.flagMatched === '1',
      )[0]
    : undefined;

  const currentContactData = data?.enquiredData?.subject?.individual?.contact;

  return (
    <div className="flex">
      <CustomRow
        title="Phone Number"
        description={currentContactData?.phoneNumber}
        className="w-1/5"
      />
      <CustomRow
        title="Mobile Number"
        description={currentContactData?.cellphoneNumber}
        className="w-1/5"
      />
      <CustomRow
        title="Email Address"
        description={currentContactData?.emailAddress}
        className="w-1/5"
      />
      <CustomRow
        title="Latest Update Date"
        description={
          data?.enquiredData?.subjectRefDate
            ? moment(data.enquiredData.subjectRefDate).format('DD/MM/YYYY')
            : '-'
        }
        className="w-1/5"
      />
      <CustomRow
        title="NIK"
        description={
          matchedSubjectData?.individual?.identificationCode[0]
            ?.identificationCode?.identityNumber
        }
        className="w-1/5"
      />
    </div>
  );
};

export default Contact;
