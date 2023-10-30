import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import InfoItem from './Components/InfoItem';

function EnquiryHistory() {
  const { data } = useSelector(slikDetailsSlice);

  const enquiryData = data?.creditReport?.footPrints;
  return (
    <InfoItem label="Enquiry History" className="mt-4">
      <p className="font-bold leading-[22px] mr-4 mb-6">
        Number of Enquiries in the Last Months
      </p>
      <div className="flex justify-between gap-[50px] border border-[#D7E2EE] rounded-lg px-[80px] py-4 leading-5 mb-6">
        <div>
          <p className="text-[14px] font-medium text-[#6B7A99]">1 Month</p>
          <p className="mt-[6px] font-medium text-[#202A42]">
            {enquiryData?.count1Month ?? '-'}
          </p>
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#6B7A99]">3 Month</p>
          <p className="mt-[6px] font-medium text-[#202A42]">
            {enquiryData?.count3Months ?? '-'}
          </p>
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#6B7A99]">6 Month</p>
          <p className="mt-[6px] font-medium text-[#202A42]">
            {enquiryData?.count6Months ?? '-'}
          </p>
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#6B7A99]">12 Month</p>
          <p className="mt-[6px] font-medium text-[#202A42]">
            {enquiryData?.count12Months ?? '-'}
          </p>
        </div>
      </div>

      {/* <div className="flex pb-2 border-b border-b-[#D7E2EE] text-[14px] leading-5 text-[#6B7A99]">
        <div className="w-[22%] uppercase font-semibold">Enquiry Date</div>
        <div className="w-[30%] uppercase font-semibold">Purpose</div>
        <div className="w-[26%] uppercase font-semibold">Institute</div>
        <div className="w-[22%] uppercase font-semibold">Enquiry Type</div>
      </div>
      <div className="flex text-[#202A42] leading-6 mt-6">
        <div className="w-[22%] font-medium pr-6">2022/01/21</div>
        <div className="w-[30%] font-medium pr-6">
          Access Debtor’s or prospective debtor’s Financial Condition
        </div>
        <div className="w-[26%] font-medium pr-6">BANK RAKYAT INDONESIA</div>
        <div className="w-[22%] font-medium pr-6">Monitoring Enquiry</div>
      </div>
      <div className="flex text-[#202A42] leading-6 mt-6 mb-6">
        <div className="w-[22%] font-medium pr-6">2022/01/21</div>
        <div className="w-[30%] font-medium pr-6">
          Access Debtor’s or prospective debtor’s Financial Condition
        </div>
        <div className="w-[26%] font-medium pr-6">BANK RAKYAT INDONESIA</div>
        <div className="w-[22%] font-medium pr-6">Monitoring Enquiry</div>
      </div> */}
    </InfoItem>
  );
}

export default EnquiryHistory;
