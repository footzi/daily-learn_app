import { UseRequestResult } from '../../interfaces';

export interface UseLoginResult extends UseRequestResult {
  login: (body: LoginProps) => void
}

export interface LoginProps {
  login: string;
  password: string;
}
