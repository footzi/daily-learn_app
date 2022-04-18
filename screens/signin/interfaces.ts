import { SignInRequestBody } from '@interfaces';
import { SignInScreenNavigationProp } from '@navigation';

export interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

export interface Fields {
  login: string;
  password: string;
}

export type ToSignInEffect = SignInRequestBody;
