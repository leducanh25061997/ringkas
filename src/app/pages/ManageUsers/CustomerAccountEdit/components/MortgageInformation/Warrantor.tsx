import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Autocomplete,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { CustomerKpr } from 'types/CustomerManagement';

import {
  businessOwnershipType,
  businessSector,
  duration,
  employmentType,
  idCard,
  Type,
} from '../../slice/data';

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

interface Props {
  customerKprInformation?: CustomerKpr;
}

export const Warrantor = memo((props: Props) => {
  const { customerKprInformation } = props;
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    insurerIdCardType: '',
    insurerEmploymentType: '',
    insurerBusinessSector: '',
    insurerDuration: '',
    insurerBusinessOwnershipType: '',
  });
  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (customerKprInformation) {
      setFormValues({
        ...formValues,
        insurerIdCardType:
          customerKprInformation?.dataSet?.insurer?.idCardType || '',
        insurerEmploymentType:
          customerKprInformation?.dataSet?.insurer?.insurerEmployment
            ?.employmentType || '',
        insurerBusinessSector:
          customerKprInformation?.dataSet?.insurer?.insurerEmployment
            ?.businessSector || '',
        insurerBusinessOwnershipType:
          customerKprInformation?.dataSet?.insurer?.insurerEmployment
            ?.businessOwnershipType || '',
        insurerDuration:
          customerKprInformation?.dataSet?.insurer?.insurerEmployment
            ?.duration || '',
      });
      setValue(
        'dataSet.insurer.fullName',
        customerKprInformation?.dataSet?.insurer?.fullName || '',
      );
    }
  }, [customerKprInformation]);

  const onChangeDob = (event: any) => {
    if (
      event &&
      event.toString() !== 'Invalid Date' &&
      !moment(event).isAfter(new Date())
    ) {
      setValue('dataSet.insurer.dob', event);
      clearErrors('dobWarrantor');
    } else {
      setValue('dataSet.insurer.dob', '');
      setError('dobWarrantor', {
        message: 'Invalid Date',
      });
    }
  };

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.warrantorOrSpouseInfo)}
      </Typography>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.insurer.fullName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.insurerFullName}
                  helperText={errors?.insurerFullName?.message}
                  label={`${t(
                    translations.customerAccountManagement
                      .fullNameAccordingIdCard,
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
            name="dataSet.insurer.dob"
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
                            !!errors.dobWarrantor ||
                            field.value.toString() === 'Invalid Date'
                          }
                          helperText={
                            errors?.dobWarrantor?.message ||
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
            error={!!errors.insurerIdCardType}
            sx={
              formValues?.insurerIdCardType
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
            name="dataSet.insurer.idCardType"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="insurerIdCardType"
                  variant="filled"
                  error={!!errors.insurerIdCardType}
                  label={`${t(
                    translations.customerAccountManagement.idCardType,
                  )}`}
                  value={formValues?.insurerIdCardType}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      insurerIdCardType: e.target.value,
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
          {errors?.insurerIdCardType && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.insurerIdCardType?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.insurer.idCardNumber"
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
                  helperText={errors?.insurerIdCardNumber?.message}
                  error={!!errors?.insurerIdCardNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(translations.customerAccountManagement.filledIfTheGuarantor)}
          </Label>
        </Row>
        <FormControl fullWidth>
          <InputLabel
            error={!!errors.insurerIdCardType}
            sx={
              formValues?.insurerIdCardType
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
              translations.customerAccountManagement.employmentTypeOrStatus,
            )}`}
          </InputLabel>
          <Controller
            name="dataSet.insurer.insurerEmployment.employmentType"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="insurerEmploymentType"
                  variant="filled"
                  error={!!errors.insurerEmploymentType}
                  label={`${t(
                    translations.customerAccountManagement
                      .employmentTypeOrStatus,
                  )}`}
                  value={formValues?.insurerEmploymentType}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      insurerEmploymentType: e.target.value,
                    });
                  }}
                >
                  {(employmentType || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.insurerEmploymentType && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.insurerEmploymentType?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.insurer.insurerEmployment.companyName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.insurerCompanyName}
                  helperText={errors?.insurerCompanyName?.message}
                  label={`${t(
                    translations.customerAccountManagement.companyName,
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
            error={!!errors.insurerBusinessSector}
            sx={
              formValues?.insurerBusinessSector
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
            {`${t(translations.customerAccountManagement.businessType)}`}
          </InputLabel>
          <Controller
            name="dataSet.insurer.insurerEmployment.businessSector"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="insurerBusinessSector"
                  variant="filled"
                  error={!!errors.insurerBusinessSector}
                  label={`${t(
                    translations.customerAccountManagement.businessType,
                  )}`}
                  value={formValues?.insurerBusinessSector}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      insurerBusinessSector: e.target.value,
                    });
                  }}
                >
                  {(businessSector || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.insurerBusinessSector && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.insurerBusinessSector?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.insurer.insurerEmployment.employeeId"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.insurerEmployeeId}
                  helperText={errors?.insurerEmployeeId?.message}
                  label={`${t(
                    translations.customerAccountManagement.employeeID,
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
            name="dataSet.insurer.insurerEmployment.officeAddress"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.insurerOfficeAddress}
                  helperText={errors?.insurerOfficeAddress?.message}
                  label={`${t(
                    translations.customerAccountManagement.officeAddress,
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
            name="dataSet.insurer.insurerEmployment.officePhoneNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(
                    translations.customerAccountManagement.officePhone,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.insurerOfficePhone?.message}
                  error={!!errors?.insurerOfficePhone}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.insurer.insurerEmployment.positionOrGrade"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.insurerPositionOrGrade}
                  helperText={errors?.insurerPositionOrGrade?.message}
                  label={`${t(
                    translations.customerAccountManagement.positionOrGrade,
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
            error={!!errors.insurerDuration}
            sx={
              formValues?.insurerDuration
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
              translations.customerAccountManagement.durationOfEmployment,
            )}`}
          </InputLabel>
          <Controller
            name="dataSet.insurer.insurerEmployment.duration"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="insurerDuration"
                  variant="filled"
                  error={!!errors.insurerDuration}
                  label={`${t(
                    translations.customerAccountManagement.durationOfEmployment,
                  )}`}
                  value={formValues?.insurerDuration}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      insurerDuration: e.target.value,
                    });
                  }}
                >
                  {(duration || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.insurerDuration && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.insurerDuration?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            error={!!errors.insurerBusinessOwnershipType}
            sx={
              formValues?.insurerBusinessOwnershipType
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
              translations.customerAccountManagement.businessOwnershipType,
            )}`}
          </InputLabel>
          <Controller
            name="dataSet.insurer.insurerEmployment.businessOwnershipType"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="insurerBusinessOwnershipType"
                  variant="filled"
                  error={!!errors.insurerBusinessOwnershipType}
                  label={`${t(
                    translations.customerAccountManagement
                      .businessOwnershipType,
                  )}`}
                  value={formValues?.insurerBusinessOwnershipType}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      insurerBusinessOwnershipType: e.target.value,
                    });
                  }}
                >
                  {(businessOwnershipType || []).map((item: Type, index) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
          />
          {errors?.insurerBusinessOwnershipType && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.insurerBusinessOwnershipType?.message}
            </FormHelperText>
          )}
        </FormControl>
      </RootStyle>
    </Container>
  );
});
