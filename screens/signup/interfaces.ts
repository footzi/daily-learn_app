import { SignUpRequestBody } from '@interfaces';
import { SignUpScreenNavigationProp } from '@navigation';

export interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

export interface Fields {
  login: string;
  email: string;
  password: string;
  password2: string;
}

export type ToSignUpEffect = SignUpRequestBody;
