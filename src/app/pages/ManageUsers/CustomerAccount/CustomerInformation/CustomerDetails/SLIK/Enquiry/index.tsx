import CustomRow from 'app/components/CustomRow';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const Enquiry = () => {
  const { data } = useSelector(slikDetailsSlice);

  const enquiryData = data?.creditReport?.footPrints;
  return (
    <div className="flex">
      <CustomRow
        title="1 month"
        description={enquiryData?.count1Month ?? '-'}
        className="w-1/3"
      />
      <CustomRow
        title="3 months"
        description={enquiryData?.count3Months ?? '-'}
        className="w-1/3"
      />
      <CustomRow
        title="6 months"
        description={enquiryData?.count6Months ?? '-'}
        className="w-1/3"
      />
      <CustomRow
        title="12 months"
        description={enquiryData?.count12Months ?? '-'}
        className="w-1/3"
      />
    </div>
  );
};

export default Enquiry;
