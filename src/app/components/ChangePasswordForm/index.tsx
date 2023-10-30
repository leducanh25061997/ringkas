import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// material
import { Stack, styled } from '@mui/material';
import { translations } from 'locales/translations';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthParams, KeycloakError } from 'types';
import * as yup from 'yup';
import { ControlledTextField } from 'app/components/CustomTextField';
import { PASSWORD_REGEX } from 'utils/helpers/regex';
// ----------------------------------------------------------------------
interface Props {
  onSubmit: (values: AuthParams) => void;
  error?: KeycloakError;
  isError?: boolean;
  checkLogin?: boolean;
  labelPassword: string;
  labelConfirmPassword: string;
  submitTitle: string;
}

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

export default function ChangePasswordForm(props: Props) {
  const { onSubmit, labelPassword, labelConfirmPassword, submitTitle } = props;
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const { t } = useTranslation();

  const authSchema = yup.object().shape({});

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    setError,
    clearErrors,
  } = useForm({ resolver: yupResolver(authSchema) });

  return (
    <RootStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mt={3}>
          <ControlledTextField
            className="field"
            label={labelPassword}
            name="password"
            control={control}
            type="password"
            id="password"
            rules={{
              required: t(translations.required.fillThisField) as string,
              minLength: {
                value: 8,
                message: t(translations.loginPage.min8CharsRequired),
              },
              pattern: {
                value: PASSWORD_REGEX,
                message: t(translations.loginPage.resetPasswordRequired),
              },
            }}
            onChange={(e: any) => {
              if (e && !(e.length > 7)) {
                setError('password', {
                  message: t(translations.loginPage.min8CharsRequired),
                });
              } else {
                if (!PASSWORD_REGEX.test(e)) {
                  setError('password', {
                    message: t(translations.loginPage.resetPasswordRequired),
                  });
                } else {
                  clearErrors('password');
                  if (confirmPassword) {
                    if (confirmPassword === e) {
                      setIsLogin(false);
                      clearErrors('confirmPassword');
                    } else {
                      setError('confirmPassword', {
                        message: t(
                          translations.loginPage.confirmPasswordRequired,
                        ),
                      });
                      setIsLogin(true);
                    }
                  }
                }
              }
              setPassword(e);
            }}
          />
          <ControlledTextField
            className="field"
            label={labelConfirmPassword}
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={(e: any) => {
              if (password && e && password === e) {
                setIsLogin(false);
                clearErrors('confirmPassword');
              } else {
                setError('confirmPassword', {
                  message: t(translations.loginPage.confirmPasswordRequired),
                });
                setIsLogin(true);
              }
              setConfirmPassword(e);
            }}
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
            pt: 4,
            pb: 4,
          }}
        >
          {submitTitle}
        </LoadingButton>
      </form>
    </RootStyle>
  );
}
