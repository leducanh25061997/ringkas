import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Box, Grid, Typography } from '@mui/material';
import iconDeveloper from 'assets/images/icon_client_kpr.svg';

import { useAuthSlice } from 'app/pages/Login/slice';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Otp from '../Components/Otp';
import RegisterPartnerForm from './components/RegisterPartnerForm';

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiStepConnector-root': {
    display: 'none',
  },
}));

export default function RegisterBankHQ() {
  const { t } = useTranslation();
  const methods = useForm({ reValidateMode: 'onChange', mode: 'onChange' });

  const dispatch = useDispatch();

  const { actions: loginActions } = useAuthSlice();

  const [page, setPage] = useState<'OTP' | 'SIGN_UP'>('SIGN_UP');

  useEffect(() => {
    if (page === 'OTP')
      dispatch(
        loginActions.login({
          username: methods.getValues().email,
          password: methods.getValues().password,
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <FormProvider {...methods}>
      <Grid
        container
        sx={{
          height: '100%',
          display: page === 'OTP' ? 'none' : 'flex',
          backgroundColor: '#FFF',
        }}
      >
        <Grid item md={5} sm={4}>
          <Box
            sx={{
              height: '100%',
              background: '#F2FAFD',
              textAlign: 'center',
              pt: 5,
            }}
          >
            <Box sx={{ padding: '0 20px' }}>
              <Typography
                sx={{
                  color: '#005FC5',
                  fontWeight: '300',
                  fontSize: '24px',
                  padding: '1rem',
                }}
              >
                <Trans
                  i18nKey="registerNewClient.manageCustomerAndSale" // optional -> fallbacks to defaults if not provided
                  components={{
                    bold: <span style={{ fontWeight: 700 }} />,
                  }}
                />
              </Typography>
            </Box>
            <img
              src={iconDeveloper}
              alt=""
              style={{ margin: '1rem auto 0 auto' }}
            />
          </Box>
        </Grid>
        <Grid item md={7} sm={8} className="h-screen overflow-y-auto">
          <RootStyle>
            <Box sx={{ width: '100%' }}>
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                  <Typography
                    sx={{
                      mt: 5,
                      mb: 1,
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: '28px',
                      lineHeight: '42px',
                    }}
                  >
                    {t(translations.registerNewClient.registerAsBankHQ)}
                  </Typography>
                </Box>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <RegisterPartnerForm
                    onSubmitFormSuccess={() => setPage('OTP')}
                  />
                </div>
                <div className="w-full flex justify-center mb-10 mt-8">
                  <p>
                    {t(translations.registerNewPartnerPopup.alreadyHaveAccount)}{' '}
                    <Link
                      to={path.login}
                      className="!text-[#005FC5] font-semibold"
                    >
                      {t(translations.common.signIn)}
                    </Link>
                  </p>
                </div>
              </React.Fragment>
            </Box>
          </RootStyle>
        </Grid>
      </Grid>

      {page === 'OTP' && (
        <div className="w-[100vw] h-[100vh]">
          <Otp
            username={methods.getValues().email}
            password={methods.getValues().password}
          />
        </div>
      )}
    </FormProvider>
  );
}
