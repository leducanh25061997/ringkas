import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/system/Box';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import React from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  formMethod: UseFormReturn<FieldValues, any>;
  show: boolean;
}

function Credit({ formMethod, show }: Props) {
  const {
    control,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { isValid },
  } = formMethod;

  const { t } = useTranslation();
  return (
    <form
      className={classNames(
        'flex w-full flex-col py-6 px-8 bg-white rounded-2xl mt-6 mb-4 text-[#202A42]',
        {
          hidden: !show,
        },
      )}
      // =======
      //       className={classNames('flex w-full flex-col', {
      //         hidden: !show,
      //       })}
      // >>>>>>> 18e64a06 (add bank preference)
    >
      <div
        className={classNames(
          'flex w-full flex-col py-6 px-8 bg-white rounded-2xl mt-6 text-[#202A42]',
        )}
      >
        <p className="font-bold text-[18px] leading-6 mb-[2px]">
          {t(translations.createCustomer.creditPreference)}
        </p>
        <p className="text-[14px] leading-8 mb-4 text-[#223250]">
          {t(translations.createCustomer.creditPreferenceDescription)}
        </p>
        <div className="grid grid-cols-2 gap-x-[116px] gap-y-6">
          <div>
            <ControlledDropdownInput
              control={control}
              name="employeeType"
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              label={t(translations.employManagement.selectEmployeeType)}
              placeholder={t(translations.employManagement.selectEmployeeType)}
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
            />
            <p className="text-black leading-6 mt-6">
              {t(translations.createCustomer.jointIncome)}
            </p>
            <Controller
              name="joinIncome"
              control={control}
              defaultValue={'false'}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <RadioGroup
                    row
                    className="mt-4"
                    value={field.value || true}
                    onChange={e => field.onChange(e.target.value)}
                  >
                    <FormControlLabel
                      value={'true'}
                      label={t(translations.createCustomer.yes)}
                      control={
                        <Radio
                          sx={{
                            padding: 0,
                            marginRight: '8px',
                            marginLeft: '12px',
                          }}
                        />
                      }
                      sx={{ marginRight: '40px' }}
                    />
                    <FormControlLabel
                      value={'false'}
                      control={
                        <Radio
                          sx={{
                            padding: 0,
                            marginRight: '8px',
                            marginLeft: '12px',
                          }}
                        />
                      }
                      label={t(translations.createCustomer.no)}
                    />
                  </RadioGroup>
                );
              }}
            />
            <p className="text-black mt-6 leading-6">
              {t(translations.developerWorkspace.typeOfLoan)}
            </p>
            <Controller
              name="typeOfLoan"
              control={control}
              defaultValue={'false'}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <RadioGroup
                    row
                    className="mt-4"
                    value={field.value || true}
                    onChange={e => field.onChange(e.target.value)}
                  >
                    <FormControlLabel
                      value={'true'}
                      label={t(translations.common.sharia)}
                      control={
                        <Radio
                          sx={{
                            padding: 0,
                            marginRight: '8px',
                            marginLeft: '12px',
                          }}
                        />
                      }
                      sx={{ marginRight: '40px' }}
                    />
                    <FormControlLabel
                      value={'false'}
                      control={
                        <Radio
                          sx={{
                            padding: 0,
                            marginRight: '8px',
                            marginLeft: '12px',
                          }}
                        />
                      }
                      label={t(translations.common.conventional)}
                    />
                  </RadioGroup>
                );
              }}
            />
            <ControlledDropdownInput
              control={control}
              name="tenor"
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              label={t(translations.createCustomer.tenorLabel)}
              placeholder={t(translations.createCustomer.tenorLabel)}
              options={[
                {
                  label: `1 ${t(translations.createCustomer.year)}`,
                  value: '1',
                },
                {
                  label: `5 ${t(translations.createCustomer.years)}`,
                  value: '5',
                },
                {
                  label: `10 ${t(translations.createCustomer.years)}`,
                  value: '10',
                },
                {
                  label: `15 ${t(translations.createCustomer.years)}`,
                  value: '15',
                },
                {
                  label: `20 ${t(translations.createCustomer.years)}`,
                  value: '20',
                },
                {
                  label: `25 ${t(translations.createCustomer.years)}`,
                  value: '25',
                },
                {
                  label: `30 ${t(translations.createCustomer.years)}`,
                  value: '30',
                },
              ]}
              className="mt-6"
            />
          </div>
          <div className="flex flex-col justify-between">
            <ControlledTextField
              name="installmentPreferenceMonthly"
              label={t(
                translations.customerAccountManagement
                  .monthlyInstallmentPreference,
              )}
              type="currency"
              className="w-full"
              startAdornment="Rp"
              control={control}
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              required
            />
            <ControlledTextField
              name="downPaymentPreference"
              label={t(
                translations.customerAccountManagement.downPaymentPreference,
              )}
              type="currency"
              className="w-full"
              startAdornment="Rp"
              control={control}
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              required
            />
            <ControlledTextField
              name="takeHomePayMonthly"
              label={t(translations.createCustomer.takeHomePayMonthlyLabel)}
              type="currency"
              className="w-full"
              startAdornment="Rp"
              control={control}
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              required
            />
            <ControlledTextField
              name="totalObligationMonthly"
              className="w-full"
              label={t(translations.createCustomer.totalObligationMonthlyLabel)}
              type="currency"
              startAdornment="Rp"
              control={control}
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              required
            />
          </div>
        </div>
      </div>
      {/* <div
        className={classNames(
          'flex w-full flex-col py-6 px-8 bg-white rounded-2xl mt-6 mb-10 text-[#202A42]',
        )}
      >
        <BankPreference formMethod={formMethod} show />
      </div> */}
    </form>
  );
}

export default Credit;
