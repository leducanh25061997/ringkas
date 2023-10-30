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
import React, { memo, useEffect, useState } from 'react';
import { Controller, set, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerKpr } from 'types/CustomerManagement';

import { ImageFiles, Images, ImagesKPR } from '../../slice/types';

interface Props {
  images: Images;
  setImages: (value: Images) => void;
  customerKprInformation?: CustomerKpr;
}

export const RootStyle = styled('div')({
  margin: '0px 1rem 3rem 1rem',
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

export const Income = memo((props: Props) => {
  const { images, setImages, customerKprInformation } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
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

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.income)}
      </Typography>
      <RootStyle>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(translations.customerAccountManagement.requesterIncomeData)}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.assetIncome.requesterIncome.netPerMonth"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.requesterNetPerMonth}
                  helperText={errors?.requesterNetPerMonth?.message}
                  label={`${t(
                    translations.customerAccountManagement.netIncomePerMonth,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.assetIncome.requesterIncome.otherPerMonth"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.requesterOtherPerMonth}
                  helperText={errors?.requesterOtherPerMonth?.message}
                  label={`${t(
                    translations.customerAccountManagement.otherIncomePerMonth,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.assetIncome.requesterIncome.subTotal"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.requesterSubTotal}
                  helperText={errors?.requesterSubTotal?.message}
                  label={`${t(
                    translations.customerAccountManagement.subTotal,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(translations.customerAccountManagement.requesterIncomeData)}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.assetIncome.warrantorIncome.netPerMonth"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.warrantorNetPerMonth}
                  helperText={errors?.warrantorNetPerMonth?.message}
                  label={`${t(
                    translations.customerAccountManagement.netIncomePerMonth,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.assetIncome.warrantorIncome.otherPerMonth"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.warrantOtherPerMonth}
                  helperText={errors?.warrantOtherPerMonth?.message}
                  label={`${t(
                    translations.customerAccountManagement.otherIncomePerMonth,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.assetIncome.warrantorIncome.subTotal"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.warrantSubTotal}
                  helperText={errors?.warrantSubTotal?.message}
                  label={`${t(
                    translations.customerAccountManagement.subTotal,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.assetIncome.totalIncome"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.totalIncome}
                  helperText={errors?.totalIncome?.message}
                  label={`${t(
                    translations.customerAccountManagement.totalIncome,
                  )}`}
                  type="text"
                  variant="filled"
                  fullWidth
                  onChange={field.onChange}
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <Grid item xs={12} md={12} mt={3}>
          <Row>
            <Label>
              {t(translations.customerAccountManagement.attachmentFiles)}
            </Label>
            <Value>
              {images?.fileAttachments.url ? (
                <Controller
                  control={control}
                  name="fileAttachments"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        onDrop={onDrop}
                        onRemove={onRemove}
                        maxFile={1}
                        path="fileAttachments"
                        image={images?.fileAttachments.url}
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
                  name="fileAttachments"
                  path="fileAttachments"
                  label={t(
                    translations.customerAccountManagement.attachmentFiles,
                  )}
                  isUploadDevelop
                />
              )}
            </Value>
          </Row>
        </Grid>
      </RootStyle>
    </Container>
  );
});
