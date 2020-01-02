import { SETTINGS } from '../constants';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';

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

export const renderWithRedux = ui => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
};
