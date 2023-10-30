import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// material
import { Stack, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import LogoEmail from 'assets/images/notValidEmail.svg';
import { LoadingButton } from '@mui/lab';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from 'app/hooks';
import { useAuthSlice } from '../slice';
import { useLocation } from 'react-router';
import Notifier from 'app/pages/Notifier';

// ----------------------------------------------------------------------
interface Props {}

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 680,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 0),
}));

const TextAlign = styled('span')(({ theme }) => ({
  textAlign: 'center',
}));

export default function NotValidEmail(props: Props) {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { showLoading, hideLoading } = useLoading(props);
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();

  const handleOnclick = () => {
    const username = state as string;
    showLoading();
    dispatch(
      actions.changePassword({ username }, (err?: any) => {
        hideLoading();
        if (err?.data) {
          Notifier.addNotifySuccess({
            messageId: 'success.resendSuccess',
          });
        } else {
          Notifier.addNotifyError({
            messageId: 'error.resendFailed',
          });
        }
      }),
    );
  };
  return (
    <div className="w-full bg-white">
      <ContentStyle>
        <Stack spacing={3} sx={{ mb: 5, alignItems: 'center' }}>
          <img src={LogoEmail} alt="" />
          <Typography
            sx={{
              fontSize: '28px',
              marginTop: '0px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            gutterBottom
          >
            {t(translations.loginPage.resetLinkIsNoLongerValid)}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              textAlignLast: 'center',
              textAlign: 'center',
            }}
          >
            <TextAlign>
              {t(translations.loginPage.resetLinkIsNoLongerValidDes)}
            </TextAlign>
          </Typography>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ background: '#005FC5', color: 'white', width: 'fit-content' }}
            onClick={handleOnclick}
          >
            {t(translations.common.resend)}
          </LoadingButton>
        </Stack>
      </ContentStyle>
    </div>
  );
}
