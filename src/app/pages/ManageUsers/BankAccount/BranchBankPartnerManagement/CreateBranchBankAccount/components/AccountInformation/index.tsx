import {
  Grid,
  Stack,
  Typography,
  styled,
  FormHelperText,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import UploadFile from 'app/components/UploadFile';
import { get } from 'lodash';
import { EMAIL_REGEX } from 'utils/helpers/regex';

import { Images } from '../../slice/types';
import { ControlledTextField } from 'app/components/CustomTextField';
import { useEffect } from 'react';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      background: '#F6F8FC!important',
    },
    '& textarea': {
      height: '130px!important',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#ff0000 !important',
    fontSize: '14px',
  },
});

const RootUploadVideo = styled('div')({
  borderRadius: '8px',
  background: '#FFFFFF !important',
  border: '1px solid #C6D7E0',
  height: '100%',
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid sx={{ minHeight: '600px' }}>
      <Typography
        sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
      >
        {t(translations.bankManagement.banksAccountInformation)}
      </Typography>
      <Typography
        sx={{ fontWeight: '400', mt: 2, fontSize: '14px', color: '#223250' }}
      >
        {t(translations.bankManagement.completeAccountInformation)}
      </Typography>
      <Grid item xs={12} md={12} mt={2}>
        <Stack>
          <Grid item xs={12} md={12} mt={2}>
            <ControlledTextField
              className="field"
              label={`${t(translations.bankManagement.EmailAddress)}`}
              name="email"
              control={control}
              rules={{
                required: 'Required',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Incorrect format email',
                },
              }}
              onChange={e => {
                if (!EMAIL_REGEX.test(e || '')) {
                  setError('email', {
                    message: 'Incorrect format email',
                  });
                } else {
                  clearErrors('email');
                }
              }}
              required
            />
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Controller
          control={control}
          name=""
          render={({ field }) => {
            return (
              <Box
                sx={{
                  border: get(errors, 'filePhoto')
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
                  name="filePhoto"
                  path="filePhoto"
                  label={`${t(translations.bankManagement.uploadPhoto)}`}
                  control={control}
                  acceptFile={'image/*'}
                  isBackgroundWhite
                  clearErrors={clearErrors}
                  setError={setError}
                  titleMaxSize={`${t(
                    translations.productManagement.maxSize,
                  )} 5MB`}
                />
              </Box>
            );
          }}
        />
      </Grid>
      {get(errors, 'filePhoto') && (
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: '14px',
          }}
        >
          {get(errors, `${'filePhoto'}.message`)}
        </FormHelperText>
      )}
    </Grid>
  );
};

export default AccountInformation;
