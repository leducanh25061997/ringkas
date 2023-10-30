import i18next from 'i18next';
import { toast } from 'react-toastify';

interface Notification {
  message?: string;
  messageId?: string;
}

const Notifier = {
  addNotifySuccess: (config: Notification) =>
    toast.success(
      config.message || i18next.t(config.messageId || '') || 'Success',
    ),
  addNotifyError: (config: Notification) =>
    toast.error(
      config.message || i18next.t(config.messageId || '') || 'Internal Error',
    ),
};

export default Notifier;
