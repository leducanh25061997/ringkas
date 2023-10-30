import { Grid } from '@mui/material';
import PageHeader from 'app/components/PageHeader';
import Spinner from 'app/components/Spinner';
import useRoles from 'app/hooks/useRoles';
import path from 'app/routes/path';
import blueArrowLeft from 'assets/icons/blue-arrow-left.svg';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { VerificationStatus } from 'types/enums';
import DocumentUpload from './DocumentUpload';
import HistoryLog from './HistoryLog';
import KYB from './KYB';
import KYC from './KYC';
import PartnerInfo from './PartnerInfo';
import { usePartnerDetailsSlice } from './slice';
import { selectPartnerDetails } from './slice/selectors';

interface TaskProps {
  verificationStatus?: VerificationStatus;
  userUuid?: string;
}

const AdminTask = ({ verificationStatus, userUuid }: TaskProps) => {
  const { t } = useTranslation();
  switch (verificationStatus) {
    case VerificationStatus.DATA_READY:
      return (
        <Link
          to={`${path.partnerAccountList}/verification/${userUuid}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer ml-4"
        >
          {t(translations.customerList.verify)}
        </Link>
      );
    default:
      return (
        <p className="leading-[22px] !text-[black] font-semibold ml-4">
          {t(translations.customerList.noTask)}
        </p>
      );
  }
};

export const PartnerDetails = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { actions } = usePartnerDetailsSlice();
  const { partner } = useSelector(selectPartnerDetails);

  const params = useParams();
  const { id } = params;

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        actions.getPartnerDetails({ userUuid: id }, () => setLoading(false)),
      );
    }
  }, [actions, dispatch, id]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const role = useRoles();
  const isVerified = partner?.verificationStatus === 'VERIFIED';

  const links = React.useMemo(
    () => [
      {
        label: `${t(translations.common.manageUsers)}`,
        link: path.customerAccountList,
      },
      {
        label: `${t(translations.partnerManagement.partnerAccount)}`,
        link: path.partnerAccountList,
      },
    ],
    [t],
  );

  return (
    <div className="py-4 px-6">
      <div className="flex items-center mb-4 cursor-pointer">
        <div
          className="flex items-center py-[10px] px-6 bg-[#fff] rounded-[8px] mr-6"
          onClick={() => navigate(path.partnerAccountList, { replace: true })}
        >
          <img className="h-[16px] w-[16px]" src={blueArrowLeft} alt="arrow" />
          <p className="text-[#005FC5] text-[16px] leading-[28px] font-semibold ml-2">
            {t(translations.common.back)}
          </p>
        </div>
        <PageHeader parentItems={links} title="Partner Details" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full py-4 rounded-2xl bg-[#fff] mb-6">
          <Spinner />
        </div>
      ) : (
        <div className="flex items-center justify-between py-4 px-8 bg-[#fff] rounded-2xl mb-6">
          <div className="flex items-center">
            <p className="text-[#005FC5] text-[20px] leading-[24px] font-bold mr-2">
              {t(translations.partnerManagement.registrationId)}:{' '}
              {partner?.userUuid}
            </p>
          </div>
          <div className="flex items-center">
            <div className="bg-[#FFDFB7] text-[#223250] text-[16px] leading-[28px] font-semibold py-[7px] px-[24px] rounded-3xl">
              {partner &&
                t(
                  get(
                    translations.verificationStatus,
                    partner.verificationStatus || VerificationStatus.ONBOARDING,
                  ),
                )}
            </div>
            {role === 'admin' && (
              <AdminTask
                verificationStatus={partner?.verificationStatus}
                userUuid={partner?.userUuid}
              />
            )}
          </div>
        </div>
      )}

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PartnerInfo loading={isLoading} partner={partner} />
        </Grid>
        <Grid item xs={6}>
          <HistoryLog partner={partner} />
        </Grid>
        <Grid item xs={12}>
          <DocumentUpload document={partner?.document} />
          {/* <KprPreference /> */}
        </Grid>
        {/* {role === 'admin' && (
          <Grid item xs={12}>
            <SLIK />
          </Grid>
        )} */}
        <Grid item xs={6}>
          <KYC kyc={partner?.kyc} verified={isVerified} />
        </Grid>
        <Grid item xs={6}>
          <KYB company={partner?.company} verified={isVerified} />
        </Grid>
        {/*<Grid item xs={6}>*/}
        {/*  <KPR/>*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          {/* <CustomerSummary /> */}
        </Grid>
      </Grid>
    </div>
  );
};
