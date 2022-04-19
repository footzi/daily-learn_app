import { TOKENS_LS } from '@constants';
import { Tokens } from '@interfaces';
import { LocalStorage } from '@libs';

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
