import {
  Container,
  FormControl,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

interface Props {}

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  '& textarea': {
    height: '90px!important',
  },
  paddingBottom: '3rem',
  marginRight: '5rem',
});

export const CompanyInformation = memo((props: Props) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    companyPhoneNumber: '',
    sppkpNumber: '',
    npwpNumber: '',
  });
  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const onChangeCompanyName = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('company.name', event.target.value.trim());
  };

  const onChangeCompanyEmail = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('company.email', event.target.value.trim());
  };

  const onChangeCompanyAddress = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('company.address', event.target.value.trim());
  };

  const onChangeCompanyPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      clearErrors('company.phone');
    } else {
      setError('company.phone', {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    }
    if (!event.target.value.includes('.')) {
      setValue('company.phone', event.target.value);
      setFormData({
        ...formData,
        companyPhoneNumber: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        companyPhoneNumber: event.target.value.split('.').join(''),
      });
    }
  };

  const onChangeSppkpNumber = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.value) {
      clearErrors('company.sppkpNumber');
    } else {
      setError('company.sppkpNumber', {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    }
    setValue('company.sppkpNumber', event.target.value);
  };

  const onChangeNpwpNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      clearErrors('company.npwpNumber');
    } else {
      setError('company.npwpNumber', {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    }
    if (!event.target.value.includes('.')) {
      setValue('company.npwpNumber', event.target.value);
      setFormData({
        ...formData,
        npwpNumber: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        npwpNumber: event.target.value.split('.').join(''),
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ marginTop: '0' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.developerInformation.developerCompanyInfo)}
      </Typography>
      <Typography sx={{ color: '#9098a7' }}>
        {t(translations.developerInformation.completeDeveloperCompanyInfo)}
      </Typography>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="company.name"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.company?.name}
                  helperText={errors?.company?.name?.message}
                  label={`${t(translations.developerInformation.companyName)}`}
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={field.onChange}
                  onBlur={onChangeCompanyName}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="company.email"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.company?.email}
                  helperText={errors?.company?.email?.message}
                  label={`${t(translations.developerInformation.companyEmail)}`}
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={field.onChange}
                  onBlur={onChangeCompanyEmail}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="company.address"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  multiline
                  error={!!errors?.company?.address}
                  helperText={errors?.company?.address?.message}
                  label={`${t(
                    translations.developerInformation.companyAddress,
                  )}`}
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={field.onChange}
                  onBlur={onChangeCompanyAddress}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="company.phone"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  label={`${t(
                    translations.developerInformation.companyPhoneNumber,
                  )}`}
                  value={
                    formData?.companyPhoneNumber || getValues('company.phone')
                  }
                  customInput={TextField}
                  onChange={onChangeCompanyPhone}
                  helperText={errors?.company?.phone?.message}
                  error={!!errors?.company?.phone}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="company.sppkpNumber"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.company?.sppkpNumber}
                  helperText={errors?.company?.sppkpNumber?.message}
                  label={`${t(
                    translations.developerInformation.companySppkpNumber,
                  )}`}
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={field.onChange}
                  onBlur={onChangeSppkpNumber}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
          <Controller
            name="company.npwpNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  label={`${t(
                    translations.developerInformation.companyNpwpNumber,
                  )}`}
                  value={
                    formData?.npwpNumber || getValues('company.npwpNumber')
                  }
                  customInput={TextField}
                  onChange={onChangeNpwpNumber}
                  helperText={errors?.company?.npwpNumber?.message}
                  error={!!errors?.company?.npwpNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
      </RootStyle>
    </Container>
  );
});
