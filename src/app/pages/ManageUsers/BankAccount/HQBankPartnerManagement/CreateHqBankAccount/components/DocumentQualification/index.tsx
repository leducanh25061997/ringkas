import React from 'react';
import {
  Grid,
  Typography,
  styled,
  Checkbox,
  FormHelperText,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import UploadFile from 'app/components/UploadFile';
import { SwipeSignature } from 'app/components/SwipeSignature';
import { Controller, useFormContext } from 'react-hook-form';
import { get } from 'lodash';

import { Images } from '../../slice/types';
import { ControlledSignature } from 'app/components/Signature/Signature1';

const RootUploadVideo = styled('div')({
  borderRadius: '8px',
  background: '#FFFFFF !important',
  border: '1px solid #C6D7E0',
  height: '100%',
});

interface Props {
  images: Images;
  setImages: (value: Images) => void;
  handleChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const DocumentQualification = (props: Props) => {
  const { images, setImages, handleChangeCheckbox, checked } = props;
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const [disableCheckbox, setDisableCheckbox] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (
      images.fileKtpDirector.file != null &&
      images.fileSiup.file != null &&
      images.fileNpwp.file != null &&
      images.fileSppkp.file != null &&
      images.fileTdp.file != null
    ) {
      setDisableCheckbox(false);
    } else {
      setDisableCheckbox(true);
    }
  }, [images]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
        >
          {t(translations.bankManagement.banksDocumentQualification)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.bankManagement.completeBankDocumentQualification)}
        </Typography>
      </Grid>
      <Grid item xs={6} md={6} mt={1}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileKtpDirector')
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
                  name="fileKtpDirector"
                  path="fileKtpDirector"
                  label={`${t(
                    translations.bankManagement.uploadIDCardDirector,
                  )}`}
                  control={control}
                  acceptFile={'image/*'}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  isFlex
                  isBackgroundWhite
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
        {get(errors, 'fileKtpDirector') && (
          <FormHelperText
            sx={{
              color: 'red',
            }}
          >
            {get(errors, `${'fileKtpDirector'}.message`)}
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={6} md={6} mt={1}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileNpwp')
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
                  name="fileNpwp"
                  path="fileNpwp"
                  label={`${t(translations.bankManagement.uploadNPWP)}`}
                  control={control}
                  acceptFile={'image/*'}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  isFlex
                  isBackgroundWhite
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
        {get(errors, 'fileNpwp') && (
          <FormHelperText
            sx={{
              color: 'red',
            }}
          >
            {get(errors, `${'fileNpwp'}.message`)}
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={6} md={6} mt={1}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileTdp')
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
                  name="fileTdp"
                  path="fileTdp"
                  label={`${t(translations.bankManagement.uploadTDP)}`}
                  control={control}
                  acceptFile={'image/*'}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  isFlex
                  isBackgroundWhite
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
        {get(errors, 'fileTdp') && (
          <FormHelperText
            sx={{
              color: 'red',
            }}
          >
            {get(errors, `${'fileTdp'}.message`)}
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={6} md={6} mt={1}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileSiup')
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
                  name="fileSiup"
                  path="fileSiup"
                  label={`${t(translations.bankManagement.uploadSIUP)}`}
                  control={control}
                  acceptFile={'image/*'}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  isFlex
                  isBackgroundWhite
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
        {get(errors, 'fileSiup') && (
          <FormHelperText
            sx={{
              color: 'red',
            }}
          >
            {get(errors, `${'fileSiup'}.message`)}
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={12} md={12} mt={1}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileSppkp')
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
                  name="fileSppkp"
                  path="fileSppkp"
                  label={`${t(translations.bankManagement.uploadSPPKP)}`}
                  control={control}
                  acceptFile={'image/*'}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  isBackgroundWhite
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
        {get(errors, 'fileSppkp') && (
          <FormHelperText
            sx={{
              color: 'red',
            }}
          >
            {get(errors, `${'fileSppkp'}.message`)}
          </FormHelperText>
        )}
      </Grid>
      <Grid item xs={12} md={12} mt={1}>
        {/* <SwipeSignature /> */}
        <ControlledSignature
          name="signature"
          className="field"
          rules={{ required: 'Required' }}
          control={control}
          isExtend
        />
      </Grid>
      <Grid item xs={1} md={1}>
        <Checkbox
          disabled={disableCheckbox}
          style={{ padding: 0 }}
          checked={checked}
          onChange={handleChangeCheckbox}
        />
      </Grid>
      <Grid item xs={11} md={11}>
        <Typography
          sx={{ color: '#223250', fontWeight: '400', paddingTop: '4px' }}
        >
          {
            'I give permission to concise to check the data in dukcapil and SLIK'
          }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DocumentQualification;
