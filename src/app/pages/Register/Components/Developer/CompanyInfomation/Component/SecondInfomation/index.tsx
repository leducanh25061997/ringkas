import React, { memo, useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Card,
  Stack,
  TextField,
  styled,
  Autocomplete,
  Typography,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
  FieldError,
} from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ControlledTextField } from 'app/components/CustomTextField';
import { PHONE_NUMBER } from 'utils/helpers/regex';

const RenderInput = styled('div')({
  background: '#F6F8FC',
  borderRadius: '10px',
  border: '1px solid #C6D7E0',
  '& .MuiFormControl-root': {
    width: '100%',
    '& input': {
      // padding: '5px 13px',
    },
    '& input:focus': {
      boxShadow: 'none',
      color: 'black',
    },
    '& .MuiFilledInput-root:before': {
      right: 'unset',
      content: '""',
    },
    '& .MuiFilledInput-root:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
    },
    '& .MuiInputLabel-root:focus': {
      color: '#000000',
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
});
interface Props {
  formData: any;
  setFormData: (value: any) => void;
}

const SecondInfomation = memo((props: Props) => {
  const { formData, setFormData } = props;
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={2} justifyContent="center" mt={1}>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            type="tel"
            label="Company Phone Number"
            name="company.phone"
            required
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: PHONE_NUMBER,
                message: 'Invalid phone number',
              },
            }}
            onChange={event => {
              if (!PHONE_NUMBER.test(event || '')) {
                setError('company.phone', {
                  message: 'Invalid phone number',
                });
                setFormData({
                  ...formData,
                  companyPhoneNumber: '',
                });
              } else {
                setFormData({
                  ...formData,
                  companyPhoneNumber: event,
                });
                clearErrors('company.phone');
              }
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            type="id"
            label="Company SPPKP Number"
            name="company.sppkpNumber"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
            onChange={event => {
              setFormData({
                ...formData,
                sppkpNumber: event,
              });
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            type="id"
            label=" Company NPWP Number"
            name="company.npwpNumber"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
            onChange={event => {
              setFormData({
                ...formData,
                npwpNumber: event,
              });
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
});

export default SecondInfomation;
