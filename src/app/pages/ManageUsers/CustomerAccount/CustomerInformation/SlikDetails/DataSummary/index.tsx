import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useManageCustomerSlice } from '../../../slice';
import { selectManageCustomer } from '../../../slice/selectors';
import DataSummarySingleColumn from './DataSummarySingleColumn';

// TO DO: support multi language
function DataSummary() {
  const dispatch = useDispatch();
  const { actions } = useManageCustomerSlice();
  const { customerDetails } = useSelector(selectManageCustomer);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getCustomerDetails(id, () => {}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="card py-6 px-8 w-full">
      <h2 className="leading-6 font-bold text-[20px] mb-6">Data Summary</h2>
      <div className="grid grid-cols-4 w-full">
        <DataSummarySingleColumn
          label="Full Name"
          value={customerDetails?.account.fullName}
        />
        <DataSummarySingleColumn label="Application ID" value={id} />
        <DataSummarySingleColumn
          label="Leads"
          value={customerDetails?.leads?.company?.name}
        />
        <DataSummarySingleColumn label="PIC Admin Ringkas" value="-" />
      </div>
    </div>
  );
}

export default DataSummary;
