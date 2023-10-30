import React from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  return (
    <div className="leading-[22px] text-[#005fc5] flex whitespace-pre-wrap">
      <p className="font-semibold">{t(translations.customerList.manageUser)}</p>
      <p className="text-[#202A42]">{' > '}</p>
      <p className="font-semibold">
        {t(translations.sidebar.customerPipeline)}
      </p>
      <p className="text-[#202A42]">{' > '}</p>
      <p className="text-[#202A42]">Admin Workspace - Scoring Verification</p>
    </div>
  );
}

export default React.memo(Header);
