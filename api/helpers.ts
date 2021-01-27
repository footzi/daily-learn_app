import { TOKENS_LS } from '@constants';
import { Tokens } from '@interfaces';
import { LocalStorage } from '@libs';

export const createFormData = (params: Record<string, string>): FormData => {
  const formData = new FormData();

  if (!params) {
    return formData;
  }

  for (const prop of Object.keys(params)) {
    formData.append(prop, params[prop]);
  }

  return formData;
};

export const getToken = async (refresh = false): Promise<string | null> => {
  const tokens: Tokens = await LocalStorage.get(TOKENS_LS);

  if (tokens) {
    const { access_token, refresh_token } = tokens;
    const token = refresh ? refresh_token : access_token;

    return `Bearer ${token}`;
  } else {
    return null;
  }
};

export const checkAccessToken = async (): Promise<boolean> => {
  const tokens: Tokens = await LocalStorage.get(TOKENS_LS);

  if (tokens) {
    const { expire } = tokens;
    const isExpire = Number(expire) < Math.floor(Date.now() / 1000);

    return !isExpire;
  } else {
    return false;
  }
};
