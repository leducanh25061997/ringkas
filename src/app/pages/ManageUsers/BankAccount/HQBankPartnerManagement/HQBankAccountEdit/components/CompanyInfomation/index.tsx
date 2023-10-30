import React from 'react';
import {
  Grid,
  styled,
  Stack,
  TextField,
  Container,
  FormControl,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';

const RootStyle = styled('div')({
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

interface Props {}

const CompanyInformation = React.memo((props: Props) => {
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <Container sx={{ mt: 2, minHeight: '600px' }}>
      <RootStyle>
        <FormControl fullWidth sx={{ mt: 0 }}>
          <Controller
            control={control}
            name="company.name"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="filled"
                  label={'Company Name'}
                  placeholder="Company Name"
                  error={!!errors?.company?.name}
                  helperText={errors?.company?.name?.message}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            control={control}
            name="company.address"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="filled"
                  label="Company Address"
                  placeholder="Company Address"
                  error={!!errors?.company?.address}
                  helperText={errors?.company?.address?.message}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            control={control}
            name="company.email"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  variant="filled"
                  label="Company Email"
                  placeholder="Company Email"
                  error={!!errors?.company?.email}
                  helperText={errors?.company?.email?.message}
                  onChange={(e: any) => {
                    field.onChange(e);
                    if (!EMAIL_REGEX.test(e.target.value || '')) {
                      setError('company.email', {
                        message: 'Incorrect format email',
                      });
                    } else {
                      clearErrors('company.email');
                    }
                  }}
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            control={control}
            name="company.phone"
            render={({ field }) => {
              return (
                <NumberFormat
                  {...field}
                  variant="filled"
                  type="text"
                  customInput={TextField}
                  label="Company Phone Number"
                  error={!!errors?.company?.phone}
                  helperText={errors?.company?.phone?.message}
                  placeholder="Company Phone Number"
                  allowLeadingZeros
                  onChange={e => {
                    field.onChange(e);
                    if (!PHONE_NUMBER.test(e.target.value || '')) {
                      setError('company.phone', {
                        message: 'Invalid phone number',
                      });
                    } else {
                      clearErrors('company.phone');
                    }
                  }}
                  // format="################"
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            control={control}
            name="company.npwpNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  {...field}
                  variant="filled"
                  type="text"
                  customInput={TextField}
                  error={!!errors?.company?.npwpNumber}
                  helperText={errors?.company?.npwpNumber?.message}
                  label=" Company NPWP Number"
                  placeholder=" Company NPWP Number"
                  onChange={field.onChange}
                  allowLeadingZeros
                  // format="################"
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Controller
            control={control}
            name="company.sppkpNumber"
            render={({ field }) => {
              return (
                <NumberFormat
                  {...field}
                  variant="filled"
                  type="text"
                  customInput={TextField}
                  error={!!errors?.company?.sppkpNumber}
                  helperText={errors?.company?.sppkpNumber?.message}
                  label="Company SPPKP Number"
                  placeholder="Company SPPKP Number"
                  onChange={field.onChange}
                  allowLeadingZeros
                  // format="################"
                />
              );
            }}
          />
        </FormControl>
      </RootStyle>
    </Container>
  );
});

export default CompanyInformation;
