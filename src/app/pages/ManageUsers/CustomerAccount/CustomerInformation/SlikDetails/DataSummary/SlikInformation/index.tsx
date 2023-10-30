import Address from './Address';
import Contact from './Contact';
import CreditBureauScore from './CreditBureauScore';
import CreditHistory from './CreditHistory';
import Employment from './Employment';
import EnquiryHistory from './EnquiryHistory';
// import OtherHistory from './OtherHistory';
import Payment from './Payment';
import Subject from './Subject';

function SlikInformation() {
  return (
    <div className="flex mt-6 p-6 card items-center flex-col">
      <h2 className="font-bold text-[20px] leading-6 mb-6">SLIK</h2>
      <Subject />
      <Address />
      <Contact />
      <Employment />
      <CreditBureauScore />
      <Payment />
      <CreditHistory />
      <EnquiryHistory />
      {/* <OtherHistory /> */}
    </div>
  );
}

export default SlikInformation;
