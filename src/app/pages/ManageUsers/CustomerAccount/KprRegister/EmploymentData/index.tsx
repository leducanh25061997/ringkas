import { translations } from 'locales/translations';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledTextarea } from 'app/components/TextArea';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectKprReady } from '../slice/selectors';
import { checkVerified } from 'utils/commonFunction';

const EmploymentData = () => {
  const { control, getValues } = useFormContext();
  const { t } = useTranslation();
  const { kpr } = useSelector(selectKprReady);

  return (
    <div className="max-w-[582px] m-auto">
      <ControlledDropdownInput
        control={control}
        name="employmentType"
        label={t(translations.customerAccountManagement.employmentType)}
        placeholder={t(translations.customerAccountManagement.employmentType)}
        options={[
          {
            label: `${t(translations.employManagement.employee)}`,
            value: `${t(translations.employManagement.employee)}`,
          },
          {
            label: `${t(translations.employManagement.entrepreneur)}`,
            value: `${t(translations.employManagement.entrepreneur)}`,
          },
          {
            label: `${t(translations.employManagement.professional)}`,
            value: `${t(translations.employManagement.professional)}`,
          },
        ]}
        className="mt-4"
        disabled={
          getValues('employmentType') &&
          kpr &&
          checkVerified('employmentType', kpr, 'EMPLOYMENT_DATA')
        }
      />

      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.companyName)}
        name="companyName"
        control={control}
        disabled={
          getValues('companyName') &&
          kpr &&
          checkVerified('companyName', kpr, 'EMPLOYMENT_DATA')
        }
      />
      <ControlledDropdownInput
        control={control}
        name="businessType"
        disabled={
          getValues('businessType') &&
          kpr &&
          checkVerified('businessType', kpr, 'EMPLOYMENT_DATA')
        }
        label={t(translations.customerAccountManagement.businessType)}
        placeholder={t(translations.customerAccountManagement.businessType)}
        isFreeInput
        options={[
          {
            label: `${t(translations.businessType.agricultureBusiness)}`,
            value: `${t(translations.businessType.agricultureBusiness)}`,
          },
          {
            label: `${t(
              translations.businessType.rawMaterialProductionBusiness,
            )}`,
            value: `${t(
              translations.businessType.rawMaterialProductionBusiness,
            )}`,
          },
          {
            label: `${t(translations.businessType.manufacturingBusiness)}`,
            value: `${t(translations.businessType.manufacturingBusiness)}`,
          },
          {
            label: `${t(translations.businessType.constructionsBusiness)}`,
            value: `${t(translations.businessType.constructionsBusiness)}`,
          },
          {
            label: `${t(translations.businessType.communicationBusiness)}`,
            value: `${t(translations.businessType.communicationBusiness)}`,
          },
          {
            label: `${t(
              translations.businessType
                .informationTechnologyOrDigitalProductsBusiness,
            )}`,
            value: `${t(
              translations.businessType
                .informationTechnologyOrDigitalProductsBusiness,
            )}`,
          },
          {
            label: `${t(translations.businessType.smallMediumEnterprise)}`,
            value: `${t(translations.businessType.smallMediumEnterprise)}`,
          },
          {
            label: `${t(translations.businessType.financialBusiness)}`,
            value: `${t(translations.businessType.financialBusiness)}`,
          },
          {
            label: `${t(translations.businessType.serviceTypeOfBusiness)}`,
            value: `${t(translations.businessType.serviceTypeOfBusiness)}`,
          },
          {
            label: `${t(translations.businessType.Others)}`,
            value: `${t(translations.businessType.Others)}`,
          },
        ]}
        className="mt-4"
      />
      <ControlledTextarea
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.officeAddress)}
        name="officeAddress"
        control={control}
        disabled={
          getValues('officeAddress') &&
          kpr &&
          checkVerified('officeAddress', kpr, 'EMPLOYMENT_DATA')
        }
      />
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.officePhone)}
        name="officePhone"
        disabled={
          getValues('officePhone') &&
          kpr &&
          checkVerified('officePhone', kpr, 'EMPLOYMENT_DATA')
        }
        control={control}
        type="tel"
      />
      <ControlledDropdownInput
        control={control}
        name="duration"
        disabled={
          getValues('duration') &&
          kpr &&
          checkVerified('duration', kpr, 'EMPLOYMENT_DATA')
        }
        label={t(translations.duration.duration)}
        placeholder={t(translations.duration.duration)}
        options={[
          {
            label: `${t(translations.duration.below6months)}`,
            value: `${t(translations.duration.below6months)}`,
          },
          {
            label: `${t(translations.duration.from6to12months)}`,
            value: `${t(translations.duration.from6to12months)}`,
          },
          {
            label: `${t(translations.duration.from1to2years)}`,
            value: `${t(translations.duration.from1to2years)}`,
          },
          {
            label: `${t(translations.duration.from2to5years)}`,
            value: `${t(translations.duration.from2to5years)}`,
          },
          {
            label: `${t(translations.duration.from5to10years)}`,
            value: `${t(translations.duration.from5to10years)}`,
          },
          {
            label: `${t(translations.duration.above10years)}`,
            value: `${t(translations.duration.above10years)}`,
          },
        ]}
        className="mt-4"
      />
      <ControlledImageUpload
        label={t(translations.customerAccountManagement.letterOfEmployment)}
        name="letterOfEmployment"
        // disabled={getValues('letterOfEmployment')}
        className="mt-4"
        control={control}
      />

      <Controller
        control={control}
        name="experience"
        defaultValue={'YES'}
        render={({ field }) => {
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
                {t(translations.createCustomer.isHasExp)}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={field.value || 'MALE'}
                onChange={field.onChange}
                row
              >
                <FormControlLabel
                  value="YES"
                  control={
                    <Radio
                      disabled={
                        getValues('experience') === 'NO' &&
                        kpr &&
                        checkVerified('experience', kpr, 'EMPLOYMENT_DATA')
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
                  label="YES"
                />
                <FormControlLabel
                  value="NO"
                  control={
                    <Radio
                      disabled={
                        getValues('experience') === 'YES' &&
                        kpr &&
                        checkVerified('experience', kpr, 'EMPLOYMENT_DATA')
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
                  label="NO"
                />
              </RadioGroup>
            </FormControl>
          );
        }}
      />
      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.createCustomer.priorEmployment).toUpperCase()}
      </p>
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.companyName)}
        name="employmentCompanyName"
        control={control}
        disabled={
          getValues('employmentCompanyName') &&
          kpr &&
          checkVerified('employmentCompanyName', kpr, 'EMPLOYMENT_DATA')
        }
      />
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.officePhone)}
        name="companyOfficePhone"
        control={control}
        type="tel"
        disabled={
          getValues('companyOfficePhone') &&
          kpr &&
          checkVerified('companyOfficePhone', kpr, 'EMPLOYMENT_DATA')
        }
      />
      <ControlledDropdownInput
        control={control}
        name="companyDuration"
        disabled={
          getValues('companyDuration') &&
          kpr &&
          checkVerified('companyDuration', kpr, 'EMPLOYMENT_DATA')
        }
        label={t(translations.duration.duration)}
        placeholder={t(translations.duration.duration)}
        options={[
          {
            label: `${t(translations.duration.below6months)}`,
            value: `${t(translations.duration.below6months)}`,
          },
          {
            label: `${t(translations.duration.from6to12months)}`,
            value: `${t(translations.duration.from6to12months)}`,
          },
          {
            label: `${t(translations.duration.from1to2years)}`,
            value: `${t(translations.duration.from1to2years)}`,
          },
          {
            label: `${t(translations.duration.from2to5years)}`,
            value: `${t(translations.duration.from2to5years)}`,
          },
          {
            label: `${t(translations.duration.from5to10years)}`,
            value: `${t(translations.duration.from5to10years)}`,
          },
          {
            label: `${t(translations.duration.above10years)}`,
            value: `${t(translations.duration.above10years)}`,
          },
        ]}
        className="mt-4"
      />
    </div>
  );
};

export default EmploymentData;
