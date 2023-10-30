import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// material
import { Stack, styled, Link, TextField, Typography } from '@mui/material';
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
  isNotRegister: boolean;
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
});

export default function CheckEmail(props: Props) {
  const { onSubmit, isError, checkLogin, isNotRegister } = props;
  const [username, setUsername] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const { t } = useTranslation();

  const authSchema = Yup.object()
    .shape({
      username: Yup.string()
        .email(t(translations.required.invalidEmail))
        .required(),
    })
    .required();
  useEffect(() => {
    if (isError) {
      setError('username', {
        message: t(translations.loginPage.emailIsRequired),
      });
    }
  }, [isError, checkLogin]);

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    control,
    setError,
  } = useForm({ resolver: yupResolver(authSchema) });

  return (
    <RootStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mt={3}>
          <ControlledTextField
            className="field"
            label={t(translations.common.email)}
            name="username"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={(e: any) => {
              setUsername(e);
              if (e) {
                setIsLogin(false);
              } else {
                setIsLogin(true);
              }
            }}
            isNotRegister={isNotRegister}
          />
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
            color: 'white',
            mt: 5,
            fontWeight: 600,
            fontSize: '20px',
            pt: 4,
            pb: 4,
          }}
        >
          {t(translations.common.submit)}
        </LoadingButton>
      </form>
    </RootStyle>
  );
}
