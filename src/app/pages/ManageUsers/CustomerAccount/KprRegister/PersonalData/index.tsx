import { ControlledTextField } from 'app/components/CustomTextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControlledAddressSelect } from 'app/components/AddressSelect';
import { ControlledTextarea } from 'app/components/TextArea';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import { checkVerified } from 'utils/commonFunction';
import { useSelector } from 'react-redux';
import { selectKprReady } from '../slice/selectors';
import { ControlledBirthPlaceDropdown } from 'app/components/DropdownInput/BirthPlace';
import moment from 'moment';

const PersonalData = () => {
  const { control, getValues, watch } = useFormContext();
  const { t } = useTranslation();
  const { kpr } = useSelector(selectKprReady);
  const isDomicile = watch('isDomicile');

  return (
    <div className="max-w-[582px] m-auto">
      <ControlledTextField
        className="field w-full"
        label={t(translations.createCustomer.fullNameLabel)}
        name="fullName"
        control={control}
        disabled={
          getValues('fullName') &&
          kpr &&
          checkVerified('fullName', kpr, 'PERSONAL_DATA')
        }
      />
      <Controller
        control={control}
        name="gender"
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
                padding: '0 32px',
              }}
            >
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}
              >
                {t(translations.registerNewClient.gender)}
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
                  control={
                    <Radio
                      disabled={
                        getValues('gender') === 'FEMALE' &&
                        kpr &&
                        checkVerified('gender', kpr, 'PERSONAL_DATA')
                      }
                    />
                  }
                  sx={{
                    '.MuiFormControlLabel-label': {
                      color: '#6B7A99',
                      fontSize: '16px',
                      fontWeight: '500',
                    },
                  }}
                  label="Male"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={
                    <Radio
                      disabled={
                        getValues('gender') === 'MALE' &&
                        kpr &&
                        checkVerified('gender', kpr, 'PERSONAL_DATA')
                      }
                    />
                  }
                  sx={{
                    '.MuiFormControlLabel-label': {
                      color: '#6B7A99',
                      fontSize: '16px',
                      fontWeight: '500',
                    },
                  }}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          );
        }}
      />

      <ControlledBirthPlaceDropdown
        name="birthPlace"
        label={t(translations.createCustomer.birthPlaceLabel)}
        placeholder={t(translations.createCustomer.birthPlaceLabel)}
        className="mt-4 w-full"
        control={control}
        disabled={
          getValues('birthPlace') &&
          kpr &&
          checkVerified('birthPlace', kpr, 'PERSONAL_DATA')
        }
      />

      <ControlledDatePicker
        control={control}
        name="dob"
        label="Date of birth"
        className="field mt-4"
        disabled={
          getValues('dob') && kpr && checkVerified('dob', kpr, 'PERSONAL_DATA')
        }
        disableFuture
        rules={{
          required: false,
          validate: value => {
            if (!value) return true;
            const isValidDate =
              value instanceof Date && !isNaN(value.getTime());
            if (!isValidDate || moment(value).isAfter(new Date()))
              return 'Invalid Date';
            return true;
          },
        }}
      />

      <ControlledDropdownInput
        control={control}
        name="maritalStatus"
        label={t(translations.customerAccountManagement.maritalStatus)}
        placeholder={t(translations.customerAccountManagement.maritalStatus)}
        options={[
          {
            label: `${t(translations.common.married)}`,
            value: 'MARRIED',
          },
          {
            label: `${t(translations.common.single)}`,
            value: 'SINGLE',
          },
          {
            label: `${t(translations.common.divorced)}`,
            value: 'DIVORCED',
          },
        ]}
        className="mt-4"
        disabled={
          getValues('maritalStatus') &&
          kpr &&
          checkVerified('maritalStatus', kpr, 'PERSONAL_DATA')
        }
      />

      <ControlledTextField
        className="field w-full mt-4"
        label={t(translations.createCustomer.nikLabel)}
        name="nik"
        type="int"
        control={control}
        disabled={
          getValues('nik') && kpr && checkVerified('nik', kpr, 'PERSONAL_DATA')
        }
      />
      <ControlledTextField
        className="field w-full mt-4"
        label={t(translations.createCustomer.npwp)}
        name="npwp"
        type="int"
        control={control}
        disabled={
          getValues('npwp') &&
          kpr &&
          checkVerified('npwp', kpr, 'PERSONAL_DATA')
        }
      />
      <ControlledTextField
        className="field w-full mt-4"
        label={t(translations.customerList.phoneNumber)}
        name="phone"
        type="tel"
        control={control}
        disabled={
          getValues('phone') &&
          kpr &&
          checkVerified('phone', kpr, 'PERSONAL_DATA')
        }
      />

      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.createCustomer.addressLabel).toUpperCase()}
      </p>
      <ControlledAddressSelect
        control={control}
        name="location"
        label={t(translations.createCustomer.locationLabel)}
        placeholder={t(translations.createCustomer.locationLabel)}
        className="mt-4 w-full"
        disabled={
          getValues('location') &&
          kpr &&
          checkVerified('province', kpr, 'PERSONAL_DATA') // only need to check verification of province
        }
      />
      <ControlledTextarea
        className="mt-4"
        label={t(translations.dataVerification.address)}
        name="addressDetail"
        control={control}
        disabled={
          getValues('addressDetail') &&
          kpr &&
          checkVerified('addressDetail', kpr, 'PERSONAL_DATA')
        }
      />

      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.createCustomer.addressAsDomicile).toUpperCase()}
      </p>
      <Controller
        control={control}
        name="isDomicile"
        defaultValue={false}
        render={({ field }) => {
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={field.value} onChange={field.onChange} />
                }
                label="Is the domicile address the same as ID address"
                sx={{
                  '.MuiFormControlLabel-label': {
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: '500',
                  },
                }}
              />
            </FormGroup>
          );
        }}
      />

      {isDomicile && (
        <>
          <ControlledAddressSelect
            control={control}
            name="addressDomicile"
            label={t(translations.createCustomer.locationLabel)}
            placeholder={t(translations.createCustomer.locationLabel)}
            className="mt-4 w-full"
            disabled={
              getValues('addressDomicile') &&
              kpr &&
              checkVerified('addressDomicile', kpr, 'PERSONAL_DATA')
            }
          />
          <ControlledTextarea
            className="mt-4"
            label={t(translations.dataVerification.address)}
            name="addressDetailDomicile"
            control={control}
            disabled={
              getValues('addressDetailDomicile') &&
              kpr &&
              checkVerified('addressDetailDomicile', kpr, 'PERSONAL_DATA')
            }
          />
          <ControlledImageUpload
            label="Upload Kartu Keluarga"
            name="kartuKeluarga"
            className="mt-8"
            control={control}
          />
          <ControlledImageUpload
            label="Upload Kartu BPJS Kesehatan"
            name="kartuBpjsKesehatan"
            className="mt-4"
            control={control}
          />
        </>
      )}
    </div>
  );
};

export default PersonalData;
