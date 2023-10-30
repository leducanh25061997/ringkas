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
import CheckEmail from './components/CheckEmail';
import LogoEmail from 'assets/images/directorEmail.png';
import { LoadingButton } from '@mui/lab';

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

const TextAlign = styled('span')(({ theme }) => ({
  textAlign: 'center',
}));

// ----------------------------------------------------------------------
interface Props {
  setLoading?: Function;
}

const ChangePassword = (props: Props) => {
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(props);
  const [error, setError] = React.useState<KeycloakError | undefined>();
  const [isError, setIsError] = React.useState<boolean>(false);
  const [checkLogin, setCheckLogin] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [step, setStep] = React.useState<number>(1);
  const [isNotRegister, setIsNotRegister] = React.useState<boolean>(false);

  const handleChangePassword = React.useCallback(
    ({ username }) => {
      showLoading();
      dispatch(
        actions.changePassword({ username }, (err?: any) => {
          setCheckLogin(!checkLogin);
          hideLoading();
          if (err?.data) {
            setIsNotRegister(false);
            setUsername(username);
            if (err?.data?.simulation) setStep(step + 2);
            else setStep(step + 1);
          } else {
            setIsNotRegister(true);
          }
        }),
      );
    },
    [actions, dispatch, navigate],
  );
  const handleOnclick = () => {
    setStep(1);
  };

  return (
    <div>
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
            {step === 1 ? (
              <ContentStyle>
                <Stack sx={{ mb: 2 }}>
                  <Header navigateTo={path.login} />
                  <Typography
                    sx={{ fontSize: '28px', mt: 6, fontWeight: 'bold' }}
                    gutterBottom
                  >
                    {t(translations.common.resetPassword)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      mt: 1,
                      color: '#223250',
                      opacity: '0.5',
                    }}
                  >
                    {t(translations.common.enterYourCurrentEmail)}
                  </Typography>
                </Stack>
                <CheckEmail
                  isNotRegister={isNotRegister}
                  onSubmit={handleChangePassword}
                  error={error}
                  isError={isError}
                  checkLogin={checkLogin}
                />
              </ContentStyle>
            ) : (
              <ContentStyle>
                <Header navigateTo={path.login} />
                <Stack spacing={3} sx={{ mb: 5, alignItems: 'center' }}>
                  <img src={LogoEmail} alt="" />
                  <Typography
                    sx={{
                      fontSize: '28px',
                      marginTop: '0px',
                      textAlign: 'center',
                      mt: 0,
                      fontWeight: 600,
                      width: '400px',
                    }}
                    gutterBottom
                  >
                    {t(translations.loginPage.linkResetPassword)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      textAlignLast: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <TextAlign>
                      {t(translations.loginPage.linkResetPasswordDes, {
                        username,
                      })}
                    </TextAlign>
                  </Typography>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      background: '#005FC5',
                      color: 'white',
                      width: 'fit-content',
                      fontWeight: 600,
                      fontSize: '20px',
                    }}
                    onClick={handleOnclick}
                  >
                    {t(translations.common.back)}
                  </LoadingButton>
                </Stack>
              </ContentStyle>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withLoading(ChangePassword);
