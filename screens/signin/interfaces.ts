import { SignInScreenNavigationProp } from '@navigation/interfaces';
import { SignInRequestBody } from '@interfaces';

export interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

export interface Fields {
  login: string;
  password: string;
}

export type ToSignInEffect = SignInRequestBody;
