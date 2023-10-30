import { Box, Grid } from '@mui/material';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import selectedIcon from 'assets/icons/selected.svg';

import { selectPartnerVerificationDetail } from '../slice/selectors';
import Img from 'app/components/Img';

function DataSummary() {
  const { t } = useTranslation();
  const { partnerInformation } = useSelector(selectPartnerVerificationDetail);
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
      <Grid container className="px-24">
        <Grid item md={4}>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6">
              {t(translations.common.fullName)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {partnerInformation?.kyc?.fullName || '-'}
            </p>
          </div>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6 whitespace-nowrap">
              {t(translations.partnerManagement.registrationId)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {partnerInformation?.userUuid || '-'}
            </p>
          </div>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6">
              {t(translations.partnerManagement.partner)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {partnerInformation?.company?.name || '-'}
            </p>
          </div>
          <div className="flex justify-between mt-6 first:mt-0">
            <p className="font-medium text-[#6B7A99] leading-5 pr-6">
              {t(translations.partnerManagement.typeOfRoles)}
            </p>
            <p className="font-medium text-[#202A42] leading-5 max-w-[220px] break-all text-right">
              {partnerInformation?.groupPath
                ? partnerInformation?.groupPath.split('/').slice(-1)[0]
                : '-'}
            </p>
          </div>
        </Grid>
        <Grid item md={2}></Grid>
        <Grid item md={6}>
          <div className="font-medium text-[#6B7A99] leading-5">
            {t(translations.partnerManagement.ktpDirector)}
          </div>
          {partnerInformation?.document.fileKtpDirector[0]?.url && (
            <div className="mt-3 relative">
              <Img
                className="rounded-2xl aspect-video object-cover w-full"
                src={partnerInformation.document.fileKtpDirector[0].url}
                alt="file ktp"
              />
              <a
                className="absolute bottom-[20px] right-[20px]"
                href={partnerInformation.document.fileKtpDirector[0].url}
                target="_blank"
                rel="noreferrer"
              >
                <img src={selectedIcon} alt="icon" />
              </a>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(DataSummary);
