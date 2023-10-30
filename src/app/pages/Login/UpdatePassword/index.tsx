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
  backgroundImage: `url(images/update_password.svg)`,
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

const UpdatePassword = (props: Props) => {
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading(props);
  const [error, setError] = React.useState<KeycloakError | undefined>();
  const [isError, setIsError] = React.useState<boolean>(false);
  const [checkLogin, setCheckLogin] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [step, setStep] = React.useState<number>(1);

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
    [actions, dispatch, navigate],
  );

  return (
    <div>
      {step === 1 && (
        <Grid title={t(translations.loginPage.login)} container>
          <Grid item xs={6}>
            <BackgroundImage />
          </Grid>
          <Grid container item xs={12} sm={6} md={6} sx={{ display: 'flex' }}>
            <Grid xs={1} sm={1} md={1} lg={1} item></Grid>
            <Grid xs={10} sm={9} md={9} lg={9} item>
              <ContentStyle>
                <Stack sx={{ mb: 2 }}>
                  <Header />
                  <Typography
                    sx={{ fontSize: '28px', mt: 6, fontWeight: 'bold' }}
                    gutterBottom
                  >
                    {t(translations.common.createNewPassword)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: '#223250',
                      opacity: '0.5',
                      mt: 1,
                    }}
                  >
                    {t(translations.common.createNewPasswordDes)}
                  </Typography>
                </Stack>
                <ChangePasswordForm
                  onSubmit={handleChangePassword}
                  error={error}
                  isError={isError}
                  checkLogin={checkLogin}
                  labelConfirmPassword={t(
                    translations.developerInformation.password,
                  )}
                  labelPassword={t(translations.common.newPassword)}
                  submitTitle={t(translations.common.create)}
                />
              </ContentStyle>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default withLoading(UpdatePassword);
