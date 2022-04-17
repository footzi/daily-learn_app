import { UseRequestResult } from '@api';
import { Tokens, User } from '@interfaces';

export interface UseLoginResult extends UseRequestResult {
  login: (body: LoginProps) => void;
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
