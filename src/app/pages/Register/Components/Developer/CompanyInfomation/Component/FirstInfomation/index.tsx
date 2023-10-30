import { memo } from 'react';
import { Grid, Stack, TextField, styled } from '@mui/material';
import {
  Controller,
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { emailRegex, EMAIL_REGEX } from 'utils/helpers/regex';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledTextarea } from 'app/components/TextArea';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiFilledInput-root': {
      background: '#F6F8FC',
      borderRadius: '10px',
      border: '1px solid #C6D7E0',
    },
    '& input:focus': {
      boxShadow: 'none',
      color: 'black',
    },
    '& .MuiFilledInput-root:before': {
      right: 'unset',
      content: '""',
    },
    '& .MuiFilledInput-root:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
    },
    '& .MuiInputLabel-root:focus': {
      color: '#000000',
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
  '& textarea': {
    height: '130px!important',
  },
});

interface Props {
  formData: any;
  setFormData: (value: any) => void;
  control: any;
  errors: any;
  clearErrors: UseFormClearErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const FirstInfomation = memo((props: Props) => {
  const {
    formData,
    setFormData,
    control,
    errors,
    clearErrors,
    setError,
    setValue,
  } = props;
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} justifyContent="center" mt={1}>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            label="Company name"
            name="company.name"
            value={formData.companyName}
            control={control}
            rules={{
              required: 'Required',
            }}
            required
            onChange={e => {
              setFormData({
                ...formData,
                companyName: e,
              });
              setValue('company.name', e);
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            label="Email"
            name="kyc.email"
            value={formData.companyEmail}
            required
            onChange={e => {
              if ((e || '').match(emailRegex) || !e) {
                clearErrors('kyc.email');
              } else {
                setError('kyc.email', {
                  message: t(translations.required.incorrectEmail),
                });
              }
              setFormData({
                ...formData,
                companyEmail: e,
              });
            }}
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Incorrect format email',
              },
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextarea
            className="field"
            label="Company Address"
            name="company.address"
            value={formData.companyAddress}
            onChange={e => {
              setFormData({
                ...formData,
                companyAddress: e,
              });
            }}
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
    </Grid>
  );
});

export default FirstInfomation;
