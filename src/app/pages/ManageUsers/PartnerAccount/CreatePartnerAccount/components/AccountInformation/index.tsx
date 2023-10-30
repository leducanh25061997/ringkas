import {
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  Box,
  FormHelperText,
} from '@mui/material';
import React from 'react';
import { Icon } from '@iconify/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import UploadFile from 'app/components/UploadFile';
import { get } from 'lodash';
import moment from 'moment';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';

import { Images } from '../../slice/types';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';

const RenderInput = styled(Box)({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      background: '#F6F8FC!important',
    },
    '& textarea': {
      height: '130px!important',
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#00ab55!important',
      },
    },
    '& .MuiInputLabel-root:after': {
      color: '#00ab55!important',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
});
interface Props {
  images: Images;
  setImages: (value: Images) => void;
}

const AccountInformation = (props: Props) => {
  const { images, setImages } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
        >
          {t(translations.partnerManagement.partnersAccountInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={2}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.partnerManagement.completePartnerAccountInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={t(translations.common.email)}
          name="email"
          required
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Incorrect format email',
            },
          }}
          onChange={e => {
            if (e && !EMAIL_REGEX.test(e)) {
              setError('email', {
                message: 'Incorrect format email',
              });
            } else {
              clearErrors('email');
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label="Phone number"
          name="kyc.phone"
          type="tel"
          required
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: PHONE_NUMBER,
              message: 'Invalid phone number',
            },
          }}
          onChange={e => {
            if (e && !PHONE_NUMBER.test(e)) {
              setError('phone', {
                message: 'Invalid phone number',
              });
            } else {
              clearErrors('phone');
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          type="id"
          label="NIK"
          name="kyc.nik"
          control={control}
          required
          rules={{
            required: 'Required',
          }}
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledTextField
          className="field"
          label={t(translations.common.fullNameAsId)}
          name="kyc.fullName"
          control={control}
          rules={{
            required: 'Required',
          }}
          required
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <ControlledDatePicker
          control={control}
          name="kyc.dob"
          label={`${t(translations.bankManagement.dateOfBirth)}`}
          className="field"
          disableFuture
          rules={{
            required: 'Required',
          }}
          onChange={event => {
            if (
              event &&
              event.toString() !== 'Invalid Date' &&
              !moment(event).isAfter(new Date())
            ) {
              clearErrors('kyc.dob');
              setValue('kyc.dob', event);
            } else {
              setValue('kyc.dob', event, { shouldValidate: true });
            }
          }}
        />
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name="fileKtp"
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'fileKtp')
                    ? '1px solid #FF4842'
                    : '1px solid #C6D7E0',
                  borderRadius: '8px',
                  background: '#F6F8FC!important',
                }}
              >
                <UploadFile
                  images={images}
                  setImages={setImages}
                  errors={errors}
                  name="fileKtp"
                  path="fileKtp"
                  label={`${t(translations.bankManagement.uploadIdCard)}`}
                  control={control}
                  acceptFile={'image/*'}
                  isBackgroundWhite
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              </Box>
            );
          }}
        />
      </Grid>
      {get(errors, 'fileKtp') && (
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileKtp'}.message`)}
        </FormHelperText>
      )}
    </Grid>
  );
};

export default AccountInformation;
