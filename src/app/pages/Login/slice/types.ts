import { UserInformation } from 'types';

/* --- STATE --- */
export interface AuthState {
  userInformation?: UserInformation;
  username?: string;
  simulation?: boolean;
  otp?: string;
  authStatus?: AuthStatus;
}

export type AuthStatus = 'AUTH' | 'UN_AUTH' | 'CHECKING';
