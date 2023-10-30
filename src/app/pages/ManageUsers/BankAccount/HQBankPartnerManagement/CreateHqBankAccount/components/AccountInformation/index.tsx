import {
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  Box,
  FormHelperText,
} from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import UploadFile from 'app/components/UploadFile';
import { get } from 'lodash';
import moment from 'moment';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';

import { Images } from '../../slice/types';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';

const RenderInput = styled(Box)({
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
interface Props {
  images: Images;
  setImages: (value: Images) => void;
}

const AccountInformation = (props: Props) => {
  const { images, setImages } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
        >
          {t(translations.bankManagement.banksAccountInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={2}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.bankManagement.completeBankAccountInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={`${t(translations.bankManagement.fullNameAsIdCard)}`}
          name="kyc.fullName"
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
          label={`${t(translations.bankManagement.phoneNumber)}`}
          name="kyc.phone"
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
                setError('kyc.phone', {
                  message: t(
                    translations.createProductError.pleaseEnterRequiredFields,
                  ),
                });
              } else {
                setValue('kyc.phone', e, { shouldValidate: true });
              }
            } else {
              clearErrors('kyc.phone');
            }
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={`${t(translations.bankManagement.EmailAddress)}`}
          name="email"
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Incorrect format email',
            },
          }}
          onChange={e => {
            if (!EMAIL_REGEX.test(e || '')) {
              setError('email', {
                message: 'Incorrect format email',
              });
            } else {
              clearErrors('email');
            }
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          type="id"
          label="NIK"
          name="kyc.nik"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledDatePicker
          control={control}
          name="kyc.dob"
          label={`${t(translations.bankManagement.dateOfBirth)}`}
          className="field"
          disableFuture
          rules={{
            required: 'Required',
          }}
          onChange={event => {
            if (
              event &&
              event.toString() !== 'Invalid Date' &&
              !moment(event).isAfter(new Date())
            ) {
              clearErrors('kyc.dob');
              setValue('kyc.dob', event);
            } else {
              setValue('kyc.dob', event, { shouldValidate: true });
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileNik"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileNik')
                    ? '1px solid #FF4842'
                    : '1px solid #C6D7E0',
                  borderRadius: '8px',
                  background: '#F6F8FC!important',
                }}
              >
                <UploadFile
                  images={images}
                  setImages={setImages}
                  errors={errors}
                  name="fileNik"
                  path="fileNik"
                  label={`${t(translations.bankManagement.uploadIdCard)}`}
                  control={control}
                  acceptFile={'image/*'}
                  isBackgroundWhite
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
      </Grid>
      {get(errors, 'fileNik') && (
        <FormHelperText
          sx={{
            color: 'red',
            textAlign: 'center',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileNik'}.message`)}
        </FormHelperText>
      )}
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileLogo"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileLogo')
                    ? '1px solid #FF4842'
                    : '1px solid #C6D7E0',
                  borderRadius: '8px',
                  background: '#F6F8FC!important',
                }}
              >
                <UploadFile
                  images={images}
                  setImages={setImages}
                  errors={errors}
                  name="fileLogo"
                  path="fileLogo"
                  label={`${t(translations.bankManagement.uploadLogoBank)}`}
                  control={control}
                  acceptFile={'image/*'}
                  isBackgroundWhite
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
      </Grid>
      {get(errors, 'fileLogo') && (
        <FormHelperText
          sx={{
            color: 'red',
            textAlign: 'center',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileLogo'}.message`)}
        </FormHelperText>
      )}
    </Grid>
  );
};

export default AccountInformation;
