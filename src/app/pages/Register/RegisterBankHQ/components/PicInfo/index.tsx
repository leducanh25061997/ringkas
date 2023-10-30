/**
 *
 * PicInfo
 *
 */
import { Grid } from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { translations } from 'locales/translations';
import moment from 'moment';
import { memo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ControlledAddressSelect } from 'app/components/AddressSelect';
import { ControlledBirthPlaceDropdown } from 'app/components/DropdownInput/BirthPlace';
import { RadioGroup } from 'app/components/RadioGroup';
import classNames from 'classnames';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';

interface Props {
  form: any;
  show?: boolean;
}

export const PicInfo = memo(({ form, show = false }: Props) => {
  const { t } = useTranslation();
  const { control, setValue, clearErrors, setError } = form;

  const genders = [
    {
      value: 'MALE',
      label: t(translations.registerNewClient.male),
    },
    {
      value: 'FEMALE',
      label: t(translations.registerNewClient.female),
    },
  ];

  return (
    <form
      className={classNames({
        hidden: !show,
      })}
    >
      <Grid
        container
        sx={{
          background: '#FFFFFF',
          borderRadius: 2,
        }}
      >
        <Grid item xs={12} md={12} mt={2}>
          <ControlledTextField
            className="field"
            label={t(translations.common.email)}
            name="kyc.email"
            required
            control={control}
            rules={{
              required: t(translations.required.emailIsRequired) as string,
              pattern: {
                value: EMAIL_REGEX,
                message: t(translations.required.invalidEmail),
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <ControlledTextField
            className="field"
            label={t(translations.loginPage.password)}
            name="password"
            type="password"
            id="password"
            required
            control={control}
            rules={{
              required: t(translations.required.passwordIsRequired) as string,
              minLength: {
                value: 8,
                message: t(translations.loginPage.min8CharsRequired),
              },
              pattern: {
                value: PASSWORD_REGEX,
                message: t(translations.loginPage.resetPasswordRequired),
              },
            }}
            onChange={e => {
              if (e && !(e.length > 7)) {
                setError('password', {
                  message: t(translations.loginPage.min8CharsRequired),
                });
              } else {
                clearErrors('password');
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <ControlledTextField
            className="field"
            label={t(translations.common.fullNameAsId)}
            name="kyc.fullName"
            control={control}
            rules={{
              required: t(
                translations.required.fullNameAsIDIsRequired,
              ) as string,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} pl={2.5} pr={1}>
          <Controller
            control={control}
            name="kyc.gender"
            defaultValue={'MALE'}
            render={({ field, fieldState }) => (
              <RadioGroup
                {...field}
                title={t(translations.registerNewClient.gender)}
                options={genders}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <ControlledDatePicker
            control={control}
            name="kyc.dob"
            label={t(translations.bankManagement.dateOfBirth)}
            className="field"
            disableFuture
            rules={{
              required: t(translations.required.dobIsRequired) as string,
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
        <Grid item xs={12} md={12} mt={2}>
          <ControlledBirthPlaceDropdown
            name="kyc.birthPlace"
            label={t(translations.registerNewClient.placeOfBirth)}
            placeholder={t(translations.registerNewClient.placeOfBirth)}
            rules={{
              required: t(
                translations.required.placeOfBirthIsRequired,
              ) as string,
            }}
            className="mt-4 w-full"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <ControlledAddressSelect
            control={control}
            name="kyc.location"
            label={t(translations.createCustomer.locationLabel)}
            placeholder={t(translations.createCustomer.locationLabel)}
            rules={{
              required: t(translations.formValidate.required) as string,
            }}
            className="mt-4 w-full"
          />
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <ControlledTextField
            className="field"
            label="Phone number"
            name="kyc.phone"
            type="tel"
            required
            control={control}
            rules={{
              required: t(translations.required.phoneIsRequired) as string,
              pattern: {
                value: PHONE_NUMBER,
                message: t(translations.required.invalidPhoneNumber),
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <ControlledTextField
            className="field"
            type="id"
            label="NIK"
            name="kyc.nik"
            control={control}
            required
            rules={{
              required: t(translations.required.nikIsRequired) as string,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
});
