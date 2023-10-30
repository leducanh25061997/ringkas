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
import { ControlledDatePicker } from 'app/components/DatePicker';
import { checkVerified } from 'utils/commonFunction';
import { useSelector } from 'react-redux';
import { selectKprReady } from '../slice/selectors';
import moment from 'moment';

const Guarantor = () => {
  const { control, getValues } = useFormContext();
  const { t } = useTranslation();
  const { kpr } = useSelector(selectKprReady);

  return (
    <div className="max-w-[582px] m-auto">
      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.customerAccountManagement.personalData).toUpperCase()}
      </p>
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.common.fullNameAsId)}
        name="guarantorFullName"
        control={control}
        disabled={
          getValues('guarantorFullName') &&
          kpr &&
          checkVerified('fullName', kpr, 'GUARANTOR')
        }
      />
      <ControlledDatePicker
        control={control}
        name="guarantorDob"
        label={t(translations.developerInformation.dateOfBirth)}
        className="field mt-4"
        disabled={
          getValues('guarantorDob') &&
          kpr &&
          checkVerified('dob', kpr, 'GUARANTOR')
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
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.cardNumber)}
        name="guarantorCardNumber"
        control={control}
        disabled={
          getValues('guarantorCardNumber') &&
          kpr &&
          checkVerified('nik', kpr, 'GUARANTOR')
        }
        type="int"
      />
      <ControlledImageUpload
        label="Bank statementfor the past three months"
        name="suratNikah"
        className="mt-4"
        control={control}
      />

      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.customerAccountManagement.employmentData).toUpperCase()}
      </p>
      <ControlledDropdownInput
        control={control}
        name="guarantorEmploymentType"
        disabled={
          getValues('guarantorEmploymentType') &&
          kpr &&
          checkVerified('guarantorEmploymentType', kpr, 'GUARANTOR')
        }
        label={t(translations.customerAccountManagement.employmentType)}
        placeholder={t(translations.customerAccountManagement.employmentType)}
        options={[
          {
            label: `${t(translations.employManagement.employee)}`,
            value: 'EMPLOYEE',
          },
          {
            label: `${t(translations.employManagement.entrepreneur)}`,
            value: 'ENTREPRENEUR',
          },
          {
            label: `${t(translations.employManagement.professional)}`,
            value: 'PROFERSSIONAL',
          },
        ]}
        className="mt-4"
      />

      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.companyName)}
        name="guarantorCompanyName"
        control={control}
        disabled={
          getValues('guarantorCompanyName') &&
          kpr &&
          checkVerified('guarantorCompanyName', kpr, 'GUARANTOR')
        }
      />

      <ControlledDropdownInput
        control={control}
        name="guarantorBusinessType"
        disabled={
          getValues('guarantorBusinessType') &&
          kpr &&
          checkVerified('guarantorBusinessType', kpr, 'GUARANTOR')
        }
        label={t(translations.customerAccountManagement.businessType)}
        placeholder={t(translations.customerAccountManagement.businessType)}
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
        name="guarantorOfficeAddress"
        disabled={
          getValues('guarantorOfficeAddress') &&
          kpr &&
          checkVerified('guarantorOfficeAddress', kpr, 'GUARANTOR')
        }
        control={control}
      />
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.officePhone)}
        name="guarantorOfficePhone"
        disabled={
          getValues('guarantorOfficePhone') &&
          kpr &&
          checkVerified('guarantorOfficePhone', kpr, 'GUARANTOR')
        }
        control={control}
        type="tel"
      />
      <ControlledDropdownInput
        control={control}
        name="guarantorDuration"
        disabled={
          getValues('guarantorDuration') &&
          kpr &&
          checkVerified('guarantorDuration', kpr, 'GUARANTOR')
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
        name="guarantorLetterOfEmployment"
        className="mt-4"
        control={control}
      />

      <Controller
        control={control}
        name="guarantorExperience"
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
                Do you have any prior experience?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={field.value || 'YES'}
                onChange={field.onChange}
                row
              >
                <FormControlLabel
                  value="YES"
                  control={
                    <Radio
                      disabled={
                        kpr &&
                        checkVerified('guarantorExperience', kpr, 'GUARANTOR')
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
                  label="Yes"
                />
                <FormControlLabel
                  value="NO"
                  control={
                    <Radio
                      disabled={
                        kpr &&
                        checkVerified('guarantorExperience', kpr, 'GUARANTOR')
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
                  label="No"
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
        name="guarantorEmploymentCompanyName"
        control={control}
        disabled={
          getValues('guarantorEmploymentCompanyName') &&
          kpr &&
          checkVerified('guarantorEmploymentCompanyName', kpr, 'GUARANTOR')
        }
      />
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.officePhone)}
        name="guarantorEmploymentCompanyOfficePhone"
        control={control}
        type="tel"
        disabled={
          getValues('guarantorEmploymentCompanyOfficePhone') &&
          kpr &&
          checkVerified(
            'guarantorEmploymentCompanyOfficePhone',
            kpr,
            'GUARANTOR',
          )
        }
      />
      <ControlledDropdownInput
        control={control}
        name="guarantorEmploymentCompanyDuration"
        disabled={
          getValues('guarantorEmploymentCompanyDuration') &&
          kpr &&
          checkVerified('guarantorEmploymentCompanyDuration', kpr, 'GUARANTOR')
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

export default Guarantor;
