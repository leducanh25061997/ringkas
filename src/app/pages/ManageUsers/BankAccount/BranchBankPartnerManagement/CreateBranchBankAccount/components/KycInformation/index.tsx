import React from 'react';
import {
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  FormHelperText,
  Checkbox,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import UploadFile from 'app/components/UploadFile';
import { get } from 'lodash';
import { SwipeSignature } from 'app/components/SwipeSignature';
import moment from 'moment';
import { ControlledTextField } from 'app/components/CustomTextField';

import { Images } from '../../slice/types';
import { ControlledSignature } from 'app/components/Signature/Signature1';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { PHONE_NUMBER } from 'utils/helpers/regex';
import fi from 'date-fns/locale/fi';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      background: '#F6F8FC!important',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(168, 70, 0, 1) !important',
    fontSize: '14px',
  },
});

const RootUploadVideo = styled('div')({
  borderRadius: '8px',
  background: '#F6F8FC !important',
  border: '1px solid #C6D7E0',
  height: '100%',
});

interface Props {
  images: Images;
  setImages: (value: Images) => void;
  handleChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const KycInformation = (props: Props) => {
  const { t } = useTranslation();
  const { images, setImages, handleChangeCheckbox, checked } = props;
  const {
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();
  const [disableCheckbox, setDisableCheckbox] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (getValues() && Object.keys(getValues()).length > 0) {
      if (
        getValues('kyc.fullName') &&
        getValues('kyc.dob') &&
        getValues('kyc.nik') &&
        getValues('kyc.phone') &&
        getValues('company.titleBranch') &&
        getValues('company.nip') &&
        get(images, 'fileNik').file != null &&
        getValues('kyc.fileSignature')
      ) {
        setDisableCheckbox(false);
      } else {
        setDisableCheckbox(true);
      }
    }
  }, [watch()]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
        >
          {t(translations.bankManagement.kycInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={2}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.bankManagement.completeKycInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            label={`${t(translations.bankManagement.fullNameAsIdCard)}`}
            name="kyc.fullName"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            label={`${t(translations.bankManagement.titleBranch)}`}
            name="company.titleBranch"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            label={`${t(translations.bankManagement.nip)}`}
            name="company.nip"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            label={`${t(translations.bankManagement.phoneNumber)}`}
            name="kyc.phone"
            type="tel"
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
                setValue('kyc.phone', e, { shouldValidate: true });
              } else {
                setValue('kyc.phone', e);
                clearErrors('kyc.phone');
              }
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            type="id"
            label="NIK"
            name="kyc.nik"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
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
              } else {
                setValue('kyc.dob', event, { shouldValidate: true });
              }
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <RootUploadVideo>
                <UploadFile
                  images={images}
                  setImages={setImages}
                  errors={errors}
                  name="fileNik"
                  path="fileNik"
                  label={`${t(translations.bankManagement.uploadIdCard)}`}
                  control={control}
                  acceptFile={'image/*'}
                  clearErrors={clearErrors}
                  setError={setError}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                />
              </RootUploadVideo>
            );
          }}
        />
      </Grid>
      {get(errors, 'fileNik') && (
        <FormHelperText
          sx={{
            color: '#ff0000',
            textAlign: 'center',
            padding: '0 15px',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'fileNik'}.message`)}
        </FormHelperText>
      )}
      <Grid item xs={12} md={12} mt={2}>
        <ControlledSignature
          name="kyc.fileSignature"
          className="field"
          rules={{ required: 'Required' }}
          control={control}
          isExtend
        />
      </Grid>
      <Grid item xs={1} md={1} mt={2}>
        <Checkbox
          disabled={disableCheckbox}
          style={{ padding: 0 }}
          checked={checked}
          onChange={handleChangeCheckbox}
        />
      </Grid>
      <Grid item xs={11} md={11} mt={2}>
        <Typography
          sx={{ color: '#223250', fontWeight: '400', paddingTop: '4px' }}
        >
          {
            'I give permission to concise to check the data in dukcapil and SLIK'
          }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default KycInformation;
