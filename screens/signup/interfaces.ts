import { SignUpScreenNavigationProp } from '@navigation/interfaces';
import { SignUpRequestBody } from '@interfaces';

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
