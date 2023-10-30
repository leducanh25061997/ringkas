import { Container, FormControl, Grid, styled, TextField } from '@mui/material';
import { Key, KV, Row } from 'app/components/DataDisplay';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import React from 'react';
import { set } from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

interface Props {
  images?: any;
  setImages: (value: any) => void;
}

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

const DocumentQualification = (props: Props) => {
  const { images, setImages } = props;
  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
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

  const onRemove = (field?: any, path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, '');
    set(newData, `${path}.file`, null);
    set(newData, `${path}.name`, '');
    set(newData, `${path}.nameFile`, '');
    field.onChange(null);
    setImages(newData);
  };

  const onChangeNdaDate = (event: any) => {
    if (event && event.toString() !== 'Invalid Date') {
      setValue('documentQualification.ndaExpiredDate', event);
      clearErrors('documentQualification.ndaExpiredDate');
    } else {
      setValue('documentQualification.ndaExpiredDate', '');
      setError('documentQualification.ndaExpiredDate', {
        message: 'Invalid Date',
      });
    }
  };

  const onChangeMouDate = (event: any) => {
    if (event && event.toString() !== 'Invalid Date') {
      setValue('documentQualification.mouExpiredDate', event);
      clearErrors('documentQualification.mouExpiredDate');
    } else {
      setValue('documentQualification.mouExpiredDate', '');
      setError('documentQualification.mouExpiredDate', {
        message: 'Invalid Date',
      });
    }
  };

  return (
    <Container sx={{ mt: 2, minHeight: '600px' }}>
      <RootStyle>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'Photo of ID Card'}</Key>
              {images?.fileKtpDirector.url ? (
                <Controller
                  control={control}
                  name="fileKtpDirector"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileKtpDirector.url}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileKtpDirector"
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
                  name="fileKtpDirector"
                  path="fileKtpDirector"
                  label={'Photo of ID Card'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'NPWP'}</Key>
              {images?.fileNpwp.url ? (
                <Controller
                  control={control}
                  name="fileNpwp"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        onRemove={onRemove}
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileNpwp"
                        image={images?.fileNpwp.url}
                        edit={true}
                        field={field}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileNpwp"
                  path="fileNpwp"
                  label={'NPWP'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'TDP'}</Key>
              {images?.fileTdp.url ? (
                <Controller
                  control={control}
                  name="fileTdp"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        field={field}
                        onDrop={onDrop}
                        onRemove={onRemove}
                        maxFile={1}
                        path="fileTdp"
                        image={images?.fileTdp.url}
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileTdp"
                  path="fileTdp"
                  label={'TDP'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'SIUP'}</Key>
              {images?.fileSiup.url ? (
                <Controller
                  control={control}
                  name="fileSiup"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileSiup.url}
                        field={field}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileSiup"
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileSiup"
                  path="fileSiup"
                  label={'SIUP'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'SPPKP'}</Key>
              {images?.fileSppkp.url ? (
                <Controller
                  control={control}
                  name="fileSppkp"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileSppkp.url}
                        field={field}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileSppkp"
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileSppkp"
                  path="fileSppkp"
                  label={'SPPKP'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12} sx={{ mt: 2 }}>
          <KV>
            <Row>
              <Key>{t(translations.developerInformation.NDAWithRingkas)}</Key>
              {images?.fileNda.url ? (
                <Controller
                  control={control}
                  name="fileNda"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileNda.url}
                        field={field}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileNda"
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileNda"
                  path="fileNda"
                  label={t(translations.developerInformation.NDAWithRingkas)}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Controller
            name="documentQualification.ndaExpiredDate"
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...field}
                    label={`${t(
                      translations.developerInformation.NDAExpiredDate,
                    )}`}
                    inputFormat="dd/MM/yyyy"
                    onChange={onChangeNdaDate}
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
                            !!errors?.documentQualification?.ndaExpiredDate ||
                            field.value.toString() === 'Invalid Date'
                          }
                          helperText={
                            errors?.documentQualification?.ndaExpiredDate
                              ?.message ||
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
        <Grid item md={12} sx={{ mt: 2 }}>
          <KV>
            <Row>
              <Key>{t(translations.developerInformation.MOUWithRingkas)}</Key>
              {images?.fileMou.url ? (
                <Controller
                  control={control}
                  name="fileMou"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileMou.url}
                        field={field}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileMou"
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileMou"
                  path="fileMou"
                  label={t(translations.developerInformation.MOUWithRingkas)}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <FormControl fullWidth sx={{ mt: 2, marginBottom: '2rem' }}>
          <Controller
            name="documentQualification.mouExpiredDate"
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...field}
                    label={`${t(
                      translations.developerInformation.MOUExpiredDate,
                    )}`}
                    inputFormat="dd/MM/yyyy"
                    onChange={onChangeMouDate}
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
                            !!errors?.documentQualification?.mouExpiredDate ||
                            field.value.toString() === 'Invalid Date'
                          }
                          helperText={
                            errors?.documentQualification?.mouExpiredDate
                              ?.message ||
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
      </RootStyle>
    </Container>
  );
};

export default DocumentQualification;
