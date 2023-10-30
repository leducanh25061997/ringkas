import React from 'react';
import { Grid, Stack } from '@mui/material';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { EMAIL_REGEX, PHONE_NUMBER, PASSWORD_REGEX } from 'utils/helpers/regex';
import { ControlledTextField } from 'app/components/CustomTextField';
import { Message } from 'react-hook-form/dist/types/errors';

interface Props {
  formData: any;
  setFormData: (value: any) => void;
  control: any;
  errors: any;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const FirstPicData = (props: Props) => {
  const {
    formData,
    setFormData,
    control,
    errors,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = props;
  return (
    <Grid container spacing={2} justifyContent="center" mt={1}>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            label="Full name"
            name="kyc.fullName"
            control={control}
            rules={{
              required: 'Required',
            }}
            value={formData.fullName}
            onChange={e => {
              setFormData({
                ...formData,
                fullName: e,
              });
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            label="Phone number"
            name="kyc.phone"
            type="tel"
            value={getValues('kyc.phone') || formData.phone}
            onChange={e => {
              if (!PHONE_NUMBER.test(e || '')) {
                setError('kyc.phone', {
                  message: 'Invalid phone number',
                });
                setFormData({
                  ...formData,
                  phone: '',
                });
              } else {
                setFormData({
                  ...formData,
                  phone: e,
                });
                clearErrors('kyc.phone');
              }
            }}
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: PHONE_NUMBER,
                message: 'Invalid phone number',
              },
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            label="Email"
            name="email"
            value={getValues('kyc.email') || formData.email}
            onChange={e => {
              if (!EMAIL_REGEX.test(e || '')) {
                setError('email', {
                  message: 'Incorrect format email',
                });
                setFormData({
                  ...formData,
                  email: '',
                });
              } else {
                setFormData({
                  ...formData,
                  email: e,
                });
                clearErrors('email');
              }
            }}
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Incorrect format email',
              },
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            label="Password"
            name="kyc.password"
            type="password"
            value={getValues('kyc.password') || formData.password}
            onChange={e => {
              if (e && !(e?.length > 7)) {
                setError('kyc.password', {
                  message: 'Min 8 chars',
                });
                setFormData({
                  ...formData,
                  password: '',
                });
              } else if (e && e?.length > 7 && !PASSWORD_REGEX.test(e)) {
                setError('kyc.password', {
                  message:
                    'Consist combination of alphanumeric, symbol, lowercase and uppercase',
                });
                setFormData({
                  ...formData,
                  password: '',
                });
              } else {
                setFormData({
                  ...formData,
                  password: e,
                });
                clearErrors('kyc.password');
              }
            }}
            id="password"
            control={control}
            required
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FirstPicData;
