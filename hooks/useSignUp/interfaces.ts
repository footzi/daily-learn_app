import { UseRequestResult } from '@api';

export interface UseSignUpResult extends UseRequestResult {
  signUp: (body: SignUpBody) => void;
}

export interface SignUpBody {
  login: string;
  email: string;
  password: string;
}
