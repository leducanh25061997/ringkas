import { useTranslation } from 'react-i18next';
import WhatsappIcon from 'assets/icons/whatsapp.svg';
import { translations } from 'locales/translations';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export default function ButtonContactUs(props: Props) {
  const { className } = props;
  const { t } = useTranslation();
  return (
    <a
      href={`https://wa.me/${process.env.REACT_APP_PHONE_WHATSAPP || ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={classNames(
          'fixed bottom-[130px] right-12 bg-white rounded-[10px] border border-[#005FC5] flex px-4 py-3 z-[5000000]',
          className,
        )}
      >
        <img src={WhatsappIcon} alt="" />
        <div className="ml-2 font-semibold text-[#005FC5]">
          {t(translations.common.contactUs)}
        </div>
      </div>
    </a>
  );
}
