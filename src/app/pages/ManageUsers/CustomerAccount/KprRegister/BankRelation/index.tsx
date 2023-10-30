import { translations } from 'locales/translations';
import { ControlledTextField } from 'app/components/CustomTextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import { checkVerified } from 'utils/commonFunction';
import { useSelector } from 'react-redux';
import { selectKprReady } from '../slice/selectors';

const BankRelation = () => {
  const { control, getValues } = useFormContext();
  const { t } = useTranslation();
  const { isGetKprSuccess, kpr, isGetKprLoading } = useSelector(selectKprReady);

  return (
    <div className="max-w-[582px] m-auto">
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.amountOfCreditLimit)}
        name="amountOfCreditLimit"
        control={control}
        type="currency"
        startAdornment="Rp"
        disabled={
          getValues('amountOfCreditLimit') &&
          kpr &&
          checkVerified('amountOfCreditLimit', kpr, 'BANK_RELATION')
        }
      />
      <ControlledTextField
        className="w-full mt-4"
        label={t(translations.customerAccountManagement.installmentPerMonth)}
        name="installmentPerMonth"
        control={control}
        type="currency"
        startAdornment="Rp"
        disabled={
          getValues('installmentPerMonth') &&
          kpr &&
          checkVerified('installmentPerMonth', kpr, 'BANK_RELATION')
        }
      />
      <ControlledImageUpload
        label={t(translations.customerAccountManagement.bankStatement)}
        name="fileBankStatement"
        className="mt-4"
        control={control}
      />
    </div>
  );
};

export default BankRelation;
