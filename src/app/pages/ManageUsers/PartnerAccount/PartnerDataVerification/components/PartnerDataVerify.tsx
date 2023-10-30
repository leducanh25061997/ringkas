import { Box, Grid } from '@mui/material';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import selectedIcon from 'assets/icons/selected.svg';

import { selectPartnerVerificationDetail } from '../slice/selectors';

function PartnerDataVerify() {
  const { t } = useTranslation();
  const { partnerInformation } = useSelector(selectPartnerVerificationDetail);
  return (
    <Box
      className="px-6"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        mb: 5,
        pb: 5,
      }}
    >
      <h2 className="py-6 font-bold text-[#202A42] text-[18px] leading-[25px]">
        {t(translations.partnerManagement.dataSummary)}
      </h2>
      <Grid container className="px-24">
        <Grid item md={3}>
          <div className="font-medium text-[#6B7A99] leading-10">
            {t(translations.common.fullName)}
          </div>
          <div className="font-medium text-[#6B7A99] leading-10">
            {t(translations.partnerManagement.applicationId)}
          </div>
          <div className="font-medium text-[#6B7A99] leading-10">
            {t(translations.partnerManagement.partner)}
          </div>
          <div className="font-medium text-[#6B7A99] leading-10">
            {t(translations.partnerManagement.typeOfRoles)}
          </div>
        </Grid>
        <Grid item md={3}>
          <div className="font-medium text-[#202A42] leading-10">
            {partnerInformation?.kyc?.fullName || '-'}
          </div>
          <div className="font-medium text-[#202A42] leading-10">
            {partnerInformation?.kyc?.nik || '-'}
          </div>
          <div className="font-medium text-[#202A42] leading-10">
            {partnerInformation?.company?.name || '-'}
          </div>
          <div className="font-medium text-[#202A42] leading-10">
            {'PIC Main'}
          </div>
        </Grid>
        <Grid item md={6}>
          <div className="font-medium text-[#6B7A99] leading-10">
            {t(translations.developerInformation.photoOfIdCard)}
          </div>
          <div className="mt-3 relative">
            <img
              className="mt-3 rounded-2xl"
              src={
                'https://api.stg.ringkas.co.id/storage/s3/file?s3Key=upload/user/9b2e014a-c800-4875-b264-d695a648d4fc/ghk_1655372482256.jpeg'
              }
              alt="file ktp"
            />
            <button className="absolute bottom-[20px] right-[20px]">
              <img src={selectedIcon} alt="icon" />
            </button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(PartnerDataVerify);
