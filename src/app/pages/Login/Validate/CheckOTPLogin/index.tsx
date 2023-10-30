import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import { withLoading } from 'app/components/HOC/WithLoading';
import { useLoading } from 'app/hooks';
import OtpInput from 'react-otp-input';
import { LoadingButton } from '@mui/lab';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';

import { useAuthSlice } from '../../slice';
import { Header } from '../../components/Header';
import { selectAuth } from '../../slice/selectors';

const InputForm = styled('div')({
  '& ': {
    justifyContent: 'space-evenly!important',
  },
  '& input': {
    color: '#223250',
    fontWeight: 'bold',
    fontSize: '48px!important',
    width: '78px!important',
    height: '85px',
    textAlign: 'center',
    border: '2px solid #C6D7E0',
    borderRadius: '4px',
  },
});

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  padding: theme.spacing(8, 0, 0, 0),
}));

export const BackgroundImage = styled('div')({
  backgroundImage: `url(${window.location.origin}/images/copy-otp.svg)`,
  height: '100%',
  width: '100%',
  backgroundColor: '#F2FAFD',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: '70%',
});

const Error = styled('div')({
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '8px',
  color: '#ff0000',
});

// ----------------------------------------------------------------------
interface Props {
  setLoading?: Function;
  username: string;
  password: string;
  setStep: (value: number) => void;
}

const CheckOTP = (props: Props) => {
  const { username, password, setStep } = props;
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading(props);
  const fetchFormData = useSelector(selectAuth);
  const [OTP, setOTP] = React.useState<string>(fetchFormData?.otp || '');
  const [error, setError] = React.useState<string>('');

  const handleOTP = () => {
    showLoading();
    dispatch(
      actions.checkOTP(
        { otp: OTP, username, password },
        _ => {
          hideLoading();
          setError('');
        },
        message => {
          if (message === 'invalid_otp') {
            setError(t(translations.loginPage.optIsWrong));
          } else {
            setError(t(translations.loginPage.optIsWrong));
          }
          hideLoading();
        },
      ),
    );
  };

  const handleResend = () => {
    setOTP('');
    showLoading();
    dispatch(
      actions.resendOTP(
        { username, password },
        e => {
          hideLoading();
          Notifier.addNotifySuccess({ messageId: 'success.resendSuccess' });
        },
        message => {
          hideLoading();
          Notifier.addNotifyError({ message });
        },
      ),
    );
  };

  return (
    <Grid container title={t(translations.loginPage.login)}>
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
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={10} sm={9} md={9} lg={9}>
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Header navigateTo={path.login} setStep={setStep} />
              <Typography
                sx={{ fontSize: '28px', mt: 8, fontWeight: 600 }}
                gutterBottom
              >
                {t(translations.loginPage.verifyEmail)}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#223250', mt: 1 }}>
                <span style={{ opacity: '0.5' }}>
                  {t(translations.loginPage.DescriptionVerifyEmailStep1)}
                </span>
                <span
                  style={{
                    color: '#005FC5',
                    fontWeight: 400,
                    opacity: '1!important',
                  }}
                >
                  {username}
                </span>
              </Typography>
              <Typography style={{ opacity: '0.5', fontSize: '16px' }}>
                {t(translations.loginPage.DescriptionVerifyEmailStep2)}
              </Typography>
            </Stack>
            <InputForm>
              <OtpInput
                inputStyle={{ justifyContent: 'space-between' }}
                containerStyle={{ justifyContent: 'space-between' }}
                value={OTP}
                onChange={setOTP}
                numInputs={6}
              />
              {error && <Error>{error}</Error>}
            </InputForm>
            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              onClick={handleOTP}
              sx={{
                background: '#005FC5',
                color: 'white',
                mt: 8,
                fontSize: '20px',
                fontWeight: 600,
                pt: 4,
                pb: 4,
              }}
            >
              {t(translations.common.verify)}
            </LoadingButton>
            <span
              style={{
                color: '#005FC5',
                marginTop: '2rem',
                textDecoration: 'blink',
                cursor: 'pointer',
                fontWeight: 400,
                fontSize: '16p',
              }}
              onClick={handleResend}
            >
              {t(translations.loginPage.reSendCode)}
            </span>
          </ContentStyle>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withLoading(CheckOTP);
