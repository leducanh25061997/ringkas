import Notifier from 'app/pages/Notifier';

export const replaceDotByWhitespace = (value: string) =>
  value.replaceAll('.', ' ');

export const handleServerErrors = (error: any) => {
  const code = error?.response?.data?.code;
  switch (code) {
    case 'KEYCLOAK_USER_CONFLICT':
      Notifier.addNotifyError({
        messageId: 'error.emailExisted',
      });
      break;
    case 'INVALID_EMAIL':
      Notifier.addNotifyError({
        messageId: 'error.invalidEmail',
      });
      break;
    default:
      Notifier.addNotifyError({
        messageId: 'error.anErrorOccurred',
      });
      break;
  }
};
