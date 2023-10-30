import {
  Container,
  FormControl,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Label, Row } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerKpr } from 'types/CustomerManagement';

interface Props {
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

export const Asset = memo((props: Props) => {
  const { customerKprInformation } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.asset)}
      </Typography>
      <RootStyle>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(translations.customerAccountManagement.landOrHouseAssets)}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.assetIncome.landOrHouseAssets.0.area"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.assetArea}
                  helperText={errors?.assetArea?.message}
                  label={`${t(
                    translations.customerAccountManagement.buildingOrLandArea,
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
            name="dataSet.assetIncome.landOrHouseAssets.0.marketValue"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.landMarketValue}
                  helperText={errors?.landMarketValue?.message}
                  label={`${t(
                    translations.customerAccountManagement.marketValue,
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
            name="dataSet.assetIncome.landOrHouseAssets.0.address"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.landAddress}
                  helperText={errors?.landAddress?.message}
                  label={`${t(translations.common.address)}`}
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
            {t(translations.customerAccountManagement.privateVehicle)}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.assetIncome.privateVehicleAssets.0.typeOrSeries"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.typeOrSeries}
                  helperText={errors?.typeOrSeries?.message}
                  label={`${t(
                    translations.customerAccountManagement.typeOrSeries,
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
            name="dataSet.assetIncome.privateVehicleAssets.0.marketValue"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.vehicleMarketValue}
                  helperText={errors?.vehicleMarketValue?.message}
                  label={`${t(
                    translations.customerAccountManagement.marketValue,
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
          <Label>{t(translations.customerAccountManagement.deposit)}</Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.assetIncome.depositAssets.0.bankName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.depositBankName}
                  helperText={errors?.depositBankName?.message}
                  label={`${t(
                    translations.customerAccountManagement.bankName,
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
            name="dataSet.assetIncome.depositAssets.0.amount"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.amountOfDeposit}
                  helperText={errors?.amountOfDeposit?.message}
                  label={`${t(
                    translations.customerAccountManagement.amountOfDeposit,
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
            name="dataSet.assetIncome.depositAssets.0.period"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.periodOfDeposit}
                  helperText={errors?.periodOfDeposit?.message}
                  label={`${t(translations.customerAccountManagement.period)}`}
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
      </RootStyle>
    </Container>
  );
});
