import { ApplicationStatus } from 'app/pages/ManageUsers/CustomerAccount/ListCustomer/types';
import { useManageCustomerSlice } from 'app/pages/ManageUsers/CustomerAccount/slice';
import { selectManageCustomer } from 'app/pages/ManageUsers/CustomerAccount/slice/selectors';
import { translations } from 'locales/translations';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import DataSummarySingleColumn from './DataSummarySingleColumn';

// TO DO: support multi language
function DataSummary() {
  const dispatch = useDispatch();
  const { actions } = useManageCustomerSlice();
  const { customerDetails } = useSelector(selectManageCustomer);
  const { t } = useTranslation();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getCustomerDetails(id, () => {}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="card py-6 px-8 w-full mt-6">
      <h2 className="leading-6 font-bold text-[20px] mb-6">Data Summary</h2>
      <div className="grid grid-cols-4 w-full">
        <DataSummarySingleColumn
          label={t(translations.customerList.fullName)}
          value={customerDetails?.account.fullName}
        />
        <DataSummarySingleColumn
          label={t(translations.customerList.property)}
          value={'-'}
        />
        <DataSummarySingleColumn
          label={t(translations.customerList.assignee)}
          value={'-'}
        />
        <DataSummarySingleColumn
          label={t(translations.common.status)}
          value={
            customerDetails?.applicationStatus
              ? (t(
                  ApplicationStatus[
                    customerDetails?.applicationStatus as keyof typeof ApplicationStatus
                  ],
                ) as string) || '-'
              : '-'
          }
        />
      </div>
    </div>
  );
}

export default DataSummary;
