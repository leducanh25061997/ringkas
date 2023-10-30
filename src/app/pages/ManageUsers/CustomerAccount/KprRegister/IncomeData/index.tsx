import { translations } from 'locales/translations';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ControlledTextField,
  formatCurrency,
} from 'app/components/CustomTextField';
import { checkVerified } from 'utils/commonFunction';
import { useSelector } from 'react-redux';
import { selectKprReady } from '../slice/selectors';

const IncomeData = () => {
  const { control, getValues, watch } = useFormContext();
  const { t } = useTranslation();
  const { isGetKprSuccess, kpr, isGetKprLoading } = useSelector(selectKprReady);

  const requesterNetIncome = watch('requesterNetIncome') || '0';
  const guarantorNetIncome = watch('guarantorNetIncome') || '0';

  const totalIncome = React.useMemo(() => {
    if (!requesterNetIncome && !guarantorNetIncome) return 0;
    return (
      Number(requesterNetIncome.replaceAll('.', '')) +
      Number(guarantorNetIncome.replaceAll('.', ''))
    );
  }, [requesterNetIncome, guarantorNetIncome]);

  return (
    <div className="max-w-[582px] m-auto">
      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.createCustomer.requester)}
      </p>
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.netIncome)}
        name="requesterNetIncome"
        control={control}
        type="currency"
        startAdornment="Rp"
        disabled={
          getValues('requesterNetIncome') &&
          kpr &&
          checkVerified('requesterNetIncome', kpr, 'INCOME_DATA')
        }
      />
      <ControlledImageUpload
        label={t(translations.customerAccountManagement.salarySlipUpload)}
        name="requesterSalarySlipUpload"
        className="mt-4"
        control={control}
      />
      <ControlledImageUpload
        label={t(translations.customerAccountManagement.sptUpload)}
        name="requesterSPT"
        className="mt-4"
        control={control}
      />

      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.createCustomer.warrantor)}
      </p>
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.netIncome)}
        name="guarantorNetIncome"
        control={control}
        type="currency"
        startAdornment="Rp"
        disabled={
          getValues('guarantorNetIncome') &&
          kpr &&
          checkVerified('guarantorNetIncome', kpr, 'INCOME_DATA')
        }
      />
      <ControlledImageUpload
        label={t(translations.customerAccountManagement.salarySlipUpload)}
        name="guarantorSalarySlipUpload"
        className="mt-4"
        control={control}
      />
      <ControlledImageUpload
        label={t(translations.customerAccountManagement.sptUpload)}
        name="guarantorSPT"
        className="mt-4"
        control={control}
      />

      <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mt-10">
        {t(translations.customerAccountManagement.totalIncome).toUpperCase()}
      </p>
      <Controller
        control={control}
        name="totalIncome"
        render={({ field }) => {
          return (
            <input
              readOnly
              value={formatCurrency(totalIncome)}
              className="bg-[#DFE3E8] text-[#9098A7] text-[16px] w-full pr-6 mt-4 h-[64px] rounded-xl text-right"
              onChange={() => {}}
            />
          );
        }}
      />
    </div>
  );
};

export default IncomeData;
