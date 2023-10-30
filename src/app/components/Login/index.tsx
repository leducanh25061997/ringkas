import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// material
import { Stack, styled, Link, Typography } from '@mui/material';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { AuthParams, KeycloakError } from 'types';
import * as Yup from 'yup';
import { ControlledTextField } from 'app/components/CustomTextField';

// ----------------------------------------------------------------------
interface Props {
  onSubmit: (values: AuthParams) => void;
  error?: KeycloakError;
  isError?: boolean;
  checkLogin?: boolean;
}

const Register = styled('span')({
  '& a': {
    textDecoration: 'blink',
    color: '#005FC5',
  },
  color: '#005FC5',
  fontWeight: 'bold',
  marginLeft: '0.5rem',
});
export const RootStyle = styled('div')({
  '& .MuiFilledInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC',
  },
  '& .MuiFilledInput-root:after': {
    right: 'unset',
    border: '1px solid  #005FC5',
    height: '100%',
    width: '100%',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root.Mui-error:after': {
    border: '1px solid  #FF4842',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:before': {
    right: 'unset',
    content: '""',
  },
  '& .css-1lwbda4-MuiStack-root': {
    '& .MuiFormControl-root:after': {
      border: '1px solid  #005FC5',
    },
  },
  '& .MuiLoadingButton-root': {
    '& .Mui-disabled': {
      background: '#EAECEF',
      color: '#ABB4C1',
      fontSize: '20px',
      fontWeight: 600,
    },
  },
});

export default function LoginForm(props: Props) {
  const { onSubmit, isError, checkLogin, error } = props;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isNotRegister, setIsNotRegister] = useState<boolean>(true);

  const { t } = useTranslation();

  const authSchema = Yup.object()
    .shape({
      username: Yup.string()
        .email(t(translations.required.invalidEmail))
        .required(),
      password: Yup.string().required(
        t(translations.createProductError.pleaseEnterRequiredFields),
      ),
    })
    .required(t(translations.createProductError.pleaseEnterRequiredFields));

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    setError,
  } = useForm({ resolver: yupResolver(authSchema) });

  useEffect(() => {
    if (isError) {
      if (error && error?.error === 'invalid_user') {
        setIsNotRegister(true);
      }
      if (error && error?.error === 'invalid_password') {
        setError('password', {
          message: t(translations.loginPage.passwordIsRequired),
        });
        setIsNotRegister(false);
      }
    } else {
      setIsNotRegister(false);
    }
  }, [isError, checkLogin, error, setError, t]);

  return (
    <RootStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <ControlledTextField
            className="field"
            label={t(translations.common.email)}
            placeholder={t(translations.common.enterYourEmail)}
            name="username"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={(e: any) => {
              setUsername(e);
              setIsNotRegister(false);
              if (password && e) {
                setIsLogin(false);
              } else {
                setIsLogin(true);
              }
            }}
            isNotRegister={isNotRegister}
          />
          <ControlledTextField
            className="field"
            label={t(translations.loginPage.password)}
            name="password"
            type="password"
            id="password"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={e => {
              setPassword(e || '');
              if (username && e) {
                setIsLogin(false);
              } else {
                setIsLogin(true);
              }
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2, color: '#005FC5' }}
        >
          <Link
            component={RouterLink}
            variant="subtitle2"
            to={path.changePassword}
            sx={{
              textDecoration: 'blink',
              color: '#005FC5',
              fontWeight: 400,
              fontSize: '16px',
              mt: 1,
            }}
          >
            {t(translations.loginPage.forgotPassword)}
          </Link>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={isLogin}
          sx={{
            background: '#005FC5',
            color: '#FFFFFF',
            mt: 2,
            fontSize: '20px',
            fontWeight: 600,
            pt: 4,
            pb: 4,
          }}
        >
          {t(translations.loginPage.login)}
        </LoadingButton>
        <Typography
          sx={{ fontSize: '16px', mt: 4, textAlign: 'center' }}
          gutterBottom
        >
          <span>{t(translations.loginPage.checkAccount)}</span>
          <Register>
            <RouterLink to={path.register} style={{ fontWeight: 600 }}>
              {t(translations.common.register)}
            </RouterLink>
          </Register>
        </Typography>
      </form>
    </RootStyle>
  );
}
