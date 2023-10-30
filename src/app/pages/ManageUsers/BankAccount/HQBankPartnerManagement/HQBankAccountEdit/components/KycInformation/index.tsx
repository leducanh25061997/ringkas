import { Grid, styled, TextField, FormControl, Container } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import moment from 'moment';
import { set } from 'lodash';
import { Key, Row } from 'app/components/DataDisplay';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { BankAccountInfo } from 'types/BankAccountManagement';
import { Label, Value } from 'app/components/KeyText';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';

import { ImagesOfHQBank } from '../../slice/types';

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  '& .MuiInputLabel-root': {
    color: '#005FC5',
    '&.Mui-focused': {
      color: '#005FC5!important',
    },
    '&.Mui-error': {
      '&.Mui-focused': {
        color: ' #FF4842!important',
      },
    },
  },
  '& .MuiFilledInput-root': {
    border: '1px solid  #005FC5',
    borderRadius: '8px',
    '&.Mui-error': {
      border: '1px solid  #FF4842!important',
      borderRadius: '8px',
      ':after': {
        'border-bottom-color': 'none',
      },
      '&.Mui-focused': {
        color: ' #FF4842!important',
      },
    },
  },
  '& .MuiFilledInput-root:after': {
    right: 'unset',
    height: '100%',
    width: '100%',
    borderBottom: 'none!important',
  },
  '& .MuiFilledInput-root:before': {
    right: 'unset',
    content: '""',
  },
  marginRight: '5rem',
});

interface Props {
  hqBankAccountInfo?: BankAccountInfo;
  images?: ImagesOfHQBank;
  setImages: (value: ImagesOfHQBank) => void;
}

const KYC = (props: Props) => {
  const { hqBankAccountInfo, images, setImages } = props;
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  const onDrop = (file: any, path?: string) => {
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
        message: 'Invalid Date',
      });
    }
  };

  return (
    <Container sx={{ mt: 2, minHeight: '600px' }}>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 0 }}>
          <Controller
            control={control}
            name="kyc.fullName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="filled"
                  label={t(translations.developerInformation.fullName)}
                  placeholder={t(translations.developerInformation.fullName)}
                  onChange={(e: any) => {
                    field.onChange(e);
                  }}
                  error={!!errors?.kyc?.fullName}
                  helperText={errors?.kyc?.fullName?.message}
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
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
                          variant="filled"
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
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="kyc.nik"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(translations.common.idNumber)}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.kyc?.nik?.message}
                  error={!!errors?.kyc?.nik}
                  value={getValues('kyc.nik')}
                  allowLeadingZeros={true}
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
                  variant="filled"
                  label={`${t(translations.developerInformation.phoneNumber)}`}
                  customInput={TextField}
                  onChange={e => {
                    field.onChange(e);
                    if (!PHONE_NUMBER.test(e.target.value || '')) {
                      setError('kyc.phone', {
                        message: 'Invalid phone number',
                      });
                    } else {
                      clearErrors('kyc.phone');
                    }
                  }}
                  helperText={errors?.kyc?.phone?.message}
                  error={!!errors?.kyc?.phone}
                  value={getValues('kyc.phone')}
                  allowLeadingZeros={true}
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
              {images?.fileNik?.url ? (
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
                        image={images?.fileNik?.url}
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
              {hqBankAccountInfo?.kyc?.fileSignature?.url ? (
                <ViewAndDownImage
                  image={hqBankAccountInfo?.kyc?.fileSignature?.url}
                />
              ) : (
                '-'
              )}
            </Value>
          </Row>
        </Grid>
      </RootStyle>
    </Container>
  );
};

export default KYC;
