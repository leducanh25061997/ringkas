import {
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { translations } from 'locales/translations';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DesktopDatePicker,
  DesktopDatePickerProps,
  LocalizationProvider,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import NumberFormat from 'react-number-format';
import moment from 'moment';

interface Props {
  images: any;
  setImages: (value: any) => void;
}

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  marginBottom: '3rem',
  marginRight: '5rem',
});

export const AccountInformation = memo((props: Props) => {
  const { setImages, images } = props;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [formData, setFormData] = useState({
    phone: '',
    nik: '',
  });

  const handleShowPassword = useCallback(() => {
    setShowPassword(show => !show);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeFullName = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('kyc.fullName', event.target.value.trim());
  };

  const onChangeEmail = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('email', event.target.value.trim());
  };

  const onChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      clearErrors('kyc.phone');
    } else {
      setError('kyc.phone', {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    }
    if (!event.target.value.includes('.')) {
      setValue('kyc.phone', event.target.value);
      setFormData({
        ...formData,
        phone: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        phone: event.target.value.split('.').join(''),
      });
    }
  };

  const onChangeNik = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      clearErrors('kyc.nik');
    } else {
      setError('kyc.nik', {
        message: t(translations.createProductError.pleaseEnterRequiredFields),
      });
    }
    if (!event.target.value.includes('.')) {
      setValue('kyc.nik', event.target.value);
      setFormData({
        ...formData,
        nik: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        nik: event.target.value.split('.').join(''),
      });
    }
  };

  const onChangePassword = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('password', event.target.value.trim());
  };

  const onChangeDob = (event: any) => {
    if (
      event &&
      event.toString() !== 'Invalid Date' &&
      !moment(event).isAfter(new Date())
    ) {
      setValue('kyc.dob', event);
      clearErrors('kyc.dob');
    } else {
      setValue('kyc.dob', '');
      setError('kyc.dob', {
        type: 'required',
        message: 'Invalid Date',
      });
    }
  };
  return (
    <Container sx={{ marginTop: '0' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.developerInformation.developerAccountInfo)}
      </Typography>
      <Typography sx={{ color: '#9098a7' }}>
        {t(translations.developerInformation.completeDeveloperAccountInfo)}
      </Typography>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="kyc.fullName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.kyc?.fullName}
                  helperText={errors?.kyc?.fullName?.message}
                  label={`${t(translations.developerInformation.fullName)}`}
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={field.onChange}
                  onBlur={onChangeFullName}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="kyc.phone"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  label={`${t(translations.developerInformation.phoneNumber)}`}
                  customInput={TextField}
                  value={formData?.phone || getValues('kyc.phone')}
                  onChange={onChangePhone}
                  helperText={errors?.kyc?.phone?.message}
                  error={!!errors?.kyc?.phone}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="email"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  label={`${t(translations.common.email)}`}
                  type="text"
                  variant="outlined"
                  fullWidth
                  onChange={field.onChange}
                  onBlur={onChangeEmail}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        {/* <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="password"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                  label={`${t(translations.loginPage.password)}`}
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  onChange={field.onChange}
                  onBlur={onChangePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon
                            icon={showPassword ? 'mdi:eye' : 'mdi:eye-off'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
            control={control}
          />
        </FormControl> */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="kyc.nik"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  label={`${t(translations.developerInformation.idCardNumber)}`}
                  customInput={TextField}
                  onChange={onChangeNik}
                  value={formData?.nik || getValues('kyc.nik')}
                  helperText={errors?.kyc?.nik?.message}
                  error={!!errors?.kyc?.nik}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3, mb: 1.5 }}>
          <Controller
            name="kyc.dob"
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...field}
                    label={`${t(
                      translations.developerInformation.dateOfBirth,
                    )}`}
                    inputFormat="dd/MM/yyyy"
                    onChange={onChangeDob}
                    maxDate={new Date()}
                    minDate={new Date(1900, 1, 1)}
                    renderInput={params => {
                      const newParams = { ...params };
                      delete newParams.error;
                      return (
                        <TextField
                          {...newParams}
                          error={
                            !!errors?.kyc?.dob ||
                            field.value.toString() === 'Invalid Date'
                          }
                          helperText={
                            errors?.kyc?.dob?.message ||
                            field.value.toString() === 'Invalid Date'
                              ? 'Invalid Date'
                              : ''
                          }
                        />
                      );
                    }}
                  />
                </LocalizationProvider>
              );
            }}
            control={control}
            defaultValue=""
          />
        </FormControl>
        <GeneralImageDetail
          images={images}
          setImages={setImages}
          grid={1}
          name="fileKtp"
          path="fileKtp"
          label={t(translations.developerInformation.uploadIdCard)}
        />
      </RootStyle>
    </Container>
  );
});
