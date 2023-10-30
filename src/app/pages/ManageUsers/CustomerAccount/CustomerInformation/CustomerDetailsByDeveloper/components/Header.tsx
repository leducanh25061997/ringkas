import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  return (
    <div className="leading-[22px] text-[#005fc5] flex whitespace-pre-wrap">
      <p className="font-semibold">{t(translations.common.manageUsers)}</p>
      <p className="text-[#202A42]">{' > '}</p>
      <p className="font-semibold">
        {t(translations.developerWorkspace.customerPipeline)}{' '}
      </p>
      <p className="text-[#202A42]">{'> '}</p>
      <p className="text-[#202A42]">
        {t(translations.developerWorkspace.actionDetail)}{' '}
      </p>
    </div>
  );
}

export default React.memo(Header);
