import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControlledBirthPlaceDropdown } from 'app/components/DropdownInput/BirthPlace';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from 'utils/helpers/regex';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

interface Props {
  control: Control<FieldValues, any>;
  className?: string;
}
function Warrantor({ control, className }: Props) {
  const { t } = useTranslation();
  return (
    <div className={classNames('w-full', className)}>
      <ControlledTextField
        name="warrantorFullName"
        label={t(translations.createCustomer.fullNameLabel)}
        className="mt-4 w-full"
        rules={{ required: t(translations.formValidate.required) as string }}
        control={control}
        required
      />
      <Controller
        control={control}
        name="warrantorGender"
        defaultValue={'MALE'}
        render={({ field, fieldState }) => {
          return (
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '24px',
              }}
            >
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}
              >
                {t(translations.common.gender)}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={field.value || 'MALE'}
                onChange={field.onChange}
                row
              >
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      color: '#6B7A99',
                      fontSize: '16px',
                      fontWeight: '500',
                    },
                  }}
                  label={t(translations.common.male)}
                />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  sx={{
                    '.MuiFormControlLabel-label': {
                      color: '#6B7A99',
                      fontSize: '16px',
                      fontWeight: '500',
                    },
                  }}
                  label={t(translations.common.female)}
                />
              </RadioGroup>
            </FormControl>
          );
        }}
      />
      <ControlledDatePicker
        control={control}
        name="warrantorDob"
        label={t(translations.createCustomer.dobLabel)}
        className="mt-4 w-full"
        disableFuture
        rules={{
          required: t(translations.formValidate.required) as string,
        }}
      />
      <ControlledBirthPlaceDropdown
        name="warrantorBirthPlace"
        label={t(translations.createCustomer.birthPlaceLabel)}
        placeholder={t(translations.createCustomer.birthPlaceLabel)}
        rules={{ required: t(translations.formValidate.required) as string }}
        className="mt-4 w-full"
        control={control}
      />
      <ControlledTextField
        name="warrantorPhone"
        label={t(translations.createCustomer.phoneLabel)}
        type="tel"
        className="mt-4 w-full"
        rules={{ required: t(translations.formValidate.required) as string }}
        control={control}
        required
      />
      <ControlledTextField
        name="warrantorEmail"
        className="mt-6 w-full"
        label={t(translations.createCustomer.emailLabel)}
        control={control}
        rules={{
          required: t(translations.formValidate.required) as string,
          pattern: {
            value: EMAIL_REGEX,
            message: t(translations.formValidate.incorrectEmailFormat),
          },
        }}
        required
      />
      <ControlledTextField
        name="warrantorNik"
        label={t(translations.createCustomer.nikLabel)}
        type="id"
        className="mt-4 w-full"
        rules={{ required: t(translations.formValidate.required) as string }}
        control={control}
        required
      />
      <ControlledTextField
        name="warrantorNpwp"
        label={t(translations.createCustomer.npwpLabel)}
        type="id"
        rules={{ required: t(translations.formValidate.required) as string }}
        className="mt-4 w-full"
        control={control}
        required
      />
      <ControlledImageUpload
        label={t(translations.createCustomer.ktpPhotoLabel)}
        name="warrantorKtpPhoto"
        className="mt-4"
        control={control}
        rules={{
          required: t(translations.formValidate.required) as string,
        }}
      />
      <ControlledImageUpload
        label={t(translations.createCustomer.npwpPhotoLabel)}
        className="mt-4"
        name="warrantorNpwpPhoto"
        control={control}
        rules={{
          required: t(translations.formValidate.required) as string,
        }}
      />
      <ControlledImageUpload
        label={t(translations.dataVerification.filePhoto)}
        className="mt-4"
        name="warrantorSelfiePhoto"
        control={control}
        rules={{
          required: t(translations.formValidate.required) as string,
        }}
      />
    </div>
  );
}

export default Warrantor;
