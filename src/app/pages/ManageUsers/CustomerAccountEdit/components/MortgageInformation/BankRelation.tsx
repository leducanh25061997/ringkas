import {
  Autocomplete,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Label, Row } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, set, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { CustomerKpr } from 'types/CustomerManagement';

import { ProductType, Type } from '../../slice/data';

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

export const BankRelation = memo((props: Props) => {
  const { customerKprInformation } = props;
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    relationshipType: '',
  });
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (customerKprInformation) {
      setFormValues({
        ...formValues,
        relationshipType:
          customerKprInformation?.dataSet?.bank?.creditOrLoanRelations?.type ||
          '',
      });
    }
  }, [customerKprInformation]);
  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.bankRelation)}
      </Typography>
      <RootStyle>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(
              translations.customerAccountManagement.relationshipWithMainBankA,
            )}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.bank.savingAccountRelations.bankName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.mainBankName}
                  helperText={errors?.mainBankName?.message}
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
            name="dataSet.bank.savingAccountRelations.bankAccountNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  label={`${t(
                    translations.customerAccountManagement.bankAccountNumber,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  variant="filled"
                  helperText={errors?.mainBankAccountNumber?.message}
                  error={!!errors?.mainBankAccountNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        {/* <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(
              translations.customerAccountManagement.relationshipWithOtherBank,
            )}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="subBankName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.subBankName}
                  helperText={errors?.subBankName?.message}
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
            name="subBankAccountNumber"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.subBankAccountNumber}
                  helperText={errors?.subBankAccountNumber?.message}
                  label={`${t(
                    translations.customerAccountManagement.bankAccountNumber,
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
        </FormControl> */}
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(
              translations.customerAccountManagement.relationshipWithOtherBank,
            )}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.bank.creditOrLoanRelations.bankOrCompanyName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.otherBankName}
                  helperText={errors?.otherBankName?.message}
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
          <InputLabel
            error={!!errors.relationshipType}
            sx={
              formValues?.relationshipType
                ? {
                    marginTop: '1rem',
                    color: '#005FC5',
                  }
                : {
                    color: '#005FC5',
                    '&.MuiInputLabel-root': {
                      '&.Mui-focused': {
                        color: '#005FC5',
                        marginTop: '1rem',
                      },
                    },
                  }
            }
          >
            {`${t(translations.customerAccountManagement.productType)}`}
          </InputLabel>
          <Controller
            name="dataSet.bank.creditOrLoanRelations.type"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="relationshipType"
                  variant="filled"
                  error={!!errors.relationshipType}
                  value={formValues?.relationshipType}
                  label={`${t(
                    translations.customerAccountManagement.productType,
                  )}`}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      relationshipType: e.target.value,
                    });
                  }}
                >
                  {(ProductType || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.homeOwnershipStatus && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.homeOwnershipStatus?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.bank.creditOrLoanRelations.amount"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.relationshipAmount}
                  helperText={errors?.relationshipAmount?.message}
                  label={`${t(
                    translations.customerAccountManagement.amountOfCredit,
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
            name="dataSet.bank.creditOrLoanRelations.dueDate"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.relationshipDueDate}
                  helperText={errors?.relationshipDueDate?.message}
                  label={`${t(translations.customerAccountManagement.dueDate)}`}
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
            name="dataSet.bank.creditOrLoanRelations.remaining"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.relationshipRemaining}
                  helperText={errors?.relationshipRemaining?.message}
                  label={`${t(
                    translations.customerAccountManagement
                      .remainingCreditOrLoan,
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
            name="dataSet.bank.creditOrLoanRelations.installmentPerMonth"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.relationshipInstallmentPerMonth}
                  helperText={errors?.relationshipInstallmentPerMonth?.message}
                  label={`${t(
                    translations.customerAccountManagement.installmentPerMonth,
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
            {t(translations.customerAccountManagement.registeredCreditCard)}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.bank.registeredCreditCardRelations.0.onBehalf"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.onBehalf}
                  helperText={errors?.onBehalf?.message}
                  label={`${t(
                    translations.customerAccountManagement.onBehalfOfTheCard,
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
            name="dataSet.bank.registeredCreditCardRelations.0.cardNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  label={`${t(
                    translations.customerAccountManagement.cardNumber,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  variant="filled"
                  helperText={errors?.phone?.message}
                  error={!!errors?.phone}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.bank.registeredCreditCardRelations.0.issuingBankName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.issuingBankName}
                  helperText={errors?.issuingBankName?.message}
                  label={`${t(
                    translations.customerAccountManagement.issuingBankName,
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
            name="dataSet.bank.registeredCreditCardRelations.0.issuedMonthAndYear"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.issuedMonthAndYear}
                  helperText={errors?.issuedMonthAndYear?.message}
                  label={`${t(
                    translations.customerAccountManagement.issuedMonthAndYear,
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
            name="dataSet.bank.registeredCreditCardRelations.0.averageUsageAmountPerMonth"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.averageUsageAmountPerMonth}
                  helperText={errors?.averageUsageAmountPerMonth?.message}
                  label={`${t(
                    translations.customerAccountManagement
                      .averageAmountOfUsagePerMonth,
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
            name="dataSet.bank.registeredCreditCardRelations.0.limitAmount"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.creditLimitAmount}
                  helperText={errors?.creditLimitAmount?.message}
                  label={`${t(
                    translations.customerAccountManagement.amountOfCreditLimit,
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
      </RootStyle>
    </Container>
  );
});
