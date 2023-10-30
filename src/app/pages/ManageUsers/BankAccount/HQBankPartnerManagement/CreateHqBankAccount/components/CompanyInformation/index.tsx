import { Grid, Stack, TextField, Typography, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ControlledTextField } from 'app/components/CustomTextField';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';
import { ControlledTextarea } from 'app/components/TextArea';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      background: '#F6F8FC!important',
    },
    '& textarea': {
      height: '130px!important',
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#00ab55!important',
      },
    },
    '& .MuiInputLabel-root:after': {
      color: '#00ab55!important',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
});

const CompanyInformation = () => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
        >
          {t(translations.bankManagement.banksCompanyInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={2}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.bankManagement.completeBankCompanyInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={`${t(translations.bankManagement.companyName)}`}
          name="company.name"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={`${t(translations.bankManagement.companyEmail)}`}
          name="company.email"
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Incorrect format email',
            },
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextarea
          className="field"
          label={`${t(translations.bankManagement.companyAddress)}`}
          name="company.address"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={`${t(translations.bankManagement.companyPhoneNumber)}`}
          name="company.phone"
          type="tel"
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: PHONE_NUMBER,
              message: 'Invalid phone number',
            },
          }}
          onChange={e => {
            if (!PHONE_NUMBER.test(e || '')) {
              if (e === '') {
                setError('company.phone', {
                  message: t(
                    translations.createProductError.pleaseEnterRequiredFields,
                  ),
                });
              } else {
                setValue('company.phone', e, { shouldValidate: true });
              }
            } else {
              clearErrors('company.phone');
            }
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          type="id"
          label={`${t(
            translations.bankManagement
              .companyTaxableEntrepreneurConfirmationLetterNumber,
          )}`}
          name="company.sppkpNumber"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          type="id"
          label={`${t(
            translations.bankManagement.companyTaxpayerIdentificationNumber,
          )}`}
          name="company.npwpNumber"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
    </Grid>
  );
};

export default CompanyInformation;
