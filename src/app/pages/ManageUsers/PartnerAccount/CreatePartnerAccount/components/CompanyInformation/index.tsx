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
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, get, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ControlledTextField } from 'app/components/CustomTextField';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';
import { ControlledTextarea } from 'app/components/TextArea';
import UploadFile from 'app/components/UploadFile';
import { Images } from '../../slice/types';

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

interface Props {
  images: Images;
  setImages: (value: Images) => void;
}

const CompanyInformation = (props: Props) => {
  const { images, setImages } = props;
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
          {t(translations.partnerManagement.partnerCompanyInfo)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={2}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.partnerManagement.completePartnerAccountInformation)}
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
        <ControlledTextarea
          className="field"
          label="Company Address"
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
          label="Company Email"
          name="company.email"
          required
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Incorrect format email',
            },
          }}
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
          label="Company NPWP Number"
          name="company.npwpNumber"
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
          label="Company SPPKP Number"
          name="company.sppkpNumber"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileDeedOfCompany"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileDeedOfCompany')
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
                  name="fileDeedOfCompany"
                  path="fileDeedOfCompany"
                  label={`${t(
                    translations.partnerManagement.fileDeedOfCompany,
                  )}`}
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
      {get(errors, 'fileDeedOfCompany') && (
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileDeedOfCompany'}.message`)}
        </FormHelperText>
      )}
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileNPWP"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileNPWP')
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
                  name="fileNPWP"
                  path="fileNPWP"
                  label={`${t(translations.partnerManagement.fileNPWP)}`}
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
      {get(errors, 'fileNPWP') && (
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileNPWP'}.message`)}
        </FormHelperText>
      )}
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileNIP"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileNIP')
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
                  name="fileNIP"
                  path="fileNIP"
                  label={`${t(translations.partnerManagement.fileNIP)}`}
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
      {get(errors, 'fileNIP') && (
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileNIP'}.message`)}
        </FormHelperText>
      )}
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileSK"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileSK')
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
                  name="fileSK"
                  path="fileSK"
                  label={`${t(translations.partnerManagement.fileSK)}`}
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
      {get(errors, 'fileSK') && (
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileSK'}.message`)}
        </FormHelperText>
      )}
    </Grid>
  );
};

export default CompanyInformation;
