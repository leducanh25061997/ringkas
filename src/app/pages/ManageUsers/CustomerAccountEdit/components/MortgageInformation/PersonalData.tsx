import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import { translations } from 'locales/translations';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { Controller, set, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { CustomerKpr } from 'types/CustomerManagement';

import {
  education,
  gender,
  homeOwnershipStatus,
  idCard,
  maritalStatus,
  Type,
} from '../../slice/data';
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

export const PersonalData = memo((props: Props) => {
  const { images, setImages, customerKprInformation } = props;
  const { t } = useTranslation();
  const {
    control,
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [formValues, setFormValues] = useState({
    gender: '',
    maritalStatus: '',
    education: '',
    idCardType: '',
    homeOwnershipStatus: '',
    dob: '',
  });

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

  useEffect(() => {
    if (customerKprInformation) {
      setFormValues({
        ...formValues,
        gender: customerKprInformation?.dataSet?.personal?.gender || '',
        maritalStatus:
          customerKprInformation?.dataSet?.personal?.maritalStatus || '',
        education: customerKprInformation?.dataSet?.personal?.education || '',
        idCardType: customerKprInformation?.dataSet?.personal?.idCardType || '',
        homeOwnershipStatus:
          customerKprInformation?.dataSet?.personal?.homeOwnershipStatus || '',
      });
      setValue(
        'dataSet.personal.fullName',
        customerKprInformation?.dataSet?.personal?.fullName || '',
      );
      setValue(
        'dataSet.personal.dob',
        customerKprInformation?.dataSet?.personal?.dob || '',
      );
      setValue(
        'dataSet.personal.gender',
        customerKprInformation?.dataSet?.personal?.gender || '',
      );
      setValue(
        'dataSet.personal.maritalStatus',
        customerKprInformation?.dataSet?.personal?.maritalStatus || '',
      );
      setValue(
        'dataSet.personal.education',
        customerKprInformation?.dataSet?.personal?.education || '',
      );
      setValue(
        'dataSet.personal.idCardType',
        customerKprInformation?.dataSet?.personal?.idCardType || '',
      );
      setValue(
        'dataSet.personal.idCardNumber',
        customerKprInformation?.dataSet?.personal?.idCardNumber || '',
      );
      setValue(
        'dataSet.personal.familyCardNumber',
        customerKprInformation?.dataSet?.personal?.familyCardNumber || '',
      );
      setValue(
        'dataSet.personal.address',
        customerKprInformation?.dataSet?.personal?.address || '',
      );
      setValue(
        'dataSet.personal.phoneNumber',
        customerKprInformation?.dataSet?.personal?.phoneNumber || '',
      );
      setValue(
        'dataSet.personal.homeOwnershipStatus',
        customerKprInformation?.dataSet?.personal?.homeOwnershipStatus || '',
      );
      setValue(
        'dataSet.personal.npwpNumber',
        customerKprInformation?.dataSet?.personal?.npwpNumber || '',
      );
      setValue(
        'dataSet.assetIncome.landOrHouseAssets.0.area',
        customerKprInformation?.dataSet?.assetIncome?.landOrHouseAssets[0]
          .area || '',
      );
      setValue(
        'dataSet.assetIncome.landOrHouseAssets.0.marketValue',
        customerKprInformation?.dataSet?.assetIncome?.landOrHouseAssets[0]
          .marketValue || '',
      );
      setValue(
        'dataSet.assetIncome.landOrHouseAssets.0.address',
        customerKprInformation?.dataSet?.assetIncome?.landOrHouseAssets[0]
          .address || '',
      );
      setValue(
        'dataSet.assetIncome.privateVehicleAssets.0.typeOrSeries',
        customerKprInformation?.dataSet?.assetIncome?.privateVehicleAssets[0]
          .typeOrSeries || '',
      );
      setValue(
        'dataSet.assetIncome.privateVehicleAssets.0.marketValue',
        customerKprInformation?.dataSet?.assetIncome?.privateVehicleAssets[0]
          .marketValue || '',
      );
      setValue(
        'dataSet.assetIncome.depositAssets.0.bankName',
        customerKprInformation?.dataSet?.assetIncome?.depositAssets[0]
          .bankName || '',
      );
      setValue(
        'dataSet.assetIncome.depositAssets.0.amount',
        customerKprInformation?.dataSet?.assetIncome?.depositAssets[0].amount ||
          '',
      );
      setValue(
        'dataSet.assetIncome.depositAssets.0.period',
        customerKprInformation?.dataSet?.assetIncome?.depositAssets[0].period ||
          '',
      );
      setValue(
        'dataSet.bank.savingAccountRelations.bankName',
        customerKprInformation?.dataSet?.bank?.savingAccountRelations
          ?.bankName || '',
      );
      setValue(
        'dataSet.bank.savingAccountRelations.bankAccountNumber',
        customerKprInformation?.dataSet?.bank?.savingAccountRelations
          ?.bankAccountNumber || '',
      );
      setValue(
        'dataSet.bank.creditOrLoanRelations.bankOrCompanyName',
        customerKprInformation?.dataSet?.bank?.creditOrLoanRelations
          ?.bankOrCompanyName || '',
      );
      setValue(
        'dataSet.bank.creditOrLoanRelations.type',
        customerKprInformation?.dataSet?.bank?.creditOrLoanRelations?.type ||
          '',
      );
      setValue(
        'dataSet.bank.creditOrLoanRelations.amount',
        customerKprInformation?.dataSet?.bank?.creditOrLoanRelations?.amount ||
          '',
      );
      setValue(
        'dataSet.bank.creditOrLoanRelations.dueDate',
        customerKprInformation?.dataSet?.bank?.creditOrLoanRelations?.dueDate ||
          '',
      );
      setValue(
        'dataSet.bank.creditOrLoanRelations.remaining',
        customerKprInformation?.dataSet?.bank?.creditOrLoanRelations
          ?.remaining || '',
      );
      setValue(
        'dataSet.bank.creditOrLoanRelations.installmentPerMonth',
        customerKprInformation?.dataSet?.bank?.creditOrLoanRelations
          ?.installmentPerMonth || '',
      );
      setValue(
        'dataSet.bank.registeredCreditCardRelations.0.onBehalf',
        customerKprInformation?.dataSet?.bank?.registeredCreditCardRelations[0]
          ?.onBehalf || '',
      );
      setValue(
        'dataSet.bank.registeredCreditCardRelations.0.cardNumber',
        customerKprInformation?.dataSet?.bank?.registeredCreditCardRelations[0]
          ?.cardNumber || '',
      );
      setValue(
        'dataSet.bank.registeredCreditCardRelations.0.issuingBankName',
        customerKprInformation?.dataSet?.bank?.registeredCreditCardRelations[0]
          ?.issuingBankName || '',
      );
      setValue(
        'dataSet.bank.registeredCreditCardRelations.0.issuedMonthAndYear',
        customerKprInformation?.dataSet?.bank?.registeredCreditCardRelations[0]
          ?.issuedMonthAndYear || '',
      );
      setValue(
        'dataSet.bank.registeredCreditCardRelations.0.averageUsageAmountPerMonth',
        customerKprInformation?.dataSet?.bank?.registeredCreditCardRelations[0]
          ?.averageUsageAmountPerMonth || '',
      );
      setValue(
        'dataSet.bank.registeredCreditCardRelations.0.limitAmount',
        customerKprInformation?.dataSet?.bank?.registeredCreditCardRelations[0]
          ?.limitAmount || '',
      );
      setValue(
        'dataSet.employee.employment.employmentType',
        customerKprInformation?.dataSet?.employee?.employment?.employmentType ||
          '',
      );
      setValue(
        'dataSet.employee.employment.companyName',
        customerKprInformation?.dataSet?.employee?.employment?.companyName ||
          '',
      );
      setValue(
        'dataSet.employee.employment.businessSector',
        customerKprInformation?.dataSet?.employee?.employment?.businessSector ||
          '',
      );
      setValue(
        'dataSet.employee.employment.officeAddress',
        customerKprInformation?.dataSet?.employee?.employment?.officeAddress ||
          '',
      );
      setValue(
        'dataSet.employee.employment.officePhoneNumber',
        customerKprInformation?.dataSet?.employee?.employment
          ?.officePhoneNumber || '',
      );
      setValue(
        'dataSet.employee.employment.employeeId',
        customerKprInformation?.dataSet?.employee?.employment?.employeeId || '',
      );
      setValue(
        'dataSet.employee.employment.duration',
        customerKprInformation?.dataSet?.employee?.employment?.duration || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.companyName',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .companyName || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.businessSector',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .businessSector || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.officeAddress',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .officeAddress || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.officePhoneNumber',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .officePhoneNumber || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.officeEmailAddress',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .officeEmailAddress || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.positionOrGrade',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .positionOrGrade || '',
      );
      setValue(
        'dataSet.employee.previousEmployment.takeHomePay',
        customerKprInformation?.dataSet?.employee?.previousEmployment
          .takeHomePay || '',
      );
      setValue(
        'dataSet.employee.businessOwnershipType',
        customerKprInformation?.dataSet?.employee?.businessOwnershipType || '',
      );
      setValue(
        'dataSet.assetIncome.requesterIncome.netPerMonth',
        customerKprInformation?.dataSet?.assetIncome?.requesterIncome
          ?.netPerMonth || '',
      );
      setValue(
        'dataSet.assetIncome.requesterIncome.otherPerMonth',
        customerKprInformation?.dataSet?.assetIncome?.requesterIncome
          ?.otherPerMonth || '',
      );
      setValue(
        'dataSet.assetIncome.requesterIncome.subTotal',
        customerKprInformation?.dataSet?.assetIncome?.requesterIncome
          ?.subTotal || '',
      );
      setValue(
        'dataSet.assetIncome.warrantorIncome.netPerMonth',
        customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
          ?.netPerMonth || '',
      );
      setValue(
        'dataSet.assetIncome.warrantorIncome.otherPerMonth',
        customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
          ?.otherPerMonth || '',
      );
      setValue(
        'dataSet.assetIncome.warrantorIncome.subTotal',
        customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
          ?.subTotal || '',
      );
      setValue(
        'dataSet.assetIncome.totalIncome',
        customerKprInformation?.dataSet?.assetIncome?.totalIncome || '',
      );
      setValue(
        'dataSet.others.biologicalMotherName',
        customerKprInformation?.dataSet?.others?.biologicalMotherName || '',
      );
      setValue(
        'dataSet.others.agentName',
        customerKprInformation?.dataSet?.others?.agentName || '',
      );
      setValue(
        'dataSet.others.agentUuid',
        customerKprInformation?.dataSet?.others?.agentUuid || '',
      );
      setValue(
        'dataSet.insurer.fullName',
        customerKprInformation?.dataSet?.insurer?.fullName || '',
      );
      setValue(
        'dataSet.insurer.dob',
        customerKprInformation?.dataSet?.insurer?.dob || '',
      );
      setValue(
        'dataSet.insurer.idCardType',
        customerKprInformation?.dataSet?.insurer?.idCardType || '',
      );
      setValue(
        'dataSet.insurer.idCardNumber',
        customerKprInformation?.dataSet?.insurer?.idCardNumber || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.employmentType',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.employmentType || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.companyName',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.companyName || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.businessSector',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.businessSector || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.employeeId',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.employeeId || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.officeAddress',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.officeAddress || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.officePhoneNumber',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.officePhoneNumber || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.positionOrGrade',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.positionOrGrade || '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.duration',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment?.duration ||
          '',
      );
      setValue(
        'dataSet.insurer.insurerEmployment.businessOwnershipType',
        customerKprInformation?.dataSet?.insurer?.insurerEmployment
          ?.businessOwnershipType || '',
      );
    }
  }, [customerKprInformation]);

  const onChangeDob = (event: any) => {
    if (
      event &&
      event.toString() !== 'Invalid Date' &&
      !moment(event).isAfter(new Date())
    ) {
      setValue('dataSet.personal.dob', event);
      clearErrors('dobPersonal');
    } else {
      setValue('dataSet.personal.dob', '');
      setError('dobPersonal', {
        message: 'Invalid Date',
      });
    }
  };

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.personalData)}
      </Typography>
      <RootStyle>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(translations.customerAccountManagement.fullNameAccordingIdCard)}
          </Label>
          <Value>
            {customerKprInformation?.dataSet?.personal?.fullName || '-'}
          </Value>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.personal.dob"
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
                            !!errors.dobPersonal ||
                            field.value.toString() === 'Invalid Date'
                          }
                          helperText={
                            errors?.dobPersonal?.message ||
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
          <InputLabel
            error={!!errors.gender}
            sx={
              formValues?.gender
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
            {`${t(translations.common.gender)}`}
          </InputLabel>
          <Controller
            name="dataSet.personal.gender"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="gender"
                  variant="filled"
                  error={!!errors.gender}
                  label={`${t(translations.common.gender)}`}
                  value={formValues?.gender}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      gender: e.target.value,
                    });
                  }}
                >
                  {(gender || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.gender && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.gender?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            error={!!errors.maritalStatus}
            sx={
              formValues?.maritalStatus
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
            {`${t(translations.customerAccountManagement.maritalStatus)}`}
          </InputLabel>
          <Controller
            name="dataSet.personal.maritalStatus"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="maritalStatus"
                  variant="filled"
                  error={!!errors.maritalStatus}
                  label={`${t(
                    translations.customerAccountManagement.maritalStatus,
                  )}`}
                  value={formValues?.maritalStatus}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      maritalStatus: e.target.value,
                    });
                  }}
                >
                  {(maritalStatus || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.maritalStatus && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.maritalStatus?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            error={!!errors.education}
            sx={
              formValues?.education
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
            {`${t(translations.customerAccountManagement.lastEducation)}`}
          </InputLabel>
          <Controller
            name="dataSet.personal.education"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="education"
                  variant="filled"
                  error={!!errors.education}
                  label={`${t(
                    translations.customerAccountManagement.lastEducation,
                  )}`}
                  value={formValues?.education}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      education: e.target.value,
                    });
                  }}
                >
                  {(education || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.education && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.education?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            error={!!errors.idCardType}
            sx={
              formValues?.idCardType
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
            {`${t(translations.customerAccountManagement.idCardType)}`}
          </InputLabel>
          <Controller
            name="dataSet.personal.idCardType"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="idCardType"
                  variant="filled"
                  error={!!errors.idCardType}
                  label={`${t(
                    translations.customerAccountManagement.idCardType,
                  )}`}
                  value={formValues?.idCardType}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      idCardType: e.target.value,
                    });
                  }}
                >
                  {(idCard || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.idCardType && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.idCardType?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.personal.idCardNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(
                    translations.customerAccountManagement.idCardNumber,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.idCardNumber?.message}
                  error={!!errors?.idCardNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.personal.familyCardNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(
                    translations.customerAccountManagement.familyCardNumber,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.familyCardNumber?.message}
                  error={!!errors?.familyCardNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <Grid item xs={12} md={12} mt={3}>
          <Row>
            <Label>
              {t(translations.customerAccountManagement.photoFamilyCard)}
            </Label>
            <Value>
              {images?.fileIdCard.url ? (
                <Controller
                  control={control}
                  name="fileIdCard"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        onDrop={onDrop}
                        onRemove={onRemove}
                        maxFile={1}
                        path="fileIdCard"
                        image={images?.fileIdCard.url}
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
                  name="fileIdCard"
                  path="fileIdCard"
                  label={t(translations.developerInformation.photoOfIdCard)}
                  isUploadDevelop
                />
              )}
            </Value>
          </Row>
        </Grid>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.personal.address"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.address}
                  helperText={errors?.address?.message}
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
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.personal.phoneNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(translations.developerInformation.phoneNumber)}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.phoneNumber?.message}
                  error={!!errors?.phoneNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            error={!!errors.homeOwnershipStatus}
            sx={
              formValues?.homeOwnershipStatus
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
            {`${t(
              translations.customerAccountManagement.houseOwnershipStatus,
            )}`}
          </InputLabel>
          <Controller
            name="dataSet.personal.homeOwnershipStatus"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="homeOwnershipStatus"
                  variant="filled"
                  error={!!errors.homeOwnershipStatus}
                  value={formValues?.homeOwnershipStatus}
                  label={`${t(
                    translations.customerAccountManagement.houseOwnershipStatus,
                  )}`}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      homeOwnershipStatus: e.target.value,
                    });
                  }}
                >
                  {(homeOwnershipStatus || []).map((item: Type, index) => (
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
            name="dataSet.personal.npwpNumber"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.npwpNumber}
                  helperText={errors?.npwpNumber?.message}
                  label={`${t(
                    translations.customerAccountManagement.nomorMPWP,
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
