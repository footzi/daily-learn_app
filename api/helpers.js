import { TOKENS_LS } from '@constants';
import { LocalStorage } from '@libs';

export const createFormData = params => {
  const formData = new FormData();

  if (!params) {
    return formData;
  }

  for (const prop of Object.keys(params)) {
    formData.append(prop, params[prop]);
  }

  return formData;
};

export const getToken = async (refresh = false) => {
  const tokens = await LocalStorage.get(TOKENS_LS);

  if (tokens) {
    const { access_token, refresh_token } = await LocalStorage.get(TOKENS_LS);
    const token = refresh ? refresh_token : access_token;

    return `Bearer ${token}`;
  } else {
    return null;
  }
};

export const checkAccessToken = async () => {
  const tokens = await LocalStorage.get(TOKENS_LS);

  if (tokens) {
    const { expire } = await LocalStorage.get(TOKENS_LS);
    const isExpire = Number(expire) < Math.floor(Date.now() / 1000);

    return !isExpire;
  } else {
    return false;
  }
};
