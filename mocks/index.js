import React from 'react';
import { SETTINGS } from '../constants';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createTestStore, store } from '../store';

export const mockFormData = () => {
  const entries = jest.fn();
  const append = jest.fn();
  return (global.FormData = () => ({ entries, append }));
};

export const mockRefreshToken = request => {
  request.onPost(`${SETTINGS.host}/api/refresh`).reply(200, {
    data: {
      access_token: '',
      refresh_token: '',
      expire: ''
    }
  });
};

export const renderWithRedux = (children, initialState = {}) => {
  const store = createTestStore(initialState);

  return {
    ...render(<Provider store={store}>{children}</Provider>),
    store
  };
};
