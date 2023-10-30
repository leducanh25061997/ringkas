import { Grid } from '@mui/material';
import PageHeader from 'app/components/PageHeader';
import Spinner from 'app/components/Spinner';
import useRoles from 'app/hooks/useRoles';
import path from 'app/routes/path';
import blueArrowLeft from 'assets/icons/blue-arrow-left.svg';
import dropdown from 'assets/icons/dropdown.svg';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { axiosClient } from 'services/api/axios';
import { ApplicationStatus, ApplicationState } from '../../ListCustomer/types';
import { VerificationStatusResponse } from '../../PreKprVerification/types';
import CustomerAccount from './CustomerAccount';
import CustomerSummary from './CustomerSummary';
import HistoryLog from './HistoryLog';
import KprPreference from './KprPreference';
import KYC from './KYC';
import SLIK from './SLIK';
import { useSlikDetailsSlice } from '../SlikDetails/slice';
import { useCustomerInformationSlice } from '../../../CustomerAccountEdit/slice';
import { useScoringReadySlice } from '../../ScoringReady/slice';
import { useManageCustomerSlice } from '../../slice';
import { Link } from 'react-router-dom';

interface TaskProps {
  applicationStatus?: keyof typeof ApplicationStatus;
  ringkasRecommendation?: string;
  applicationId?: number | string;
}

const AdminTask = ({
  applicationStatus,
  ringkasRecommendation,
  applicationId,
}: TaskProps) => {
  const { t } = useTranslation();
  switch (applicationStatus) {
    case 'ONBOARDING':
    case 'SYSTEM_WIP':
    case 'KYC_RETURNED':
    case 'APPROVED':
    case 'DECLINED':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'DATA_READY':
      return (
        <Link
          to={`/manage-users/customer/kyc-verification/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer ml-4"
        >
          {t(translations.customerList.verify)}
        </Link>
      );
    case 'PRE_SCORING_READY':
      if (ringkasRecommendation)
        return (
          <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
            {t(translations.customerList.noTask)}
          </p>
        );
      return (
        <Link
          to={`/manage-users/customer/scoring-verification/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer ml-4"
        >
          {t(translations.customerList.assess)}
        </Link>
      );
    default:
      return (
        <p className="leading-[22px] !text-[#005FC5] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
  }
};

const BankTask = ({ applicationStatus, applicationId }: TaskProps) => {
  const { t } = useTranslation();
  switch (applicationStatus) {
    case 'ONBOARDING':
    case 'KYC_RETURNED':
    case 'APPROVED':
    case 'DECLINED':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.followUp)}
        </p>
      );
    case 'SYSTEM_WIP':
    case 'DATA_READY':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'PRE_SCORING_READY':
      return (
        <Link
          to={`/manage-users/bank/workspace/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer ml-4"
        >
          {t(translations.customerList.viewTask)}
        </Link>
      );
    default:
      return (
        <p className="leading-[22px] !text-[#005FC5] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
  }
};

const DeveloperTask = ({ applicationStatus, applicationId }: TaskProps) => {
  const { t } = useTranslation();
  switch (applicationStatus) {
    case 'ONBOARDING':
    case 'KYC_RETURNED':
    case 'APPROVED':
    case 'DECLINED':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.followUp)}
        </p>
      );
    case 'SYSTEM_WIP':
    case 'DATA_READY':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'PRE_SCORING_READY':
      return (
        <Link
          to={`/manage-users/developer/workspace/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer ml-4"
        >
          {t(translations.customerList.viewTask)}
        </Link>
      );
    default:
      return (
        <p className="leading-[22px] !text-[#005FC5] font-semibold ml-4">
          {t(translations.customerList.followUp)}
        </p>
      );
  }
};

const ClientTask = ({ applicationStatus }: TaskProps) => {
  const { t } = useTranslation();
  switch (applicationStatus) {
    case 'ONBOARDING':
    case 'KYC_RETURNED':
    case 'APPROVED':
    case 'DECLINED':
    case 'PRE_SCORING_READY':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.followUp)}
        </p>
      );
    case 'SYSTEM_WIP':
    case 'DATA_READY':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
    default:
      return (
        <p className="leading-[22px] !text-[#005FC5] font-semibold ml-4">
          {t(translations.customerList.followUp)}
        </p>
      );
  }
};

