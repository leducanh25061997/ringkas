import { Box, Grid } from '@mui/material';
import Img from 'app/components/Img';
import Spinner from 'app/components/Spinner';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';
import { selectManageCustomer } from '../slice/selectors';

interface Props {
  isLoading: boolean;
}

function DataSummary(props: Props) {
  const { isLoading } = props;
  const { dataSummary } = useSelector(
    selectManageCustomer,
    shallowEqual,
  ).kycVerificationData;
  const { t } = useTranslation();

  return (
    <Box
      className="px-6"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        mb: 3,
        pb: 3,
      }}
    >
      <h2 className="py-6 font-bold text-[#202A42] text-[18px] leading-[25px]">
        {t(translations.partnerManagement.dataSummary)}
      </h2>
      {isLoading && (
        <div className="w-full h-[700px] flex pt-[200px] justify-center">
          <Spinner />
        </div>
      )}
      <Grid container className="px-24">
        <Grid item md={4}>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6">
              {t(translations.common.fullName)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {dataSummary?.account.fullName || '-'}
            </p>
          </div>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6 whitespace-nowrap">
              {t(translations.partnerManagement.applicationId)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {dataSummary?.applicationId || '-'}
            </p>
          </div>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6">
              {t(translations.dataVerification.leads)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {dataSummary?.leads?.fullName || '-'}
            </p>
          </div>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6">
              {t(translations.dataVerification.picAdminRingkas)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              -
            </p>
          </div>
        </Grid>

        <Grid item md={2}></Grid>
        <Grid item md={6}>
          <div className="font-medium text-[#6B7A99] leading-5 mb-4">
            {t(translations.developerInformation.photoOfIdCard)}
          </div>
          <div className="w-full relative">
            {dataSummary?.account.photo.url && (
              <>
                <Img
                  src={dataSummary?.account.photo.url}
                  alt=""
                  className="rounded-lg aspect-video object-cover"
                  width="100%"
                />
                <a
                  className="p-2 absolute right-3 bottom-3 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-lg"
                  href={dataSummary?.account.photo.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={fullscreenIcon} alt="" width={16} height={16} />
                </a>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(DataSummary);
