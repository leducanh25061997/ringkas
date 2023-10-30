import { Dialog } from '@mui/material';
import Button from 'app/components/common/Button';
import deleteIcon from 'assets/icons/delete.svg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
function NoticeDialog({ open, onClose, onSubmit }: Props) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-6 text-[#202A42] flex flex-col items-center w-[480px] relative">
        <img
          src={deleteIcon}
          width={24}
          height={24}
          alt="delete-icon"
          className="cursor-pointer absolute top-6 right-6"
          onClick={onClose}
        />
        <h1 className="text-[18px] leading-6 font-bold">Notice</h1>
        <p className="font-medium leading-[23px] text-center mt-9">
          {t(translations.notFoundPage.consentNotice)}
        </p>
        <Button color="primary" className="mt-10" onClick={onSubmit}>
          {t(translations.common.confirm)}
        </Button>
      </div>
    </Dialog>
  );
}

export default NoticeDialog;