const CustomerDetails = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { actions } = useCustomerInformationSlice();
  const scoringActions = useScoringReadySlice().actions;
  const customerActions = useManageCustomerSlice().actions;
  const slikActions = useSlikDetailsSlice().actions;

  const params = useParams();
  const { id } = params;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] =
    React.useState<VerificationStatusResponse>();

  const role = useRoles();

  useEffect(() => {
    if (id === undefined) return;
    dispatch(slikActions.getSlikDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(scoringActions.getScoringData(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(customerActions.fetchPropertyDetail(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(customerActions.getCustomerPreference(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchCustomerApplicationKycDetail(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchCustomerApplicationKycDetailOfGuarantor(id));
  }, [id]);

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
    ],
    [t],
  );

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosClient
      .get(`/customer/application/${id}`)
      .then(res => {
        setLoading(false);
        setCustomerInfo(res.data);
      })
      .catch(e => {
        setLoading(false);
        setCustomerInfo(undefined);
      });
  }, [id]);

  const handleStatus = (status: string) =>
    t(ApplicationStatus[status as keyof typeof ApplicationStatus]);
  const canStartAssistKPR = (stage?: string) =>
    stage === 'KPR' || stage === 'POST_KPR';
  const isKycVerified = canStartAssistKPR;

  return (
    <div className="py-4 px-6">
      <div className="flex items-center mb-4 cursor-pointer">
        <div
          className="flex items-center py-[10px] px-6 bg-[#fff] rounded-[8px] mr-6"
          onClick={() => navigate(path.customerAccountList)}
        >
          <img className="h-[16px] w-[16px]" src={blueArrowLeft} alt="arrow" />
          <p className="text-[#005FC5] text-[16px] leading-[28px] font-semibold ml-2">
            {t(translations.common.back)}
          </p>
        </div>
        <PageHeader
          parentItems={links}
          title={t(translations.customerAccountManagement.customerDetails)}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full py-4 rounded-2xl bg-[#fff] mb-6">
          <Spinner />
        </div>
      ) : (
        <div className="flex items-center justify-between py-4 px-8 bg-[#fff] rounded-2xl mb-6">
          <div className="flex items-center">
            <p className="text-[#005FC5] text-[20px] leading-[24px] font-bold mr-2">
              {t(translations.partnerManagement.applicationId)}:{' '}
              {customerInfo?.applicationId}
            </p>
          </div>
          <div className="flex items-center">
            {canStartAssistKPR(customerInfo?.applicationState) && (
              <Link
                to={`/manage-users/customer/kpr-register/${id}`}
                className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer mr-4"
              >
                {t(translations.common.assist)}
              </Link>
            )}
            <div className="bg-[#FFDFB7] text-[#223250] text-[16px] leading-[28px] font-semibold py-[7px] px-[24px] rounded-3xl">
              {customerInfo && handleStatus(customerInfo.applicationStatus)}
            </div>
            {role === 'admin' && (
              <AdminTask
                ringkasRecommendation={
                  customerInfo && customerInfo.ringkasRecommendation
                }
                applicationStatus={
                  customerInfo && customerInfo.applicationStatus
                }
                applicationId={customerInfo && customerInfo?.applicationId}
              />
            )}
            {role === 'bank' && (
              <BankTask
                applicationStatus={
                  customerInfo && customerInfo.applicationStatus
                }
                applicationId={customerInfo && customerInfo?.applicationId}
              />
            )}
            {role === 'client' && (
              <ClientTask
                applicationStatus={
                  customerInfo && customerInfo.applicationStatus
                }
              />
            )}
            {role === 'developer' && (
              <DeveloperTask
                applicationStatus={
                  customerInfo && customerInfo.applicationStatus
                }
                applicationId={customerInfo && customerInfo?.applicationId}
              />
            )}
          </div>
        </div>
      )}

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomerAccount isLoading={isLoading} customerInfo={customerInfo} />
        </Grid>
        <Grid item xs={6}>
          <HistoryLog customerInfo={customerInfo} />
        </Grid>
        <Grid item xs={12}>
          <KprPreference />
        </Grid>
        {role === 'admin' && (
          <Grid item xs={12}>
            <SLIK />
          </Grid>
        )}
        <Grid item xs={12}>
          <KYC customerInfo={customerInfo} />
        </Grid>
        {/*<Grid item xs={6}>*/}
        {/*  <KPR/>*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <CustomerSummary
            predefinedAssessmentValues={{
              eKYC: isKycVerified(customerInfo?.applicationState)
                ? t(translations.verificationStatus.VERIFIED)
                : t(translations.verificationStatus.UNVERIFIED),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerDetails;
