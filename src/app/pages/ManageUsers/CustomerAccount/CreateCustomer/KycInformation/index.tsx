import Tabs from 'app/components/Tabs';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Requester from './Requester';
import Warrantor from './Warrantor';

interface Props {
  formMethod: UseFormReturn<FieldValues, any>;
  show: boolean;
  joinIncome: 'true' | 'false';
}
function Kyc({ formMethod, show, joinIncome }: Props) {
  const { control } = formMethod;
  const { t } = useTranslation();
  const [tabActive, setTabActive] = useState(0);
  const tabList = [
    t(translations.createCustomer.requester),
    t(translations.createCustomer.warrantor),
  ];

  useEffect(() => {
    setTabActive(0);
    formMethod.reset({}, { keepValues: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, joinIncome]);

  return (
    <form
      className={classNames(
        'bg-white rounded-2xl w-full mb-4 mt-6 items-center',
        {
          hidden: !show,
        },
      )}
    >
      <div className="w-[582px] mx-auto py-8">
        <p className="font-bold text-[#202A42] text-[20px] leading-6">
          {t(translations.createCustomer.kycInformation)}
        </p>
        <p className="text-[14px] leading-8 mt-2">
          {t(translations.createCustomer.kycInformationDescription)}
        </p>
        {joinIncome === 'true' && (
          <Tabs
            className="mt-6"
            pageActive={tabList[tabActive]}
            tabList={tabList}
            onChange={e => {
              setTabActive(tabList.indexOf(e));
            }}
          />
        )}
        <Requester
          control={control}
          className={classNames({
            hidden: tabActive !== 0,
          })}
        />
        {joinIncome === 'true' && (
          <Warrantor
            control={control}
            className={classNames({
              hidden: tabActive !== 1,
            })}
          />
        )}
      </div>
    </form>
  );
}

export default React.memo(Kyc);
