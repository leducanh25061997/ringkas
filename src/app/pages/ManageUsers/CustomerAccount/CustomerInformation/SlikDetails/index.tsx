import PageHeader from 'app/components/PageHeader';
import backIcon from 'assets/icons/back-blue.svg';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import DataSummary from './DataSummary';
import SlikInformation from './DataSummary/SlikInformation';
import { useSlikDetailsSlice } from './slice';
import path from 'app/routes/path';
import { translations } from '../../../../../../locales/translations';
import { useTranslation } from 'react-i18next';

function SlickDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useSlikDetailsSlice();

  const navigate = useNavigate();
  const { id } = useParams();

  const links = React.useMemo(
    () => [
      {
        label: `${t(translations.common.manageUsers)}`,
        link: path.customerAccountList,
      },
      {
        label: `${t(translations.customerAccountManagement.customerAccount)}`,
        link: path.customerAccountList,
      },
      {
        label: `${t(translations.customerAccountManagement.customerDetails)}`,
        link: `${path.customerAccountList}/${id}`,
      },
    ],
    [t],
  );

  useEffect(() => {
    if (id === undefined) return;
    dispatch(actions.getSlikDetails(id));
    dispatch(actions.getKycVerificationData(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBackToCustomerDetails = () =>
    navigate(`/manage-users/customer/${id}`);

  return (
    <div className="py-4 px-6 w-full">
      <div className="mb-6 flex items-center">
        <div
          className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
          onClick={handleBackToCustomerDetails}
        >
          <img src={backIcon} width={16} height={16} className="mr-2" alt="" />
          <p className="font-semibold">Back</p>
        </div>
        <PageHeader title={t(translations.common.slik)} parentItems={links} />
      </div>
      <DataSummary />
      <SlikInformation />
    </div>
  );
}

export default SlickDetails;
