import { SETTINGS } from '../constants';

export const mockFormData = () => {
  const entries = jest.fn();
  const append = jest.fn();
  return (global.FormData = () => ({ entries, append }));
};

export const mockRefreshToken = request => {
  request.onPost(`${SETTINGS.host}/api/refresh`).reply(200, {
    data: {
      user: {
        access_token: '',
        refresh_token: '',
        expire: ''
      }
    }
  });
};
