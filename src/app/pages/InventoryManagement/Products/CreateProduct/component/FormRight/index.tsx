import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledPromotions } from './Promotions';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  typeAction?: string;
}

const FormRight = ({ typeAction }: Props) => {
  const { control, watch } = useFormContext();
  const { t } = useTranslation();

  return (
    <form className="w-1/2">
      <p className="text-[18px] leading-[22px] font-semibold mb-6">
        {t(translations.productManagement.pricing)}
      </p>
      <ControlledTextField
        className="mb-4"
        label={`${t(translations.developerWorkspace.housePrice)}`}
        name="housePrice"
        control={control}
        rules={{
          required: t(translations.required.fillThisField) as string,
        }}
        startAdornment="Rp"
        required
        type="currency"
        disabled={typeAction === 'VIEW'}
        maxLength={17}
      />

      <p className="text-[18px] leading-[22px] font-semibold mb-6 mt-10">
        {t(translations.productInformation.promotionIsOptional)}
      </p>

      <ControlledPromotions
        className="mb-4"
        name="promotions"
        control={control}
        disabled={typeAction === 'VIEW'}
      />

      <p className="text-[18px] leading-[22px] font-semibold mb-6 mt-10">
        {t(translations.productInformation.commissionIsOptional)}
      </p>
      <ControlledTextField
        className="mb-4"
        label={t(translations.productInformation.maxAgentCommission)}
        name="maxAgentCommissionRate"
        control={control}
        endAdornment="%"
        type="int"
        disabled={typeAction === 'VIEW'}
      />

      <p className="text-[18px] leading-[22px] font-semibold mb-6 mt-10">
        {t(translations.productInformation.interestAndBuyBack)}
      </p>
      <ControlledTextField
        className="mb-4"
        label={`${t(translations.productInformation.maxBankInterest)}`}
        name="maxBankInterestRate"
        control={control}
        endAdornment="%"
        type="int"
        disabled={typeAction === 'VIEW'}
      />
      <ControlledTextField
        label={`${t(translations.productInformation.buyBackGuarantee)}`}
        name="buybackGuaranteePolicy"
        control={control}
        endAdornment={
          Number(watch('buybackGuaranteePolicy')) > 1 ? 'years' : 'year'
        }
        type="int"
        disabled={typeAction === 'VIEW'}
      />
    </form>
  );
};

export default React.memo(FormRight);
