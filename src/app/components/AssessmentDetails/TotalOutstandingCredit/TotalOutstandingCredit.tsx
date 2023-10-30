// import { useSelector } from 'react-redux';
import SpecialCollapseRow from '../components/SpecialCollapseRow';
// import { slikDetailsSlice } from '../../../SlickDetails/slice/selectors';
import TotalOutstandingCreditTable from './TotalOutstandingCreditTable';

function TotalOutstandingCredit() {
  return (
    <SpecialCollapseRow
      parameter="Total Outstanding Credit"
      dataSource="THIRD_PARTY"
      dataType="QUANTITATIVE"
    >
      <p className="font-medium">CRIFF Requestor </p>
      <TotalOutstandingCreditTable className="mt-6" />
      {/* <p className="mt-6 font-medium">CRIFF Guarantor </p>
      <TotalOutstandingCreditTable className="mt-6" /> */}
    </SpecialCollapseRow>
  );
}

export default TotalOutstandingCredit;
