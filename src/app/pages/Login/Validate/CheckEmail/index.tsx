import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// material
import { Stack, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import LogoEmail from 'assets/images/logo-email.svg';
import { LoadingButton } from '@mui/lab';
import path from 'app/routes/path';
import { useSelector } from 'react-redux';

import { useAuthSlice } from '../../slice';
import { selectAuth } from '../../slice/selectors';

// ----------------------------------------------------------------------
interface Props {
  username: string;
  setStep: (value: number) => void;
  step: number;
}

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
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

export default function CheckEmail(props: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetchFormData = useSelector(selectAuth);
  const { username, setStep, step } = props;

  const handleOnclick = () => {
    setStep(step + 1);
  };
  return (
    <ContentStyle>
      <Stack spacing={3} sx={{ mb: 5, alignItems: 'center' }}>
        <img src={LogoEmail} alt="" />
        <Typography sx={{ fontSize: '28px', marginTop: '0px' }} gutterBottom>
          {t(translations.loginPage.checkOTP)}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            textAlignLast: 'center',
            textAlign: 'center',
          }}
        >
          <TextAlign>{t(translations.loginPage.descriptionOTPStep1)}</TextAlign>
          <span style={{ color: '#005FC5', fontWeight: 600 }}>{username}</span>
          <span>{t(translations.loginPage.descriptionOTPStep2)}</span>
        </Typography>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ background: '#005FC5', color: '#FFFFFF', width: 'fit-content' }}
          onClick={handleOnclick}
        >
          {t(translations.common.checkEmail)}
        </LoadingButton>
      </Stack>
    </ContentStyle>
  );
}
