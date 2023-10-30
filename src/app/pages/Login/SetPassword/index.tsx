import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { KeycloakError } from 'types';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';

import path from '../../../routes/path';
import { Header } from '../components/Header';
import { useAuthSlice } from '../slice';
import ChangePasswordForm from 'app/components/ChangePasswordForm';

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  padding: theme.spacing(8, 0, 0, 0),
}));

export const BackgroundImage = styled('div')({
  backgroundImage: `url(/images/backgroundChangePw.svg)`,
  height: '100%',
  width: '100%',
  backgroundColor: '#F2FAFD',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '70%',
});

// ----------------------------------------------------------------------
interface Props {
  setLoading?: Function;
}

const SetPassword = (props: Props) => {
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(props);
  const [error] = React.useState<KeycloakError | undefined>();
  const [isError] = React.useState<boolean>(false);
  const [checkLogin] = React.useState<boolean>(false);
  const [step] = React.useState<number>(1);

  const handleChangePassword = React.useCallback(
    ({ password, confirmPassword }) => {
      showLoading();
      dispatch(
        actions.updatePassword({ password }, (err?: any) => {
          hideLoading();
          navigate(path.root);
        }),
      );
    },
    [actions, dispatch, hideLoading, navigate, showLoading],
  );

  return (
    <div>
      {step === 1 && (
        <Grid title={t(translations.loginPage.login)} container>
          <Grid item xs={6}>
            <BackgroundImage />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={6}
            sx={{ display: 'flex', background: 'white' }}
          >
            <Grid xs={1} sm={1} md={1} lg={1} item></Grid>
            <Grid xs={10} sm={9} md={9} lg={9} item>
              <ContentStyle>
                <Stack sx={{ mb: 3 }}>
                  <Header />
                  <Typography
                    sx={{
                      fontSize: '28px',
                      mt: 9,
                      fontWeight: 'bold',
                      color: '#223250',
                    }}
                    gutterBottom
                  >
                    {t(translations.common.setUpPassword)}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '16px', color: '#223250', opacity: '0.5' }}
                  >
                    {t(translations.common.enterPassword)}
                  </Typography>
                </Stack>
                <ChangePasswordForm
                  onSubmit={handleChangePassword}
                  error={error}
                  isError={isError}
                  checkLogin={checkLogin}
                  labelConfirmPassword={t(translations.common.confirmPassword)}
                  labelPassword={t(translations.common.setPassword)}
                  submitTitle={t(translations.common.submit)}
                />
              </ContentStyle>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default withLoading(SetPassword);
