import { UseRequestResult } from '@api';
import { Tokens, User } from '@interfaces';

export interface UseLogoutResult extends UseRequestResult {
  logout: () => void;
}

export interface UseLoginRequestResult {
  data?: {
    tokens: Tokens;
    user: User;
  };
}

export interface LoginProps {
  login: string;
  password: string;
}
