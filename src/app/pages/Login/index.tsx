import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch } from 'react-redux';
import { KeycloakError } from 'types';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';

import LoginForm from '../../components/Login';

import { useAuthSlice } from './slice';
import { Header } from './components/Header';
import CheckOTP from './Validate/CheckOTPLogin';

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  padding: theme.spacing(8, 0, 0, 0),
}));

export const BackgroundImage = styled('div')({
  backgroundImage: `url(/images/backgroundLogin.png)`,
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

const AuthPage = (props: Props) => {
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading(props);
  const [error, setError] = React.useState<KeycloakError | undefined>();
  const [isError, setIsError] = React.useState<boolean>(false);
  const [checkLogin, setCheckLogin] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [step, setStep] = React.useState<number>(1);

  const handleLogin = React.useCallback(
    ({ username, password }) => {
      showLoading();
      dispatch(
        actions.login({ username, password }, (err?: any) => {
          setCheckLogin(!checkLogin);
          hideLoading();
          if (err?.data) {
            setUsername(username);
            setPassword(password);
            if (err?.data?.simulation) setStep(step + 2);
            else setStep(step + 1);
            setIsError(false);
          } else {
            setError(err);
            setIsError(true);
          }
        }),
      );
    },
    [actions, checkLogin, dispatch, hideLoading, showLoading, step],
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
            <Grid xs={10} sm={10} md={9} lg={9} item>
              <ContentStyle>
                <Stack sx={{ mb: 3 }}>
                  <Header />
                  <Typography
                    sx={{
                      fontSize: '28px',
                      color: '#223250',
                      mt: 6,
                      fontWeight: 'bold',
                    }}
                    gutterBottom
                  >
                    {t(translations.loginPage.login)}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '16px', color: '#223250', opacity: '0.5' }}
                  >
                    {t(translations.loginPage.description)}
                  </Typography>
                </Stack>
                <LoginForm
                  onSubmit={handleLogin}
                  error={error}
                  isError={isError}
                  checkLogin={checkLogin}
                />
              </ContentStyle>
            </Grid>
          </Grid>
        </Grid>
      )}
      {step === 2 && (
        <CheckOTP username={username} password={password} setStep={setStep} />
      )}
    </div>
  );
};

export default withLoading(AuthPage);
