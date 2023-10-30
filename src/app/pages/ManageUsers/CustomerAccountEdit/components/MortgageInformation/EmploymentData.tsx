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

export const EmploymentData = memo((props: Props) => {
  const { customerKprInformation } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [formValues, setFormValues] = useState({
    employmentType: '',
    businessOwnershipType: '',
    duration: '',
    businessSector: '',
  });

  useEffect(() => {
    if (customerKprInformation) {
      setFormValues({
        ...formValues,
        employmentType:
          customerKprInformation?.dataSet?.employee?.employment
            ?.employmentType || '',
        businessOwnershipType:
          customerKprInformation?.dataSet?.employee?.businessOwnershipType ||
          '',
        duration:
          customerKprInformation?.dataSet?.employee?.employment?.duration || '',
        businessSector:
          customerKprInformation?.dataSet?.employee?.employment
            ?.businessSector || '',
      });
    }
  }, [customerKprInformation]);

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.customerAccountManagement.personalData)}
      </Typography>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            error={!!errors.employmentType}
            sx={
              formValues?.employmentType
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
            {`${t(translations.customerAccountManagement.employmentType)}`}
          </InputLabel>
          <Controller
            name="dataSet.employee.employment.employmentType"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="employmentType"
                  variant="filled"
                  error={!!errors.employmentType}
                  label={`${t(
                    translations.customerAccountManagement.employmentType,
                  )}`}
                  value={formValues?.employmentType}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      employmentType: e.target.value,
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
          {errors?.employmentType && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.employmentType?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.employee.employment.companyName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.companyName}
                  helperText={errors?.companyName?.message}
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
            error={!!errors.businessSector}
            sx={
              formValues?.businessSector
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
            {`${t(translations.customerAccountManagement.businessSector)}`}
          </InputLabel>
          <Controller
            name="dataSet.employee.employment.businessSector"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="businessSector"
                  variant="filled"
                  error={!!errors.businessSector}
                  label={`${t(
                    translations.customerAccountManagement.businessSector,
                  )}`}
                  value={formValues?.businessSector}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      businessSector: e.target.value,
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
          {errors?.businessSector && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.businessSector?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.employee.employment.officeAddress"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.officeAddress}
                  helperText={errors?.officeAddress?.message}
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
            name="dataSet.employee.employment.officePhoneNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(
                    translations.customerAccountManagement.officePhoneNumber,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.officePhoneNumber?.message}
                  error={!!errors?.officePhoneNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.employee.employment.employeeId"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.employeeId}
                  helperText={errors?.employeeId?.message}
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
          <InputLabel
            error={!!errors.duration}
            sx={
              formValues?.duration
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
            name="dataSet.employee.employment.duration"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="duration"
                  variant="filled"
                  error={!!errors.duration}
                  label={`${t(
                    translations.customerAccountManagement.durationOfEmployment,
                  )}`}
                  value={formValues?.duration}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      duration: e.target.value,
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
          {errors?.duration && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.duration?.message}
            </FormHelperText>
          )}
        </FormControl>
        <Row style={{ margin: '1.5rem 0' }}>
          <Label>
            {t(
              translations.customerAccountManagement.previousCompanyInformation,
            )}
          </Label>
        </Row>
        <FormControl fullWidth>
          <Controller
            name="dataSet.employee.previousEmployment.companyName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.previousCompanyName}
                  helperText={errors?.previousCompanyName?.message}
                  label={`${t(
                    translations.customerAccountManagement.previousCompanyName,
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
            name="dataSet.employee.previousEmployment.businessSector"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.previousBusinessSector}
                  helperText={errors?.previousBusinessSector?.message}
                  label={`${t(
                    translations.customerAccountManagement
                      .previousBusinessSector,
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
            name="dataSet.employee.previousEmployment.officeAddress"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.previousOfficeAddress}
                  helperText={errors?.previousOfficeAddress?.message}
                  label={`${t(
                    translations.customerAccountManagement
                      .previousOfficeAddress,
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
            name="dataSet.employee.previousEmployment.officePhoneNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  type="text"
                  variant="filled"
                  label={`${t(
                    translations.customerAccountManagement
                      .previousOfficePhoneNumber,
                  )}`}
                  customInput={TextField}
                  onChange={field.onChange}
                  helperText={errors?.previousOfficePhoneNumber?.message}
                  error={!!errors?.previousOfficePhoneNumber}
                  allowLeadingZeros
                />
              );
            }}
            control={control}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            name="dataSet.employee.previousEmployment.officeEmailAddress"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.previousOfficeEmailAddress}
                  helperText={errors?.previousOfficeEmailAddress?.message}
                  label={`${t(
                    translations.customerAccountManagement.previousOfficeEmail,
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
            name="dataSet.employee.previousEmployment.positionOrGrade"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.previousPositionOrGrade}
                  helperText={errors?.previousPositionOrGrade?.message}
                  label={`${t(
                    translations.customerAccountManagement
                      .previousPositionOrGrade,
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
            name="dataSet.employee.previousEmployment.takeHomePay"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors?.previousTakeHomePay}
                  helperText={errors?.previousTakeHomePay?.message}
                  label={`${t(
                    translations.customerAccountManagement.previousTakeHomePay,
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
            error={!!errors.businessOwnershipType}
            sx={
              formValues?.businessOwnershipType
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
            name="dataSet.employee.businessOwnershipType"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  labelId="businessOwnershipType"
                  variant="filled"
                  error={!!errors.businessOwnershipType}
                  label={`${t(
                    translations.customerAccountManagement
                      .businessOwnershipType,
                  )}`}
                  value={formValues?.businessOwnershipType}
                  onChange={e => {
                    field.onChange(e);
                    setFormValues({
                      ...formValues,
                      businessOwnershipType: e.target.value,
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
          {errors?.businessOwnershipType && (
            <FormHelperText style={{ color: 'red' }}>
              {errors?.businessOwnershipType?.message}
            </FormHelperText>
          )}
        </FormControl>
      </RootStyle>
    </Container>
  );
});
