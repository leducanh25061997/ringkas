import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Container,
  FormControl,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import { translations } from 'locales/translations';
import { set } from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { CustomerKyc } from 'types/CustomerManagement';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

import { ImageFiles, ImagesOfKyc } from '../slice/types';

interface Props {
  customerKycInformation?: CustomerKyc;
  images: ImagesOfKyc;
  setImages: (value: ImagesOfKyc) => void;
}

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  '& .MuiInputLabel-root': {
    color: '#005FC5',
  },
  '& .MuiFilledInput-root': {
    border: '1px solid  #005FC5',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:after': {
    right: 'unset',
    height: '100%',
    width: '100%',
  },
  '& .MuiFilledInput-root.Mui-error:after': {
    border: '1px solid  #FF4842',
    borderRadius: '8px',
  },
  '& .MuiFilledInput-root:before': {
    right: 'unset',
    content: '""',
  },
  marginRight: '5rem',
});

export const KYCInformation = memo((props: Props) => {
  const { t } = useTranslation();
  const { customerKycInformation, images, setImages } = props;
  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const onDrop = (file: ImageFiles, path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, file.url);
    set(newData, `${path}.file`, file.file);
    set(newData, `${path}.name`, path);
    set(newData, `${path}.nameFile`, file.nameFile);
    setImages(newData);
  };

  const onRemove = React.useCallback((path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, '');
    set(newData, `${path}.file`, null);
    set(newData, `${path}.name`, '');
    set(newData, `${path}.nameFile`, '');
    setImages(newData);
  }, []);

  useEffect(() => {
    if (customerKycInformation) {
      setValue('fullNameOfKyc', customerKycInformation?.fullName || '');
      setValue('dobOfKyc', customerKycInformation?.dob || '');
      setValue('phoneOfKyc', customerKycInformation?.phone || '');
      setValue('nikOfKyc', customerKycInformation?.nik || '');
    }
  }, [customerKycInformation]);

  const onChangeFullName = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue('fullNameOfKyc', event.target.value.trim());
  };

  const onChangeDob = (event: any) => {
    if (
      event &&
      event.toString() !== 'Invalid Date' &&
      !moment(event).isAfter(new Date())
    ) {
      setValue('dobOfKyc', event);
      clearErrors('dobOfKyc');
    } else {
      setValue('dobOfKyc', '');
      setError('dobOfKyc', {
        message: 'Invalid Date',
      });
    }
  };

  return (
    <Container sx={{ mt: 2, minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.knowYourCustomerInfo)}
      </Typography>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="fullNameOfKyc"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.fullName}
                  helperText={errors?.fullName?.message}
                  label={`${t(translations.common.fullName)}`}
                  type="text"
                  variant="filled"
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
            name="dobOfKyc"
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
                          variant="filled"
                          error={
                            !!errors.dobOfKyc ||
                            field.value.toString() === 'Invalid Date'
                          }
                          helperText={
                            errors?.dobOfKyc?.message ||
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
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="phoneOfKyc"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(translations.developerInformation.phoneNumber)}`}
                  customInput={TextField}
                  value={getValues('phoneOfKyc')}
                  onChange={field.onChange}
                  helperText={errors?.phoneOfKyc?.message}
                  error={!!errors?.phoneOfKyc}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="nikOfKyc"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(translations.developerInformation.idCardNumber)}`}
                  customInput={TextField}
                  value={getValues('nik')}
                  onChange={field.onChange}
                  helperText={errors?.nik?.message}
                  error={!!errors?.nik}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <Grid item xs={12} md={12} mt={3}>
          <Row>
            <Label>{t(translations.developerInformation.photoOfIdCard)}</Label>
            <Value>
              {images?.fileNik.url ? (
                <Controller
                  control={control}
                  name="fileNik"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        onDrop={onDrop}
                        onRemove={onRemove}
                        maxFile={1}
                        path="fileNik"
                        image={images?.fileNik.url}
                        edit={true}
                        remove={true}
                        field={field}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileNik"
                  path="fileNik"
                  label={t(translations.developerInformation.photoOfIdCard)}
                  isUploadDevelop
                />
              )}
            </Value>
          </Row>
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <Row>
            <Label>
              {t(translations.developerInformation.digitalSignature)}
            </Label>
            <Value>
              <ViewAndDownImage
                image={customerKycInformation?.fileSignature?.url}
              />
            </Value>
          </Row>
        </Grid>
      </RootStyle>
    </Container>
  );
});
