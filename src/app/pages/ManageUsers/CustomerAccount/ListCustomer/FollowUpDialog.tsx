import Dialog from 'app/components/Dialog';

import Img from 'app/components/Img';
import phoneIcon from 'assets/icons/phone.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onClose: () => void;
}

function FollowUpDialog({ open, onClose }: Props) {
  const { t } = useTranslation();
  return (
    <Dialog hideFooter open={open} onClose={onClose} title="Follow Up">
      <div className="p-6 pt-0 flex w-[480px]">
        <Img
          className="w-[112px] h-[112px] rounded-lg bg-green-300 mr-6 object-cover border"
          src={defaultAvatar}
          alt=""
        />
        <div>
          <p className="font-bold leading-6 text-[18px]">
            {t(translations.customerList.ringkasSupport)}
          </p>
          <p className="font-medium mt-2 leading-5">
            {process.env.REACT_APP_PHONE_WHATSAPP}
          </p>
          <div className="mt-4 flex items-center">
            {/* <div className="w-[48px] h-[48px] hover:bg-[#F0F4F9] transition-colors rounded-lg mr-2 flex items-center justify-center cursor-pointer">
              <img src={notiIcon} width={24} height={24} alt="" />
            </div>
            <div className="w-[48px] h-[48px] hover:bg-[#F0F4F9] transition-colors rounded-lg mr-2 flex items-center justify-center cursor-pointer">
              <img src={emailIcon} width={24} height={24} alt="" />
            </div> */}
            <a
              className="w-[48px] h-[48px] hover:bg-[#F0F4F9] transition-colors rounded-lg mr-2 flex items-center justify-center cursor-pointer"
              href={`https://wa.me/${
                process.env.REACT_APP_PHONE_WHATSAPP || ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={phoneIcon} width={24} height={24} alt="" />
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default FollowUpDialog;
